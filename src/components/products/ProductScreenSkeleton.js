import React from 'react'
import {Grid, makeStyles, Box,} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    containerClass: {
        backgroundColor: theme.palette.light.main,
        minHeight: "100vh",
        paddingTop: "2%",
        paddingBottom: "2%",
        paddingLeft: "8%",
        paddingRight: "8%",
    },
    paperClass: {
        boxShadow: "none",
        backgroundColor: "transparent",
    },
    imgClass: { 
        objectFit: "cover",
        width: "100%",
        height: "auto" 
    },
    extraBoxClass: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",

        "& > span": {
            width: "80%",
            margin: "auto"
        }
    },
    buttonClass: {
        borderRadius: 0,
        width: "100%",
        [theme.breakpoints.up('md')]: {
            width: "42.5%",
        },
    },
    
  }));

export const ProductScreenSkeleton = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={6} className={classes.containerClass}>
            <Grid item xs={12} md={6}>
                <Skeleton variant="rect" height="450px" width="100%" />
            </Grid>

            <Grid item xs={12} md={6} px={3}>
                <Box display="flex" flexDirection="column" >
                    <Box mb={2}><Skeleton variant="text" /></Box>

                    <Box >
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Box>


                    <Box mb={3} mt={3}>
                        <Skeleton variant="rect" height="120px"  />
                    </Box>

                    <Box mb={3} display="flex" justifyContent="space-around" alignContent="center">
                        <Box className={classes.extraBoxClass}>
                            <Skeleton variant="circle" width={30} height={30}/>
                            <Skeleton variant="text" />
                        </Box>
                        <Box className={classes.extraBoxClass}>
                            <Skeleton variant="circle" width={30} height={30}/>
                            <Skeleton variant="text" />
                        </Box>
                        <Box className={classes.extraBoxClass}>
                            <Skeleton variant="circle" width={30} height={30}/>
                            <Skeleton variant="text" />
                        </Box>
                    </Box>

                    <Box mb={5}>
                        <Skeleton variant="rect" height="25px" className={classes.buttonClass}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
