import { APIGatewayProxyEventV2 } from "aws-lambda";

export function getTable(evt: APIGatewayProxyEventV2) {
  const url = evt.rawPath;
  if (url.includes("starship")) return "starships";
  if (url.includes("vehicle")) return "vehicles";
  return "starships";
}
