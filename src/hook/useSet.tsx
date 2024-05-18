import { QueryKeys } from "@/models/enums";
import { getSetById } from "@/service/pokemon.service";
import { useQuery } from "@tanstack/react-query";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

export const useSet = (setId: string) => {
  return useQuery<Set>({
    queryKey: [QueryKeys.set, setId],
    queryFn: async () => {
      const set = await getSetById(setId);
      return set;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: true,
    retry: 1,
    retryDelay: 3000,
  });
};
