import fetch from "node-fetch";
import { db } from "./helpers";

export * as StarShips from "./starships";

export async function getStarships() {
  const response = await fetch("https://swapi.dev/api/starships/");
  const data = await response.json();
  const database = await db.execute("select * from starships");
  return { data, db: database.rows };
}
