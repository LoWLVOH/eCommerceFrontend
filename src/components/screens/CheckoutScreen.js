import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { productActions } from "../../actions";
import Grid from "@material-ui/core/Grid";
import NavBar from "../nav/NavBar";
import CheckoutStepper from "../CheckoutStepper";

class CheckoutScreen extends Component {
  render() {
    return (
      <>
        <NavBar menuButton={false} menuTitle="Vérification" />
        <Grid container style={{ padding: "4rem" }}>
          <CheckoutStepper />
        </Grid>
      </>
    );
  }
}

const mapStateToProps = ({ cart, product }) => ({
  cart,
  product,
});

const mapDispatchToProps = {
  setProductList: productActions.setProductList,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)
);
