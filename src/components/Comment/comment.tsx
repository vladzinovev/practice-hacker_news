import { Card, Button } from "@mui/material";
import { converterDate } from "../../utils/converter";
import { NavLink } from "react-router-dom";
import { AllComment, IComment } from "../../utils/types";
import "./Comment.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../store/store";
import { itemUrl } from "../../variables/variables";

const Comment = ({ item }: AllComment) => {
  const [kid, setKid] = useState<IComment[]>([]);
  const { loading, setLoading } = useContext(StoreContext);
  const [show, setShow] = useState(false);

  async function fetchComments() {
    setKid([]);

    item.kids?.map((c) =>
      axios.get(`${itemUrl}${c}.json`).then(async (response) => {
        await setKid((pos) => [...pos, response.data]);
      })
    );
  }

  const showComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShow((prevShow) => !prevShow);
  };

  useEffect(() => {
    setLoading(true);
    fetchComments();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ margin: "20px 0 0 100px" }}>
          <Card className="loading">
            <div className="textcomment">Loading</div>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="comments" style={{ margin: "20px 0 0 50px" }}>
            <div className="comment">
              <div
                className="ctext"
                dangerouslySetInnerHTML={{ __html: item.text }}
              ></div>
              <div className="flex">
                <p className="cusername">
                  <NavLink
                    style={{ color: "#1976d2" }}
                    to={`/users/${item.by}`}
                  >
                    {item.by}
                  </NavLink>
                </p>
                <p className="cdate">{converterDate(item.time)}</p>
              </div>
            </div>
          </Card>

          {kid.length > 0 && (
            <Button size="medium" onClick={(e) => showComment(e)}>
              View the answer
            </Button>
          )}

          {show &&
            (loading ? (
              <div style={{ margin: "20px 0 0 100px" }}>
                <Card className="loading">
                  <div className="textcomment">Loading</div>
                </Card>
              </div>
            ) : (
              kid?.map((k) => (
                <div style={{ margin: "20px 0 0 100px" }}>
                  <Comment item={k} />
                </div>
              ))
            ))}
        </div>
      )}
    </div>
  );
};
export default Comment;
