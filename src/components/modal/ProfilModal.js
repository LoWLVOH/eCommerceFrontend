import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "40vw",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  listCard: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ProfilModal = ({
  user,
  updateUser,
  addCard,
  deleteCard,
  toggle,
  isOpen,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [card, setCard] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    postal_code: "",
    city: "",
  });
  const [state, setState] = useState({
    id: "",
    stripeId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    setExpanded(false);
    setAddress({
      line1: user.address.line1,
      line2: user.address.line2,
      postal_code: user.address.postal_code,
      city: user.address.city,
    });
    setState({
      id: user.id,
      stripeId: user.stripeId,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
  }, [user]);

  const classes = useStyles();

  const expandPanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = ({ target: { name, value } }) => {
    setError("");
    setState({ ...state, [name]: value });
  };

  const handleAddress = ({ target: { name, value } }) => {
    setError("");
    setAddress({ ...address, [name]: value });
  };

  const handleCard = ({ target: { name, value } }) => {
    setError("");
    setCard({ ...card, [name]: value });
  };

  const submitCard = async () => {
    setIsLoading(true);
    setExpanded(false);
    setSuccess("");
    setError("");
    const { number, exp_month, exp_year, cvc } = card;
    const { stripeId } = state;
    try {
      const cardAdded = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/addCard`,
        { stripeId, number, exp_month, exp_year, cvc }
      );
      const { card, id } = cardAdded.data;
      const last4 = card.last4;
      addCard(last4, exp_month, exp_year, id);
      setSuccess("Votre carte a bien été ajoutée");
      setTimeout(() => {
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

  const SubmitDeleteCard = async () => {
    setIsLoading(true);
    setSuccess("");
    setError("");
    try {
      await Axios.post(`${process.env.REACT_APP_API_URL}/users/deleteCard`, {
        cardId: user.card.id,
        stripeId: user.stripeId,
      });
      deleteCard();
      setCard({
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
      });
      setSuccess("Votre carte a bien été supprimée");
      setTimeout(() => {
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

  const submitForm = async () => {
    setIsLoading(true);
    setExpanded(false);
    setSuccess("");
    setError("");
    const { id, stripeId, firstName, lastName, phone } = state;
    try {
      if (!firstName || !lastName) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      await Axios.post(`${process.env.REACT_APP_API_URL}/users/update`, {
        id,
        stripeId,
        firstName,
        lastName,
        phone,
        address,
      });
      updateUser(firstName, lastName, phone, address);
      setSuccess("Votre compte a bien été modifié");
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
    <div>
      <Dialog
        open={isOpen}
        onClose={toggle}
        aria-labelledby="form-dialog-title"
      >
        <Grid className={classes.container} container>
          <Grid item xs={12}>
            <DialogTitle style={{ fontWeight: "bold", color: "#379C88" }}>
              Profil
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {error && (
                  <em style={{ color: "red", margin: "auto" }}>{error}</em>
                )}
                {success && (
                  <em style={{ color: "green", margin: "auto" }}>{success}</em>
                )}
              </DialogContentText>
            </DialogContent>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={expandPanel("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>General</Typography>
                <Typography className={classes.secondaryHeading}>
                  {`${state.firstName} ${state.lastName}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DialogContent className={classes.content}>
                  <TextField
                    id="lastName"
                    onChange={handleChange}
                    name="lastName"
                    value={state.lastName}
                    type="text"
                    label="Nom"
                  />
                  <TextField
                    id="firstName"
                    onChange={handleChange}
                    name="firstName"
                    value={state.firstName}
                    type="text"
                    label="Prénom"
                  />
                  <TextField
                    id="phone"
                    onChange={handleChange}
                    name="phone"
                    value={state.phone}
                    type="number"
                    label="N° de téléphone"
                  />
                  <TextField
                    disabled={true}
                    id="email"
                    onChange={handleChange}
                    name="email"
                    value={state.email}
                    type="email"
                    label="Email"
                  />
                </DialogContent>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={expandPanel("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>
                  Adresse de facturation
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {address.line1
                    ? `${address.line1}`
                    : "Aucune adresse enregistré"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DialogContent className={classes.content}>
                  <TextField
                    id="address_line1"
                    onChange={handleAddress}
                    name="line1"
                    value={address.line1}
                    type="text"
                    label="Adresse ligne 1"
                  />
                  <TextField
                    id="address_line2"
                    onChange={handleAddress}
                    name="line2"
                    value={address.line2}
                    type="text"
                    label="Adresse Ligne 2"
                  />
                  <TextField
                    id="address_postal_code"
                    onChange={handleAddress}
                    name="postal_code"
                    value={address.postal_code}
                    type="text"
                    label="Code Postal"
                  />
                  <TextField
                    id="address_city"
                    onChange={handleAddress}
                    name="city"
                    value={address.city}
                    type="text"
                    label="Ville"
                  />
                </DialogContent>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={expandPanel("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>
                  Moyen de paiement
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {user.card.last4
                    ? `**** **** **** ${user.card.last4}`
                    : "Pas de carte enregistrée"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {user.card.last4 ? (
                  <List className={classes.listCard}>
                    <ListItem>
                      <ListItemText
                        primary={`**** **** **** ${user.card.last4}`}
                      />
                      <ListItemText
                        primary={`${user.card.exp_month}/${user.card.exp_year}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={SubmitDeleteCard}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    ,
                  </List>
                ) : (
                  <DialogContent className={classes.content}>
                    <TextField
                      id="number"
                      onChange={handleCard}
                      name="number"
                      value={card.number}
                      type="number"
                      label="N° de carte"
                    />
                    <TextField
                      id="exp_month"
                      onChange={handleCard}
                      name="exp_month"
                      value={card.exp_month}
                      type="number"
                      label="Mois"
                    />
                    <TextField
                      id="exp_year"
                      onChange={handleCard}
                      name="exp_year"
                      value={card.exp_year}
                      type="number"
                      label="Année"
                    />
                    <TextField
                      id="cvc"
                      onChange={handleCard}
                      name="cvc"
                      value={card.cvc}
                      type="number"
                      label="cvc"
                    />
                    <DialogActions>
                      <Button
                        onClick={submitCard}
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                      >
                        {isLoading ? <CircularProgress size={20} /> : "Valider"}
                      </Button>
                    </DialogActions>
                  </DialogContent>
                )}
              </AccordionDetails>
            </Accordion>
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
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  updateUser: userActions.updateUser,
  addCard: userActions.addCard,
  deleteCard: userActions.deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilModal);
