import {
  DotsHorizontalIcon,
  Pencil2Icon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ActionTypes, CommonType } from "@/constants/Types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { uppercaseFirstChar } from "@/helpers/uppercaseFirstChar";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEndpoint } from "@/helpers/enpointURLGenerator";
import { useRef } from "react";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type Variables = {
  action?: ActionTypes;
};

export function DataTableRowActions({ row }: { row: Row<CommonType> }) {
  const table = row.original.table;
  const name = row.original.name;
  const id = row.original.id;
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (variables: Variables) => {
      toast({
        title: "Updating",
        description: `Updating the total nr of ${table} for ${name}`,
        variant: "default",
        duration: 4000,
      });

      await updateEndpoint({
        table,
        id: id,
        total: Number(inputRef.current?.value ?? 1),
        action: variables.action,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Successfully updated the total nr of ${table} for ${name}`,
        variant: "success",
        duration: 4000,
      });
      queryClient.invalidateQueries([table]);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
        duration: 4000,
      });
    },
  });

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] bg-slate-900">
          <DropdownMenuItem
            className="flex justify-between cursor-pointer"
            onClick={() => mutation.mutate({ action: "increment" })}
          >
            Increment
            <ThickArrowUpIcon />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between cursor-pointer"
            onClick={() =>
              mutation.mutate({
                action: "decrement",
              })
            }
          >
            Decrement
            <ThickArrowDownIcon />
          </DropdownMenuItem>
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem className="flex justify-between cursor-pointer">
              Set Custom
              <Pencil2Icon />
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Change the total nr of{" "}
            <span className="italic font-bold	bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {uppercaseFirstChar(table)}
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Set a custom value for the total nr of {table} for {name}
            <Input type="number" ref={inputRef} defaultValue={1} min={1} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            <Button variant="default" onClick={() => mutation.mutate({})}>
              Save
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
