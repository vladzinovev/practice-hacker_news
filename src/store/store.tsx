import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";


export const newsURL='https://hacker-news.firebaseio.com/v0/newstories.json';

interface IStoreContext{
    idPost:any[],
}


export const StoreContext=createContext<IStoreContext>({
    idPost:[],
    
})

const StoreComponent=({children}:{children:ReactNode})=>{
    const [idPost, setIdPost] = useState<any[]>([]);
    const [url,setUrl]=useState(newsURL);
    

    async function fetchIdPost(url: string){
        await axios.get(url).then((response) => {
            setIdPost(response.data);
        });
    }

    useEffect(() => {
        fetchIdPost(url)
    }, []);

    if (!idPost) return null;

  return (
    <StoreContext.Provider value={{idPost}}>
        {children}
    </StoreContext.Provider>
  )
}
export default StoreComponent;