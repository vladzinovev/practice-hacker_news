import { TableCell, TableRow } from "@mui/material";

interface IStoreContext{
        'by':string,
        'descendants' : number,
        'id':number,
        'kids':any[] | null,
        'score':number,
        'time':number,
        'title':string,
        'type':string,
        'url':string
}

const List=({title,by, score,time,id}:IStoreContext)=>{

    return(
        <TableRow
            key={id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">{title}</TableCell>
            <TableCell align="right">{by}</TableCell>
            <TableCell align="right">{score}</TableCell>
            <TableCell align="right">{time}</TableCell>
        </TableRow>
    )
}
export default List;