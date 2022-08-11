import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NotFoundPage = () => {
    return (
        <Paper className="hero_page_container">
            <Typography>The page you are looking for was not found.</Typography>
            <Button>
                <Link to="/" className="return_link">Return to Hero List Page</Link>
            </Button>
        </Paper>
    )
}

export default NotFoundPage;