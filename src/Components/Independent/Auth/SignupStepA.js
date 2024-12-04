import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet } from 'react-native';
import { Animated } from 'react-native';

import NameInput from './StepAInputComponet/NameInput.js';
import BirthInput from './StepAInputComponet/BirthInput.js';
import CarrierInput from './StepAInputComponet/CarrierInput.js';
import { KeyboardTypes, ReturnKeyTypes } from '../../Common/InputBox.js';
import { PropTypes } from 'prop-types';
import OTPInput from './StepAInputComponet/OTPInput.js';
import { useUserContext } from '../../../contexts/UserContext.js';
import { requestAuthOtp } from '../../../Api/Auth/AuthApi.js';
import StepTitle from '../../Common/StepTitle.js';
import { useSignUpContext } from '../../../contexts/SignUpContext.js';

const activieData = {
  nameActivie: false,
  birthActivie: false,
  carrierActivie: false,
  otpActivie: false,
};

const SignupStepA = React.memo(({ offsetA, setToggleBtn }) => {
  const { userInfo, setUserInfo, fadeIn } = useSignUpContext();

  const nameInputRef = useRef(null);
  const birthInputRef = useRef(null);
  const carrierInputRef = useRef(null);
  /**각 컴포넌트 포커싱할 떄 사용할 변수 */

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpNumber, setOtpNumber] = useState('');

  const [isOtp, setIsOtp] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false); // 휴대폰 인증번호 전송할 때 중복 호출되지 않게 5초동안 비활성화

  const [isInputActivie, setInputIsActivie] = useState(activieData); // 각 이름, 생년월일, 통신사 input을 포커싱, non포커싱할 때 변수를 조정

  useEffect(() => {
    if (userInfo.otpNumber.length != 0) {
      setToggleBtn(true);
    }
  }, [userInfo.otpNumber]);

  // 닉네임을 작성할 떄 마다 userInfo에 데이터 전달
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      name: name,
    });
  }, [name]);

  // 생년월일을 작성할 떄 마다 userInfo에 데이터 전달
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      birthday: birthday,
    });
  }, [birthday]);

  // 휴대폰번호를 작성할 떄 마다 userInfo에 데이터 전달
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      phoneNumber: phoneNumber,
    });
  }, [phoneNumber]);

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      otpNumber: otpNumber,
    });
  }, [otpNumber]);

  // 각 이름, 생년월일, 휴대폰 번호, otp를 포커싱 되었을때 밑줄에 검은색으로 변경해주는 함수
  const handleInputActivie = (target) => {
    setInputIsActivie({ ...isInputActivie, [target]: true });
  };

  // 각 이름, 생년월일, 휴대폰 번호, otp를 non포커싱 되었을때 밑줄에 회색으로 변경해주는 함수
  const handleNonInputActivie = (target) => {
    setInputIsActivie({ ...isInputActivie, [target]: false });
  };

  // 이름, 생년월일 키보드 자판에서 다음 버튼을 눌럿을 때 다음 요소로 포커싱 해주는 함수

  const focusNextInput = (nextInputRef) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
  // ex) 이름 -> 생년월일
  const handleNameSubmit = () => {
    focusNextInput(birthInputRef);
  };

  //ex)  생년월일 -> 휴대폰 번호
  const handleBirthSubmit = () => {
    focusNextInput(carrierInputRef);
  };

  const nameErrorAlert = () => {
    Alert.alert('오류', '이름이 올바르지 않습니다.');
  };

  const birthErrorAlert = () => {
    Alert.alert('오류', '생년월이 형식이 올바르지 않습니다.');
  };

  const phoneNumberErrorAlert = () => {
    Alert.alert('오류', '전화번호 형식이 올바르지 않습니다.');
  };

  // 닉네임 검증 해주는 코드
  const vaildCheckName = () => {
    // 한글 및 공백 필터링 정규 표현식
    const hangulAndSpaceRegex = /^[\u3131-\uD79D\s]*$/;

    // 한글 자음 및 모음 필터링 정규 표현식
    const hangulConsonantVowelRegex = /[\u3131-\u314E\u314F-\u3163]/;
    if (hangulAndSpaceRegex.test(name)) {
      // 닉네임에 자음 또는 모음만 있고, 닉네임이 하나라도 작성하였을 경우
      if (hangulConsonantVowelRegex.test(name) && name !== '') {
        nameErrorAlert();
        return true;
      } else {
        if (name.length < 2) {
          // 닉네임 길이가 2글자 보다 작을 떄
          nameErrorAlert();
          return true;
        } else {
          // 닉네임 형식이 올바르게 작성하고 길이가 2글자 이상일 떄
          return false;
        }
      }
    }
  };

  // 생일 검증하는 코드
  const vaildCheckBirth = () => {
    // 숫자만 포함하는 정규 표현식
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(birthday)) {
      // 숫자로만 입력됫는데 길이가 8글자보다 작을 떄
      if (birthday.length < 8) {
        birthErrorAlert();
        return true;
        // 길이는 8글자 인데 성별을 선택을 안 했을 떄
      } else if (userInfo.gender === '') {
        Alert.alert('오류', '성별을 선택해주세요');
        return true;
        // 위에 있는 검증을 모두다 통과 하였을 떄
      } else {
        return false;
      }
    } else {
      // 숫자가 아닌 다른 공백, 문자가 포함되어 있는 경우
      birthErrorAlert();
      return true;
    }
  };

  const validCheckPhoneNumber = () => {
    const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');

    if (userInfo.carrier === '') {
      Alert.alert('오류', '통신사를 먼저 선택해주세요.');
    } else {
      if (cleanedPhoneNumber.length === 11) {
        return false;
      } else {
        phoneNumberErrorAlert();
        return true;
      }
    }
  };

  // 닉네임에 값을 변경할 때마다 값을 저장해주는 함수
  const handleChangeName = (inputText) => {
    setName(inputText);
  };

  // 생년월일 값을 변경할 때마다 값을 저장해주는 함수
  const handleChangeBirth = (inputText) => {
    setBirthday(inputText);
  };

  const formatPhoneNumber = (text) => {
    // 모든 공백 제거
    let cleaned = ('' + text).replace(/\D/g, '');
    let formattedNumber = '';
    if (cleaned.length <= 3) {
      formattedNumber = cleaned;
    } else if (cleaned.length <= 7) {
      formattedNumber = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)}`;
    } else {
      formattedNumber = `${cleaned.slice(0, 3)} ${cleaned.slice(
        3,
        7
      )} ${cleaned.slice(7, 11)}`;
    }
    return formattedNumber.trim();
  };

  // 휴대폰 번호에 값을 변경할 때마다 값을 저장해주는 함수
  const handleChangePhone = (text) => {
    // 숫자만 추출하고 공백 제거
    const formatted = formatPhoneNumber(text);

    setPhoneNumber(formatted);
  };

  const handleChangeOtp = (inputText) => {
    setOtpNumber(inputText);
  };

  const handleOtpSubmit = async () => {
    if (vaildCheckName()) {
      focusNextInput(nameInputRef);
    } else if (vaildCheckBirth()) {
      focusNextInput(birthInputRef);
    } else {
      if (validCheckPhoneNumber() === false) {
        setIsDisabled(true);

        setTimeout(() => {
          setIsDisabled(false);
        }, 5000); // 5000ms = 5초
        Keyboard.dismiss();
        const statusData = await requestAuthOtp(userInfo.phoneNumber);
        if (statusData === 200) {
          setIsOtp(true);
          fadeIn();
        } else {
          Alert.alert(
            '시스템 오류',
            '시스템에 오류가 발생하였습니다. 좀있다 다시 시도해주세요.'
          );
        }
      } else {
        focusNextInput(carrierInputRef);
      }
    }
  };

  const handleChangeCarrier = (carrierData) => {
    console.log(carrierData);
    setUserInfo({ ...userInfo, carrier: carrierData });
  };

  return (
    <Animated.View
      style={[
        styles.stepACon,
        {
          transform: [{ translateX: offsetA }],
        },
      ]}
    >
      <StepTitle title="본인확인" />
      <NameInput
        handleInputActivie={handleInputActivie}
        handleNonInputActivie={handleNonInputActivie}
        nameActivie={isInputActivie.nameActivie}
        keyboardType={KeyboardTypes.DEFAULT}
        nameInputRef={nameInputRef}
        returnKeyType={ReturnKeyTypes.NEXT}
        handleNameSubmit={handleNameSubmit}
        value={name}
        onChangeText={handleChangeName}
      />
      <BirthInput
        handleInputActivie={handleInputActivie}
        handleNonInputActivie={handleNonInputActivie}
        birthActivie={isInputActivie.birthActivie}
        returnKeyType={ReturnKeyTypes.NEXT}
        birthInputRef={birthInputRef}
        handleBirthSubmit={handleBirthSubmit}
        value={birthday}
        onChangeText={handleChangeBirth}
      />
      <CarrierInput
        handleInputActivie={handleInputActivie}
        handleNonInputActivie={handleNonInputActivie}
        carrierActivie={isInputActivie.carrierActivie}
        keyboardType={KeyboardTypes.NUMBER}
        birthInputRef={birthInputRef}
        carrierInputRef={carrierInputRef}
        handleOtpSubmit={handleOtpSubmit}
        value={phoneNumber}
        onChangeText={handleChangePhone}
        isOtp={isOtp}
        isDisabled={isDisabled}
        handleChangeCarrier={handleChangeCarrier}
      />
      {isOtp ? (
        <OTPInput
          handleInputActivie={handleInputActivie}
          handleNonInputActivie={handleNonInputActivie}
          keyboardType={KeyboardTypes.NUMBER}
          otpActivie={isInputActivie.otpActivie}
          value={otpNumber}
          onChangeText={handleChangeOtp}
        />
      ) : (
        <></>
      )}
    </Animated.View>
  );
});

SignupStepA.displayName = 'SignupStepA';

SignupStepA.propTypes = {
  offsetA: PropTypes.object,
};

const styles = StyleSheet.create({
  stepACon: {
    width: '100%',
  },
});

export default SignupStepA;
