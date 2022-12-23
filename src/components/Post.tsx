import { Button, Card, CardActionArea, CardActions, CardContent, Link, Typography} from "@mui/material";
import {NavLink} from 'react-router-dom';
const Post=()=>{

    return(
        <section className='posts'>
            <div className='navigation'>
                
                <Button variant="outlined"><NavLink to="/">go back</NavLink></Button>

                
            </div>

            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <div className="flex">
                        <Typography gutterBottom variant="h5" component="div">
                            {/* {by} */}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {/* {time} */}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                    {/* {title} */}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{/* {url} */}</Button>
                    <Button size="small">Comments :{/* {descendants} */}</Button>
                </CardActions>
                <div className="comment">

                </div>
            </Card>

        </section>
    )
}
export default Post;