import { Card, TableCell, TableRow } from "@mui/material";
import { converterDate } from "../../utils/converter";

import {NavLink} from 'react-router-dom';
import { IComment, INewsItemType } from "../../utils/types";
import './Comment.css';

const Comment=({text,by,time}:IComment)=>{

    return(
        <Card className="comments">
            <div className="comment">
                <div className="ctext" dangerouslySetInnerHTML={{__html:text}}></div>
                <div className="flex">
                    <p className="cusername">
                        <NavLink style={{color: '#1976d2'}} to={`/userid/${by}`}>
                            {by}
                        </NavLink>
                        
                    </p>
                    <p className="cdate">{converterDate(time)}</p>
                </div>
            </div>
        </Card>

        
        
    )
}
export default Comment;