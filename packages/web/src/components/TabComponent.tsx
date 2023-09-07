import { EndpointType, StarshipOrVehicle } from "@/constants/Types";
import { urlGenerator } from "@/helpers/enpointURLGenerator";
import { useQuery } from "@tanstack/react-query";
import TableRenderer from "./table/Table";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

type Props = {
  type: EndpointType;
};

export const TabComponent = ({ type }: Props) => {
  const [page, setPage] = useState(1);
  const { toast, dismiss } = useToast();
  const { isLoading, data, error, isFetching } = useQuery({
    queryKey: [type, { page }],
    queryFn: async () => {
      const response = await fetch(urlGenerator(type, page)).then(
        async (res) => await res.json()
      );
      return response as StarshipOrVehicle<typeof type>[];
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 6,
  });

  useEffect(() => {
    if (isFetching) {
      toast({
        title: "Fetching data...",
        description: "Please wait while we fetch the data from the server.",
      });
    } else {
      dismiss();
    }

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data from the server.",
        variant: "destructive",
      });
    }

    return () => {
      // dismiss();
    };
  }, [isFetching]);

  return isLoading && !error ? (
    <></>
  ) : (
    data && (
      <TableRenderer type={type} data={data} setPage={setPage} page={page} />
    )
  );
};
