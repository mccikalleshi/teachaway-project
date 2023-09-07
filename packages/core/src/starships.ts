import fetch from "node-fetch";
import { db, getIdFromUrl } from "./helpers";
import {
  APIResponse,
  DbType,
  Starship,
  Tables,
  bodyType,
  paramsType,
} from "./Types";
import { z } from "zod";
import { ExecutedQuery } from "@planetscale/database";
import { getFromApi } from "./api";
import { getFromDb, incrementOrDecrementDb, saveOneToDb, updateDb } from "./db";

export * as StarShips from "./starships";

export async function incrementOrDecrement({
  data,
  id,
  table,
  dbStarship,
}: {
  data: z.infer<typeof paramsType>;
  id: number;
  table: Tables;
  dbStarship: DbType | null;
}) {
  const { action } = data;

  if (!dbStarship) {
    if (action === "decrement")
      return { success: false, error: "Cannot decrement below 0" };

    const count = data.action === "increment" ? 1 : 0;

    const result = await saveOneToDb(id, count, table);

    if (!result)
      return {
        success: false,
        error: "Could not save to db",
      };

    return {
      success: true,
      data: { id, total_nr: count },
    };
  }

  if (action === "decrement" && dbStarship.total_nr === 0)
    return {
      success: false,
      error: "Cannot decrement below 0",
    };

  return incrementOrDecrementDb({
    table,
    id,
    dbStarship,
    action,
  });
}

export async function getOne({ id, table }: { id: number; table: Tables }) {
  const [dbStarship, apiStarship] = await Promise.all([
    getFromDb(id, table),
    getFromApi(id, table),
  ]);

  if (!apiStarship) return null;

  const total = dbStarship ? dbStarship.total_nr : 0;

  return { ...apiStarship, total_nr: total, id };
}

export async function getAll({
  page = 1,
  table,
}: {
  page?: number;
  table: Tables;
}) {
  const response = (await Promise.all([
    await fetch(`https://swapi.dev/api/${table}/?page=${page}`).then(
      async (res) => (await res.json()) as APIResponse
    ),
    await db.execute(`select * from ${table}`),
  ])
    .then((res) => {
      const [swapi, db]: [APIResponse, ExecutedQuery] = res;
      const data = swapi.results.map((starship) => {
        const id = getIdFromUrl(starship.url);
        const dbRows = db.rows as DbType[];
        const dbCount = dbRows.find((row) => row.id === id);
        return {
          id,
          total_nr: dbCount ? dbCount.total_nr : 0,
          table,
          ...starship,
        };
      }) as Starship[];

      return { success: true, data };
    })
    .catch((err) => {
      return { success: false, error: err };
    })) as { success: true; data: Starship[] } | { success: false; error: any };

  return response.success ? response.data : "API Limit Reached";
}

export async function createOne({
  id,
  body,
  params,
  table,
}: {
  id: number;
  body?: z.infer<typeof bodyType>;
  params?: {
    [name: string]: string | undefined;
  };
  table: Tables;
}) {
  const dbStarship = await getFromDb(id, table);
  const queyParams = paramsType.safeParse(params);

  if (queyParams.success) {
    return await incrementOrDecrement({
      data: queyParams.data,
      id,
      table,
      dbStarship,
    });
  }
  const validBody = bodyType.safeParse(body);

  if (!validBody.success) {
    return { error: validBody.error, success: false };
  }
  if (dbStarship) {
    const response = await updateDb({
      table,
      id,
      total: validBody.data.total,
    });
    return { success: true, data: { id, total_nr: validBody.data.total } };
  }
  const create = await saveOneToDb(id, validBody.data.total, table);
  return {
    success: true,
    data: { id, total_nr: validBody.data.total },
  };
}
