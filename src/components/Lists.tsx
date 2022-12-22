import { Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/store";
import List from "./List";
import './lists.css';
import {converterDate} from '../utils/converter';
import { bestURL, newsURL } from "../variables/variables";

export interface INewsItemType {
    by: string,
    descendants: number,
    id: number,
    score: number,
    time: number,
    title?: string,
    type: string,
    url: string
}


const Lists=()=>{
    const {idPost,url,setUrl,loading,setLoading}=useContext(StoreContext);
    const [posts, setPosts]=useState<INewsItemType[]>([]);
    const [checked, setChecked] = useState(true);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(!checked){
            setUrl(newsURL);
        }
        else{
            setUrl(bestURL);
        }
    };
    
    

    async function fetchPosts(){
        setPosts([]);
        await idPost.map(async (m: number,length)=>{
            if(length<15){
                await axios.get(`https://hacker-news.firebaseio.com/v0/item/${m}.json`)
                .then(async (response)=>{
                    await setPosts(pos=>[...pos,response.data]) 
                })
            }
            
        }) 
    }
    

    useEffect( ()=>{
        fetchPosts();
        setLoading(false);
    } ,[idPost])

    
    

    return(
        <section className='lists'>
            <div className='switch'>
                <div>New Posts</div>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <div>Bests Posts</div>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name title</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    
                    {loading ? <div>loading</div> : (posts.map((l,i) => (
                        <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">{l.title}</TableCell>
                        <TableCell align="right">{l.by}</TableCell>
                        <TableCell align="right">{l.score}</TableCell>
                        <TableCell align="right">{converterDate(l.time)}</TableCell>
                    </TableRow>
                    )))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
        
    )
}
export default Lists;