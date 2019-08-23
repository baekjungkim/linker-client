import React from "react";
import Header from "Components/Header";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from "theme";
import Home from "Routes/Home";
import About from "Routes/About";
import User from "Routes/User";
import NoMatch from "Routes/NoMatch";

const GlobalStyle = createGlobalStyle`
${reset};
body{
    padding: 0;
    margin: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
`;

function AppPresenter() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/user" component={User} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default AppPresenter;
