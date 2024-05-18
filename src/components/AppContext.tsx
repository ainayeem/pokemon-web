import { FC, ReactNode, createContext, useState } from "react";

interface IncrementContext {
  stateVal: number;
  setStateVal: (param: number) => void;
  notificationIsOpen: boolean;
  setNotificationToggle: (param: boolean) => void;
}
export const IncrementContext = createContext<IncrementContext>({
  stateVal: 0,
  setStateVal: (param: number) => {},
  notificationIsOpen: false,
  setNotificationToggle: (param: boolean) => {},
});
const AppContextComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const [stateVal, setStateVal] = useState<number>(0);
  const [notificationIsOpen, setNotificationToggle] = useState<boolean>(false);
  console.log(stateVal);
  return (
    <IncrementContext.Provider
      value={{
        stateVal,
        setStateVal,
        setNotificationToggle,
        notificationIsOpen,
      }}
    >
      {children}
    </IncrementContext.Provider>
  );
};
export default AppContextComponent;
