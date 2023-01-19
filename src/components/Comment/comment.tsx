import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button } from "@mui/material";
import axios from "axios";

import { converterDate } from "../../utils/converter";
import { AllComment, IComment } from "../../utils/types";
import Error from "../Error/Error";
import styles from "./Comment.module.scss";

const Comment = ({ item, level = 1 }: AllComment) => {
  const [clickSize, setClickSize] = useState<number>(level);
  const [kid, setKid] = useState<IComment[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchComments() {
    setKid([]);

    item.kids?.map((c) =>
      axios
        .get(`${process.env.REACT_APP_ITEM_URL}${c}.json`)
        .then(async (response) => {
          await setKid((pos) => [...pos, response.data]);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        })
    );
  }

  const showComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShow((prevShow) => !prevShow);

    !show ? setClickSize(clickSize + 1) : setClickSize(clickSize - 1);
  };

  useEffect(() => {
    setLoading(true);
    fetchComments();
    setLoading(false);
  }, []);

  return (
    <section className={styles.comment}>
      {loading ? (
        <div>
          <Card className={styles.loading}>
            <div className={styles.textcomment}>Loading</div>
          </Card>
        </div>
      ) : error ? (
        <Error errorMessage={errorMessage} />
      ) : (
        <div>
          <Card className={styles.comments}>
            <div className={styles.ccomment}>
              <div className={styles.flex}>
                <p className={styles.cusername}>
                  <NavLink className={styles.link} to={`/users/${item.by}`}>
                    {item.by}
                  </NavLink>
                </p>
                <p className={styles.cdate}>{converterDate(item.time)}</p>
              </div>
              <div
                className={styles.ctext}
                dangerouslySetInnerHTML={{ __html: item.text }}
              ></div>
            </div>
          </Card>

          {kid.length > 0 && (
            <Button
              size="medium"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                showComment(e)
              }
            >
              View the answer
            </Button>
          )}

          {show &&
            (loading ? (
              <div>
                <Card className={styles.loading}>
                  <div className={styles.textcomment}>Loading...</div>
                </Card>
              </div>
            ) : error ? (
              <Error errorMessage={errorMessage} />
            ) : (
              kid?.map((k) => (
                <div
                  className={clickSize > 20 ? styles.no_margin : styles.margin}
                >
                  <Comment item={k} level={clickSize} />
                </div>
              ))
            ))}
        </div>
      )}
    </section>
  );
};
export default Comment;
