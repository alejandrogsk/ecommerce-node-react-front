import React from 'react';
import { makeStyles, Card, CardActionArea, CardContent } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: 0
  },
  cardContentClass: {
    [theme.breakpoints.down('sm')]: {
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center'
    },
  }
}));

export default function TemplateSkeleton() {
  const classes = useStyles();


  return (
      <Card className={classes.root}>
      <CardActionArea>
        <Skeleton variant="rect" height={300} width={`100%`}/>
        
        <CardContent className={classes.cardContentClass}>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </CardContent>
      </CardActionArea>
    </Card>


    
  );
}