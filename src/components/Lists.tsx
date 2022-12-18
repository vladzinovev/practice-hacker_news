import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/store";
import List from "./List";


const Lists=()=>{
    const Listing=[];
    const {posts}=useContext(StoreContext);

    /* for (const value of Object.entries(post)){
        console.log(value)
    } */
    const [post, setPost] = useState({'by':'','score':0,'time':0,'title':''});
    const [p,setP]=useState({});
    
    
    posts.map(po=>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${po}.json?print=pretty`)
        .then((response)=>{
            setPost(response.data)
            setP({...p,post})
            //setPost(pos=>({...pos, ...response.data}))
        })
    )
        
    
    Listing.push(post);

    return(
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
                {Listing.map((l,i) => (
                    <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{l.title}</TableCell>
                    <TableCell align="right">{l.by}</TableCell>
                    <TableCell align="right">{l.score}</TableCell>
                    <TableCell align="right">{l.time}</TableCell>
                </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default Lists;