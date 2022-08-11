import React from 'react';
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

const TopBar = (props) => {

    return (
        <AppBar className="navbar" position="static">
            <Box className="navbar_box">
                <Typography className="website_title">Crusaders Quest</Typography>
                <Box className="navbar_links">
                    <Link to="/" className="navbar_link">Hero List</Link>
                    <Link to="/tier_list" className="navbar_link">Tier List</Link>
                </Box>
            </Box>
        </AppBar>
    )
}

export default TopBar