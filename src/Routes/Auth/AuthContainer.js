import React, { useState } from "react";
import PropTypes from "prop-types";
import { useInput } from "rooks";
import { Redirect } from "react-router-dom";
import AuthPresenter from "./AuthPresenter";
// import { useMutation } from "react-apollo-hooks";
// import { LOCAL_LOG_IN } from "./AuthQueries";
import { useAlert } from "react-alert";

const AuthContainer = props => {
  const [action, setAction] = useState("logIn");
  const email = useInput("");
  const password = useInput("");
  const name = useInput("");
  // const token = "123";
  // const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const alert = useAlert();

  const responseGoogle = res => {
    const {
      profileObj: { googleId, name, email, imageUrl: avatarUrl }
    } = res;

    console.log(googleId, name, email, avatarUrl);
    responseSuccess();
  };

  const responseKakao = res => {
    const {
      profile: {
        id: kakaoId,
        kakao_account: { email },
        properties: { nickname: name, profile_image: avatarUrl }
      }
    } = res;
    console.log(kakaoId, name, email, avatarUrl);
    responseSuccess();
  };

  const responseSuccess = () => {
    props.offModal();
  };

  const responseFail = err => {
    console.log("err?");
    console.log(err);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      // if (email.value !== "") {
      //   try {
      //     const {
      //       data: { requestSecret }
      //     } = await requestSecretMutation();
      //     if (!requestSecret) {
      //       toast.error("You dont have an account yet, create one");
      //       setTimeout(() => setAction("signUp"), 3000);
      //     } else {
      //       toast.success("Check your inbox for your login secret");
      //       setAction("confirm");
      //     }
      //   } catch {
      //     toast.error("Can't request secret, try again");
      //   }
      // } else {
      // }
      // try {
      //   if (token !== "" && token !== undefined) {
      //     console.log("token ", token);
      //     responseSuccess();
      //   } else {
      //     throw Error();
      //   }
      // } catch {
      //   console.log("?");
      // toast.error("Email is required");
      // }
      // localLogInMutation({ variables: { token } });
    } else if (action === "confirm") {
    }
    alert.success("Oh look, an alert!");
  };

  return props.logged ? (
    <Redirect to={props.route} />
  ) : (
    <AuthPresenter
      responseGoogle={responseGoogle}
      responseKakao={responseKakao}
      responseFail={responseFail}
      setAction={setAction}
      email={email}
      password={password}
      name={name}
      onSubmit={onSubmit}
      action={action}
    />
  );
};

AuthContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
  offModal: PropTypes.func.isRequired
};

export default AuthContainer;
