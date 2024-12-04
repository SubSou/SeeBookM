import { createContext, useContext, useReducer, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import { homeFormReducer, initHomeForm } from '../reducers/HomeScreenReducer';
import { Animated, Easing } from 'react-native';
import { scale } from '../Normalization';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

function generateDummyComments() {
  const comments = [];
  const maxComments = 50;

  for (let i = 1; i <= maxComments; i++) {
    const userName = `User${i}`;
    const level = `Lv${Math.floor(Math.random() * 99) + 1}`; // Lv1부터 Lv99까지 랜덤 레벨 생성

    // 랜덤 날짜 생성
    const start = new Date(2023, 0, 1); // 2023년 1월 1일
    const end = new Date(2024, 11, 31); // 2024년 12월 31일
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // 월을 2자리 문자열로 변환
    const year = String(randomDate.getFullYear()).slice(-2); // 연도의 마지막 2자리
    const commentDate = `${month}/${year}`; // "MM/YY" 형식

    const commentContent = `This is a sample comment ${i}.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

  `;
    const rating = (Math.random() * 2.5 + 2.5).toFixed(1); // 2.5 ~ 5 사이의 랜덤 별점 생성 (소수점 첫째 자리까지)

    comments.push({
      id: i,
      userName: userName,
      level: level,
      commentDate: commentDate,
      commentContent: commentContent,
      rating: parseFloat(rating), // 별점을 숫자로 변환
    });
  }

  return comments;
}

function searchIsbnData(isbn) {
  const dummyData = [];
  const searchData = [];

  const bookPrefixes = ['Book', 'Volume', 'Edition', 'Series']; // 예시 bookPrefixes
  const totalBooks = 10; // 생성할 dummyData의 총 개수

  for (let i = 0; i < totalBooks; i++) {
    const prefix = bookPrefixes[i % bookPrefixes.length]; // 순환하여 prefix 선택

    dummyData.push({
      id: i,
      imageUrl: require('../../assets/home-clock.png'), // 이미지 경로 예시: '../../assets/book_1.png'
      bookName: `${prefix} ${i}`,
      publisher: `Publisher ${i}`,
      rating: Math.random() * 2.5 + 2.5, // 2.5 ~ 5 사이의 랜덤 값
      ratingCount: 1000 + i * 50, // 각 데이터에 대해 약간씩 다른 별점 갯수 부여
      userName: `User ${i}`,
      userComment: `Comment ${i}`,
      ISBN: i === 0 ? '9791169210485' : `978123456789${i}`, // 첫 번째 데이터에 대해 특정 ISBN 값 할당
    });
  }

  // 주어진 ISBN을 사용하여 dummyData에서 검색
  const foundData = dummyData.find((book) => book.ISBN === isbn);
  if (foundData) {
    searchData.push(foundData);
  }

  return searchData;
}

export const UserProvider = ({ children }) => {
  const [form, dispatch] = useReducer(homeFormReducer, initHomeForm); // 바텀바를 스크롤할 떄 핸드폰의 범위를 벗어나게 조절하는 Reducer

  const [user, setUser] = useState(null); // 유저 정보 저장

  const [detailData, setDetailData] = useState({}); // 홈 창, 검색 창에서 책을 클릭했을 때 해당 책 정보를 저장

  const [commentDatas, setCommentDats] = useState(generateDummyComments()); // 댓글 더미 데이터

  const transFABX = useRef(new Animated.Value(scale(0))); // FAB가 X값으로 움직이는 변수

  const hasAnimated = useRef(false); // scroll 이벤트가 발생했을떄 해당 변수가 없으면 계속호출을 해 그런 현상을 방지하기 위해 사용하는 토글 변수

  const dummyData = [];

  const fadeAnim = useRef(new Animated.Value(0)).current; // 초기 투명도는 0, SignScreen에서 인증번호를 눌럿을 때 opacity를 애니메이션 조절해주는 변수

  const emailInputRef = useRef(null); //Signin Step B 이메일 포커싱
  const passwordInputRef = useRef(null); //Signin Step B 비밀번호 포커싱
  const confirmPasswordInputRef = useRef(null); //Signin Step B 비밀번호 확인 포커싱
  const nicknameInputRef = useRef(null); //Signin Step B 닉네임 포커싱

  const [userInfo, setUserInfo] = useState({
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

  for (let i = 1; i <= 30; i++) {
    dummyData.push({
      id: i,
      imageUrl: require('../../assets/home-clock.png'), // 이미지 경로 예시: '../../assets/book_1.png'
      bookName: `Book ${i}`,
      publisher: `Publisher ${i}`,
      rating: Math.random() * 2.5 + 2.5, // 2.5 ~ 5 사이의 랜덤 값
      ratingCount: 1000 + i * 50, // 각 데이터에 대해 약간씩 다른 별점 갯수 부여
      userName: `User ${i}`,
      userComment: `Comment ${i}`,
    });
  }

  const animatedMoveFAB = (toValue) => {
    Animated.timing(transFABX.current, {
      toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }; // 스크롤을 했을때 아이콘(FAB)을 움직여주는 함수

  const handleScrollEnd = () => {
    hasAnimated.current = false;
  }; // Home, Detail 페이지에서 스크롤이 멈췃을 때 아이콘(FAB)를 보여주기 위한 함수

  const stopInfiniteScroll = (toValue) => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      animatedMoveFAB(toValue);
    }
  }; // Home, Detail 페이지에서 스크롤 중일 때 아이콘(FAB)를 숨기는 함수

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
    setUserInfo({
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

  const value = {
    user,
    setUser,
    detailData,
    setDetailData,
    generateDummyComments,
    form,
    dispatch,
    animatedMoveFAB,
    transFABX,
    handleScrollEnd,
    stopInfiniteScroll,
    hasAnimated,
    commentDatas,
    setCommentDats,
    dummyData,
    fadeAnim,
    fadeIn,
    searchIsbnData,
    userInfo,
    setUserInfo,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    nicknameInputRef,
    initUserInfoData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
