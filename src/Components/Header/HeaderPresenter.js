import React, { useState } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import Store from "store";
import Login from "Components/Login";

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

const HeaderPresenter = () => {
  const [open, setOpen] = useState(false);

  return (
    <Header>
      <Flex full justifyBetween alignCenter>
        <FlexItem order="1">LinkerImage</FlexItem>
        <FlexItem order="2">
          <Link to="/">홈</Link>
          <Link to="/about">소개</Link>
          <Store.Consumer>
            {store =>
              store.logged ? (
                <Link to="/user">내정보</Link>
              ) : (
                <Link to="#" onClick={() => setOpen(true)}>
                  로그인
                </Link>
              )
            }
          </Store.Consumer>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            center
            closeOnOverlayClick={false}
            focusTrapped={false}
          >
            <Store.Consumer>
              {store => <Login onLogin={store.onLogin} setOpen={setOpen} />}
            </Store.Consumer>
          </Modal>
        </FlexItem>
      </Flex>
    </Header>
  );
};

export default HeaderPresenter;
