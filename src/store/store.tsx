import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import news from "./news";
import novelty from "./novelty";

const baseURL='https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'

interface IStoreContext{
    posts:any[]
}

export const StoreContext=createContext<IStoreContext>({
    posts:[]
})

const StoreComponent=({children}:{children:ReactNode})=>{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setPosts(response.data);
        });
    }, []);

    if (!posts) return null;

  return (
    <StoreContext.Provider value={{posts}}>
        {children}
    </StoreContext.Provider>
  )
}
export default StoreComponent;