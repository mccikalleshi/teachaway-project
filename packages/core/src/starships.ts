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

export * as StarShips from "./starships";

export async function getFromDb(id: number, table: Tables) {
  const result = await db.execute(`select * from ${table} where id = ?`, [id]);
  return result.rows[0] as DbType | null;
}

export async function getApiStarship(id: number) {
  const response = fetch(`https://swapi.dev/api/starships/${id}/`).then(
    async (res) => (await res.json()) as Starship
  );

  if (!response) return null;

  return response;
}

export async function incrementOrDecrement({
  data,
  id,
  table,
}: {
  data: z.infer<typeof paramsType>;
  id: number;
  table: Tables;
}) {
  const { action } = data;
  const exists = await getFromDb(id, table);

  if (!exists) {
    if (action === "decrement")
      return { success: false, error: "Cannot decrement below 0" };
    const count = data.action === "increment" ? 1 : 0;
    const result = await saveDbStarship(id, count, table);
    if (!result)
      return {
        success: false,
        error: "Could not save to db",
      };
    return {
      success: true,
      data: { id, total: count },
    };
  }

  if (action === "decrement" && exists.total_nr === 0)
    return {
      success: false,
      error: "Cannot decrement below 0",
    };
  const result = await db.execute(
    `update ${table} set total_nr = total_nr ${
      action === "increment" ? "+" : "-"
    } 1 where id = ?`,
    [id]
  );

  if (result.rowsAffected === 0)
    return { success: false, error: "Could not update db" };

  return {
    success: true,
    data: { id, total: exists.total_nr + (action === "increment" ? 1 : -1) },
  };
}

export async function getStarship({
  id,
  table,
}: {
  id: number;
  table: Tables;
}) {
  const [dbStarship, apiStarship] = await Promise.all([
    getFromDb(id, table),
    getApiStarship(id),
  ]);

  if (!apiStarship) return null;

  const total = dbStarship ? dbStarship.total_nr : 0;

  return { ...apiStarship, total, id };
}

export async function updateDb({
  table,
  id,
  total,
}: {
  table: Tables;
  id: number;
  total: number;
}) {
  const result = await db.execute(
    `update ${table} set total_nr = ? where id = ?`,
    [total, id]
  );

  return result.rows[0];
}

export async function saveDbStarship(id: number, total: number, table: Tables) {
  const result = await db.execute(
    `insert into ${table} (id, total_nr) values (?, ?)`,
    [id, total]
  );
  console.log("🚀 ~ file: starships.ts:121 ~ saveDbStarship ~ result:", result);

  if (result.rowsAffected === 0) return false;

  return true;
}

export async function getStarships({
  page = 1,
  table,
}: {
  page?: number;
  table: Tables;
}) {
  const response = await Promise.all([
    await fetch(`https://swapi.dev/api/${table}/?page=${page}`).then(
      async (res) => (await res.json()) as APIResponse
    ),
    await db.execute(`select * from ${table}`),
  ]).then((res) => {
    const [swapi, db]: [APIResponse, ExecutedQuery] = res;
    const data = swapi.results.map((starship) => {
      const id = getIdFromUrl(starship.url);
      const dbRows = db.rows as DbType[];
      const dbCount = dbRows.find((row) => row.id === id);
      return {
        id,
        total_nr: dbCount ? dbCount.total_nr : 0,
        ...starship,
      };
    });

    return data;
  });

  return response;
}

export async function createStarship({
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
  const validParams = paramsType.safeParse(params);

  if (validParams.success) {
    return await incrementOrDecrement({
      data: validParams.data,
      id,
      table,
    });
  }
  const valid = bodyType.safeParse(body);
  console.log("🚀 ~ file: starships.ts:163 ~ valid:", valid);

  if (!valid.success) {
    return { error: valid.error, success: false };
  }
  const dbStarship = await getFromDb(id, table);
  if (dbStarship) {
    const response = await updateDb({
      table,
      id,
      total: valid.data.total,
    });
    return { success: true, data: { id, total_nr: valid.data.total } };
  }
  const create = await saveDbStarship(id, valid.data.total, table);
  return {
    success: true,
    data: { id, total_nr: valid.data.total },
  };
}
