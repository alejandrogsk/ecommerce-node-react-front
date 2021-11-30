import React from 'react'
import { useGetAxios } from '../../hooks/useGetAxios'

import { Grid, makeStyles, Typography } from '@material-ui/core'

import CategorySectionTemplate from '../category/CategorySectionTemplate';
import TemplateSkeleton from '../category/CategoryTemplateSkeleton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  categoryContainer: {
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingRight: "2.5%",
    paddingLeft: "2.5%",
    [theme.breakpoints.up('sm')]: {
      paddingRight: "5%",
      paddingLeft: "5%"
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: "10%",
      paddingLeft: "10%"
    },
  },
  
}));

export default function SunglassesSection() {
  const classes = useStyles();
  const {data, loading, error} = useGetAxios(`${process.env.REACT_APP_BACKEND_API}/products/sunglasses`)
  

  return (
    <div className={classes.root}>
      {error ? <p>error</p> : null}
          { !loading 
            ? <Grid container spacing={3} className={classes.categoryContainer}>
              <Grid item xs={12}><Typography variant="h2">Sunglasses</Typography></Grid>
              {
                data.productCategory.slice(0, 4).map((p, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <CategorySectionTemplate key={p._id} category={p}/>
                  </Grid>
                ))
              }
              </Grid>
            :<Grid container spacing={3} className={classes.categoryContainer}>
              {Array.from(new Array(4)).map((e, i) => (
                <Grid key={i} item xs={12} sm={6} md={3}>
                  <TemplateSkeleton key={e}/>
                </Grid>
              ))}
              </Grid> 
            
          }
      
    </div>
  )
}









