import {
  createContext,
  useReducer,
  useState,
  Reducer,
  ReactNode,
  Dispatch,
} from "react";

interface IncrementContext {
  counter: stateModel;
  setCounter: Dispatch<actionModel>;
}
interface stateModel {
  _count: number;
}

interface actionModel {
  type: "increment" | "decrement" | "reset";
  value: string | number;
}

export const IncrementContext = createContext<IncrementContext>({
  counter: {
    _count: 0,
  },
  setCounter: () => {},
});

const counterReducer = (state: stateModel, action: actionModel) => {
  switch (action.type) {
    case "increment":
      return { ...state, _count: (state._count + 1) as number };
    case "decrement":
      return {
        ...state,
        _count: (state._count - 1) as number,
      };
    case "reset":
      return {
        ...state,
        _count: 0 as number,
      };
    default:
      return state;
  }
};
const AppContextWithReducer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //useReducer use kore
  // const [stateVal,setStateVal]  = useState<number>(0);
  const [counter, setCounter] = useReducer(counterReducer, { _count: 0 });
  return (
    <IncrementContext.Provider value={{ counter, setCounter }}>
      {children}
    </IncrementContext.Provider>
  );
};

export default AppContextWithReducer;
