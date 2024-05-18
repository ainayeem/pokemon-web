import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import { useQuery } from "@tanstack/react-query";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

export const useSets = () => {
  return useQuery<Set[]>({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: true,
    retry: 1,
    retryDelay: 3000,
  });
};
