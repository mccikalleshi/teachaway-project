import { ApiHandler } from "sst/node/api";
import { StarShips } from "@my-sst-app/core/starships";

export const list = ApiHandler(async (_evt) => {
  const starships = await StarShips.getStarships();

  return {
    statusCode: 200,
    body: JSON.stringify(starships),
  };
});
