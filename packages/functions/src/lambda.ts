import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world. The time is ${new Date().toISOString()}`,
  };
});

export const test1 = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ test: "a" }),
  };
});
