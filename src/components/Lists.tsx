import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/store";
import List from "./List";

export interface NewsItemType {
    by: string,
    descendants: number,
    id: number,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}


const Lists=()=>{
    const {posts}=useContext(StoreContext);

    
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    

    const [arr, setArr] = useState([
        {
            by: "cf100clunk",
            descendants:2,
            title:'sssds',
            id:34054830,
            score:6,
            time:[34055503, 34055211]
        },
        {
            by: "afsfsdgfsdunk",
            descendants:3,
            title:'afaffaf',
            id:2345345345,
            score:8,
            time:[24324503, 242431]
        }

    ]);

    const mass=[34031408,34054249,34054231,34054212,34054211,34054170,34054156,34054146]

    /* const fetchNews=()=>{
        mass.map(async m=>{
            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${m}.json`)
                .then((response)=>{
                    console.log(response.data);
                    setArr([...arr,response.data])
                })
        })
    } */
    /* mass.map(async m=>{
        await axios.get(`https://hacker-news.firebaseio.com/v0/item/${m}.json`)
            .then((response)=>{
                //console.log(response.data);
                setArr([...arr,response.data])
            })
    })
    console.log(arr) */

    
    
    
    
    /* posts.map((po:number)=>{
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${po}.json`)
            .then((response)=>{
                console.log(response.data);
                //setPost(p)
                //console.log(post)
                //setPost(pos=>(...pos, response.data))
            })
            
        }
    ) */
    

    function fetchNews(){
        posts.map(m=>{
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${m}.json`)
                .then((response)=>{
                    //console.log(response.data);
                    setArr(pos=>[...pos,response.data])
                    
                })
        })
       
    }

    useEffect(()=>{
        console.log('Hello')
        setLoading(true);
        fetchNews();
        setLoading(false);
        console.log(arr)
    } ,[])
    

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
                {arr.length<=5? <p>"loading"</p>: arr.map((l,i) => (
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