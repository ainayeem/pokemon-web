import useCounter from "@/zustand/useCounterStore";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const ModalComponent = ({ selectedSet }: { selectedSet: any }) => {
  // console.log(selectedSet);
  const increment = useCounter((state) => state.increment);
  const addId = useCounter((state) => state.addId);
  return (
    <>
      <dialog id="my_modal_3" className="modal" style={{ zIndex: 999 }}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            {selectedSet ? selectedSet.name : "No Set Selected"}
          </h3>
          <Image
            className="w-full mb-3"
            src={selectedSet?.images.logo || ""}
            height={0}
            width={0}
            sizes="100vw"
            alt="set logo"
          ></Image>
          <h2>
            <span className="font-bold">Release Date: </span>
            {selectedSet ? selectedSet.releaseDate : "No Release Date"}
          </h2>
          <h2>
            <span className="font-bold">Series: </span>
            {selectedSet ? selectedSet.series : "No Series"}
          </h2>
          <div className="flex justify-center mb-2">
            <button
              onClick={() => {
                increment(1);
                addId(selectedSet.id);
                toast.success("Added to cart!");
              }}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};

export default ModalComponent;
