import React from "react";
import "./App.css";
import logo from "./logo.svg";
import { AppBar, Toolbar, Container, Typography } from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Carta from "./Carta";
import Inici from "./Inici";
import Cistella from "./Cistella";
import Navegacio from "./Navegacio";
import Italia from "./Italia";

//TEMA DE LA APP
const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#333333"
    },
    secondary: {
      main: "#727171"
    },
    distinctive: {
      main: "#80d6d1"
    },
    background: {
      paper: "#f8f3f0",
      default: "#f8f3f0"
    },
    highlight: {
      main: '#ff5656'
    }
  }
});

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    minHeight: "90vh"
  }
}));

//Estils navegacio
const buttonCartaStyles = makeStyles(theme => ({
  //style pel boto carta
  root: {
    color: theme.palette.primary.main,
    "&$selected": {
      backgroundColor: theme.palette.distinctive.light,
      color: theme.palette.primary.main
    },
    backgroundColor: theme.palette.distinctive.main,
    borderRadius: "50%",
    top: "-35px",
    maxWidth: "0",
    height: "130%"
  },
  selected: {}
}));
const buttonStyles = makeStyles(theme => ({
  //style pels altres botons
  root: {
    color: theme.palette.primary.light,
    "&$selected": {
      color: "white"
    }
  },
  selected: {}
}));
const bottomNavStyles = makeStyles(theme => ({
  //style per la navigation
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: theme.palette.primary.main
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography align="left" variant="h5" className={classes.title}>
              YourMeal
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <BrowserRouter>
        <Container className={classes.content}>
          <Switch>
            <Route path="/fhc6/" exact>
              <Inici />
            </Route>
            <Route path="/fhc6/carta">
              <Carta />
            </Route>
            <Route path="/fhc6/cistella">
              <Cistella />
            </Route>
            <Route path="/fhc6/italia">
              <Italia />
            </Route>
          </Switch>
        </Container>

        <Navegacio />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
