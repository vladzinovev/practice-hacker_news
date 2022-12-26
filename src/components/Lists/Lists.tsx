import { Button, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store";
import './lists.css';
import { bestURL, itemUrl, newsURL } from "../../variables/variables";
import List from "./List";
import { INewsItemType } from "../../utils/types";

const Lists=()=>{
    const {idPost,setUrl,loading,setLoading,checked,setChecked}=useContext(StoreContext);
    const [posts, setPosts]=useState<INewsItemType[]>([]);
    const [click,setClick]=useState<number>(1);
    
    const handleChange = () => {
        setChecked(!checked);
        if(!checked){
            setLoading(true);
            setUrl(newsURL);
        }
        else{
            setLoading(true);
            setUrl(bestURL);
        }
    };
    
    async function fetchPosts(click:number){
        const max=21*click;
        const min=max-21;
        setPosts([]);
        await idPost.map(async (m: number,length)=>{
            if(length>min && length<max){
                await axios.get(`${itemUrl}${m}.json`)
                .then(async (response)=>{
                    await setPosts(pos=>[...pos,response.data])
                    
                })
            }
        }) 
    }

    const refreshPage = ()=>{
        window.location.reload();
    }

    useEffect( ()=>{
        fetchPosts(click);
        setLoading(false);
        console.log(posts);

    } ,[idPost,click])
    
    return(
        <section className='lists'>
            <div className='navigation'>

                <div className='switch'>
                    <div>Bests Posts</div>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <div>New Posts</div>
                </div>
                <p>Hacker News</p>
                <Button variant="outlined" onClick={()=>{refreshPage()}}>refresh page</Button>
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
                    {loading ? <div>Loading...</div> : (posts.map((l,i) => (
                        <List 
                            by={l.by} 
                            descendants={l.descendants} 
                            id={l.id} 
                            score={l.score} 
                            time={l.time} 
                            type={l.type} 
                            url={l.url} 
                            key={l.id} 
                            title={l.title}
                        />
                    )))} 
                    
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="footer">
                {click===1 ? <Button className="footerbutton" disabled variant="outlined" onClick={()=>{setClick(click-1)}}>previousPage</Button> : <Button className="footerbutton" variant="outlined" onClick={()=>{setClick(click-1)}}>previous Page</Button>}
                <div>Design by Vlad</div>
                {posts.length<20 ? <Button className="footerbutton" disabled variant="outlined" onClick={()=>{setClick(click+1)}}>next Page</Button> : <Button className="footerbutton" variant="outlined" onClick={()=>{setClick(click+1)}}>next Page</Button>}  
            </div>
        </section>
    )
}
export default Lists;