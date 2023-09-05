import { EndpointType, StarshipOrVehicle } from "@/constants/Types";
import { commonColumns } from "@/constants/commonColumns";
import { ColumnDef } from "@tanstack/react-table";

export const columnDefs = (
  type: EndpointType
): ColumnDef<StarshipOrVehicle<typeof type>>[] => {
  return type === "starships"
    ? commonColumns.concat([
        {
          header: "Starship class",
          accessorKey: "starship_class",
        },
        {
          header: "Hyperdrive rating",
          accessorKey: "hyperdrive_rating",
        },
        {
          header: "MGLT",
          accessorKey: "MGLT",
        },
      ])
    : commonColumns.concat([
        {
          header: "Vehicle class",
          accessorKey: "vehicle_class",
        },
      ]);
};
