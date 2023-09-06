import { EndpointType } from "@/constants/Types";
import { commonColumns } from "@/constants/commonColumns";

export const columnDefs = (type: EndpointType) => {
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
