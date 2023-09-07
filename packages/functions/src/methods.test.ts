import { expect, it } from "vitest";
import { Config } from "sst/node/config";
import fetch from "node-fetch";

it("custom value update starship works", async () => {
  const url = Config.ApiEndpoint;

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const setTotalNr: any = await fetch(url + "/starship/2", {
    method: "PUT",
    body: JSON.stringify({
      total: randomNumber,
    }),
  }).then(async (res) => await res.json());

  const getStarship: any = await fetch(url + "/starship/2").then(
    async (res) => await res.json()
  );

  expect(setTotalNr?.total_nr).toEqual(getStarship?.total_nr);
});

it("increment starship works", async () => {
  const incremented: any = await fetch(
    Config.ApiEndpoint + "/starship/2?action=increment",
    {
      method: "PUT",
      body: JSON.stringify({}),
    }
  ).then(async (res) => await res.json());

  const getStarship: any = await fetch(Config.ApiEndpoint + "/starship/2").then(
    async (res) => await res.json()
  );

  expect(incremented?.total_nr).toEqual(getStarship?.total_nr);
});

it("decrement starship works", async () => {
  const decremented: any = await fetch(
    Config.ApiEndpoint + "/starship/2?action=decrement",
    {
      method: "PUT",
      body: JSON.stringify({}),
    }
  ).then(async (res) => await res.json());

  const getStarship: any = await fetch(Config.ApiEndpoint + "/starship/2").then(
    async (res) => await res.json()
  );

  if (decremented?.error) {
    expect(decremented?.error).toEqual("Cannot decrement below 0");
    return;
  }

  expect(decremented?.total_nr).toEqual(getStarship.total_nr);
  // expect(decremented?.total_nr).toEqual(getStarship?.total_nr);
});

it("custom value update vehicle works", async () => {
  const url = Config.ApiEndpoint;

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const setTotalNr: any = await fetch(url + "/vehicle/4", {
    method: "PUT",
    body: JSON.stringify({
      total: randomNumber,
    }),
  }).then(async (res) => await res.json());

  const getStarship: any = await fetch(url + "/vehicle/4").then(
    async (res) => await res.json()
  );

  expect(setTotalNr?.total_nr).toEqual(getStarship?.total_nr);
});

it("increment vehicle works", async () => {
  const incremented: any = await fetch(
    Config.ApiEndpoint + "/vehicle/4?action=increment",
    {
      method: "PUT",
      body: JSON.stringify({}),
    }
  ).then(async (res) => await res.json());

  const getStarship: any = await fetch(Config.ApiEndpoint + "/vehicle/4").then(
    async (res) => await res.json()
  );

  expect(incremented?.total_nr).toEqual(getStarship?.total_nr);
});

it("decrement vehicle works", async () => {
  const decremented: any = await fetch(
    Config.ApiEndpoint + "/vehicle/4?action=decrement",
    {
      method: "PUT",
      body: JSON.stringify({}),
    }
  ).then(async (res) => await res.json());

  const getStarship: any = await fetch(Config.ApiEndpoint + "/vehicle/4").then(
    async (res) => await res.json()
  );

  if (decremented?.error) {
    expect(decremented?.error).toEqual("Cannot decrement below 0");
    return;
  }

  expect(decremented?.total_nr).toEqual(getStarship.total_nr);
  // expect(decremented?.total_nr).toEqual(getStarship?.total_nr);
});
