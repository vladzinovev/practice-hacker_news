import axios from "axios";
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
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  setTimerOff:Dispatch<SetStateAction<boolean>>;
}

export const StoreContext = createContext<IStoreContext>({
  idPost: [],
  setIdPost: () => {},
  url: "",
  setUrl: () => {},
  loading: false,
  setLoading: () => {},
  checked: true,
  setChecked: () => {},
  setTimerOff:() => {},
});

const StoreComponent = ({ children }: { children: ReactNode }) => {
  const [idPost, setIdPost] = useState<INewsItemType[]>([]);
  const [url, setUrl] = useState<string>(`${process.env.REACT_APP_NEWS_URL}`);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [timerOff, setTimerOff] = useState(true);
  const timer=useRef<NodeJS.Timeout>();;


  useEffect(() => {
    setLoading(true);
    fetchPost(url, setIdPost);
    timer.current = setInterval(() => {
        fetchPost(url, setIdPost);
      }, 6000);
    return () => {
      clearInterval(timer.current);
    };
  }, [url]);

  useEffect(() => {
    if(!timerOff){
        clearInterval(timer.current);
        console.log('timeroff');
    }
    console.log('timer');
    
  }, [timerOff]);

  if (!idPost) return null;

  return (
    <StoreContext.Provider
      value={{
        idPost,
        setIdPost,
        url,
        setUrl,
        loading,
        setLoading,
        checked,
        setChecked,
        setTimerOff
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreComponent;
