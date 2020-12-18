import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, cartActions } from "../../actions";
import LoginModal from "../modal/LoginModal";
import ProfilModal from "../modal/ProfilModal";
import CartModal from "../modal/CartModal";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Devices from "@material-ui/icons/Devices";
import Language from "@material-ui/icons/Language";
import Dns from "@material-ui/icons/Dns";
import Person from "@material-ui/icons/Person";
import AllInclusive from "@material-ui/icons/AllInclusive";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  listMenu: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const NavBar = ({
  cart,
  productFilter,
  menuButton,
  menuTitle,
  history,
  user,
  resetUser,
  resetCart,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [profilModalOpen, setProfilModalOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [cartModalOpen, setCartModalOpen] = React.useState(false);
  const [templateOpen, setTemplateOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(false);

  const handleTemplateClick = () => {
    setTemplateOpen(!templateOpen);
  };

  const handleProfilMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfilMenu = () => {
    setAnchorEl(null);
  };

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  const toggleProfilModal = () => {
    setProfilModalOpen(!profilModalOpen);
  };

  const toggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {menuButton ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.goBack()}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Drawer anchor="left" open={menuIsOpen} onClose={toggleMenu}>
            <div className={classes.listMenu}></div>
            <List>
              <div className={classes.drawerHeader}>
                <IconButton onClick={toggleMenu}>
                  {menuIsOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />

              <ListItem button onClick={handleTemplateClick}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Templates" />
                {templateOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={templateOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AllInclusive />
                    </ListItemIcon>
                    <ListItemText onClick={() => {toggleMenu(); productFilter("all")}} primary="Tous" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Devices />
                    </ListItemIcon>
                    <ListItemText onClick={() => {toggleMenu(); productFilter("frontend")}} primary="Frontend" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Dns />
                    </ListItemIcon>
                    <ListItemText onClick={() => {toggleMenu(); productFilter("backend")}} primary="Backend" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Language />
                    </ListItemIcon>
                    <ListItemText onClick={() => {toggleMenu(); productFilter("fullstack")}} primary="Fullstack" />
                  </ListItem>
                </List>
              </Collapse>

              {/* <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItem>
                </List>
              </Collapse> */}

              {/* <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem> */}
            </List>
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            {menuTitle}
          </Typography>
          {user.id !== "" ? (
            <>
              <Button
                aria-controls="profil-menu"
                aria-haspopup="true"
                onClick={handleProfilMenu}
                color="inherit"
              >
                <Person />
              </Button>
              <Menu
                id="profil-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseProfilMenu}
              >
                <MenuItem
                  onClick={() => {
                    toggleProfilModal();
                    handleCloseProfilMenu();
                  }}
                >
                  Profil
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    resetUser();
                    resetCart();
                    handleCloseProfilMenu();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button onClick={toggleLoginModal} color="inherit">
              Connexion
            </Button>
          )}
          <Button onClick={toggleCartModal} color="inherit">
            <ShoppingCart /> ({cart.length})
          </Button>
        </Toolbar>
      </AppBar>
      <LoginModal toggle={toggleLoginModal} isOpen={loginModalOpen} />
      <ProfilModal toggle={toggleProfilModal} isOpen={profilModalOpen} />
      <CartModal
        toggle={toggleCartModal}
        toggleLogin={toggleLoginModal}
        isOpen={cartModalOpen}
      />
    </div>
  );
};

const mapStateToProps = ({ user, cart }) => ({
  user,
  cart,
});

const mapDispatchToProps = {
  resetUser: userActions.resetUser,
  resetCart: cartActions.resetCart,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
