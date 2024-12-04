import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { AuthFormat } from "../../Styles/AuthFormat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InputBox, {
  KeyboardTypes,
  ReturnKeyTypes,
  inputTypes,
} from "../../Components/Common/InputBox";
import { useEffect, useRef, useState } from "react";
import { authModeTypes } from "../../mode";
import IconImage from "../../Components/Common/IconImage";
import OrText from "../../Components/Common/OrText";
import { PropTypes } from "prop-types";
import { AuthRoutes, MainRoutes } from "../../navigations/routes";
import KakaoImage from "../../Components/Common/KakaoImage";
import LoginButton from "../../Components/Independent/Auth/LoginButton";
import LoginRecovery from "../../Components/Independent/Auth/LoginRecovery";
import LoginRegisterArea from "../../Components/Independent/Auth/LoginRegisterArea";
import { requestEmailAuthLogin } from "../../Api/Auth/AuthApi";
import SafeAreaWrapper from "../../SafeArea/SafeAreaWrapper ";
import { useSignUpContext } from "../../contexts/SignUpContext";

const LoginScreen = ({ navigation }) => {
  const { handleUser } = useSignUpContext();

  const [email, setEmail] = useState(""); // 사용자 이메일 입력
  const [password, setPassword] = useState(""); // 사용자 비밀번호 입력

  const [isBtnActive, setIsBtnActive] = useState(true);

  const emaillInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const goToTerms = () => {
    navigation.navigate(AuthRoutes.TermsPage);
  };

  const errorEmaliMsg = () => {
    Alert.alert("안내사항", "이메일 형식이 잘못되었습니다.");
  };

  const errorPasswordMsg = () => {
    Alert.alert(
      "안내사항",
      "비밀번호는 최소 8자리 최대 16자리로 입력해주시기 바랍니다."
    );
  };

  const validateNoSpaces = (input) => {
    // 공백이 있는지 확인하는 정규표현식
    const hasSpace = /\s/;

    if (hasSpace.test(input)) {
      return true; // 공백이 있으면 true 를 반환합니다.
    }

    return false; // 공백이 없으면 false를 반환합니다.
  };

  const focusEmailInput = () => {
    emaillInputRef.current.focus();
  };

  const focusPasswordInput = () => {
    passwordInputRef.current.focus();
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|con|net)$/i;

    if (validateNoSpaces(email) || !emailRegex.test(email)) {
      errorEmaliMsg();
      focusEmailInput();
      return true;
    }

    return false;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      focusPasswordInput();
      errorPasswordMsg();
      return true;
    }

    return false;
  };

  const authLogin = async () => {
    if (validateEmail() || validatePassword()) {
      return;
    } else {
      const { statusData, ...responseData } = await requestEmailAuthLogin(
        email,
        password
      );

      if (statusData === 200) {
        console.log(responseData);
        handleUser(responseData);
      } else if (statusData === 400) {
        Alert.alert("안내사항", "아이디 또는 비밀번호가 일치하지 않습니다.");
        focusEmailInput();
      } else {
        Alert.alert(
          "안내사항",
          "시스템에 오류가 발생했습니다. 다시 시도해 주세요"
        );
      }
    }
  };

  useEffect(() => {
    setIsBtnActive(!email || !password);
  }, [email, password]);

  return (
    <SafeAreaWrapper>
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <View style={AuthFormat.container}>
          <IconImage />
          <InputBox
            type={inputTypes.email}
            title={"이메일"}
            keyboardType={KeyboardTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            value={email}
            onChangeText={(email) => setEmail(email.trim())}
            inputRef={emaillInputRef}
          />
          <InputBox
            type={inputTypes.passWord}
            title={"비밀번호"}
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password.trim())}
            inputRef={passwordInputRef}
          />
          <LoginButton isBtnActive={isBtnActive} authLogin={authLogin} />
          <LoginRecovery />
          <LoginRegisterArea goToTerms={goToTerms} />
          <OrText type={authModeTypes.LOGIN} />
          <KakaoImage type={authModeTypes.LOGIN} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaWrapper>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
