import { Alert, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';
import CustomerMainTitle from './CustomerMainTitle';
import CustomerDropDown from './CustomerDropDown';
import CustomerMultiInput from './CustomerMultiInput';
import { WHITE } from '../../../color';
import { useEffect, useState } from 'react';
import MainSubmitButton from '../../Common/MainSubmitButton';
import { requestMainCustomerSubmit } from '../../../Api/Main/MainApi';
import { useUserContext } from '../../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '../../../contexts/MainContext ';

const dropDownSubData = [
  { label: '이벤트', value: 'EVENT' },
  { label: '계정', value: 'ACCOUNT' },
  { label: '리뷰', value: 'REVIEW' },
  { label: '책', value: 'BOOK' },
  { label: '버그', value: 'BUG' },
  { label: '건의사항', value: 'SUGGESTION' },
];

const CustomerInquiryPage = () => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext;
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [toggleData, setToggleData] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [dropMainTitle, setDropMainTitle] = useState({
    label: '문의유형 선택',
    value: 'DEFAULT',
  });

  useEffect(() => {
    if (dropMainTitle.value !== 'DEFAULT' && text.length >= 1) {
      setToggleData(true);
    } else {
      setToggleData(false);
    }
  }, [dropMainTitle, text]);

  const goToPrev = () => {
    navigation.goBack();
  };

  const handleSelectDropData = (item) => {
    if (!isSelect) {
      setIsSelect(true);
    }

    setDropMainTitle(item);
  };

  const handleText = (text) => {
    setText(text);
  };

  const handleCustomerSubmit = async () => {
    const statusData = await requestMainCustomerSubmit(
      user.header,
      dropMainTitle.value,
      text
    );

    if (statusData === 200) {
      Alert.alert(
        '안내사항',
        '문의 사항이 접수되었습니다.',
        [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.customerCon}>
        <View style={styles.customerMainWrap}>
          <LeftBtnAndTitleHeader title={'고객 문의'} pressFunc={goToPrev} />
          <CustomerMainTitle />
          <CustomerDropDown
            dropMainTitle={dropMainTitle}
            handleSelectDropData={handleSelectDropData}
            isSelect={isSelect}
            dropDownSubData={dropDownSubData}
          />
          <CustomerMultiInput value={text} onChangeText={handleText} />
        </View>
        <View style={styles.customerSubWrap}>
          <MainSubmitButton
            marginTop={0}
            toggleData={toggleData}
            msg={'제출'}
            pressFunc={handleCustomerSubmit}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  customerCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
    flex: 1,
  },
  customerMainWrap: {
    marginBottom: 100,
  },
  customerSubWrap: {
    width: '100%',
    height: 50,
  },
});

export default CustomerInquiryPage;
