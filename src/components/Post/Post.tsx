import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { IComment, INewsItemType } from "../../utils/types";
import { converterDate } from "../../utils/converter";
import Comment from "../Comment/comment";
import { fetchPost } from "../../utils/fetch";
import Error from "../Error/Error";
import logo from "../../image/logo.png";
import styles from "./Post.module.scss";

const Post = () => {
  const [loading, setLoading] = useState(false);
  let params = useParams();
  let navigate = useNavigate();
  const [postItem, setPostItem] = useState<INewsItemType>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  async function fetchComments() {
    setComments([]);
    postItem?.kids?.map((c) =>
      axios
        .get(`${process.env.REACT_APP_ITEM_URL}${c}.json`)
        .then(async (response) => {
          await setComments((pos) => [...pos, response.data]);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        })
    );
  }

  const showComment = () => {
    setShow(true);
  };

  useEffect(() => {
    setLoading(true);
    fetchPost(
      `${process.env.REACT_APP_ITEM_URL}${params.id}.json`,
      setPostItem,
      setError,
      setErrorMessage
    );
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    /* const items = JSON.parse(localStorage.getItem("comment")|| '');
    if (items) {
        setShow(items);
    }  */
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

      {loading ? (
        <Card className={styles.card}>
          <CardContent>
            <div className={styles.flex}>
              <Stack direction="row" spacing={2}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </Stack>

              <div className={styles.infouser}>
                <div className={styles.username}>
                  <Skeleton width="100px">
                    <Typography className={styles.link}>.</Typography>
                  </Skeleton>
                </div>
                <div className={styles.date}>
                  <Skeleton width="100px">
                    <Typography>.</Typography>
                  </Skeleton>
                </div>
              </div>
            </div>
            <Skeleton width="100%">
              <Typography variant="h5">.</Typography>
            </Skeleton>
          </CardContent>

          <CardActions className={styles.links}>
            <Button size="medium">
              <Skeleton width="100px">
                <Typography>.</Typography>
              </Skeleton>
            </Button>
            <Button size="medium">
              <Skeleton width="100px">
                <Typography>.</Typography>
              </Skeleton>
            </Button>
          </CardActions>
        </Card>
      ) : error ? (
        <Error errorMessage={errorMessage} />
      ) : (
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
                    className={styles.link}
                    to={`/users/${postItem?.by}`}
                  >
                    {postItem?.by}
                  </NavLink>
                </div>
                <div className={styles.date}>
                  {converterDate(postItem?.time)}
                </div>
              </div>
            </div>
            <Typography variant="h5">{postItem?.title}</Typography>
          </CardContent>

          <CardActions className={styles.links}>
            <Button size="medium">
              <Link href={postItem?.url}>
                {postItem?.url ? (
                  <p>URL to the news</p>
                ) : (
                  <p>NO URL to the news</p>
                )}
              </Link>
            </Button>
            <Button size="medium" onClick={showComment}>
              Comments :{postItem?.descendants}
            </Button>
          </CardActions>
        </Card>
      )}

      {show &&
        (loading ? (
          <Card className={styles.block1}>
            <div className={styles.textcomment}>Loading...</div>
          </Card>
        ) : error ? (
          <Error errorMessage={errorMessage} />
        ) : postItem?.kids ? (
          comments.map((comment) => (
            <div className={styles.block1}>
              <Comment item={comment} level={1} />
            </div>
          ))
        ) : (
          <Card className={styles.nocomment}>
            <div className={styles.textcomment}>There are no comments</div>
          </Card>
        ))}
    </section>
  );
};
export default Post;
