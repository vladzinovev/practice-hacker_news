import { Button, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/store";

import './lists.css';
import { bestURL, newsURL } from "../variables/variables";
import { converterDate } from "../utils/converter";

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
            setLoading(true);
            setUrl(newsURL);
        }
        else{
            setLoading(true);
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
    const showMore=()=>{

    } 

    const refreshPage = ()=>{
        window.location.reload();
    }
    

    useEffect( ()=>{
        fetchPosts();
        setLoading(false);
        
    } ,[idPost])

    const onClickRow = (l: INewsItemType) => {
        
    };
    

    return(
        <section className='lists'>
            <div className='navigation'>
                
                <Button variant="outlined" >refresh page</Button>

                <div className='switch'>
                    <div>Bests Posts</div>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <div>New Posts</div>
                </div>
                
            </div>

            <TableContainer className="news" component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell className="text">Name title</TableCell>
                            <TableCell className="text" align="right">Username</TableCell>
                            <TableCell className="text" align="right">Rating</TableCell>
                            <TableCell className="text" align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    {/* {loading ? <div>loading</div> : (posts.map((l,i) => (
                        <List 
                            
                            by={l.by} 
                            descendants={l.descendants} 
                            id={l.id} 
                            score={l.score} 
                            time={l.time} 
                            type={l.type} 
                            url={l.url} 
                            key={i} 
                            title={l.title}
                        />
                    )))} */}
                    {loading ? <div>loading</div> : (posts.map((l,i) => (
                        <TableRow
                            key={l.id}
                            onClick={()=>onClickRow(l)}
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

            <Button className="footerbutton" variant="outlined" onClick={()=>{}}>more</Button>
        </section>
        
    )
}
export default Lists;