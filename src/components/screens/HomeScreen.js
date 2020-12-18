import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { productActions } from "../../actions";
import Axios from "axios";

import Button from "@material-ui/core/Button";

import NavBar from "../nav/NavBar";
import HomePage from "../HomePage";

class HomeScreen extends Component {
  state = {
    productLoaded: false,
    productFilteredBy: "all"
  };

  componentDidMount() {
    if (this.props.product.length < 1) {
      this.loadProduct();
      console.log("je call");
    }
    console.log("je cdm");
    // this.loadProduct();
  }

  productFilter = (selector) => {
    this.setState({productFilteredBy: selector})
  }

  loadProduct = async () => {
    const product = await Axios.get(
      `${process.env.REACT_APP_API_URL}/products/list`
    );
    this.props.setProductList(product.data);
  };

  render() {
    return (
      <div className="body">
        <NavBar menuButton={true} productFilter={this.productFilter} menuTitle="TemplateJS" />
        <HomePage productFilteredBy={this.state.productFilteredBy} />
        <div>
          <Button onClick={this.loadProduct}>load produit</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  product,
});

const mapDispatchToProps = {
  setProductList: productActions.setProductList,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
);
