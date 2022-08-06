import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

const EnhancedTableHead = (props) => {
    const { headers, order, orderBy, rowCount, onRequestSort } =
        props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headers.map(header =>
                    <TableCell
                        key={header}
                        align="left">
                        <TableSortLabel
                            active={orderBy === header}
                            direction={orderBy === header ? order : 'asc'}
                            onClick={createSortHandler(header)}
                        >
                            {header}
                        </TableSortLabel>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead