import { DbType, Tables } from "./Types";
import { db } from "./helpers";

export async function getFromDb(id: number, table: Tables) {
  const result = await db.execute(`select * from ${table} where id = ?`, [id]);
  return result.rows[0] as DbType | null;
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

export async function saveOneToDb(id: number, total: number, table: Tables) {
  const result = await db.execute(
    `insert into ${table} (id, total_nr) values (?, ?)`,
    [id, total]
  );

  if (result.rowsAffected === 0) return false;

  return true;
}

export async function incrementOrDecrementDb({
  table,
  id,
  dbStarship,
  action,
}: {
  table: Tables;
  id: number;
  dbStarship: DbType;
  action: "increment" | "decrement";
}) {
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
    data: {
      id,
      total: dbStarship.total_nr + (action === "increment" ? 1 : -1),
    },
  };
}
