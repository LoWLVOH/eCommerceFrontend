import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../nav/NavBar";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { cartActions } from "../../actions";
import Grid from "@material-ui/core/Grid";
import { alreadyInCart } from "../../helpers"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: "100vw",
    marginTop: "4rem",
  },
  image: {
    maxWidth: "100%",
  },
  items: {
    padding: "2rem",
  },
  button: {
    marginRight: theme.spacing(1),
    },
}));

const ProductScreen = ({ history, location, addCartProduct, cart }) => {
  const {
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
  } = location.state;

  const classes = useStyles();

  const addToCart = () => {
    addCartProduct({
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
      quantity: 1,
    });
  };

  // const alreadyInCart = (cart) => {
  //   let cartFiltered = [];
  //   cartFiltered = cart.filter(el => el.id === id)
  //   return cartFiltered.length
  // }

  return (
    <>
      <NavBar menuButton={false} menuTitle={name} />
      <Grid container className={classes.container}>
        <Grid item className={classes.items} xs={12} sm={6}>
          <img className={classes.image} src={images[0]} alt={description} />
        </Grid>
        <Grid item className={classes.items} xs={12} sm={6}>
          <h3>Description</h3>
          <p>{description}</p>
          <h3>{price / 100}€</h3>
          <Grid container justify="flex-end">
          {alreadyInCart(cart, id) ? (
            <>
            <Grid container justify="flex-end">
            <Typography variant="body1">
            Ce template est dans votre panier
          </Typography>
            </Grid>
          <Button onClick={() => history.goBack()} variant="contained" color="primary" className={classes.button}>
              Retour
            </Button>
          </>
          ): (
<Button  onClick={addToCart} variant="contained" color="primary" className={classes.button}>
              Ajouter au panier
            </Button>
          )}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Live Preview
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({cart}) => ({
  cart,
});

const mapDispatchToProps = {
  addCartProduct: cartActions.addCartProduct,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductScreen));
