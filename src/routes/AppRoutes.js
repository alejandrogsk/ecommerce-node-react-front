//React
import React, { useEffect } from "react";

//React Router
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Redux actions
import { startChecking } from "../redux/actions/auth";

//Material ui
import {Grid, Box, CircularProgress} from "@material-ui/core";

//Routes
import { PublicRoute } from "./PublicRoutes";
//import { PrivateRoute } from "./PrivateRoutes";

//Components
import  Home  from "../components/home/Home";
import CategoryPage from "../components/category/CategoryPage";
import  CartPage  from "../components/cart/CartPage";
import ProductPage from "../components/products/ProductPage";
import Login from "../components/login/Login"
import Register from "../components/login/Register"
import SearchPage from "../components/search/SearchPage";



export default function AppRoutes() {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)
    
    useEffect(() => {
        dispatch( startChecking() )
    }, [dispatch])
    
    if (checking) {
        return( 
            <Grid container>
                <Grid item xs={12}> 
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress/> 
                    </Box>
                </Grid>
            </Grid>
        )
    }

    return(
        <Router>
                
            <div>
                <Switch>

                    <PublicRoute 
                        exact
                        path="/login"
                        component={Login}
                        isAuthenticated={ !!uid }
                        restricted={true}
                    />

                    <PublicRoute 
                        exact
                        path="/register"
                        component={Register}
                        isAuthenticated={ !!uid }
                        restricted={true}
                    /> 

                        
                    <PublicRoute exact path="/search" component={SearchPage} isAuthenticated={ !!uid } restricted={false}/>
                    <PublicRoute exact path="/cart" component={CartPage} isAuthenticated={ !!uid } restricted={false}/>
                    <PublicRoute exact path="/category/:dinamicCategory" component={CategoryPage} isAuthenticated={ !!uid } restricted={false}/>
                    <PublicRoute exact path="/product/:productId" component={ProductPage} isAuthenticated={ !!uid } restricted={false}/>
                            
                    <PublicRoute exact path="/" component={Home} isAuthenticated={ !!uid } restricted={false}/>     
                    <Redirect from="*" to="/" />

                </Switch>
                
            </div>

        </Router>
    )
}
