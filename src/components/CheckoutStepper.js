import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CartStep from "./CartStep";
import CardStep from "./CardStep";
import UserStep from "./UserStep";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";

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

function getSteps() {
  return ["Panier", "Informations", "Moyen de paiement"];
}

const CheckoutStepper = ({ user, cart, history }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = getSteps();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CartStep />;
      case 1:
        return <UserStep />;
      case 2:
        return <CardStep />;
      default:
        return "Unknown step";
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setIsLoading(true);
      try {
        const checkout = await Axios.post(
          `${process.env.REACT_APP_API_URL}/users/checkout`,
          { cart, user }
        );
        history.push({
          pathname: `/CheckoutValidation`, search: `?payment_intent=${checkout.data.id}`
        });
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
        setIsLoading(false);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <Grid container justify="center">
          <Typography className={classes.instructions}>
            {error && <em style={{ color: "red", margin: "auto" }}>{error}</em>}
          </Typography>
          {getStepContent(activeStep)}
          <Grid container justify="flex-end">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? (
                isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "Payer"
                )
              ) : (
                "Suivant"
              )}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, cart }) => ({
  user,
  cart,
});

export default withRouter(connect(mapStateToProps, null)(CheckoutStepper));
