import { ColumnDef } from "@tanstack/react-table";
import { CommonType } from "./Types";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/table/DataTableRowActions";

export const commonColumns: ColumnDef<CommonType>[] = [
  {
    header: "Total Number",
    accessorKey: "total_nr",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-2">
          <Badge variant="secondary">{row.getValue("total_nr")}</Badge>
          <DataTableRowActions row={row} />
        </div>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Model",
    accessorKey: "model",
  },
  {
    header: "Manufacturer",
    accessorKey: "manufacturer",
  },
  {
    header: "Length",
    accessorKey: "length",
  },
  {
    header: "Cost in credits",
    accessorKey: "cost_in_credits",
  },
  {
    header: "Crew",
    accessorKey: "crew",
  },
  {
    header: "Passengers",
    accessorKey: "passengers",
  },
  {
    header: "Max atmosphering speed",
    accessorKey: "max_atmosphering_speed",
  },
  {
    header: "Cargo capacity",
    accessorKey: "cargo_capacity",
  },
  {
    header: "Consumables",
    accessorKey: "consumables",
  },

  {
    header: "Created",
    accessorKey: "created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created"));
      return <div>{date.toDateString()}</div>;
    },
  },
  {
    header: "Edited",
    accessorKey: "edited",
    cell: ({ row }) => {
      const date = new Date(row.getValue("edited"));
      return <div>{date.toDateString()}</div>;
    },
  },
];
