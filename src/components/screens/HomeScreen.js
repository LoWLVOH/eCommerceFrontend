import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import {
  Jumbotron,
  Button,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../style/HomeScreenStyle.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions";

class HomeScreen extends Component {
  state = {
    forgotPassword: false,
    modal: false,
    isLoading: false,
    firstname: "",
    lastname: "",
    email: "",
    companyId: "",
    password: "",
    redirection: null,
    error: "",
    success: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, error: "" });
  };

  toggle = () => {
    this.setState((prevState) => ({
      forgotPassword: false,
      modal: !prevState.modal,
      error: "",
    }));
  };

  togglePassword = () => {
    this.setState((prevState) => ({
      forgotPassword: !prevState.forgotPassword,
      error: "",
    }));
  };

  forgotPassword = async () => {
    this.setState({ isLoading: true });
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/forgotPassword`,
        {
          email: this.state.email,
        }
      );
      this.setState({
        success:
          "Nous vous avons envoyé un e-mail contenant les instructions à suivre pour réinitialiser votre mot de passe.",
      });
      setTimeout(() => {
        this.setState({
          isLoading: false,
          success: "",
        });
        this.toggle();
      }, 2500);
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    }
  };

  login = async () => {
    const {
      history,
      setUser,
      setIncidents,
      setAddresses,
      setUsersList,
      setMessages,
    } = this.props;

    this.setState({ isLoading: true });
    try {
      const login = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email: this.state.email,
          password: this.state.password,
        }
      );
      const {
        _id,
        firstname,
        lastname,
        email,
        mobilePhone,
        officePhone,
        whatsApp,
        companyId,
        addressId,
        status,
        company,
      } = await login.data.myUser;

      const { incidents, address, users, messages } = login.data;

      setUser(
        _id,
        firstname,
        lastname,
        email,
        mobilePhone,
        officePhone,
        whatsApp,
        companyId,
        addressId,
        status,
        company
      );
      setIncidents(incidents);
      setAddresses(address);
      setUsersList(users);
      setMessages(messages);
      this.setState({ isLoading: false });
      history.push("/newsScreen");
      this.toggle();
    } catch (error) {
      try {
        const { data } = error.response;

        this.setState({ error: data, isLoading: false });
      } catch (error) {
        this.setState({
          error: "connexion impossible! réessayez plus tard.",
          isLoading: false,
        });
      }
    }
  };

  refreshData = async () => {
    const {
      history,
      setUser,
      resetUser,
      setIncidents,
      setAddresses,
      setUsersList,
      setMessages,
    } = this.props;
    try {
      this.setState({ isLoading: true });
      const refresh = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/refresh?id=${this.props.user.id}`
      );
      const {
        _id,
        firstname,
        lastname,
        email,
        mobilePhone,
        officePhone,
        whatsapp,
        companyId,
        addressId,
        status,
        company,
      } = await refresh.data.myUser;

      const { incidents, address, users, messages } = refresh.data;

      setUser(
        _id,
        firstname,
        lastname,
        email,
        mobilePhone,
        officePhone,
        whatsapp,
        companyId,
        addressId,
        status,
        company
      );
      setMessages(messages);
      setIncidents(incidents);
      setAddresses(address);
      setUsersList(users);
      this.setState({ isLoading: false });
      history.push("/newsScreen");
    } catch (error) {
      this.setState({ isLoading: false });
      resetUser();
    }
  };

  onEnterClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      this.login();
    }
  };

  render() {
    return (
      <div className="body">
        {!this.state.redirection ? (
          <div className="Element">
            <Button
              className="ButtonLoginNav"
              onClick={
                this.props.user.firstName ? this.refreshData : this.toggle
              }
              disabled={this.state.isLoading}
            >
              {this.state.isLoading
                ? "Connexion..."
                : this.props.user.firstName
                ? `${this.props.user.firstName} News `
                : "Login"}
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>
                {this.state.forgotPassword ? "Mot de passe oublié ?" : "Login"}
              </ModalHeader>
              <ModalBody>
                <Form>
                  {this.state.forgotPassword && (
                    <CardText>
                      Saisissez votre adresse e-mail et cliquez sur continuer
                    </CardText>
                  )}
                  <FormGroup>
                    {!this.state.forgotPassword && (
                      <Label for="email">Email</Label>
                    )}
                    <Input
                      type="email"
                      name="email"
                      placeholder="@gmail.com"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  {!this.state.forgotPassword && (
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        onKeyDown={this.onEnterClick}
                      />
                    </FormGroup>
                  )}
                  {this.state.error && (
                    <em
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        margin: "0 auto",
                      }}
                    >
                      {this.state.error}
                    </em>
                  )}
                  {this.state.success && (
                    <em
                      style={{
                        fontWeight: "bold",
                        color: "green",
                        margin: "0 auto",
                      }}
                    >
                      {this.state.success}
                    </em>
                  )}
                </Form>
              </ModalBody>
              {this.state.forgotPassword ? (
                <ModalFooter>
                  <Button
                    disabled={this.state.isLoading}
                    className="ButtonLoginModal"
                    onClick={this.forgotPassword}
                  >
                    {this.state.isLoading ? "Envoi..." : "Continuer"}
                  </Button>

                  <Button color="secondary" onClick={this.togglePassword}>
                    Cancel
                  </Button>
                </ModalFooter>
              ) : (
                <ModalFooter>
                  <Link
                    onClick={this.togglePassword}
                    style={{ marginRight: "auto" }}
                    to=""
                  >
                    Mot de passe oublié ?
                  </Link>
                  <Button
                    disabled={this.state.isLoading}
                    className="ButtonLoginModal"
                    onClick={this.login}
                  >
                    {this.state.isLoading ? "Connexion..." : "Login"}
                  </Button>

                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              )}
            </Modal>
          </div>
        ) : (
          <Redirect to="newsScreen" />
        )}

        {/* <div className="Element">
          <Nav>
            <NavItem>
              <NavLink
                onClick={() => window.scrollTo(0, this.expRef.offsetTop)}
                className="LinkNav"
                href="#"
              >
                Expertises et services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => window.scrollTo(0, this.formRef.offsetTop)}
                className="LinkNav"
                href="#"
              >
                Formules
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => window.scrollTo(0, this.contactRef.offsetTop)}
                className="LinkNav"
                href="#"
              >
                Contacts
              </NavLink>
            </NavItem>
          </Nav>
        </div> */}

        <Jumbotron className="Jumbotron1" fluid>
          <h1 className="titre">My FabWorkplace</h1>
          <h2 className="presentation">
            Confiez la gestion de vos bureaux et de vos services généraux à nos
            experts
          </h2>
          <h2 className="presentation">
            et consacrez votre temps et votre énergie à l'augmentation de votre
            chiffre d'affaires !
          </h2>
        </Jumbotron>

        {/* <Container>
          <h3 ref={ref => (this.expRef = ref)} className="titreExpertises">
            Nos expertises et nos services
          </h3>
          <h4 className="textExpertises">
            Nos experts sauront trouver les solutions les meilleures pour vos
            bureaux dans le respect de votre budget
          </h4>
          <h4 className="textExpertises">
            Notre web service permettra d'augmenter fortement la vitesse
            d'intervention dans vos bureaux et le confort de vos salariés
          </h4>

          <Row className="CardEspertises">
            <Col xs="12" sm="6" md="4" lg="3">
              <Card body className="CardBody">
                <CardTitle className="cardTitle">Quotidien</CardTitle>
                <CardText>
                  Propreté, Ménage, Poubelles, Sécurité, Cafétéria, Courrier et
                  colis ...
                </CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4" lg="3">
              <Card body className="CardBody">
                <CardTitle className="cardTitle">Mensuel</CardTitle>
                <CardText>
                  Climatisation, Chauffage, Extincteurs, Ascenseurs, CHSCT,
                  Exercices de sécurité, Electricité, Plomberie, Plantes vertes,
                  Déménagement internes, Archivage, Complément de mobilier et de
                  décoration, Signalétique...
                </CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4" lg="3">
              <Card body className="CardBody">
                <CardTitle className="cardTitle">Exceptionnel</CardTitle>
                <CardText>
                  Nouveaux bureaux, Gros travaux, Aménagements, Décoration,
                  Assurance, ...{" "}
                </CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>
          </Row>

          <h3 ref={ref => (this.formRef = ref)} className="titreFormules">
            Nos formules
          </h3>
          <h5 className="textFormules">
            Nous avons conçu différentes formules clés en main pour encore plus
            vous faciliter la vie
          </h5>
          <h5 className="textFormules">
            Nous sommes à votre disposition pour étudier en détail votre besoin
            et vous orienter sur la formule la plus adaptée ou en concevoir une
            selon vos désirs
          </h5>

          <Row className="CardFormules">
            <Col xs="12" sm="6" md="4" lg="3">
              <Card body>
                <CardTitle className="cardTitle">FORMULE BASIQUE</CardTitle>
                <CardText>
                  Vous souhaitez limiter votre budget et nous confier
                  l'essentiel
                </CardText>
                <CardText>1000€/mois</CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4" lg="3">
              <Card body>
                <CardTitle className="cardTitle">FORMULE EVOLUTION</CardTitle>
                <CardText>
                  Vos bureaux vous prennent trop de temps et votre budget est
                  limité
                </CardText>
                <CardText>2500€/mois</CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4" lg="3">
              <Card body>
                <CardTitle className="cardTitle">FORMULE PREMIUM</CardTitle>
                <CardText>
                  Vous avez besoin de nombreux services et d'interventions très
                  rapides
                </CardText>
                <CardText>5000€/mois</CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>

            <Col xs="12" sm="6" md="4" lg="3">
              <Card body>
                <CardTitle className="cardTitle">SUR-MESURE</CardTitle>
                <CardText>
                  Nous étudions et dimensionnons avec vous votre besoin
                </CardText>
                <CardText>sur devis</CardText>
                <Button className="buttonStyle">Plus d'informations</Button>
              </Card>
            </Col>
          </Row>

          <h3 ref={ref => (this.contactRef = ref)} className="titreContact">
            Nous contacter
          </h3>
          <Form onSubmit={this.onSubmit}>
            <div className="FormContact">
              <FormGroup className="EmailContact">
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="@email.com"
                />
              </FormGroup>

              <FormGroup className="textareaContact">
                <Label for="exampleText">Votre message</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  placeholder="message..."
                />
              </FormGroup>
            </div>
            <Button className="buttonStyle">Envoyer</Button>
          </Form>

          <Row className="cardBottom">
            <Col xs="12" sm="6" md="4" lg="3">
              <CardText>
                151 rue Saint-Denis, 75001 Paris, France - My Workplace
              </CardText>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  setUser: userActions.setUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
);
