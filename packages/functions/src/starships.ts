import { ApiHandler } from "sst/node/api";
import { StarShips } from "@my-sst-app/core/starships";

export const list = ApiHandler(async (_evt) => {
  const queryParams = _evt.queryStringParameters;
  const page = queryParams?.page ? Number(queryParams.page) : 1;
  const starShips = await StarShips.getStarships({ page });

  return !!starShips
    ? {
        statusCode: 200,
        body: JSON.stringify(starShips),
      }
    : {
        statusCode: 400,
        body: JSON.stringify({ error: "No starships found" }),
      };
});

export const get = ApiHandler(async (evt) => {
  const id = evt.pathParameters?.id;
  if (!id)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No id provided" }),
    };

  const starship = await StarShips.getStarship({ id: Number(id) });

  return !!starship
    ? {
        statusCode: 200,
        body: JSON.stringify(starship),
      }
    : {
        statusCode: 400,
        body: JSON.stringify({ error: "No starship found" }),
      };
});

export const create = ApiHandler(async (evt) => {
  const id = evt.pathParameters?.id;
  if (!id)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No id provided" }),
    };
  const body = evt.body;
  const parsed = JSON.parse(body || "");

  const starship = await StarShips.createStarship({
    id: Number(id),
    body: parsed,
  });

  return !!starship.success
    ? {
        statusCode: 200,
        body: JSON.stringify(starship.data),
      }
    : {
        statusCode: 400,
        body: JSON.stringify({ error: starship.error }),
      };
});
