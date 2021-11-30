import {Grid, Box, makeStyles, Typography} from '@material-ui/core';


import React from 'react'

const Footer = () => {
    return (
        <Grid>
            <Box display="flex" justifyContent="center" py="1.5rem" >
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © Laccy '}  
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Grid>
    )
}

export default Footer;