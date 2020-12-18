import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import Divider from "@material-ui/core/Divider";

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

const CardStep = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Typography className={classes.instructions}>
          Votre moyen de paiement
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List className={classes.root}>
          <ListItem>
            <ListItemText
              primary={`N° de carte: **** **** **** ${user.card.last4}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Date d'expiration: ${user.card.exp_month}/${user.card.exp_year}`}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default withRouter(connect(mapStateToProps, null)(CardStep));
