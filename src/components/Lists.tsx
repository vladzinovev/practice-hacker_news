import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/store";
import List from "./List";
import './lists.css';
import {converterDate} from '../utils/converter';

const newsURL='https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

export interface NewsItemType {
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
    const {idPost}=useContext(StoreContext);
    const [posts, setPosts]=useState([])
    
    
    const [loading, setLoading] = useState(false);
    

    const [arr, setArr] = useState<any[]>([
        {
            by: "cf100clunk",
            descendants:2,
            title:'sssds',
            id:34054830,
            score:6,
            time: 34055211
        },
        {
            by: "afsfsdgfsdunk",
            descendants:3,
            title:'afaffaf',
            id:2345345345,
            score:8,
            time:242431
        }

    ]);
    

    async function fetchPosts(){
        await idPost.map(async (m: number)=>{
            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${m}.json`)
                .then(async (response)=>{
                    await setArr(pos=>[...pos,response.data]) 
                })
        }) 
    }
    

    useEffect( ()=>{
        console.log('true')
        /* const fetchNotes = async () => {
            await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
                .then((response) => response.json())
                .then((data) => {
                    const dat=data;
                    setNotes(dat);
                })
                .catch((error) => {
                    console.log(error);
                });
            };
        fetchNotes();   */
        
        
        /* async function fetchPosts(){
            
            await axios.get(newsURL).then((response) => {
                const dat=response.data;
                setPosts(dat);
            }).catch((error) => {
                console.error(error);
            });
            
        }
        fetchPosts(); */
        



        /* const fetchArr = async() => {
            await notes.map(async note=>await fetch(`https://hacker-news.firebaseio.com/v0/item/${note}.json?print=pretty`)
                .then((response) => response.json())
                .then((data) => {
                    const dat=data;
                    setArr(pos=>[...pos,dat]);
                })
                .catch((error) => {
                    console.log(error);
                })
            )}; */
        /* fetchArr();
        console.log(mass)
        console.log(notes)
        console.log(posts) */
    } ,[])

    useEffect( ()=>{
       /*  const fetchArr = async() => {
            await posts.map(async note=>await fetch(`https://hacker-news.firebaseio.com/v0/item/${note}.json?print=pretty`)
                .then((response) => response.json())
                .then((data) => {
                    const dat=data;
                    setArr(pos=>[...pos,dat]);
                })
                .catch((error) => {
                    console.log(error);
                })
            )};
        fetchArr(); */
        fetchPosts();
    } ,[idPost])

    
    

    return(
        <section className='lists'>
            
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
                    
                    {loading ? <div>loading</div> : (arr.map((l,i) => (
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