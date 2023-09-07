import { connect } from "@planetscale/database";
import fetch from "node-fetch";
import { Config } from "sst/node/config";

export function getIdFromUrl(url: string) {
  const split = url.split("/").filter((el) => !!el);
  const id = split[split.length - 1];

  return Number(id);
}

const database_url = Config.database_url;

const config = {
  fetch,
  url: database_url,
};

export const db = connect(config);
