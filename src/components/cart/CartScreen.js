import React from 'react'
//Redux
import { useDispatch } from 'react-redux';
//Actions
import { removeProduct, addQuantity, removeQuantity } from '../../redux/actions/cart';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box, Typography,  CardMedia} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: "2rem",
    position: "relative"
  },
  delete: {
    position: "absolute",
    top: 2,
    right: 2,
    "&:hover": {
      cursor: "pointer"
    },
    [theme.breakpoints.down('sm')]: {
      height: ".6em",
      width: ".6em"
    },
  },
  image: {
    height: "10rem",
    width: "10rem"
  },
  contentBox: {
    alignItems: "center", 
    display: "flex", 
    justifyContent: "space-around",
    marginLeft: ".3rem",
    position: "relative", 
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      alignItems: "start",
      flexDirection: "column",
      justifyContent: "start"
    },
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    [theme.breakpoints.down('xs')]: {
      fontSize: ".9rem"
    },
  },
  texts: {
    color: "#616161",
    [theme.breakpoints.down('sm')]: {
      marginTop: ".5rem",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: ".8rem",
      
    },
  },
  buttons: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer"
    },
    [theme.breakpoints.down('sm')]: {
      height: ".8em",
      width: ".8em"
    },
  }
}));

export const CartScreen = ({product}) => {
    const classes = useStyles();
    const dispatch = useDispatch();


    return (
        
      !(product.quantity === 0 ) && 
        <div className={classes.root}>
          <Grid >
            <Paper className={classes.paper} square>
              <HighlightOffOutlinedIcon 
                className={classes.delete}
                size="small"
                onClick={ () =>{
                  dispatch( removeProduct(product)) 
                }}
              />
              <Box display="flex" alignContent="center" justifyItems="space-between">
                  
                  <CardMedia 
                    className={classes.image}
                    component="img"
                    height={200}
                    image={product.img}
                    alt={product.title}
                  />

                <Box className={classes.contentBox}>
                  <Typography component="h5" className={classes.title} >{product.title}</Typography>
                  <Typography variant="body1" className={classes.texts}>Price: {product.price}</Typography>
                  <Typography variant="body1" className={classes.texts}>Quantity: {product.quantity}</Typography>
                  <Typography variant="body1" className={classes.texts}>Total: {product.quantity * product.price}</Typography>

                  <Box display="flex" position="absolute" bottom="0" right="0"> 
                      
                      <AddCircleOutlineOutlinedIcon 
                        className={classes.buttons}
                        size="small"
                        onClick={ () => {
                          dispatch( addQuantity(product) )
                        }}
                      />
                      
                      <RemoveCircleOutlineOutlinedIcon
                        className={classes.buttons}
                        size="remove"
                        onClick={() => {
                          dispatch( removeQuantity(product))
                        }}
                      />
                      
                  </Box>
                </Box>
              </Box>
            </Paper>
        </Grid>
      </div>
        
    )
}
