import { z } from "zod";

export type Starship = {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
};

export const bodyType = z.object({
  total: z.number().positive(),
});

export type APIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
};

export const paramsType = z.object({
  action: z.enum(["increment", "decrement"]),
});

export type DbType = {
  id: number;
  total_nr: number;
};

export type Tables = "starships" | "vehicles";
