import HeaderComponent from "@/components/Header";
import SingleCartComponent from "@/components/SingleCart";
import { useSets } from "@/hook/useSets";
import useCounter from "@/zustand/useCounterStore";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React from "react";

const cartComponent = () => {
  const cartItemId = useCounter((state) => state.cartItemId);
  console.log("zust cart id", cartItemId);

  const setsObj = useSets();
  let cartObjs: any[] = [];

  cartItemId.forEach((id) => {
    const cartObj = setsObj.data?.filter(
      (set: { id: string }) => set.id === id
    );
    if (cartObj) {
      cartObjs?.push(cartObj[0]);
    }
  });

  if (cartObjs.length === 0) {
    return (
      <>
        <HeaderComponent />
        <p className="font-semibold text-4xl">No items in cart yet...</p>
      </>
    );
  }

  console.log("cartObjs", cartObjs);
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="flex flex-wrap p-20 gap-8">
        {!setsObj.isLoading
          ? cartObjs.map((cartObj) => (
              <SingleCartComponent
                key={cartObj?.id}
                cartObj={cartObj}
              ></SingleCartComponent>
            ))
          : "Loading..."}
      </div>
    </>
  );
};

export default cartComponent;
