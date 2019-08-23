import React from "react";
import PropTypes from "prop-types";
import LoginPresenter from "./LoginPresenter";

const LoginContainer = props => {
  const responseGoogle = res => {
    const {
      profileObj: { googleId: id, name, email, imageUrl: imgUrl }
    } = res;

    console.log(id, name, email, imgUrl);
    props.onLogin();
    props.setOpen(false);
  };

  const responseKakao = res => {
    const {
      profile: {
        id,
        kakao_account: { email },
        properties: { nickname: name, profile_image: imgUrl }
      }
    } = res;
    console.log(id, name, email, imgUrl);
    props.onLogin();
    props.setOpen(false);
  };

  const responseFail = err => {
    console.log(err);
  };

  return (
    <LoginPresenter
      responseGoogle={responseGoogle}
      responseKakao={responseKakao}
      responseFail={responseFail}
    />
  );
};

LoginContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default LoginContainer;
