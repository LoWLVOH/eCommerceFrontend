import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const CartStep = ({ cart }) => {
  const classes = useStyles();

  const cartItems = cart.map((el) => {
    return (
      <>
        <ListItem key={el.id}>
          <ListItemAvatar>
            <Avatar alt={el.description} src={el.images[0]} />
          </ListItemAvatar>
          <ListItemText primary={el.name} />
          <ListItemSecondaryAction>
            <ListItemText primary={`${el.price / 100}€`} />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </>
    );
  });

  const priceTotal = () => {
    let prices = 0;
    cart.forEach((element) => {
      prices += element.price / 100;
    });
    return prices;
  };
  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Typography className={classes.instructions}>Votre panier</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List className={classes.root}>
          {cartItems}
          <ListItem>
            <ListItemText primary="Prix total " />
            <ListItemSecondaryAction>
              <ListItemText primary={`${priceTotal()}€`} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ cart }) => ({
  cart,
});

export default withRouter(connect(mapStateToProps, null)(CartStep));
