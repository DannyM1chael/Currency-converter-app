import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ListRow({rank, name, price}) {

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                { rank }
            </TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{price}</TableCell>
        </TableRow>
    )
}
