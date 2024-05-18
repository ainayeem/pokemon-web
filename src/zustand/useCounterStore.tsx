import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const counterStore = (set: any) => ({
  count: 0 as number,
  cartItemId: [] as string[],
  increment: (value: number) =>
    set((state: { count: number }) => ({ count: state.count + value })),
  decrement: (value: number) =>
    set((state: { count: number }) => ({ count: state.count - value })),
  reset: () => set({ count: 0 }),
  addId: (id: string) =>
    set((state: { cartItemId: string[] }) => ({
      cartItemId: [...state.cartItemId, id],
    })),
  removeId: (id: string) =>
    set((state: { cartItemId: string[] }) => {
      state.cartItemId.splice(state.cartItemId.indexOf(id), 1);
      return {
        cartItemId: [...state.cartItemId],
      };
    }),
});

const useCounter = create(
  devtools(
    persist(counterStore, {
      name: "counterStore",
    })
  )
);
export default useCounter;
