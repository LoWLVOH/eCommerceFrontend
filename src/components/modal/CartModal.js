import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { cartActions } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  container: {
    minWidth: "40vw",
  },
}));

const CartModal = ({
  history,
  user,
  cart,
  toggleLogin,
  deleteCartProduct,
  toggle,
  isOpen,
}) => {
  const classes = useStyles();
  const cartItems = cart.map((el) => {
    return (
      <ListItem key={el.id}>
        <ListItemAvatar>
          <Avatar alt={el.description} src={el.images[0]} />
        </ListItemAvatar>
        <ListItemText primary={el.name} secondary={`${el.price / 100}€`} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => deleteCartProduct(el.id)}
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  const priceTotal = () => {
    let prices = 0;
    cart.forEach((element) => {
      prices += element.price / 100;
    });
    return prices;
  };

  const checkout = () => {
    if (user.id === "") {
      toggleLogin();
    } else {
      history.push("/Checkout");
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={toggle}
        aria-labelledby="form-dialog-title"
      >
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <DialogTitle>Panier</DialogTitle>
            <DialogContent>
              {cart.length ? (
                <List className={classes.root}>
                  {cartItems}
                  <ListItem>
                    <ListItemText primary="Prix total" />
                    <ListItemSecondaryAction>
                      <ListItemText primary={`${priceTotal()}€`} />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ) : (
                "Votre panier est vide"
              )}
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button disabled={!cart.length} onClick={checkout} variant="contained" color="primary">
                Payer
              </Button>
              <Button onClick={toggle} variant="contained" color="secondary">
                Fermer
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ user, cart }) => ({
  user,
  cart,
});

const mapDispatchToProps = {
  deleteCartProduct: cartActions.deleteCartProduct,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartModal)
);
