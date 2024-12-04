import { StyleSheet, View } from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import { WHITE } from '../../color';
import LeftBtnAndTitleHeader from '../../Components/Common/LeftBtnAndTitleHeader';
import { useNavigation } from '@react-navigation/native';
import ProfileEditOptionItem from '../../Components/Independent/Main/ProfileEditOptionItem';
import { MainStackRoutes } from '../../navigations/routes';

const CustomerEditScreen = () => {
  const navigation = useNavigation();
  const goToPrev = () => {
    navigation.goBack();
  };

  const goToCustomerListPage = () => {
    navigation.navigate(MainStackRoutes.CustomerListScreen);
  };
  const goToCustomerInquiryPage = () => {
    navigation.navigate(MainStackRoutes.CustomerInquiryPage);
  };

  const optionItems = [
    { label: '문의 목록', action: goToCustomerListPage },
    { label: '신청 하기', action: goToCustomerInquiryPage },
  ];

  return (
    <SafeAreaWrapper>
      <View style={styles.selectCon}>
        <LeftBtnAndTitleHeader title={'고객 문의'} pressFunc={goToPrev} />

        {optionItems.map((item, index) => (
          <ProfileEditOptionItem
            key={index}
            optionText={item.label}
            pressFunc={item.action}
            index={index}
          />
        ))}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  selectCon: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default CustomerEditScreen;
