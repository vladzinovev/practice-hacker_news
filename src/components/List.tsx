import { TableCell, TableRow } from "@mui/material";
import { converterDate } from "../utils/converter";
import { INewsItemType } from "./Lists";


const List=({title,by, score,time,id,url}:INewsItemType,i:number)=>{

    return(
        <TableRow
            key={i}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" onClick={()=>url}>{title}</TableCell>
            <TableCell align="right">{by}</TableCell>
            <TableCell align="right">{score}</TableCell>
            <TableCell align="right">{converterDate(time)}</TableCell>
        </TableRow>
    )
}
export default List;