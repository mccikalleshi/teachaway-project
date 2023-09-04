import fetch from "node-fetch";
import { Starship, Tables } from "./Types";

export async function getFromApi(id: number, table: Tables) {
  const response = fetch(`https://swapi.dev/api/${table}/${id}/`).then(
    async (res) => (await res.json()) as Starship
  );

  if (!response) return null;

  return response;
}
