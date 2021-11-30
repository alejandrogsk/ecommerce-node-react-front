import React, {useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { useGetAxios } from '../../hooks/useGetAxios';
import { Grid, Typography, makeStyles, TextField, CircularProgress, Box } from '@material-ui/core';
import CategorySectionTemplate from '../category/CategorySectionTemplate';

const useStyles = makeStyles((theme) => ({
    input: {
        width: "100%"
    },
    resultsContainer: {
        backgroundColor: theme.palette.light.main,
        minHeight: "90vh",
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
    searchGrid: {marginBottom: "2rem"}
}));


const SearchPage = () => {
    const classes = useStyles()
    const history = useHistory()

    //Get the search value from the params: sarch?product=gucci
    const {search} = useLocation()

    //Get the value to find: gucci
    var productToSearch = search.slice(1).split("&")[0].split("=")[1];

    //Make the request to the backend
    const {data, loading} = useGetAxios(`${process.env.REACT_APP_BACKEND_API}/search?product=${productToSearch}`)
    //Manage the form value
    const [searchInput, setSearchInput] = useState(null);

    const handleInputChange = (e) => {
      setSearchInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push({pathname: '/search', search:`?product=${searchInput}`})
    };

    
    return (
        <Grid container className={classes.resultsContainer}>
            <Grid item xs={12} className={classes.searchGrid}> 
                <form onSubmit={handleSubmit}>
                    <TextField 
                    autoFocus
                    className={classes.input}
                    placeholder="Search Product"
                    inputProps={{ "aria-label": "search google maps" }}
                    variant="outlined"
                    margin="normal"
                    onChange={handleInputChange}
                    />
                </form>
            </Grid>


            {
                !loading
                ? 
                <Grid container spacing={3}>
                {
                    Array.isArray(data.products)
                    ? data.products.map(product => (
                        <Grid item xs={12} sm={6} md={3} key={product._id}>
                            <CategorySectionTemplate category={product}/>
                        </Grid>
                    ))
                    : <Grid item xs={12} ><Typography variant="h2">{data.message}</Typography> </Grid> 
                }
                </Grid>
                
                
                : <Grid item xs={12}> 
                    <Box display="flex" justifyContent="center">
                        <CircularProgress/> 
                    </Box>
                  </Grid>
            }
        </Grid>
    )
}

export default SearchPage;