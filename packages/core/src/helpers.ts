import { connect } from "@planetscale/database";

export function getIdFromUrl(url: string) {
  const split = url.split("/").filter((el) => !!el);
  const id = split[split.length - 1];
  return id;
}

const config = {
  url: 'mysql://dgklj7bt8i2nc3wf39nn:pscale_pw_9KQAey7jMpVTY4ZSrzIzs6NJKSzdMDX3d18q0rJnblI@aws.connect.psdb.cloud/teachaway-project?ssl={"rejectUnauthorized":true}',
};

export const db = connect(config);
