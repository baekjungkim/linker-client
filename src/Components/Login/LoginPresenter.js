import React from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import PropTypes from "prop-types";

const Container = styled.div``;

const KakaoButton = styled(KakaoLogin)`
  display: inline-block;
  padding: 0;
  width: 222px;
  height: 49px;
  line-height: 49px;
  color: #3c1e1e;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  :hover {
    box-shadow: 0 1px rgba(0, 0, 0, 0.12), 0 2px rgba(0, 0, 0, 0.24);
  }
`;

const LoginPresenter = props => {
  return (
    <Container>
      <h1>로그인 화면입니다</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        buttonText="Google Login"
        onSuccess={props.responseGoogle}
        onFailure={props.responseFail}
      />
      <KakaoButton
        jsKey={process.env.REACT_APP_KAKAO_API_KEY}
        buttonText="Kakao Login"
        onSuccess={props.responseKakao}
        onFailure={props.responseFail}
        getProfile="true"
      />
    </Container>
  );
};

LoginPresenter.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
  responseKakao: PropTypes.func.isRequired,
  responseFail: PropTypes.func.isRequired
};

export default LoginPresenter;
