import { Avatar, Button, Card,Stack, CardActions, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import logo from '../../image/logo.png'
import { converterDate } from "../../utils/converter";
import { IComment, IUser } from "../../utils/types";
import Comment from '../Comment/comment'
import './User.css';

const User=()=>{
    let params = useParams();
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser]=useState<IUser>();
    const [show,setShow]=useState(false);
    const [comments,setComments]=useState<IComment[]>([]);

    async function fetchUser(){
        await axios.get(`https://hacker-news.firebaseio.com/v0/user/${params.by}.json`)
        .then(async (response)=>{
            await setUser(response.data);
            console.log(response.data)
        })
    }
    async function fetchComments(){
        setComments([]);
        user?.submitted?.map((c,i)=>(
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${c}.json`)
            .then(async (response)=>{
                await setComments(pos=>[...pos,response.data]);
            })
        ))  
    }

    const showComment=(e:any)=>{
        e.preventDefault()
        setShow(true);
    }

    const goBack = () => {
        navigate(-1);
    };
    const refreshPage = ()=>{
        window.location.reload();
    }

    useEffect(()=>{
        fetchUser();
        fetchComments();
    },[params.by]);

    useEffect(()=>{
        setLoading(true);
        fetchComments();
        setLoading(false);
    },[show]);

    return(
        
        <section className='user'>
            <div className='navigation'>

                <Button variant="outlined" onClick={goBack}>go back</Button>
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
                            <p className="username">{params.by}</p>
                        </div>
                        
                    </div>
                    <div className="aboutuser">
                        
                        <p>Creation date of the user, in Unix Time: {converterDate(user?.created)}</p>
                        <p>The user's karma: {user?.karma}</p>
                        {!user?.about ? <div>no Self-description of the user</div> : <div>The user's self-description:<a href={user?.about}>{user?.about}</a></div>}
                        <p>{user?.submitted.length} stories, polls and comments by {params.by}</p>
                        
                    </div>
                </CardContent>


            </Card>
            {show && 
                (loading ? (
                    <Card className="block1">
                        <div className="textcomment">Loading</div>
                    </Card>
                ):(
                    !user?.submitted ? (
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
export default User;