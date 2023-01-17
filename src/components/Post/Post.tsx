import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../store/store";
import { IComment, INewsItemType } from "../../utils/types";
import styles from "./Post.module.scss";
import logo from "../../image/logo.png";
import { converterDate } from "../../utils/converter";
import Comment from "../Comment/comment";

const Post = () => {
  const { loading, setLoading } = useContext(StoreContext);
  let params = useParams();
  let navigate = useNavigate();
  const [postItem, setPostItem] = useState<INewsItemType>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [show, setShow] = useState(false);

  async function fetchPost() {
    await axios.get(`${process.env.REACT_APP_ITEM_URL}${params.id}.json`).then(async (response) => {
      await setPostItem(response.data);
    });
  }

  const goBack = () => {
    navigate(-1);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  async function fetchComments() {
    setComments([]);
    postItem?.kids?.map((c) =>
      axios.get(`${process.env.REACT_APP_ITEM_URL}${c}.json`).then(async (response) => {
        await setComments((pos) => [...pos, response.data]);
      })
    );
  }

  const showComment = () => {
    setShow(true);
  };

  useEffect(() => {
    setLoading(true);
    fetchPost();
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    setLoading(true);
    fetchComments();
    setLoading(false);
  }, [show]);

  return (
    <section className={styles.post}>
      <div className={styles.navigation}>
        <Button variant="outlined" className={styles.button} onClick={goBack}>
          go back
        </Button>
        <p>Hacker News</p>
        <Button
          variant="outlined"
          onClick={() => {
            refreshPage();
          }}
        >
          refresh page
        </Button>
      </div>

      <Card className={styles.card}>
        <CardContent>
          <div className={styles.flex}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Hacker News"
                src={logo}
                sx={{ width: 40, height: 40 }}
              />
            </Stack>

            <div className={styles.infouser}>
              <div className={styles.username}>
                <NavLink
                  style={{ color: "#1976d2" }}
                  to={`/users/${postItem?.by}`}
                >
                  {postItem?.by}
                </NavLink>
              </div>
              <div className={styles.date}>{converterDate(postItem?.time)}</div>
            </div>
          </div>
          <Typography variant="h5">{postItem?.title}</Typography>
        </CardContent>

        <CardActions className={styles.links}>
          <Button size="medium">
            <Link href={postItem?.url}> 
                {postItem?.url ? <p>URL to the news</p> : <p>NO URL to the news</p>}
            </Link>
          </Button>
          <Button size="medium" onClick={showComment}>
            Comments :{postItem?.descendants}
          </Button>
        </CardActions>
      </Card>

      {show &&
        (loading ? (
          <Card className={styles.block1}>
            <div className={styles.textcomment}>Loading...</div>
          </Card>
        ) : !postItem?.kids ? (
          <Card className={styles.nocomment}>
            <div className={styles.textcomment}>There are no comments</div>
          </Card>
        ) : (
          comments.map((comment) => (
            <div className={styles.block1}>
              <Comment item={comment} level={1}/>
            </div>
          ))
        ))}
    </section>
  );
};
export default Post;
