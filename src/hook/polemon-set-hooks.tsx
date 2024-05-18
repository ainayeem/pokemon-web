import { QueryKeys } from "@/models/enums";
import { editSetName } from "@/service/pokemon.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

export const useUpdateSetName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ setId, setName }: { setId: string; setName: string }) => {
      return editSetName(setId, setName);
    },
    onSuccess: (data, variables) => {
      console.log("successfully updated");
      queryClient.setQueryData(
        [QueryKeys.set, variables.setId],
        (initialSet: any) => {
          if (initialSet) {
            initialSet.name = variables.setName;
          }

          return { ...initialSet };
        }
      );
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.set, variables.setId],
      // });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
//--
export const useUpdateSetsName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ setId, setName }: { setId: string; setName: string }) =>
      editSetName(setId, setName),
    onSuccess: (data, variables) => {
      console.log("successfully updated");
      queryClient.setQueryData([QueryKeys.sets], (initialSets: Set[]) => {
        let foundSet = initialSets?.find((set) => set.id === variables.setId);
        if (foundSet) {
          foundSet.name = variables.setName;
        }
        return initialSets;
      });
      //queryClient.invalidateQueries({ queryKey: [QueryKeys.CardSets] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
