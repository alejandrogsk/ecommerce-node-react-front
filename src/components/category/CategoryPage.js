import { Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAxios } from '../../hooks/useGetAxios';
import CategorySectionTemplate from './CategorySectionTemplate';
import TemplateSkeleton from './CategoryTemplateSkeleton';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.light.main,
      overflow: "hidden",
    },
    categoryContainer: {
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
    categoryTitle: {
      textTransform: "capitalize"
    }
    
  }));

const CategoryPage = () => {
    const classes = useStyles();
    
    const { dinamicCategory } = useParams();
    const { data, loading, error} = useGetAxios(`${process.env.REACT_APP_BACKEND_API}/products/${dinamicCategory}`)
    

    return (
        <div className={classes.root}>
            {error ? <p>error</p> : null}
            {
                !loading
                    ? <Grid container spacing={3} className={classes.categoryContainer}>
                    <Grid item xs={12} ><Typography variant="h2" className={classes.categoryTitle}>{data.productCategory[0].category}</Typography></Grid>
                    {
                      data.productCategory.map((p, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                          <CategorySectionTemplate key={p._id} category={p}/>
                        </Grid>
                      ))
                    }
                    </Grid>
                  :<Grid container spacing={3} className={classes.categoryContainer}>
                    {Array.from(new Array(8)).map((e, i) => (
                      <Grid key={i} item xs={12} sm={6} md={3}>
                        <TemplateSkeleton key={e}/>
                      </Grid>
                    ))}
                  </Grid>
            }
        </div>
    )
}

export default CategoryPage;