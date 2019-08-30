import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import { Link, withRouter } from "react-router-dom";
import Store from "store";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  /* width: 100%; */
  /* height: 80px; */
  padding: 0 40px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  a {
    color: black;
    cursor: pointer;
    text-decoration: none !important;
  }
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  text-align: center;
  width: 80px;
  height: 50px;
  &:not(:last-child) {
    margin-right: 20px;
  }
  &:nth-last-child(2) {
    margin-right: 80px;
  }
  border-bottom: 5px solid
    ${props => (props.current ? props.theme.blueColor : "transparent")};
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname }, logged }) => {
  return (
    <Header>
      <Flex full justifyBetween alignCenter>
        <FlexItem order="1">LinkerImage</FlexItem>
        <FlexItem order="2">
          <List>
            <Item current={pathname === "/"}>
              <SLink to="/">Home</SLink>
            </Item>
            <Store.Consumer>
              {store =>
                logged ? (
                  <>
                    <Item current={pathname === "/about"}>
                      <SLink to="/about">About</SLink>
                    </Item>
                    <Item current={pathname === "/user"}>
                      <SLink to="/user">내정보</SLink>
                    </Item>
                    <Item>
                      <SLink to="#">로그아웃</SLink>
                    </Item>
                  </>
                ) : (
                  <>
                    <Item current={pathname === "/about"}>
                      <SLink
                        to="#"
                        onClick={() => {
                          store.route = "about";
                          store.onModal();
                        }}
                      >
                        About
                      </SLink>
                    </Item>
                    <Item>
                      <SLink to="#" onClick={() => store.onModal()}>
                        로그인
                      </SLink>
                    </Item>
                  </>
                )
              }
            </Store.Consumer>
          </List>
        </FlexItem>
      </Flex>
    </Header>
  );
});
