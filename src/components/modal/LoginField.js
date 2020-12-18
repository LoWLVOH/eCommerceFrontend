import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));

const LoginField = ({ setUser, toggle, switchField }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const classes = useStyles();

  const handleChange = ({ target: { name, value } }) => {
    setError("");
    setState({ ...state, [name]: value });
  };

  const submitForm = async () => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    const { email, password } = state;
    try {
      if (!email || !password) {
        throw new Error("Veuillez remplir tous les champs!");
      }
      const user = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        }
      );
      const {
        _id,
        stripeId,
        firstName,
        lastName,
        phone,
        address,
        card,
      } = user.data;
      setUser(_id, stripeId, firstName, lastName, email, phone, address, card);
      setSuccess("Vous êtes connecté");
      setTimeout(() => {
        toggle();
        setSuccess("");
        setError("");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogTitle style={{ fontWeight: "bold", color: "#379C88" }}>
        Connexion
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error && <em style={{ color: "red", margin: "auto" }}>{error}</em>}
          {success && (
            <em style={{ color: "green", margin: "auto" }}>{success}</em>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogContent className={classes.content}>
        <TextField
          id="standard-basic"
          onChange={handleChange}
          name="email"
          value={state.email}
          type="email"
          label="Email"
        />
        <TextField
          id="standard-basic"
          onChange={handleChange}
          name="password"
          value={state.password}
          type="password"
          label="Mot de passe"
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          <Link to="" onClick={switchField}>
            Créer un compte
          </Link>
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={submitForm}
          disabled={isLoading}
          variant="contained"
          color="primary"
        >
          {isLoading ? <CircularProgress size={20} /> : "Valider"}
        </Button>
        <Button
          onClick={toggle}
          disabled={isLoading}
          variant="contained"
          color="secondary"
        >
          Fermer
        </Button>
      </DialogActions>
    </>
  );
};

const mapDispatchToProps = {
  setUser: userActions.setUser,
};

export default connect(null, mapDispatchToProps)(LoginField);
