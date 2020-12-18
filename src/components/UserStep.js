import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

const UserStep = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid container justify="center">
        <Typography className={classes.instructions}>
          Vos informations
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List className={classes.root}>
          <ListItem>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${user.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${user.phone}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${user.address.line1}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`${user.address.line2}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${user.address.postal_code} ${user.address.city}`}
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

export default withRouter(connect(mapStateToProps, null)(UserStep));
