import axios from "axios";
import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { newsURL } from "../variables/variables";

interface IStoreContext{
    idPost:any[],
    url:string,
    setUrl:any,
    loading:boolean, 
    setLoading:any,
    checked:boolean, 
    setChecked:any,
}

export const StoreContext=createContext<IStoreContext>({
    idPost: [],
    url: '',
    setUrl: undefined,
    loading: false,
    setLoading: undefined,
    checked:true, 
    setChecked:undefined
})

const StoreComponent=({children}:{children:ReactNode})=>{
    const [idPost, setIdPost] = useState<any[]>([]);
    const [url,setUrl]=useState<string>(newsURL);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    
    async function fetchIdPost(url: string){
        await axios.get(url).then((response) => {
            setIdPost(response.data);
        });
    }

    useEffect(() => {
        setLoading(true);
        fetchIdPost(url);
        const timerId =setInterval(()=>{
            fetchIdPost(url);
        }, 60000);
        return () => {
            clearInterval(timerId);
        } 
    }, [url]);

    if (!idPost) return null;

    return (
        <StoreContext.Provider value={{idPost,url,setUrl,loading,setLoading,checked,setChecked}}>
            {children}
        </StoreContext.Provider>
  )
}
export default StoreComponent;