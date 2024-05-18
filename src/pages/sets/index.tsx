import { useUpdateSetName, useUpdateSetsName } from "@/hook/polemon-set-hooks";
import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  console.log("i am server");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });
  console.log("i am server");
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
};

const SetList = (props: { serverSets: Set[] }) => {
  console.log(props);

  const { data: sets, isLoading, isError } = useSets();

  //--

  const { mutate: updateName } = useUpdateSetName();
  const [setName, setSetName] = useState("");

  return (
    <div className="px-3 flex flex-wrap">
      {isLoading && "Loading.."}

      {sets?.map((set: Set) => {
        return (
          <Link href={`sets/${set.id}`}>
            <div className="flex px-3 flex-col">
              <div key={set.id} className="relative w-[100px] h-[100px]">
                <Image
                  className="w-full h-auto"
                  src={set?.images.logo || ""}
                  height={0}
                  width={0}
                  sizes="100vw"
                  alt="set logo"
                ></Image>
              </div>
              <div>{set?.name || "loading.."}</div>
              <div>
                <input
                  className="border rounded mb-2"
                  type="text"
                  name="set-name"
                  placeholder="Edit name"
                  onKeyUp={(e) => {
                    setSetName(e.currentTarget.value);
                  }}
                />
                <br />
                <button
                  onClick={() => {
                    if (setName) {
                      updateName({
                        setId: set.id,
                        setName: setName,
                      });
                    }
                  }}
                >
                  Edit Set Name
                </button>
              </div>
            </div>
          </Link>
        );
      })}
      {isError && "Error"}
    </div>
  );
};
export default SetList;
