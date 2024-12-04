import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LeftBtnAndTitleHeader from '../../Components/Common/LeftBtnAndTitleHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import {
  LIGHTGRAY,
  NEARWHITE,
  SELECTBLACK,
  SIGNATURECOLOR,
  WHITE,
} from '../../color';
import { scale, vScale } from '../../Normalization';
import TheirReviewItems from '../../Components/Independent/Main/TheirReviewItems';
import NonTheirReviews from '../../Components/Independent/Main/NonTheirReviews';
import PageBtn from '../../Components/Common/PageBtn';
import { useEffect, useRef, useState } from 'react';
import { requestMainProfileForUser } from '../../Api/Main/MainApi';
import { useUserContext } from '../../contexts/UserContext';
import { useMainContext } from '../../contexts/MainContext ';

const levelData = [
  { level: 1, value: 2 },
  { level: 2, value: 5 },
  { level: 3, value: 10 },
  { level: 4, value: 20 },
  { level: 5, value: 30 },
  { level: 6, value: 40 },
  { level: 7, value: 60 },
  { level: 8, value: 80 },
  { level: 9, value: 100 },
  { level: 10, value: 100000000 },
];

const TheirReviewsScreen = () => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  const navigation = useNavigation();

  const route = useRoute();
  const responseData = route.params;

  const profileInfo = {
    nickname: responseData.nickname,
    profileImage: responseData.profileImage,
    level: responseData.level,
    levelCount: responseData.levelCount,
    endPage: responseData.endPage,
    userId: responseData.userId,
  };

  const pageNum = 3; // 화면에 버튼이 보여질 갯수
  const [prevBtnActive, setPrevBtnActivie] = useState(false); // 이전 버튼 활성화 토글
  const [nextBtnActive, setNextBtnActivie] = useState(false); // 다음 버튼 활성화 토글

  const [currentPage, setCurrentpage] = useState(1);

  const [theirReviews, setTheirReviews] = useState([
    ...responseData.reviewList,
  ]);

  const nickName = profileInfo.nickname;

  const [pageData, setPageData] = useState([]);

  const scrollViewRef = useRef(null);

  const calculatePercentage = () => {
    const data = levelData.find((item) => item.level === profileInfo.level);
    const totalCountData = {
      totalCount: data.value,
    };

    const percentData = {
      percent:
        Math.round((profileInfo.levelCount / totalCountData.totalCount) * 100) +
        '%',
    };

    return { ...totalCountData, ...percentData };
  };

  const { totalCount, percent } = calculatePercentage();

  useEffect(() => {
    console.log(profileInfo.endPage);
    let initBtnData = [];
    for (let i = 0; i < profileInfo.endPage && i < pageNum; i++) {
      initBtnData.push(i + 1);
    }
    setPageData(initBtnData);

    if (profileInfo.endPage < pageNum + 1) {
      setNextBtnActivie(false);
    } else {
      setNextBtnActivie(true);
    }
  }, []);

  useEffect(() => {
    scrollViewRef.current.scrollTo({
      y: 0,
      animated: false,
    });
  }, [theirReviews]);

  const handlePageBtn = async (papgeNumber) => {
    setCurrentpage(papgeNumber);
    const { statusData, ...responseData } = await requestMainProfileForUser(
      user.header,
      profileInfo.userId,
      papgeNumber
    );

    if (statusData === 200) {
      setTheirReviews(responseData.data.reviewList);
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else if (statusData === 404) {
      Alert.alert('안내사항', '자신이 작성한 댓글이 아닙니다.');
    } else {
      handleSystemError();
    }
  };

  const handelPrevBtnPage = () => {
    if (prevBtnActive) {
      const prevBtnData = pageData[0] - 3;
      setPageData(() => {
        let chBtnData = [];

        for (
          let i = prevBtnData;
          i < prevBtnData + pageNum && i <= profileInfo.endPage;
          i++
        ) {
          chBtnData.push(i);
        }

        setCurrentpage(chBtnData[chBtnData.length - 1]);
        handlePageBtn(chBtnData[chBtnData.length - 1]);

        if (chBtnData[0] === 1) {
          setPrevBtnActivie(false);
          setNextBtnActivie(true);
        } else {
          setPrevBtnActivie(true);
        }

        return chBtnData;
      });
    }
  };

  const handelNextBtnPage = () => {
    let firstBtnNumber = pageData[pageData.length - pageNum]; // 첫 번째 수

    if (firstBtnNumber + pageNum <= profileInfo.endPage && nextBtnActive) {
      setPrevBtnActivie(true);
      let lastBtnNumber = pageData[pageData.length - 1];

      setPageData(() => {
        let chBtnData = [];
        let firstNumber = lastBtnNumber + 1;
        for (
          let i = lastBtnNumber + 1;
          i < lastBtnNumber + 1 + pageNum && i <= profileInfo.endPage;
          i++
        ) {
          chBtnData.push(i);
        }

        setCurrentpage(chBtnData[0]);

        handlePageBtn(chBtnData[0]);

        if (firstNumber + pageNum < profileInfo.endPage) {
          setNextBtnActivie(true);
        } else {
          setNextBtnActivie(false);
        }

        return chBtnData;
      });
    }
  };

  const goToPrevScreen = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const backAction = () => {
      goToPrevScreen();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaWrapper>
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 42, flexGrow: 1 }}
        >
          <View style={styles.theirHeader}>
            <LeftBtnAndTitleHeader
              pressFunc={goToPrevScreen}
              title={nickName + ' 님의 리뷰'}
            />
            <View style={styles.headerProfileCon}>
              <View style={styles.headerProfileWrap}>
                <View style={styles.proFileImgBox}>
                  <Image
                    style={styles.proFileImg}
                    src={profileInfo.profileImage}
                  />
                </View>
                <View style={styles.proFileContentBox}>
                  <Text style={styles.proFileContentNickName}>{nickName}</Text>
                  <View style={styles.proFileLevelBox}>
                    <Text style={styles.proFileContentLevel}>
                      {' '}
                      {'Lv' + profileInfo.level}
                    </Text>
                    <View style={styles.proFileLevelExp}>
                      <View
                        style={[styles.levelExpFill, { width: percent }]}
                      ></View>
                      <View style={styles.levelExpNonFill}></View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.theirMain}>
            {theirReviews.length < 1 ? (
              <NonTheirReviews />
            ) : (
              <TheirReviewItems theirReviews={theirReviews} />
            )}
          </View>
          <PageBtn
            pageData={pageData}
            setPageData={setPageData}
            handelNextBtnPage={handelNextBtnPage}
            handelPrevBtnPage={handelPrevBtnPage}
            handlePageBtn={handlePageBtn}
            prevBtnActive={prevBtnActive}
            nextBtnActive={nextBtnActive}
            currentPage={currentPage}
          />
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  theirHeader: {
    paddingHorizontal: 20,
    backgroundColor: NEARWHITE,
    height: scale(181),
  },
  headerProfileCon: {
    height: scale(100),
    width: '100%',
    backgroundColor: WHITE,
    marginTop: 21,
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 20,
  },
  headerProfileWrap: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  proFileImgBox: {
    width: scale(60),
    height: vScale(60),
  },
  proFileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  proFileContentBox: {
    flex: 1,
    marginLeft: 15,
  },
  proFileContentNickName: {
    fontSize: 20,
    color: SELECTBLACK,
    fontWeight: '700',
  },
  proFileContentLevel: {
    color: SIGNATURECOLOR,
  },
  proFileLevelBox: {
    flexDirection: 'row',
  },
  proFileLevelExp: {
    flex: 1,
    height: vScale(15),
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  levelExpFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: SIGNATURECOLOR,
    borderRadius: 10,
    zIndex: 100,
  },
  levelExpNonFill: {
    width: '100%',
    height: '100%',
    backgroundColor: LIGHTGRAY,
    borderRadius: 10,
  },
  theirMain: {
    height: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default TheirReviewsScreen;
