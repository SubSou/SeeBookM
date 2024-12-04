import { StyleSheet, View } from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Common/HeaderLeftButton';
import { useNavigation } from '@react-navigation/native';
import ProfileEditOptionItem from './ProfileEditOptionItem';
import { MainStackRoutes } from '../../../navigations/routes';

const ProfileEditOptions = () => {
  const navigation = useNavigation();

  const goToPrev = () => {
    navigation.goBack();
  };

  const goToNickNameChangePage = () => {
    navigation.navigate(MainStackRoutes.ProfileNickNameChangePage);
  };

  const goToPasswordChangePage = () => {
    navigation.navigate(MainStackRoutes.ProfilePasswordChangePage);
  };

  const optionItems = [
    { label: '닉네임 변경', action: goToNickNameChangePage },
    { label: '비밀번호 변경', action: goToPasswordChangePage },
  ];

  return (
    <SafeAreaWrapper>
      <View style={styles.optionsCon}>
        <HeaderLeftButton pressFunc={goToPrev} />

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
  optionsCon: {
    paddingHorizontal: 30,
  },
});

export default ProfileEditOptions;
