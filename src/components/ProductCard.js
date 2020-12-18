import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cardContainer: {
    minHeight: 220,
  },
  content: {
    minHeight: 200,
  },
  media: {
    height: 140,
  },
});

const ProductCard = ({
  history,
  id,
  isDisplayed,
  images,
  name,
  description,
  priceId,
  price,
  metadata,
  attributes,
  active,
  unit_label,
  alreadyInCart
}) => {
  const classes = useStyles();

  const viewProduct = () => {
    history.push({
      pathname: `/ProductScreen/${name}`,
      state: {
        id,
        images,
        name,
        description,
        priceId,
        price,
        metadata,
        attributes,
        active,
        unit_label,
      },
    });
  };

  return (
    <Grid style={{"display": isDisplayed ? "flex" : "none"}} item xs={3}>
      <Card className={classes.root}>
        <CardActionArea onClick={viewProduct}>
          <CardMedia
            className={classes.media}
            image={images[0]}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <Grid container className={classes.cardContainer} direction="column" justify="space-between">
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description.split(' ').slice(0, 15).join(' ')+"..."}
            </Typography>
            <Grid container justify="flex-end">
              {alreadyInCart ? (<ShoppingCart />) : 
              (<Typography variant="body2" color="textSecondary" component="p">
                {`${price / 100}€`}
              </Typography>)}
            </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default withRouter(ProductCard);
