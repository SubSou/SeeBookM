import { Alert, Animated, StyleSheet, TextInput, View } from "react-native";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReturnKeyTypes } from "../../Common/InputBox";

import { LIGHTBEIGE, LIGHTGRAY, REDCOLOR, SELECTBLACK } from "../../../color";
import { useUserContext } from "../../../contexts/UserContext";
import EmailInput from "./StepBInputComponet/EmailInput";
import NickNameInput from "./StepBInputComponet/NickNameInput";
import PasswordInput from "./StepBInputComponet/PasswordInput";
import PasswordChkInput from "./StepBInputComponet/PasswordChkInput";
import {
  requestAuthEmail,
  requestAuthNickName,
} from "../../../Api/Auth/AuthApi";
import StepTitle from "../../Common/StepTitle";
import { useSignUpContext } from "../../../contexts/SignUpContext";

const activieData = {
  email: { activie: false, displayName: "email" },
  password: { activie: false, displayName: "password" },
  passwordCheck: { activie: false, displayName: "passwordCheck" },
  name: { activie: false, displayName: "name" },
};

const SignUpStepB = React.memo(({ offsetB, setToggleBtn }) => {
  const { userInfo, setUserInfo } = useSignUpContext();

  const { emailInputRef } = useSignUpContext(); //

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호
  const [passwordChk, setPasswordChk] = useState(""); // 비밀번호 확인
  const [nickname, setNickName] = useState(""); // 닉네임

  const [passBdColor, setPassBdColor] = useState(LIGHTGRAY);
  const [passChkBdColor, setPassChkBdColor] = useState(LIGHTGRAY);

  const [isInputActivie, setInputIsActivie] = useState(activieData); // 각 이메일, 비밀번호, 비밀번호 확인, 닉네임 input을 포커싱, non포커싱할 때 변수를 조정

  const [validInputEle, setValidInputEle] = useState({
    email: false,
    passwordCheck: false,
    passwordFormatChk: false,
    nickname: false,
  });

  useEffect(() => {
    if (
      validInputEle.email &&
      validInputEle.nickname &&
      validInputEle.passwordCheck
    ) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [validInputEle]);

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      password: password,
    });
  }, [password]);
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      nickname: nickname,
    });
  }, [nickname]);

  // 각 이름, 생년월일, 휴대폰 번호, otp를 포커싱 되었을때 밑줄에 검은색으로 변경해주는 함수
  const handleInputActivie = (target) => {
    setInputIsActivie({
      ...isInputActivie,
      [target]: { activie: true, displayName: target },
    });
  };

  // 각 이름, 생년월일, 휴대폰 번호, otp를 non포커싱 되었을때 밑줄에 회색으로 변경해주는 함수
  const handleNonInputActivie = (target) => {
    setInputIsActivie({
      ...isInputActivie,
      [target]: { activie: false, displayName: target },
    });
  };

  const successEmailData = () => {
    setValidInputEle({ ...validInputEle, email: true });
    const successData = {
      msg: "사용할 수 있는 이메일 입니다.",
      colorData: LIGHTBEIGE,
    };
    return successData;
  };

  const failEmailData = () => {
    emailInputRef.current.focus();
    setValidInputEle({ ...validInputEle, email: false });

    const fallData = {
      msg: "사용할 수 없는 이메일 입니다.",
      colorData: REDCOLOR,
    };
    return fallData;
  };

  const successNickNameData = () => {
    setValidInputEle({ ...validInputEle, nickname: true });
    const successData = {
      msg: "사용할 수 있는 닉네임 입니다.",
      colorData: LIGHTBEIGE,
    };
    return successData;
  };

  const faliNickNameData = () => {
    setValidInputEle({ ...validInputEle, nickname: false });

    const fallData = {
      msg: "사용할 수 없는 닉네임 입니다.",
      colorData: REDCOLOR,
    };
    return fallData;
  };

  const validateEmail = useCallback(async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i; // 수정된 정규식

    if (email.length === 0) {
      Alert.alert("오류", "이메일을 입력해주세요.");
      const result = failEmailData();
      return result;
    }

    if (!emailRegex.test(email)) {
      const result = failEmailData();
      return result;
    }

    try {
      const statusData = await requestAuthEmail(email);

      if (statusData === 200) {
        const result = successEmailData();

        return result;
      } else {
        const result = failEmailData();
        return result;
      }
    } catch (error) {
      const result = failEmailData();
      return result;
    }
  }, [email]);

  const validateNickName = async () => {
    const hangulConsonantVowelRegex = /[\u3131-\u314E\u314F-\u3163]/;
    const startsWithNumber = /^\d/;
    const isAllNumbers = /^\d+$/;

    if (hangulConsonantVowelRegex.test(nickname)) {
      const result = faliNickNameData();
      return result;
    } else if (startsWithNumber.test(nickname) || isAllNumbers.test(nickname)) {
      const result = faliNickNameData();
      return result;
    } else if (nickname.length < 2) {
      Alert.alert(
        "오류",
        "닉네임은 최소 2글자 이상 최대 8글자 이하까지 적어주세요."
      );
      const result = faliNickNameData();
      return result;
    } else {
      const statusData = await requestAuthNickName(nickname);

      if (statusData === 200) {
        const result = successNickNameData();
        return result;
      } else {
        const result = faliNickNameData();
        return result;
      }
    }
  };

  const handlePassword = (password) => {
    setPassword(password);

    setUserInfo({
      ...userInfo,
      password: password,
    });

    if (passwordChk.length != 0 && password.length != 0) {
      if (password == passwordChk) {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: true,
        });
        setPassBdColor(SELECTBLACK);
        setPassChkBdColor(LIGHTGRAY);
      } else {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: false,
        });
        setPassBdColor(REDCOLOR);
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      setPassBdColor(SELECTBLACK);
      setPassChkBdColor(LIGHTGRAY);
    }
  };

  const handlePasswordChk = (passwordChk) => {
    setPasswordChk(passwordChk);

    setUserInfo({
      ...userInfo,
      passwordChk: passwordChk,
    });

    if (passwordChk.length != 0 && password.length != 0) {
      if (password == passwordChk) {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: true,
        });
        setPassBdColor(LIGHTGRAY);
        setPassChkBdColor(SELECTBLACK);
      } else {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: false,
        });
        setPassBdColor(REDCOLOR);
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      setPassBdColor(LIGHTGRAY);
      setPassChkBdColor(SELECTBLACK);
    }
  };

  const handlePassFocus = (target) => {
    if (
      passwordChk.length != 0 &&
      password.length != 0 &&
      password !== passwordChk
    ) {
      if (target === "password") {
        setPassBdColor(REDCOLOR);
      } else {
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      if (target === "password") {
        setPassBdColor(SELECTBLACK);
      } else {
        setPassChkBdColor(SELECTBLACK);
      }
    }
  };

  const handlePassNonFocus = (target) => {
    if (
      passwordChk.length != 0 &&
      password.length != 0 &&
      password !== passwordChk
    ) {
      if (target === "password") {
        setPassBdColor(REDCOLOR);
      } else {
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      if (target === "password") {
        setPassBdColor(LIGHTGRAY);
      } else {
        setPassChkBdColor(LIGHTGRAY);
      }
    }
  };

  const handleEmail = (text) => {
    setEmail(text);
    setUserInfo({ ...userInfo, email: text });
    setValidInputEle({ ...validInputEle, email: false });
  };

  const handleNickName = (text) => {
    setNickName(text);
    setUserInfo({ ...userInfo, nickname: text });
    setValidInputEle({ ...validInputEle, nickname: false });
  };

  return (
    <Animated.View
      style={[
        styles.stepBCon,
        {
          transform: [{ translateX: offsetB }],
        },
      ]}
    >
      <StepTitle title="회원가입" />
      <EmailInput
        isActivie={isInputActivie.email}
        handleInputActivie={handleInputActivie}
        handleNonInputActivie={handleNonInputActivie}
        returnKeyType={ReturnKeyTypes.NEXT}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={handleEmail}
        validateFunc={validateEmail}
        validInputEle={validInputEle.email}
      />

      <PasswordInput
        isActivie={activieData.password}
        returnKeyType={ReturnKeyTypes.NEXT}
        value={password}
        onChangeText={handlePassword}
        bdColor={passBdColor}
        handlePassFocus={handlePassFocus}
        handlePassNonFocus={handlePassNonFocus}
        validInputEle={validInputEle}
      />

      <PasswordChkInput
        isActivie={activieData.passwordCheck}
        returnKeyType={ReturnKeyTypes.NEXT}
        value={passwordChk}
        onChangeText={handlePasswordChk}
        bdColor={passChkBdColor}
        handlePassFocus={handlePassFocus}
        handlePassNonFocus={handlePassNonFocus}
        validInputEle={validInputEle}
      />

      <NickNameInput
        isActivie={isInputActivie.name}
        handleInputActivie={handleInputActivie}
        handleNonInputActivie={handleNonInputActivie}
        returnKeyType={ReturnKeyTypes.DONE}
        autoCapitalize="none"
        autoCorrect={false}
        value={nickname}
        maxLength={8}
        onChangeText={handleNickName}
        validateFunc={validateNickName}
        validInputEle={validInputEle.nickname}
      />
    </Animated.View>
  );
});

SignUpStepB.displayName = "SignUpStepB";

const styles = StyleSheet.create({
  stepBCon: {
    width: "100%",

    position: "absolute",
  },
});

export default SignUpStepB;
