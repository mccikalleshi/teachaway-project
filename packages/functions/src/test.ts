import { connect } from "@planetscale/database";
import { ApiHandler } from "sst/node/api";

const config = {
  url: 'mysql://dgklj7bt8i2nc3wf39nn:pscale_pw_9KQAey7jMpVTY4ZSrzIzs6NJKSzdMDX3d18q0rJnblI@aws.connect.psdb.cloud/teachaway-project?ssl={"rejectUnauthorized":true}',
};

export const test = ApiHandler(async (_evt) => {
  const client = connect(config);
  const result = await client.execute("SELECT * FROM counter");
  const rows = result.rows;
  return {
    statusCode: 200,
    body: JSON.stringify(rows),
  };
});
