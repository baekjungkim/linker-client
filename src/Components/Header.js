import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import { Link } from "react-router-dom";
import Store from "store";

const Header = styled.header`
  height: 80px;
  padding: 0 40px;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  a {
    &:not(:last-child) {
      margin-right: 50px;
    }
    &:nth-last-child(2) {
      margin-right: 80px;
    }
    color: black;
    cursor: pointer;
    text-decoration: none !important;
  }
`;

export default props => {
  return (
    <Header>
      <Flex full justifyBetween alignCenter>
        <FlexItem order="1">LinkerImage</FlexItem>
        <FlexItem order="2">
          <Link to="/">홈</Link>
          <Store.Consumer>
            {store =>
              props.logged ? (
                <>
                  <Link to="/about">소개</Link>
                  <Link to="/user">내정보</Link>
                  <Link to="#">로그아웃</Link>
                </>
              ) : (
                <>
                  <Link
                    to="#"
                    onClick={() => {
                      store.route = "about";
                      store.onModal();
                    }}
                  >
                    소개
                  </Link>
                  <Link to="#" onClick={() => store.onModal()}>
                    로그인
                  </Link>
                </>
              )
            }
          </Store.Consumer>
        </FlexItem>
      </Flex>
    </Header>
  );
};
