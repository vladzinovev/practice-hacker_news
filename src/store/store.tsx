import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { INewsItemType } from "../utils/types";

interface IStoreContext {
  idPost: INewsItemType[];
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export const StoreContext = createContext<IStoreContext>({
  idPost: [],
  url: "",
  setUrl: () => {},
  loading: false,
  setLoading: () => {},
  checked: true,
  setChecked: () => {},
});

const StoreComponent = ({ children }: { children: ReactNode }) => {
  const [idPost, setIdPost] = useState<any[]>([]);
  const [url, setUrl] = useState<string>(`${process.env.REACT_APP_NEWS_URL}`);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  async function fetchIdPost(url: string) {
    await axios.get(url).then((response) => {
      setIdPost(response.data);
    });
  }

  useEffect(() => {
    setLoading(true);
    fetchIdPost(url);
    const timerId = setInterval(() => {
      fetchIdPost(url);
    }, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, [url]);

  if (!idPost) return null;

  return (
    <StoreContext.Provider
      value={{ idPost, url, setUrl, loading, setLoading, checked, setChecked }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreComponent;
