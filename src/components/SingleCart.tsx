import useCounter from "@/zustand/useCounterStore";
import Image from "next/image";
import React from "react";

const SingleCartComponent = ({ cartObj }: { cartObj: any }) => {
  console.log(cartObj);
  const decrement = useCounter((state) => state.decrement);
  const removeId = useCounter((state) => state.removeId);
  return (
    <div className="">
      <div className="">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10 h-52">
            <Image
              className="w-full "
              src={cartObj?.images?.logo}
              height={0}
              width={0}
              sizes="100vw"
              alt="set logo"
            ></Image>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="text-gray-800 font-semibold text-xl mb-2">
              {cartObj?.name || "loading.."}
            </h2>

            <div className="card-actions">
              <button
                onClick={() => {
                  decrement(1);
                  removeId(cartObj?.id);
                }}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCartComponent;
