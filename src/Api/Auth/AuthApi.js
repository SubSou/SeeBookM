import axios from "axios";

import { localHost } from "../ApiLocalHost";

function processNoSpaces(target) {
  const noSpaces = target.replace(/\s+/g, "");
  return noSpaces;
}

function processFormatBirthDay(birthday) {
  const formatBirhthDay = processNoSpaces(birthday);

  const year = formatBirhthDay.substring(0, 4);
  const month = formatBirhthDay.substring(4, 6);
  const day = formatBirhthDay.substring(6, 8);
  return `${year}-${month}-${day}`;
}

export const requestAuthOtp = async (phoneNumber) => {
  const formatPhoneNumber = processNoSpaces(phoneNumber);
  try {
    const response = await axios.post(`${localHost}/api/user/send-otp`, {
      phoneNumber: formatPhoneNumber,
    });

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestAuthPhoneOtpNumber = async (phoneNumber, otp) => {
  const formatPhoneNumber = processNoSpaces(phoneNumber);
  const formatOtpNumber = processNoSpaces(otp);
  console.log(formatPhoneNumber, formatOtpNumber);

  try {
    const response = await axios.post(`${localHost}/api/user/verify-otp`, {
      phoneNumber: formatPhoneNumber,
      otp: formatOtpNumber,
    });

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestAuthEmail = async (email) => {
  const formatEmail = processNoSpaces(email);
  console.log(formatEmail);

  try {
    const response = await axios.get(
      `${localHost}/api/user/duplication-email?email=${formatEmail}`
    );
    console.log(response);
    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestAuthNickName = async (nickcname) => {
  const formatNickName = processNoSpaces(nickcname);

  try {
    const response = await axios.get(
      `${localHost}/api/user/validation-nickname?nickname=${formatNickName}`
    );
    console.log(response.status);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestAuthSign = async (
  email,
  password,
  nickname,
  name,
  gender,
  birthday,
  phoneNumber
) => {
  const formatEmail = processNoSpaces(email);
  const formatPassword = processNoSpaces(password);
  const formatNickName = processNoSpaces(nickname);
  const formatName = processNoSpaces(name);
  const formatGender = processNoSpaces(gender);
  const formatBirthDay = processFormatBirthDay(birthday); //  0000-00-00
  const formatPhoeNumber = processNoSpaces(phoneNumber); //  01012345678

  try {
    const response = await axios.post(`${localHost}/api/user/signup`, {
      email: formatEmail,
      password: formatPassword,
      nickname: formatNickName,
      name: formatName,
      gender: formatGender,
      birthday: formatBirthDay,
      phoneNumber: formatPhoeNumber,
    });

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const requestEmailAuthLogin = async (email, password) => {
  const formatEmail = processNoSpaces(email);
  const formatPassword = processNoSpaces(password);

  try {
    const response = await axios.post(`${localHost}/api/user/login`, {
      email: formatEmail,
      password: formatPassword,
    });
    console.log(response);

    const responseData = {
      header: response.headers.authorization,
      data: response.data,
      statusData: response.status,
    };

    return responseData;
  } catch (error) {
    console.log(error);
    return { statusData: error.response.status };
  }
};

export const requestFindEmail = async (phoneNumber, otp) => {
  const formatPhoneNumber = processNoSpaces(phoneNumber);
  const formatOtpNumber = processNoSpaces(otp);

  try {
    const response = await axios.post(`${localHost}/api/user/find-email`, {
      phoneNumber: formatPhoneNumber,
      otp: formatOtpNumber,
    });
    console.log(response);
    const responseData = { data: response.data.email, status: response.status };
    return responseData;
  } catch (error) {
    console.log(error.response);
    const responseData = { status: error.response.data.code };
    return responseData;
  }
};

export const requestKakaoLogin = async (data) => {
  try {
    const response = await axios.get(
      `${localHost}/api/user/oauth/kakao/login?code=${data}`
    );

    const responseData = {
      header: response.headers.authorization,
      data: response.data,
      statusData: response.status,
    };

    return responseData;
  } catch (error) {
    return { statusData: error.response.status };
  }
};

export const requestKakaoSignUp = async (
  kakaoId,
  email,
  password,
  nickname,
  name,
  gender,
  birthday,
  phoneNumber
) => {
  const formatEmail = processNoSpaces(email);
  const formatPassword = processNoSpaces(password);
  const formatNickName = processNoSpaces(nickname);
  const formatName = processNoSpaces(name);
  const formatGender = processNoSpaces(gender).toUpperCase();
  const formatBirthDay = birthday; //  0000-00-00
  const formatPhoeNumber = processNoSpaces(phoneNumber); //  01012345678

  try {
    const response = await axios.post(
      `${localHost}/api/user/oauth/kakao/total-signup`,
      {
        kakaoId: kakaoId,
        email: formatEmail,
        password: formatPassword,
        nickname: formatNickName,
        name: formatName,
        gender: formatGender,
        birthday: formatBirthDay,
        phoneNumber: formatPhoeNumber,
      }
    );

    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestAuthChangePassword = async (email, password) => {
  const formatEmail = processNoSpaces(email);
  const formatPassword = processNoSpaces(password);

  try {
    const response = await axios.put(`${localHost}/api/user/change-password`, {
      email: formatEmail,
      password: formatPassword,
    });

    return response.status;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
};

export const requestLatestReviewList = async () => {
  try {
    const response = await axios.get(`${localHost}/api/main/home/review-list`);

    const repsonseData = {
      data: response.data,
      statusData: response.status,
    };

    return repsonseData;
  } catch (error) {
    console.log(error.response);
    return { statusData: error.response.status };
  }
};
