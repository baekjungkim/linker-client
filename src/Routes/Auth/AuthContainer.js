import React, { useState } from "react";
import PropTypes from "prop-types";
import { useInput } from "rooks";
import { Redirect } from "react-router-dom";
import AuthPresenter from "./AuthPresenter";
// import { useMutation } from "react-apollo-hooks";
// import { LOCAL_LOG_IN } from "./AuthQueries";
import { useAlert } from "react-alert";
import { validateEmail } from "Utilities";
import { CREATE_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";

const AuthContainer = props => {
  const [action, setAction] = useState("logIn");
  const email = useInput("");
  const password = useInput("");
  const name = useInput("", { validate: value => value.length <= 8 });
  const phone = useInput("");
  // const token = "123";
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
    console.log(err);
  };

  // const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  // const [loginMutation, data] = useMutation(LOG_IN, {
  //   variables: {
  //     email: email.value,
  //     password: password.value
  //   }
  // });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      password: password.value,
      name: name.value,
      phone: phone.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (validateEmail(email.value)) {
        // console.log(data);
        // await loginMutation();
      } else {
        alert.error("이메일 형식에 맞지 않습니다.");
      }

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
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        name.value !== "" &&
        password.value !== "" &&
        phone.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            alert.error("Can't create account");
          } else {
            alert.success("계정이 생성 되었습니다.");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          alert.error("이미 사용중인 이메일입니다.");
        }
      } else {
        alert.error("작성이 완료되지 않았습니다.");
      }
    }
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
      phone={phone}
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
