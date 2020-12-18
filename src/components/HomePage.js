import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HomePage.css";
import ProductCard from "./ProductCard";
import Grid from "@material-ui/core/Grid";
import { alreadyInCart } from "../helpers"


const HomePage = ({ product, productFilteredBy, cart }) => {
  const productDisplay = product.map((el) => {
    return (
      <ProductCard
        key={el.id}
        id={el.id}
        isDisplayed={el.metadata.type === productFilteredBy || productFilteredBy === "all"}
        priceId={el.priceId}
        images={el.images}
        name={el.name}
        description={el.description}
        price={el.price}
        metadata={el.metadata}
        attributes={el.attributes}
        active={el.active}
        unit_label={el.unit_label}
        alreadyInCart={alreadyInCart(cart, el.id)}
      />
    );
  });

  return (
    <div>
      <section
        id="home"
        style={{
          backgroundImage: `url(${require("../images/home.jpg")})`,
        }}
      >
        <h1>TemplateJS</h1>
        <h2>Développé pour gagner du temps</h2>
      </section>
      <section className="bg-primary">
        <h2>Ma premiére section</h2>
        <Grid container spacing={3}>
          <Grid className="text-primary" item xs={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nemo
            culpa alias sint, minus excepturi ullam mollitia dolore quo modi ut
            voluptatibus, magnam repellendus at, quis accusantium aliquid dolor
            porro?
          </Grid>
          <Grid className="text-primary" item xs={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            neque obcaecati repellat eos illo reprehenderit dolor deleniti
            voluptates qui unde facilis consectetur, possimus fuga quam aut
            facere ab nihil distinctio.
          </Grid>
          <Grid className="text-primary" item xs={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            veniam vitae eveniet quis neque fugit sit fuga, adipisci officia
            nesciunt libero voluptate. Est incidunt impedit possimus culpa nobis
            in cum.
          </Grid>
        </Grid>
      </section>
      <section className="bg-secondary">
        <h2>Ma seconde section</h2>
        <Grid container spacing={3}>
          {productDisplay}
        </Grid>
      </section>
      <footer></footer>
    </div>
  );
};

const mapStateToProps = ({ product, cart }) => ({
  product,
  cart,
});

export default withRouter(connect(mapStateToProps, null)(HomePage));
