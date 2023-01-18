import styles from "./Error.module.scss";
import error2 from "../../image/error2.gif";
import { Card } from "@mui/material";

export interface IErrorComment {
  errorMessage: string;
}

const Error = ({errorMessage}: IErrorComment) => {
  return (
    <Card className={styles.error}>
      <p className={styles.text}>{errorMessage}</p>
      <img className={styles.img} alt="error" src={error2} />
    </Card>
  );
};

export default Error;
