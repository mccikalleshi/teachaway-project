import { StackContext, Api, Config, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const database = new Config.Parameter(stack, "database_url", {
    value: process.env.DATABASE_URL!,
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [database],
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

  const web = new StaticSite(stack, "react", {
    path: "packages/web/",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
    dev: {
      url: "http://localhost:3000",
    },
  });

  stack.addOutputs({
    web: web.url,
    ApiEndpoint: api.url,
  });
}
