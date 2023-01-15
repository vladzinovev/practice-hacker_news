import { TableCell, TableRow } from "@mui/material";
import { converterDate } from "../../utils/converter";
import {NavLink} from 'react-router-dom';
import { INewsItemType } from "../../utils/types";

const ListItem=({item}:any,i:number)=>{
    return(
            <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" >
                    <NavLink style={{color: '#1976d2'}} to={`/post/${item.id}`}>
                        {item.title}
                    </NavLink>
                </TableCell>
                <TableCell align="right">
                    <NavLink style={{color: '#1976d2'}} to={`/users/${item.by}`}>
                        {item.by}
                    </NavLink>
                </TableCell>

                <TableCell align="right">{item.score}</TableCell>
                <TableCell align="right">{converterDate(item.time)}</TableCell>  
            </TableRow> 
    )
}
export default ListItem;