import React from 'react';

//Router
import { useHistory } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from 'react-redux';

//Action
import { restartProducts } from "../../redux/actions/cart";

//My Component
import { CartScreen } from './CartScreen'

//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Box, Button} from '@material-ui/core';

//Stripe
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

//Axios
import axios from "axios";

//Sweet Alert
import Swal from 'sweetalert2'





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.light.main,
      overflow: "hidden",
      minHeight: "90vh",
      margin: 0
    },
    cartContainer: {
        padding: "1rem",
        [theme.breakpoints.up('sm')]: {
          paddingRight: "5%",
          paddingLeft: "5%"
        },
        [theme.breakpoints.up('md')]: {
          paddingRight: "10%",
          paddingLeft: "10%"
        },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    total: {
        alignSelf: "start",
        total: "1.6rem",
    },
    price: {
        alignSelf: "center",
        fontSize: "2rem",
        fontWeight: 300,
        marginTop: "1rem",
        marginBottom: "1rem"
    },
    button: {
        alignSelf: "center",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        marginTop: ".5rem", 
        width: "100%",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        }
    }

}));

const CartPage = () => {
    //material ui
    const classes = useStyles();

    //Redux
    const { products } = useSelector(state => state.cart);
    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //Router
    const history  = useHistory();

    //Product Price Logic
    const TotalPice = () => {
        let start = 0;
        for(let i = 0; i < products.length; i++) {
            let productTotal = products[i].quantity * products[i].price;
            start += productTotal
        }
        return start
    }
    const result = TotalPice()
    //Product Price Logic Finish

    const stripePromise = loadStripe('pk_test_51HXzHCCyvMnU8aJFcyQSxqE0P2wIoO5Bp5ZmAVuPoWKA9uT3FpsaV5bmZ1HMZb7NK0lHLaVqpg6Nj8BR7jxLYDTj00Gs8bvRRH');
    //console.log("stripe Promise", stripePromise)
    const CheckoutForm = ({result}) => {

        const stripe = useStripe()
        const elements = useElements()


        const handleSubmit = async (event) => {
            event.preventDefault();

            //If i'm not logged i can't buy
            if(!!uid === false) {
                return Swal.fire({
                    title: 'You must log in',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                  }).then(() => {    
                    return history.push('/login')
                })
            }

            if (!stripe || !elements) {
            return;
            }

            const cardElement = elements.getElement(CardElement);

            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
                Swal.fire({
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            } else {
                //console.log('[PaymentMethod]', paymentMethod);
                const {id} = paymentMethod;
                const amount = result * 100;
                const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_API}/checkout`, {
                    id,
                    amount
                });
                if(data.ok) {

                    Swal.fire({
                        title: `${data.message}`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(() => {    
                        dispatch( restartProducts() );
                        return history.push('/')
                    })

                } else {
                    //console.log(data.message)

                    return Swal.fire({
                        title: `${data.message}`,
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
            }
            
        }

        return(
            <form onSubmit={(e) => handleSubmit(e)}>

                <CardElement />

                <Button type="submit" className={classes.button} disabled={!stripe}>Checkout</Button>
            </form>
        )
   } 


    return (
        <div className={classes.root}>
            <Grid className={classes.cartContainer} container>

                {
                    products.length > 0
                    ?   <Grid container spacing={3}>
                            <Grid item  xs={12} sm={8}>
                            {products.map((product) => (
                                <CartScreen key={product._id} product={product} />
                            ))}
                            </Grid>
        
                            <Grid item xs={12} sm={4}>
                                <Paper className={classes.paper} square>
                                    <Box display="flex" flexDirection="column">
                                        <Typography className={classes.total}>Total:</Typography>
                                        <Typography className={classes.price}>${result}</Typography>

                                        {/*Stripe */}
                                        <Elements options={{locale: "en"}} stripe={stripePromise}>
                                            <CheckoutForm result={result} />
                                        </Elements>
                                        {/*Stripe */}

                                        
                                    </Box>
                                    
                                </Paper>
                            </Grid>
                        </Grid>
                    : <Typography variant="h1">Your cart is empty</Typography>
                }
            </Grid>
        </div>
    )
}


export default CartPage;