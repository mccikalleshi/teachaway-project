import { ApiHandler } from "sst/node/api";

export const test = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ test: "a" }),
  };
});
