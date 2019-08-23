import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const NoMatch = props => {
  const { history } = props;
  setTimeout(() => history.push("/"), 2000);
  return <Container>404</Container>;
};

export default NoMatch;
