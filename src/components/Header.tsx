import React from 'react';
import { Box, Typography } from '@mui/material';
import theme from '../theme';

const Header: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw', 
            backgroundColor: theme.palette.secondary.main,
            padding: '1rem'
        }}>
            <Typography
                variant='h1'
            >
                <span style={{ color: theme.palette.primary.main }}>City</span><span style={{ color: '#F08700'}}>Finder</span>
            </Typography>
        </Box>
    )
}

export default Header;
