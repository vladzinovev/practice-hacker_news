import { Avatar, Button, Card,Stack, CardActions, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from '../../image/logo.png'
import { IUser } from "../../utils/types";

const User=()=>{
    let params = useParams();
    let navigate = useNavigate();

    const [user, setUser]=useState<IUser>();
    const [show,setShow]=useState(false);

    async function fetchUser(){
        await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.by}.json`)
        .then(async (response)=>{
            await setUser(response.data);
        })
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
    return(
        
        <section className='user'>
            <div className='navigation'>

                <Button variant="outlined" onClick={goBack}>go back</Button>
                <p>Hacker News</p>
                <Button variant="outlined" onClick={()=>{refreshPage()}}>refresh page</Button>
                
            </div>

            <Card>
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
                                <p style={{color: '#1976d2'}}>{params.by}</p>
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
                    <Button size="medium" onClick={(e)=>showComment(e)}>{} comments by {}</Button>
                </CardActions>
            </Card>
        </section>
        
    )
}
export default User;