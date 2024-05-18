import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const loginStore = (set: any) => ({
  isLogin: false as boolean,
  setIsLogin: (value: boolean) =>
    set((state: { isLogin: boolean }) => ({
      isLogin: !state.isLogin,
    })),
});
const useLogin = create(
  devtools(
    persist(loginStore, {
      name: "counterStore",
    })
  )
);
export default useLogin;
