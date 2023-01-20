import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchPost } from "../utils/fetch";
import { INewsItemType } from "../utils/types";

interface IStoreContext {
  idPost: INewsItemType[];
  setIdPost: Dispatch<SetStateAction<INewsItemType[]>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  load: boolean;
  setLoad: Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  setTimerOn: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const StoreContext = createContext<IStoreContext>({
  idPost: [],
  setIdPost: () => {},
  url: "",
  setUrl: () => {},
  load: false,
  setLoad: () => {},
  checked: true,
  setChecked: () => {},
  setTimerOn: () => {},
  error: false,
  setError: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

const StoreComponent = ({ children }: { children: ReactNode }) => {
  const [idPost, setIdPost] = useState<INewsItemType[]>([]);

  const [load, setLoad] = useState(false);
  const [checked, setChecked] = useState(() => {
    const storage = localStorage.getItem("check");
    if (storage !== null) {
      return JSON.parse(storage);
    }
    return true;
  });
  const [url, setUrl] = useState<string>(
    checked
      ? `${process.env.REACT_APP_NEWS_URL}`
      : `${process.env.REACT_APP_BEST_URL}`
  );
  const [timerOn, setTimerOn] = useState(true);
  const timer = useRef<NodeJS.Timeout>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPost(url, setIdPost, setError, setErrorMessage);
  }, [url]);

  useEffect(() => {
    if (timerOn) {
      timer.current = setInterval(() => {
        fetchPost(url, setIdPost, setError, setErrorMessage);
      }, 60000);
    } else {
      clearInterval(timer.current);
    }
  }, [timerOn]);

  if (!idPost) return null;

  return (
    <StoreContext.Provider
      value={{
        idPost,
        setIdPost,
        url,
        setUrl,
        load,
        setLoad,
        checked,
        setChecked,
        setTimerOn,
        error,
        setError,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreComponent;
