import React from 'react'
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Router
import { Link } from 'react-router-dom';
//Material UI
import {Grid, makeStyles, Paper, Box, Typography, Button} from '@material-ui/core';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';



//Actions
import {addProduct, addQuantity} from "../../redux/actions/cart";


const useStyles = makeStyles((theme) => ({
    containerClass: {
        backgroundColor: theme.palette.light.main,
        minHeight: "100vh",
        padding: "2% 8%",
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
    categoryLink: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        transition: "1s",

        "&:hover": {
            textDecoration: "underline"
        }
    },
    extraBox: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "100px",

        "& > p": {
            textAlign: "center"
        }
    },
    buttonClass: {
        backgroundColor:theme.palette.primary.main,
        borderRadius: 0,
        color: "white",
        width: "100%",
        transition: "1s",
        "&:hover": {
            backgroundColor:theme.palette.primary.dark,
            transform: "translateY(-5px)"
        },
        [theme.breakpoints.up('md')]: {
            width: "42.5%",
            fontSize: "1rem"
        },
    },
    
  }));

export const ProductScreen = ({productFetch}) => {
    const classes = useStyles();
    const {products} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    // I have to add this key/value in the product temporarily 
    // because the backend doesn't have it
    productFetch.quantity = 1;

    console.log(productFetch, productFetch.quantity)

    const handleClick = () => {
        const searchProduct = products.find(prod => prod._id === productFetch._id);
        console.log(searchProduct)
        if( searchProduct === undefined || null) {
            return dispatch( addProduct(productFetch) )
        } else {
            return dispatch( addQuantity(productFetch) )
        }
        //Aca podría usar sweetAlet para decir que se agregó al carrito
    }

    return (

        <Grid container spacing={6} className={classes.containerClass}>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paperClass}>
                    <img src={productFetch.img} alt={productFetch.title} className={classes.imgClass}/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6} px={3}>
                <Box display="flex" flexDirection="column" >
                    <Box mb={2}><Typography component="h1" variant="h5">{productFetch.title}</Typography></Box>

                    <Box >
                        <Typography component="h6" variant="h1">${productFetch.price}</Typography>
                        <Box display="flex">
                            <ArrowRightOutlinedIcon />
                            <Link to={`/category/${productFetch.category}`} className={classes.categoryLink}>
                                <Typography component="h5" >{productFetch.category}</Typography>
                            </Link>
                        </Box>
                    </Box>


                    <Box mb={3}><Typography>{productFetch.description}</Typography></Box>

                    <Box mb={3} display="flex" justifyContent="space-around" alignContent="center">
                        <Box className={classes.extraBox}>
                            <VerifiedUserOutlinedIcon />
                            <Typography >Secured Payments</Typography>
                        </Box>
                        <Box className={classes.extraBox}>
                            <LocalShippingOutlinedIcon />
                            <Typography >30 Day Returns</Typography>
                        </Box>
                        <Box className={classes.extraBox}>
                            <LanguageOutlinedIcon />
                            <Typography >Worldwide Shipping</Typography>
                        </Box>
                    </Box>

                    <Box mb={5}>
                        <Button onClick={handleClick} className={classes.buttonClass}>Add to cart <ArrowRightOutlinedIcon /></Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>

        
    )
}
