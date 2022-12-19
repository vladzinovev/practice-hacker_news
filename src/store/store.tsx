import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";


const newsURL='https://hacker-news.firebaseio.com/v0/newstories.json';


interface IStoreContext{
    posts:any[],
    post:{
        'by':string,
        'descendants' : number,
        'id':number,
        'kids':any[] | null,
        'score':number,
        'time':number,
        'title':string,
        'type':string,
        'url':string
    }
}


export const StoreContext=createContext<IStoreContext>({
    posts:[],
    post:{
        'by':'',
        'descendants' : 0,
        'id':1,
        'kids':[0],
        'score':0,
        'time':0,
        'title':'',
        'type':'',
        'url':''
    } 
})

const StoreComponent=({children}:{children:ReactNode})=>{
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(
        {
            'by':'',
            'descendants':0,
            'id':1,
            'kids':[0],
            'score':0,
            'time':0,
            'title':'',
            'type':'',
            'url':''
        }
    );

    
    axios.get(newsURL).then((response) => {
        setPosts(response.data);
    });
    

    /* useEffect(()=>{
        posts.map(p=>
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${p}.json?print=pretty`)
            .then((response)=>{
                setPost({...post,...response.data})
            })
        )
    }) */

    if (!posts) return null;

  return (
    <StoreContext.Provider value={{posts,post}}>
        {children}
    </StoreContext.Provider>
  )
}
export default StoreComponent;