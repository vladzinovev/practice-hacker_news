import { Avatar, Button, Card, CardActions, CardContent, Link, Stack, Typography} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import { StoreContext } from "../../store/store";
import { IComment, INewsItemType } from "../../utils/types";
import './Post.css';
import logo from '../../image/logo.png'
import { converterDate } from "../../utils/converter";
import Comment from '../Comment/comment'
import { itemUrl } from "../../variables/variables";


const Post=()=>{
    const {loading,setLoading}=useContext(StoreContext);
    let params = useParams();
    let navigate = useNavigate();
    const [postItem, setPostItem]=useState<INewsItemType>();
    const [comments,setComments]=useState<IComment[]>([]);
    const [show,setShow]=useState(false);

    async function fetchPost(){
        await axios.get(`${itemUrl}${params.id}.json`)
        .then(async (response)=>{
            await setPostItem(response.data); 
            console.log(response.data)
        })
    }
    
    const goBack = () => {
        navigate(-1);
    };

    const refreshPage = ()=>{
        window.location.reload();
    }

    async function fetchComments(){
        setComments([]);
        postItem?.kids?.map((c,i)=>(
            axios.get(`${itemUrl}${c}.json`)
            .then(async (response)=>{
                await setComments(pos=>[...pos,response.data]);
            })
        ))  
    }

    const showComment=()=>{
        setShow(true);
    }

    useEffect(()=>{
        setLoading(true);
        fetchPost();
        setLoading(false);
    },[params.id]);

    useEffect(()=>{
        setLoading(true);
        fetchComments();
        setLoading(false);
    },[show]);


    return(
        <section className='post'>
            <div className='navigation'>
                <Button variant="outlined" className='button' onClick={goBack}>go back</Button>
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
                    <Button size="medium"><Link href={postItem?.url}>{ postItem?.url ? <p>URL</p> : <p>NO URL</p> }</Link></Button>
                    <Button size="medium" onClick={()=>showComment()}>Comments :{postItem?.descendants}</Button>
                </CardActions>
            </Card>

            {show && 
                (loading ? (
                    <Card className="block1">
                        <div className="textcomment">Loading...</div>
                    </Card>
                ):(
                    !postItem?.kids ? (
                        <Card className="nocomment">
                            <div className="textcomment">There are no comments</div>
                        </Card> 
                    ): (
                        comments.map((c,i)=>(
                        <div className="block1">
                            <Comment by={c.by} id={c.id} parent={c.parent} kids={c?.kids} text={c.text} time={c.time} type={c.type}/>
                        </div>
                    )))
                )
                )
            }
        </section>
    )
}
export default Post;