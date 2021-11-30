import React from 'react';
import { makeStyles, Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: 0,
  },
  cardContentClass: {
    [theme.breakpoints.down('sm')]: {
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
    },
  },
}));

export default function CategorySectionTemplate({category}) {
  const classes = useStyles();

  const history =  useHistory()

  const { title, img, price, _id } = category;

  const productPageRedicrect = () => {
    let url = `/product/${_id}`;
    history.push(url)
  }
  
  return (
      
    <Card className={classes.root}>
      <CardActionArea onClick={productPageRedicrect}>
        <CardMedia
          component="img"
          alt={title}
          height={300}
          image={img}
          title={title}
        />
        <CardContent className={classes.cardContentClass}>
          <Typography gutterBottom component="h6">
            {title}
          </Typography>
          <Typography variant="subtitle1">${price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}