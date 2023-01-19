import { Avatar, Button, Card, Stack, CardContent } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../image/logo.png";
import { converterDate } from "../../utils/converter";
import { IUser } from "../../utils/types";
import styles from "./User.module.scss";

import { fetchPost } from "../../utils/fetch";
import { StoreContext } from "../../store/store";
import Error from "../Error/Error";

const User = () => {

    const [loading, setLoading] = useState(false);
  let params = useParams();
  let navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    setLoading(true);
    fetchPost(
      `${process.env.REACT_APP_USER_URL}${params.by}.json`,
      setUser,
      setError,
      setErrorMessage
    );
    setLoading(false);
  }, [params.by]);

  return (
    <section className={styles.user}>
      <div className={styles.navigation}>
        <Button variant="outlined" onClick={goBack}>
          go back
        </Button>
        <p>Hacker News</p>
        <Button variant="outlined" onClick={refreshPage}>
          refresh page
        </Button>
      </div>

      {loading ? (
        <div>loading...</div>
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
                <p className={styles.username}>{params.by}</p>
              </div>
            </div>
            <div className={styles.aboutuser}>
              <p>
                Creation date of the user, in Unix Time:{" "}
                {converterDate(user?.created)}
              </p>
              <p>The user's karma: {user?.karma}</p>
              {!user?.about ? (
                <div>no Self-description of the user</div>
              ) : (
                <div>
                  The user's self-description:{" "}
                  <a href={user?.about}>{user?.about}</a>
                </div>
              )}
              <p>
                {user?.submitted.length} stories, polls and comments by{" "}
                {params.by}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
export default User;
