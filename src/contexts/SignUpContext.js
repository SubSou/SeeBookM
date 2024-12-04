import { createContext, useContext, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Alert, Animated, Easing } from 'react-native';
import { useUserContext } from './UserContext';

const SignUpContext = createContext();

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const { user, setUser } = useUserContext();

  const fadeAnim = useRef(new Animated.Value(0)).current; // 초기 투명도는 0, SignScreen에서 인증번호를 눌럿을 때 opacity를 애니메이션 조절해주는 변수

  const inputRefs = {
    emailInputRef: useRef(null),
    passwordInputRef: useRef(null),
    confirmPasswordInputRef: useRef(null),
    nicknameInputRef: useRef(null),
  };

  const emailInputRef = useRef(null); //Signin Step B 이메일 포커싱
  const passwordInputRef = useRef(null); //Signin Step B 비밀번호 포커싱
  const confirmPasswordInputRef = useRef(null); //Signin Step B 비밀번호 확인 포커싱
  const nicknameInputRef = useRef(null); //Signin Step B 닉네임 포커싱

  const [userInfo, setUserInfo] = useState({
    kakaoId: 0,
    email: '',
    password: '',
    nickname: '',
    name: '',
    gender: '',
    birthday: '',
    phoneNumber: '',
    carrier: '',
    passwordChk: '',
    otpNumber: '',
    isBtn: false,
  }); // 사용자가 회원 가입할 떄 저장하는 객체 변수

  const [isMain, setIsMain] = useState(false); // 메인에서 비밀번호 찾기를 이동할 떄 사용하는 변수

  const moveStep = (width, offsetA, offsetB) => {
    Animated.timing(offsetA, {
      toValue: -width,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(offsetB, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeIn = () => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // 애니메이션 지속 시간 (밀리초 단위)
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    // 3초 후 페이드 아웃 애니메이션
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 애니메이션 지속 시간 (밀리초 단위)
        useNativeDriver: true,
      }).start();
    }, 3000); // 3초 후 실행
  };

  const initUserInfoData = () => {
    setIsMain(false);
    setUserInfo({
      kakaoId: 0,
      email: '',
      password: '',
      nickname: '',
      name: '',
      gender: '',
      birthday: '',
      phoneNumber: '',
      carrier: '',
      passwordChk: '',
      otpNumber: '',
      isBtn: false,
    });
  };
  const handleUser = (data) => {
    setUser(data);
  };

  const validatePasswordFormat = () => {
    const validations = [
      /^.{8,16}$/, // 8~16자리 길이
      /[a-z]/, // 소문자 하나 이상 포함
      /[A-Z]/, // 대문자 하나 이상 포함
      /[0-9]/, // 숫자 하나 이상 포함
      /[!@#$%^&*(),.?":{}|<>]/, // 특수문자 하나 이상 포함
      /^\S*$/, // 공백 포함 금지
    ];

    let isValid = true;
    validations.forEach((regex) => {
      if (!regex.test(userInfo.password)) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSystemError = () => {
    Alert.alert('안내사항', '시스템에 오류가 발생했습니다. 다시 시도해 주세요');
  };

  const value = {
    inputRefs,
    userInfo,
    setUserInfo,
    fadeIn,
    fadeOut,
    initUserInfoData,
    handleUser,
    validatePasswordFormat,
    moveStep,
    fadeAnim,
    handleSystemError,
    isMain,
    setIsMain,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    nicknameInputRef,
  };

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};

SignUpProvider.propTypes = {
  children: PropTypes.node,
};

export default SignUpContext;
