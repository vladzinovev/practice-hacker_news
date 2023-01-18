import {
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store";
import styles from "./lists.module.scss";
import ListItem from "./ListItem";
import { INewsItemType } from "../../utils/types";
import Error from "../Error/Error";

const Lists = () => {
  const {
    idPost,
    setUrl,
    loading,
    setLoading,
    checked,
    setChecked,
    setTimerOn
  } = useContext(StoreContext);
  const [posts, setPosts] = useState<INewsItemType[]>([]);
  const [click, setClick] = useState<number>(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = () => {
    setChecked(!checked);
    setLoading(true);
    checked
      ? setUrl(`${process.env.REACT_APP_BEST_URL}`)
      : setUrl(`${process.env.REACT_APP_NEWS_URL}`);
  };

  async function fetchPosts(click: number) {
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
    console.log("упешно");
    fetchPosts(click);
    setLoading(false);
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
        <p>Hacker News</p>
        <Button variant="outlined" onClick={refreshPage}>
          refresh page
        </Button>
      </div>

      <TableContainer className={styles.news} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.text}>Name title</TableCell>
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
            {loading ? (
              <div>Loading...</div>
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
