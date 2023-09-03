import { StackContext, Api, EventBus, Stack, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  // const bus = new EventBus(stack, "bus", {
  //   defaults: {
  //     retries: 10,
  //   },
  // });

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
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "GET /test": "packages/functions/src/test.test",
      "POST /todo": "packages/functions/src/todo.create",
      "GET /starships": "packages/functions/src/starships.list",
      "PUT /starship/{id}": "packages/functions/src/starships.create",
      "GET /starship/{id}": "packages/functions/src/starships.get",
    },
  });

  // bus.subscribe("todo.created", {
  //   handler: "packages/functions/src/events/todo-created.handler",
  // });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
