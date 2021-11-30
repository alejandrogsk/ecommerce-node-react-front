import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer";

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    restricted,
    ...rest
}) => {

    return (
        <Route { ...rest }
            component={ (props) => {

                if(!isAuthenticated && restricted){
                    return <Component { ...props } />
                }
                else if( isAuthenticated && restricted ){
                    return <Redirect to="/" />
                } else {
                    return <><Header /> <Component { ...props } />  <Footer/> </>
                }
            }}
        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

/* esto funciona relativamente bien
<Route { ...rest }
            component={ (props) => (
                ( isAuthenticated && restricted )
                    ? ( <Redirect to="/" /> )
                    
                    : ( <><h1>navbat</h1> <Component { ...props } /> </> )
            )}
        
        />
*/