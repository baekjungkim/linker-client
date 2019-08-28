import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Routes from "Components/Routes";
import Header from "Components/Header";
import Modal from "Components/Modal";
import GlobalStyles from "Styles/GlobalStyles";
import Theme from "Styles/Theme";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1001
  }
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
`;

const QUERY = gql`
  {
    logged @client
  }
`;
function AppPresenter() {
  const {
    data: { logged }
  } = useQuery(QUERY);

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <ThemeProvider theme={Theme}>
        <Container>
          <GlobalStyles />
          <Router>
            <Header logged={logged} />
            <Modal logged={logged} />
            <Routes />
          </Router>
        </Container>
      </ThemeProvider>
    </AlertProvider>
  );
}

export default AppPresenter;
