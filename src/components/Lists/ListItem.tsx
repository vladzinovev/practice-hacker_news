import { NavLink } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";

import { converterDate } from "../../utils/converter";
import { AllItems } from "../../utils/types";
import styles from "./lists.module.scss";

const ListItem = ({ item }: AllItems) => {
  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <NavLink className={styles.link} to={`/post/${item.id}`}>
          {item.title}
        </NavLink>
      </TableCell>
      <TableCell align="right">
        <NavLink className={styles.link} to={`/users/${item.by}`}>
          {item.by}
        </NavLink>
      </TableCell>

      <TableCell align="right">{item.score}</TableCell>
      <TableCell align="right">{converterDate(item.time)}</TableCell>
    </TableRow>
  );
};

export default ListItem;
