import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { cartActions } from "../../actions";
import NavBar from "../nav/NavBar";
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import qs from "qs"
	
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
	marginTop: "4rem",
	padding: "3rem"
  },
  button: {
	marginRight: theme.spacing(1),
  },
}));

const CheckoutValidationScreen = ({ location, history, resetCart, user }) => {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const id = qs.parse(location.search, { ignoreQueryPrefix: true }).payment_intent

    const requireAction = async (id) => {
    try {
      const checkout = await Axios.get(`${process.env.REACT_APP_API_URL}/users/checkoutRetrieve?id=${id}`)
      switch (checkout.data.status) {
        case "succeeded":
		setStatus("Votre paiement a bien été validé");
		setIsLoading(false);
          break;
          case "requires_action":
        setStatus("Paiement en attente de validation");
                setTimeout(() => {
				window.location.href = `${checkout.data.next_action.redirect_to_url.url}`;
                  requireAction(checkout.data.id)
                }, 2000);
          break;
          case "requires_payment_method":
		setStatus("Carte Invalide");
		setIsLoading(false);
          break;
          case "processing":
        setStatus("Validation en cours");
        setTimeout(() => {
          requireAction(checkout.data.id)
        }, 2000);
        break;
          case "canceled":
		setStatus("Votre Paiement a été annulé");
		setIsLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {
      if (error.response) {
              setError(error.response.data.message);
            } else {
              setError(error.message);
            }
            setIsLoading(false);
    }
  }
  requireAction(id)  

  const goToHome = () => {
	  resetCart()
	history.push({
		pathname: `/`
	  });
  }

  return (
    <>
      <NavBar menuButton={false} menuTitle="Validation de paiement" />
      <Grid container className={classes.container} justify="center">
	  {error && (
                  <em style={{ color: "red", margin: "auto" }}>{error}</em>
                )}
                {status && (
                  <em style={{ color: "green", margin: "auto" }}>{status}</em>
                )}
				<Grid container className={classes.container} justify="center">
				<Typography variant="body1">
					Merci pour votre achat! Un email avec vous a été envoyé à l'adresse: {user.email}
				</Typography>
				<Typography variant="body1">
					Numero de facture: {id}
				</Typography>
				</Grid>
				<Grid container className={classes.container} justify="center">
					{isLoading ? <CircularProgress size={40} /> : <Button onClick={goToHome} variant="contained"
              color="primary"
              className={classes.button}>
            Retour à la boutique
          </Button>}
				</Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({user}) => ({
	user,
});

const mapDispatchToProps = {
	resetCart: cartActions.resetCart,
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutValidationScreen));
