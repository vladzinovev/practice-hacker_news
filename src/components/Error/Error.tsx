import { Card } from "@mui/material";

import { IErrorComment } from "../../utils/types";
import error2 from "../../image/error2.gif";
import styles from "./Error.module.scss";

const Error = ({ errorMessage }: IErrorComment) => {
  return (
    <Card className={styles.error}>
      <p className={styles.text}>{errorMessage}</p>
      <img className={styles.img} alt="error" src={error2} />
    </Card>
  );
};

export default Error;
