import { ActionTypes, EndpointType } from "@/constants/Types";

export function urlGenerator(endpoint: EndpointType, page = 1) {
  console.log(
    "test",
    `${import.meta.env.VITE_APP_API_URL}/${endpoint}?page=${page}`
  );
  return `${import.meta.env.VITE_APP_API_URL}/${endpoint}?page=${page}`;
}

export async function updateEndpoint({
  table,
  total,
  id,
  action,
}: {
  table: EndpointType;
  total: number;
  id: number;
  action?: ActionTypes;
}) {
  const tableWithoutEs = table.slice(0, -1);

  const url = action
    ? `${
        import.meta.env.VITE_APP_API_URL
      }/${tableWithoutEs}/${id}?action=${action}`
    : `${import.meta.env.VITE_APP_API_URL}/${tableWithoutEs}/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total: total,
    }),
  });

  if (response.ok) {
    return await response.json();
  }

  const res = await response.json();

  throw new Error(res?.error);
}
