import { Avatar, Button, Card,Stack,CardContent} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../../image/logo.png'
import { converterDate } from "../../utils/converter";
import { IUser } from "../../utils/types";
import {  userUrl } from "../../variables/variables";
import './User.css';

const User=()=>{
    let params = useParams();
    let navigate = useNavigate();
    const [user, setUser]=useState<IUser>();

    async function fetchUser(){
        await axios.get(`${userUrl}${params.by}.json`)
        .then(async (response)=>{
            await setUser(response.data);
            console.log(response.data)
        })
    }

    const goBack = () => {
        navigate(-1);
    };

    const refreshPage = ()=>{
        window.location.reload();
    }

    useEffect(()=>{
        fetchUser();
    },[params.by]);

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
        </section>
    )
}
export default User;