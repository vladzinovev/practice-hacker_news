import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Paper,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { StoreContext } from "../../store/store";
import ListItem from "./ListItem";
import { INewsItemType } from "../../utils/types";
import Error from "../Error/Error";
import styles from "./lists.module.scss";

const Lists = () => {
  const { idPost, setUrl, checked, setChecked, setTimerOn, load, setLoad } =
    useContext(StoreContext);
  const [posts, setPosts] = useState<INewsItemType[]>([]);
  const [click, setClick] = useState<number>(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    setLoading(true);
    checked
      ? setUrl(`${process.env.REACT_APP_BEST_URL}`)
      : setUrl(`${process.env.REACT_APP_NEWS_URL}`);
  };

  async function fetchPosts(click: number) {
    setLoading(true);
    const max = 21 * click;
    const min = max - 21;
    setPosts([]);
    if (click === 1) {
      setTimerOn(true);
    }
    const ids = idPost.slice(min, max);
    await ids.map(async (id: INewsItemType) => {
      await axios
        .get(`${process.env.REACT_APP_ITEM_URL}${id}.json`)
        .then((response) => {
          setPosts((pos) => [...pos, response.data]);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        });
    });
  }

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchPosts(click);
    setLoading(false);
    setLoad(false);
  }, [idPost, click]);

  return (
    <section className={styles.lists}>
      <div className={styles.navigation}>
        <div className={styles.switch}>
          <div>Bests Posts</div>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <div>New Posts</div>
        </div>
        <p className={styles.header}>Hacker News</p>
        <Button variant="outlined" onClick={refreshPage}>
          refresh page
        </Button>
      </div>

      <TableContainer className={styles.news} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.text1}>Name title</TableCell>
              <TableCell className={styles.text} align="right">
                Username
              </TableCell>
              <TableCell className={styles.text} align="right">
                Rating
              </TableCell>
              <TableCell className={styles.text} align="right">
                Date
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {load || loading ? (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Skeleton width="45vw">
                    <Typography>.</Typography>
                  </Skeleton>
                </TableCell>
                <TableCell align="right">
                  <Skeleton width="7vw">
                    <Typography>.</Typography>
                  </Skeleton>
                </TableCell>

                <TableCell align="right">
                  <Skeleton width="6vw">
                    <Typography>.</Typography>
                  </Skeleton>
                </TableCell>
                <TableCell align="right">
                  <Skeleton width="10vw">
                    <Typography>.</Typography>
                  </Skeleton>
                </TableCell>
              </TableRow>
            ) : error ? (
              <Error errorMessage={errorMessage} />
            ) : (
              posts.map((post) => <ListItem item={post} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.footer}>
        <Button
          className={styles.footerbutton}
          disabled={click === 1 ? true : false}
          variant="outlined"
          onClick={() => {
            setClick(click - 1);
            setTimerOn(false);
          }}
        >
          previous Page
        </Button>
        <div>Design by Vlad</div>
        <Button
          className={styles.footerbutton}
          disabled={posts.length < 20 ? true : false}
          variant="outlined"
          onClick={() => {
            setClick(click + 1);
            setTimerOn(false);
          }}
        >
          next Page
        </Button>
      </div>
    </section>
  );
};
export default Lists;
