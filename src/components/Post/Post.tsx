import { Button, Card, CardActionArea, CardActions, CardContent, Link, Typography} from "@mui/material";
import {NavLink, useParams} from 'react-router-dom';


    /* 
    ссылку на новость                 (url)
    заголовок новости                 (title)
    дату                              (time)
    автора                            (by)
    счётчик количества комментариев   (descendants)
    список комментариев в виде дерева (kids) */

const Post=()=>{
    let params = useParams();
    const refreshPage = ()=>{
        window.location.reload();
    }

    return(
        <section className='posts'>
            <div className='navigation'>
                <Button variant="outlined" onClick={()=>{refreshPage()}}>refresh page</Button>
                <Button variant="outlined"><NavLink to="/">go back</NavLink></Button>

                
            </div>
            <Link href="https://www.forbes.com/sites/emilybaker-white/2022/12/22/tiktok-tracks-forbes-journalists-bytedance/">URL</Link>
            <a href="https://www.forbes.com/sites/emilybaker-white/2022/12/22/tiktok-tracks-forbes-journalists-bytedance/">URL{params.url}</a>

            <Card className="card">
                <CardContent>
                    <div className="flex">
                        <Typography gutterBottom variant="h5" component="div">
                            {params.id}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {params.time}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                    {params.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={params.url}>URL{params.url}</a>
                    <Button size="small"><a href={params.url}>URL{params.url}</a></Button>
                    <Button size="small">Comments :{/* {descendants} */}</Button>
                </CardActions>
                <div className="comment">

                </div>
            </Card>

        </section>
    )
}
export default Post;