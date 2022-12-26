import { TableCell, TableRow } from "@mui/material";
import { converterDate } from "../../utils/converter";
import {NavLink} from 'react-router-dom';
import { INewsItemType } from "../../utils/types";

const List=({title,by, score,time,id}:INewsItemType,i:number)=>{
    return(
            <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" >
                    <NavLink style={{color: '#1976d2'}} to={`/post/${id}`}>
                        {title}
                    </NavLink>
                </TableCell>
                <TableCell align="right">
                    <NavLink style={{color: '#1976d2'}} to={`/userid/${by}`}>
                        {by}
                    </NavLink>
                </TableCell>

                <TableCell align="right">{score}</TableCell>
                <TableCell align="right">{converterDate(time)}</TableCell>  
            </TableRow> 
    )
}
export default List;