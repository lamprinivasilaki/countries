import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography variant="h6">COUNTRIES</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Route path="/dashboard" component={Dashboard} />
      </Container>
    </Router>
  );
};

export default App;
