import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SliderComponent from "@/components/Slider";
import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React from "react";
import ModalComponent from "@/components/Modal";
import IosShareIcon from "@mui/icons-material/IosShare";

const inter = Inter({ subsets: ["latin"] });

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

export default function Home(props: { serverSets: Set[] }) {
  const { data: sets, isLoading, isError } = useSets();
  console.log("from props", props);
  console.log(sets);

  const [selectedSet, setSelectedSet] = useState<Set | null>(null);

  // handle model
  const openModal = (set: Set) => {
    setSelectedSet(set);
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  // Sort sets
  const sortedSets = sets
    ? sets.sort(
        (a: Set, b: Set) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
    : [];

  return (
    <div>
      <SliderComponent />
      <h1 className="text-center font-semibold text-6xl mb-4 ">List of Sets</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center ">
          {isLoading && "Loading.."}

          {sortedSets?.map((set: Set) => {
            return (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10 h-52">
                  <Link href={`sets/${set.id}`}>
                    <Image
                      className="w-full "
                      src={set?.images?.logo || ""}
                      height={100}
                      width={100}
                      sizes="100vw"
                      alt="set logo"
                    ></Image>
                  </Link>
                </figure>
                <div className="card-body items-center text-center">
                  <Link href={`sets/${set.id}`}>
                    <h2 className="text-gray-800 font-semibold text-xl mb-2">
                      {set?.name || "loading.."}
                    </h2>
                  </Link>
                  <div className="card-actions">
                    <button
                      onClick={() => openModal(set)}
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <ModalComponent selectedSet={selectedSet}></ModalComponent>
          {isError && "Error"}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="btn fixed bottom-20 right-0 rounded-r-none"
          >
            <IosShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
