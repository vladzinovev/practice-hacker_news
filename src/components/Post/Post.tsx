import { Button, Card, CardActionArea, CardActions, CardContent, Link, Typography} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {NavLink, useParams} from 'react-router-dom';
import { StoreContext } from "../../store/store";
import { INewsItemType } from "../../utils/types";
import './Post.css';


    /* 
    ссылку на новость                 (url)
    заголовок новости                 (title)
    дату                              (time)
    автора                            (by)
    счётчик количества комментариев   (descendants)
    список комментариев в виде дерева (kids) */

const Post=()=>{
    const {loading,setLoading}=useContext(StoreContext);
    let params = useParams();
    const [postItem, setPostItem]=useState<INewsItemType>();

    async function fetchPost(){
        await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`)
        .then(async (response)=>{
            await setPostItem(response.data); 
            console.log(response.data)
        })
    }
    useEffect(()=>{
        fetchPost();
        console.log(postItem)
    },[params.id])

    const refreshPage = ()=>{
        window.location.reload();
    }

    return(
        <section className='post'>
            <div className='navigation'>

                <Button variant="outlined"><NavLink className='navlink' to="/">go back</NavLink></Button>
                <p>Hacker News</p>
                <Button variant="outlined" onClick={()=>{refreshPage()}}>refresh page</Button>
                
            </div>

            
                <Card className="card">
                
                    <CardContent>
                    
                        <div className="flex">
                            
                            <Typography gutterBottom variant="h5" component="div">
                                {postItem?.by}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {postItem?.time}
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                        {postItem?.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small"><Link href={postItem?.url}>URL</Link></Button>
                        <Button size="small">Comments :{postItem?.descendants}</Button>
                    </CardActions>
                    <div className="comment">

                    </div>
                </Card>
            
            

        </section>
    )
}
export default Post;