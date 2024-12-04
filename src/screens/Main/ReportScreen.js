import { Alert, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Components/Common/LeftBtnAndTitleHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import {
  requestMainProfileGet,
  requestMainReport,
} from '../../Api/Main/MainApi';
import { useMainContext } from '../../contexts/MainContext ';
import ReportUserNames from '../../Components/Independent/Main/ReportUserNames';

import CustomerDropDown from '../../Components/Independent/Main/CustomerDropDown';
import ReportContent from '../../Components/Independent/Main/ReportContent';
import ReportSubmitBtn from '../../Components/Independent/Main/ReportSubmitBtn';
const dropDownSubData = [
  { label: '리뷰내용', value: 'content' },
  { label: '프로필', value: 'profileImage' },
  { label: '닉네임', value: 'nickname' },
  { label: '광고 및 도배', value: 'span' },
];

const ReportScreen = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  const route = useRoute();
  const responseData = route.params;

  const [myNickName, setMyNickName] = useState(null);
  const [reportNickName, setReportNickName] = useState(null);
  const [reportUserInfo, setReportUserInfo] = useState(null);
  const [dropMainTitle, setDropMainTitle] = useState({
    label: '신고유형 선택',
    value: 'DEFAULT',
  });
  const [isSelect, setIsSelect] = useState(false);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(false);

  const goToPrevScreen = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isSelect && text.length >= 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isSelect, text]);

  useEffect(() => {
    const fetchData = async () => {
      const { statusData, ...proFileData } = await requestMainProfileGet(
        user.header
      );

      if (statusData === 200) {
        setMyNickName(proFileData.data.nickname);
        setReportUserInfo(responseData);
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    };
    fetchData();
  }, [route.params]);

  const successReport = () => {
    Alert.alert(
      '안내사항',
      '신고가 정상적으로 접수 되었습니다.',
      [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleSelectDropData = (item) => {
    if (!isSelect) {
      setIsSelect(true);
    }

    setDropMainTitle(item);
  };

  const handleUserReport = async () => {
    if (isSelect && text.length >= 1) {
      const statusData = await requestMainReport(
        user.header,
        reportUserInfo.userId,
        reportUserInfo.reviewId,
        dropMainTitle.value,
        text
      );
      if (statusData === 200) {
        successReport();
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  if (myNickName === null || reportUserInfo === null) {
    return <View></View>;
  }

  return (
    <SafeAreaWrapper>
      <View style={styles.reportCon}>
        <View>
          <LeftBtnAndTitleHeader
            pressFunc={goToPrevScreen}
            title={'신고하기'}
          />
          <ReportUserNames
            myNickName={myNickName}
            reportMyNickName={reportUserInfo.nickname}
          />
          <CustomerDropDown
            dropMainTitle={dropMainTitle}
            dropDownSubData={dropDownSubData}
            handleSelectDropData={handleSelectDropData}
            isSelect={isSelect}
          />
          <ReportContent text={text} setText={setText} />
        </View>
        <View>
          <ReportSubmitBtn isActive={isActive} pressFunc={handleUserReport} />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  reportCon: {
    paddingHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 50,
  },
});

export default ReportScreen;
