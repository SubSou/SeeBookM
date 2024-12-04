import { Alert, Keyboard } from "react-native";
import CarrierInput from "./StepAInputComponet/CarrierInput";
import { useRef, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { KeyboardTypes } from "../../Common/InputBox";
import OTPInput from "./StepAInputComponet/OTPInput";
import { Animated } from "react-native";
import StepTitle from "../../Common/StepTitle";
import { requestAuthOtp } from "../../../Api/Auth/AuthApi";
import { useSignUpContext } from "../../../contexts/SignUpContext";

const activieData = {
  carrierActivie: false,
  otpActivie: false,
};

const FindEmailStepA = ({
  offsetA,
  setToggleBtn,
  setToastMsg,
  title = "이메일 찾기",
}) => {
  const [isInputActivie, setInputIsActivie] = useState(activieData); // 각 통신사, otp input을 포커싱, non포커싱할 때 변수를 조정

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpNumber, setOtpNumber] = useState("");
  const [isOtp, setIsOtp] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false); // 휴대폰 인증번호 전송할 때 중복 호출되지 않게 5초동안 비활성화

  const carrierInputRef = useRef(null);

  const { userInfo, fadeIn, setUserInfo } = useSignUpContext();

  // 각 휴대폰 번호, otp를 포커싱 되었을때 밑줄에 검은색으로 변경해주는 함수
  const handleInputActivie = (target) => {
    setInputIsActivie({ ...isInputActivie, [target]: true });
  };

  // 각 휴대폰 번호, otp를 non포커싱 되었을때 밑줄에 회색으로 변경해주는 함수
  const handleNonInputActivie = (target) => {
    setInputIsActivie({ ...isInputActivie, [target]: false });
  };

  const formatPhoneNumber = (text) => {
    // 모든 공백 제거
    let cleaned = ("" + text).replace(/\D/g, "");
    let formattedNumber = "";
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
    setUserInfo({
      ...userInfo,
      phoneNumber: formatted,
      otpNumber: "",
    });
    setPhoneNumber(formatted);
    setOtpNumber("");
    setIsOtp(false);
    setToggleBtn(false);
  };

  const handleOtpSubmit = async () => {
    if (validCheckPhoneNumber() === false) {
      setIsDisabled(true);
      setToastMsg("인증번호가 전송되었어요");
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
          "시스템 오류",
          "시스템에 오류가 발생하였습니다. 좀있다 다시 시도해주세요."
        );
      }
    } else {
      carrierInputRef.current.focus();
    }
  };

  const phoneNumberErrorAlert = () => {
    Alert.alert("오류", "전화번호 형식이 올바르지 않습니다.");
  };

  const focusPhoneInput = () => {
    carrierInputRef.current.focus();
  };

  const validCheckPhoneNumber = () => {
    const cleanedPhoneNumber = phoneNumber.replace(/\s/g, "");

    if (userInfo.carrier === "") {
      Alert.alert("오류", "통신사를 먼저 선택해주세요.");
      focusPhoneInput();
    } else {
      if (cleanedPhoneNumber.length === 11) {
        return false;
      } else {
        focusPhoneInput();
        phoneNumberErrorAlert();
        return true;
      }
    }
  };

  const handleChangeOtp = (inputText) => {
    if (inputText.length != 0) {
      setToggleBtn(true);
    }
    setUserInfo({
      ...userInfo,
      otpNumber: inputText,
    });
    setOtpNumber(inputText);
  };

  const handleChangeCarrier = (carrierData) => {
    setUserInfo({ ...userInfo, carrier: carrierData });
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateX: offsetA }],
        width: "100%",
      }}
    >
      <StepTitle title={title} />
      <CarrierInput
        marginTop={50}
        handleInputActivie={handleInputActivie}
        handleNonInputActivie={handleNonInputActivie}
        carrierActivie={isInputActivie.carrierActivie}
        keyboardType={KeyboardTypes.DEFAULT}
        carrierInputRef={carrierInputRef}
        handleOtpSubmit={handleOtpSubmit}
        handleChangeCarrier={handleChangeCarrier}
        value={phoneNumber}
        onChangeText={handleChangePhone}
        isOtp={isOtp}
        isDisabled={isDisabled}
      />
      {isOtp ? (
        <OTPInput
          handleInputActivie={handleInputActivie}
          handleNonInputActivie={handleNonInputActivie}
          otpActivie={isInputActivie.otpActivie}
          value={otpNumber}
          onChangeText={handleChangeOtp}
        />
      ) : (
        <></>
      )}
    </Animated.View>
  );
};

export default FindEmailStepA;
