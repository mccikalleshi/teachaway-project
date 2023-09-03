import fetch from "node-fetch";
import { db, getIdFromUrl } from "./helpers";
import { APIResponse, DbType, Starship, bodyType } from "./Types";
import { z } from "zod";
import { ExecutedQuery } from "@planetscale/database";

export * as StarShips from "./starships";

export async function getDbStarship(id: number) {
  const result = await db.execute("select * from starships where id = ?", [id]);
  return result.rows[0] as DbType;
}

export async function getApiStarship(id: number) {
  const response = fetch(`https://swapi.dev/api/starships/${id}/`).then(
    async (res) => (await res.json()) as Starship
  );

  if (!response) return null;

  return response;
}

export async function getStarship({ id }: { id: number }) {
  const [dbStarship, apiStarship] = await Promise.all([
    getDbStarship(id),
    getApiStarship(id),
  ]);

  if (!apiStarship) return null;

  const total = dbStarship ? dbStarship.total_nr : 0;

  return { ...apiStarship, total, id };
}

export async function saveDbStarship(id: number, total: number) {
  const result = await db.execute(
    "insert into starships (id, total_nr) values (?, ?)",
    [id, total]
  );

  return result;
}

export async function getStarships({ page = 1 }: { page?: number }) {
  const response = await Promise.all([
    await fetch(`https://swapi.dev/api/starships/?page=${page}`).then(
      async (res) => (await res.json()) as APIResponse
    ),
    await db.execute("select * from starships"),
  ]).then((res) => {
    const [swapi, db]: [APIResponse, ExecutedQuery] = res;
    const data = swapi.results.map((starship: Starship) => {
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
}: {
  id: number;
  body: z.infer<typeof bodyType>;
}) {
  const valid = bodyType.safeParse(body);

  if (!valid.success) {
    return { error: valid.error, success: false };
  }
  const dbStarship = await getDbStarship(id);
  if (dbStarship) return { success: true, data: dbStarship };
  const create = await saveDbStarship(id, body.total);
  console.log("🚀 ~ file: starships.ts:67 ~ create:", create);
  return {
    success: true,
    data: { id, total: body.total },
  };
}
