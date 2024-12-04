import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconImage from '../../Components/Common/IconImage';
import { Shadow } from 'react-native-shadow-2';

import { Alert, StyleSheet, View } from 'react-native';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import { NEARWHITE } from '../../color';

import TermsTextBox from '../../Components/Common/TermsTextBox';

import SignButton from '../../Components/Independent/Auth/SignButton';
import TermsMustItem from '../../Components/Independent/Auth/TermsMustItem';
import TermsOrItem from '../../Components/Independent/Auth/TermsOrItem';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../navigations/routes';

const TermsOfAuthScreen = () => {
  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  const navigation = useNavigation();

  const [terms, setTerms] = useState({
    // 약관 동의 관리, 1,2,5가 모두 동의 해야지 다음 스텝으로 진행
    term1: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
  });

  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    setIsOk(terms.term1 && terms.term2 && terms.term5);
  }, [terms]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (term) => {
    setTerms((prevTerms) => ({
      ...prevTerms,
      [term]: !prevTerms[term],
    }));
  };

  // 제출 버튼 클릭 핸들러
  const handleSubmit = () => {
    const { term1, term2, term3, term4, term5 } = terms;

    if (term1 && term2 && term5) {
      navigation.navigate(AuthRoutes.SignPage);
    } else {
      Alert.alert('필수 약관에 모두 동의해야 합니다.');
    }
  };

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          position: 'relative',
          flex: 1,
        },
      ]}
    >
      <View style={{ paddingLeft: 30 }}>
        <HeaderLeftButton pressFunc={() => navigation.goBack()} />
      </View>

      <View style={{ marginTop: 42, width: '100%', alignItems: 'center' }}>
        <IconImage />
      </View>
      <TermsTextBox text={'약관동의'} marginTop={60} />
      <View style={[style.termsContextBoxCon, { height: 200 }]}>
        <Shadow
          style={{ position: 'absolute' }}
          distance={5}
          startColor="#00000008"
        ></Shadow>

        <View style={style.termsContextBoxWrap}>
          <TermsMustItem
            text={'개인회원 약관에 동의'}
            handleCheckboxChange={handleCheckboxChange}
            term={'term1'}
          />
          <TermsMustItem
            text={'개인정보 수집 및 이용에 동의'}
            handleCheckboxChange={handleCheckboxChange}
            term={'term2'}
          />
          <TermsOrItem
            leftText={'마케팅 정보 수신 동의 '}
            rightText={' 이메일 '}
            handleCheckboxChange={handleCheckboxChange}
            term={'term3'}
          />
          <TermsOrItem
            leftText={'마케팅 정보 수신 동의 '}
            rightText={' SMS/MMS  '}
            handleCheckboxChange={handleCheckboxChange}
            term={'term4'}
          />
          <TermsMustItem
            text={'개인정보 제 3자 제공 및 위탁사항 이용약관'}
            handleCheckboxChange={handleCheckboxChange}
            term={'term5'}
          />
        </View>
      </View>

      <SignButton isOk={isOk} handleSubmit={handleSubmit} />
    </View>
  );
};

const style = StyleSheet.create({
  termsContextBoxCon: {
    width: '100%',

    backgroundColor: NEARWHITE,
    marginTop: 20,
  },
  termsContextBoxWrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
});

export default TermsOfAuthScreen;
