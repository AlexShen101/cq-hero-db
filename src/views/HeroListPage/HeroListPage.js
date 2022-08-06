import React, { useState } from "react";

import HeroTable from "views/HeroListPage/TableBody.js";
import hero_tiers from "data/Hero_tiers.json";
import sorter from "views/HeroListPage/Sorter";
import EnhancedTableHead from 'views/HeroListPage/TableHead'
import TablePaginationActions from 'views/HeroListPage/TablePagination'

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import headers from 'data/tier_headers.js';

const darkMode = createTheme({
    palette: {
        mode: 'dark'
    }
})

const HeroListPage = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('Colo')

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        console.log(property)
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortList = (list) => {
        let sortedList = list
            .filter((hero) => {
                if (
                    searchInput === "" ||
                    hero.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
                )
                    return hero;
                else return null;
            }).sort((hero1, hero2) => sorter(hero1, hero2, orderBy, order));
        return sortedList
    }

    const sortedList = sortList(hero_tiers)
    const fullListLength = sortedList.length
    const displayedHeroes = sortedList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fullListLength) : 0;

    return (
        <ThemeProvider theme={darkMode}>
            <div>
                <h1 className="">Hero List</h1>
                <input
                    className="search_input"
                    autoFocus
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}></input>
                <div>
                    {displayedHeroes.length !== 0 ? (
                        <React.Fragment>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <EnhancedTableHead
                                        headers={headers}
                                        order={order}
                                        orderBy={orderBy}
                                        rowCount={fullListLength}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <HeroTable
                                        heroList={displayedHeroes}
                                        headers={headers}
                                        emptyRows={emptyRows} />
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                colSpan={3}
                                                count={fullListLength}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </React.Fragment>
                    ) : (
                        "No Results Found"
                    )
                    }
                </div>
            </div>
        </ThemeProvider>
    )
}

export default HeroListPage
