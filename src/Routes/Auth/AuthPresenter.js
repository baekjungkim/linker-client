import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import PropTypes from "prop-types";
import Input from "Components/Input";
import Button from "Components/Button";

const Container = styled.div`
  padding-top: 10px;
  min-height: 40vh;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const GoogleButton = styled(GoogleLogin)`
  width: 140px;
  margin-right: 10px;
`;

const KakaoButton = styled(KakaoLogin)`
  display: inline-block;
  padding: 0;
  width: 140px;
  height: 45px;
  line-height: 49px;
  color: #3c1e1e;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
`;

const Form = styled.div`
  width: 100%;
  padding: 30px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const StateChanger = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const AuthPresenter = ({
  action,
  onSubmit,
  setAction,
  email,
  password,
  name,
  phone,
  responseGoogle,
  responseKakao,
  responseFail
}) => {
  return (
    <Container>
      <Form>
        {action === "logIn" && (
          <>
            <form onSubmit={onSubmit}>
              <Input placeholder={"이메일"} {...email} type="email" />
              <Input placeholder={"비밀번호"} {...password} type="password" />
              <Button text={"로그인"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <form onSubmit={onSubmit}>
              <Input placeholder={"이메일"} {...email} type="email" />
              <Input
                placeholder={"휴대폰번호"}
                {...phone}
                type="tel"
                pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
              />
              <Input placeholder={"사용자이름"} {...name} />
              <Input placeholder={"비밀번호"} {...password} type="password" />
              <Button text={"Sign up"} />
            </form>
          </>
        )}
      </Form>
      <Flex justifyBetween alignCenter>
        <FlexItem>
          <GoogleButton
            clientId={process.env.REACT_APP_GOOGLE_API_KEY}
            buttonText="Google Login"
            onSuccess={responseGoogle}
            onFailure={responseFail}
          />
        </FlexItem>
        <FlexItem>
          <KakaoButton
            jsKey={process.env.REACT_APP_KAKAO_API_KEY}
            buttonText="Kakao Login"
            onSuccess={responseKakao}
            onFailure={responseFail}
            getProfile="true"
          />
        </FlexItem>
      </Flex>

      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              계정이 없으신가요?{" "}
              <Link onClick={() => setAction("signUp")}>회원가입</Link>
            </>
          ) : (
            <>
              계정이 있으신가요?{" "}
              <Link onClick={() => setAction("logIn")}>로그인</Link>
            </>
          )}
        </StateChanger>
      )}
    </Container>
  );
};

AuthPresenter.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
  responseKakao: PropTypes.func.isRequired,
  responseFail: PropTypes.func.isRequired
};

export default AuthPresenter;
