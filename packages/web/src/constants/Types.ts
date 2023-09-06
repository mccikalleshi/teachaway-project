export type EndpointType = "starships" | "vehicles";

export type CommonType = {
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
  total_nr: number;
  table: EndpointType;
  id: number;
};

export type OnlyStarship = {
  starship_class: string;
  hyperdrive_rating: string;
  MGLT: string;
};

export type OnlyVehicle = {
  vehicle_class: string;
};

export type Starship = OnlyStarship & CommonType;

export type Vehicle = OnlyStarship & CommonType;

export type StarshipOrVehicle<T> = T extends "starships" ? Starship : Vehicle;

export type ActionTypes = "increment" | "decrement";
