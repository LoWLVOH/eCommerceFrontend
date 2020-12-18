import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dotenv from "dotenv";
import HttpsRedirect from "react-https-redirect";

import HomeScreen from "./components/screens/HomeScreen";
import CheckoutScreen from "./components/screens/CheckoutScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CheckoutValidationScreen from "./components/screens/CheckoutValidationScreen";

dotenv.config();

/**
 * Compose Enhancers
 */
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

/**
 * persist Config
 */
const persistConfig = {
  key: "eCommerceRoot",
  storage,
  // whitelist: ["user"],
  blacklist: ["product"],
  version: 1,
  // rehydrate: false,
};

//Thème global
const theme = createMuiTheme({
  typography: {
    fontWeight: 900,
    fontFamily:
      " nunito,source-code-pro, Menlo, Monaco, Consolas, CourierNew, monospace, Arial",
  },
});

/**
 * persisted Reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,

  composeEnhancers(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store);

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HttpsRedirect>
              {/* Le composant <Router> </Router> st l’élément principale de React Router. On doit utiliser un composant <Route> partout où le rendu est basé sur l’url du navigateur. */}
              <Router>
                {/* Le composant <Route> attend un paramètre path qui définit à quel chemin (partie droite de quelle url, après le nom de domaine) cette route est associée.  */}
                {/* Une fois la <Route> activée grâce à se paramètre path la route va activer le rendu d’un composant. */}
                <div>
                  <Route exact path="/" component={HomeScreen} />
                  <Route exact path="/Checkout" component={CheckoutScreen} />
                  <Route
                    path="/ProductScreen/:name"
                    component={ProductScreen}
                  />
                  <Route
                    path="/CheckoutValidation"
                    component={CheckoutValidationScreen}
                  />
                </div>
              </Router>
            </HttpsRedirect>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
