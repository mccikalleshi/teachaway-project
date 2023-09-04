import { StackContext, Api, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const database = new Config.Parameter(stack, "database_url", {
    value: process.env.DATABASE_URL!,
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [],
      },
    },
    routes: {
      "GET /starships": "packages/functions/src/methods.list",
      "PUT /starship/{id}": "packages/functions/src/methods.create",
      "GET /starship/{id}": "packages/functions/src/methods.get",
      "GET /vehicles": "packages/functions/src/methods.list",
      "PUT /vehicle/{id}": "packages/functions/src/methods.create",
      "GET /vehicle/{id}": "packages/functions/src/methods.get",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
