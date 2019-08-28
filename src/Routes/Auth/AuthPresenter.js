import React from "react";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import PropTypes from "prop-types";
import Input from "Components/Input";
import Button from "Components/Button";

const Container = styled.div`
  min-height: 60vh;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

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

const Form = styled.div`
  width: 100%;
  /* max-width: 350px; */
  /* padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px; */
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

  button {
  }
`;

const StateChanger = styled.div`
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
              <Input placeholder={"Email"} {...email} type="email" />
              <Input placeholder={"Password"} {...password} type="password" />
              <Button text={"Log in"} />
            </form>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_KEY}
              buttonText="Google Login"
              onSuccess={responseGoogle}
              onFailure={responseFail}
            />
            <KakaoButton
              jsKey={process.env.REACT_APP_KAKAO_API_KEY}
              buttonText="Kakao Login"
              onSuccess={responseKakao}
              onFailure={responseFail}
              getProfile="true"
            />
          </>
        )}
        {action === "signUp" && (
          <>
            <form onSubmit={onSubmit}>
              <Input placeholder={"Username"} {...name} />
              <Input placeholder={"Email"} {...email} type="email" />
              <Input placeholder={"Password"} {...password} type="password" />
              <Button text={"Sign up"} />
            </form>
          </>
        )}
      </Form>

      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              Don't have an account?{" "}
              <Link onClick={() => setAction("signUp")}>Sign up</Link>
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link onClick={() => setAction("logIn")}>Log in</Link>
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
