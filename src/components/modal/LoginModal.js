import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import SignUpField from "./SignUpField";
import LoginField from "./LoginField";

const useStyles = makeStyles(() => ({
  container: {
    minWidth: "40vw",
  },
}));

const LoginModal = ({ toggle, isOpen }) => {
  const [state, setState] = useState({
    isLoginField: true,
  });

  const classes = useStyles();

  const switchField = () => {
    let isLoginField = !state.isLoginField;
    setState({ isLoginField });
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
            {state.isLoginField ? (
              <LoginField toggle={toggle} switchField={switchField} />
            ) : (
              <SignUpField toggle={toggle} switchField={switchField} />
            )}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default LoginModal;
