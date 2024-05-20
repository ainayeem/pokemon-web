import { useUpdateSetName } from "@/hook/polemon-set-hooks";
import { useSet } from "@/hook/useSet";
import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets, getSetById } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import HeaderComponent from "@/components/Header";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useCounter from "@/zustand/useCounterStore";
import { toast } from "sonner";

export const getStaticPaths: GetStaticPaths = async (context) => {
  let allSets = await getAllSets();
  let listOfSetIdObjects = allSets.map((x) => {
    return { params: { setId: x.id } };
  });

  return { paths: listOfSetIdObjects.splice(0, 5), fallback: true };
};

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async ({ params }) => {
  const setId = params?.setId as string;
  console.log("I am server");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.set, setId],
    queryFn: async () => {
      const set = await getSetById(setId);
      // console.log(set);
      return set;
    },
  });
  // console.log("I am server");
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
};

const SetPage = (props: any, { selectedSet }: { selectedSet: any }) => {
  // console.log(props);
  // Router.params.setid
  // console.log(props);

  const router = useRouter();
  const {
    data: set,
    isLoading,
    isError,
  } = useSet(router?.query?.setId as string);

  const { mutate: updateName } = useUpdateSetName();
  const [setName, setSetName] = useState(set?.name);
  // console.log(set);
  const increment = useCounter((state) => state.increment);
  const addId = useCounter((state) => state.addId);

  //--error
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-3xl mr-4 mb-3 font-semibold">Loading</span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  if (!set) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <HeaderComponent />
      {isLoading && "Loading.."}
      {!isLoading && !isError && !set && "Set not found"}
      {set && (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto my-36">
          <figure>
            <Image
              className="w-full "
              src={set?.images?.logo || ""}
              height={0}
              width={0}
              sizes="100vw"
              alt="set logo"
            ></Image>
          </figure>
          <div className="card-body">
            <div className="flex">
              <p className="card-title">{set.name || "Loading.."}</p>
              <BorderColorIcon
                className="cursor-pointer"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_3"
                  ) as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              />
            </div>
            <button
              onClick={() => {
                increment(1);
                addId(set?.id);
                toast.success("Added to cart!");
              }}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      )}

      {/* modal  */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Change Name</h3>
          <input
            type="text"
            name="set-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Edit Name"
            required
            onKeyUp={(e) => {
              setSetName(e.currentTarget.value);
            }}
          />
          <form method="dialog">
            <button
              onClick={() => {
                if (!setName) {
                  alert("Name is required");
                  return;
                }
                if (setName) {
                  updateName({
                    setId: router.query.setId as string,
                    setName: setName,
                  });
                }
              }}
              className="btn btn-outline mt-3"
            >
              Edit Name
            </button>
          </form>

          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};

export default SetPage;
