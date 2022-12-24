import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, Link, Stack, Typography} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {NavLink, useParams} from 'react-router-dom';
import { StoreContext } from "../../store/store";
import { IComment, INewsItemType } from "../../utils/types";
import './Post.css';
import logo from '../../image/logo.png'
import { converterDate } from "../../utils/converter";


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
    const [comments,setComments]=useState<IComment[]>([]);
    const [show,setShow]=useState(false);

    async function fetchPost(){
        await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`)
        .then(async (response)=>{
            await setPostItem(response.data); 
            console.log(response.data)
        })
    }
    

    const refreshPage = ()=>{
        window.location.reload();
    }

    async function fetchComments(){
        postItem?.kids?.map((c,i)=>(
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${c}.json`)
            .then(async (response)=>{
                await setComments(pos=>[...pos,response.data]);
                console.log(response.data)
            })
        ))
        
    }
    const showComment=()=>{
        setShow(prevShow=>!prevShow);
    }

    useEffect(()=>{
        fetchPost();
        fetchComments();
    },[params.id]);

    useEffect(()=>{
        
        fetchComments();
    },[show]);


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
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt="Hacker News"
                                src={logo}
                                sx={{ width: 40, height: 40 }}
                            />
                        </Stack>
                        
                        <div className="infouser">
                            <p className="username">
                                <NavLink style={{color: '#1976d2'}} to={`/userid/${postItem?.by}`}>
                                    {postItem?.by}
                                </NavLink>
                            </p>
                            <p className="date">{converterDate(postItem?.time)}</p>
                        </div>
                        
                    </div>
                    <Typography variant="h5" >
                        {postItem?.title}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="medium"><Link href={postItem?.url}>URL</Link></Button>
                    <Button size="medium" onClick={()=>showComment()}>Comments :{postItem?.descendants}</Button>
                </CardActions>

            </Card>
            {show && 
                (!postItem?.kids ? (
                    <Card>
                        <div>There are no comments</div>
                    </Card> 
                ): comments.map((c,i)=>(
                    <Card className="comments">
                        <div className="comment">
                            <p>{c.text}</p>
                            <div>
                                <p>{c.by}</p>
                                <p>{converterDate(c.time)}</p>
                            </div>
                        </div>
                    </Card>
                ))
                )
            }
            
            
            
            
            

        </section>
    )
}
export default Post;