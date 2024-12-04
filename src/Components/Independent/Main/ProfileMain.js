import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DARKGRAY, WHITE } from '../../../color';
import { scale } from '../../../Normalization';
import { useNavigation } from '@react-navigation/native';

const navigationData = {
  NoticePage: { title: 'Notice', displayName: '공지사항' },
  ReviewPage: { title: 'Review', displayName: '작성한 리뷰' },
  LikePage: { title: 'Like', displayName: '찜한 내역' },
  FAQPage: { title: 'FAQ', displayName: '자주 묻는 질문' },
  CustomerSelectPage: {
    title: 'CustomerEdit',
    displayName: '고객 문의',
  },
  TermsPage: { title: 'Terms', displayName: '약관' },
  LogoutPage: { title: 'Logout', displayName: '로그아웃' },
  DeleteAccountPage: { title: 'DeleteAccount', displayName: '회원탈퇴' },
};
const ProfileMain = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainCon}>
      {Object.entries(navigationData).map(
        ([pageKey, { title, displayName }]) => (
          <TouchableOpacity
            key={pageKey}
            onPress={() => navigation.navigate(title)}
            style={{ marginTop: 30 }}
          >
            <Text style={styles.displayNameText}>{displayName}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
    paddingLeft: 30,
  },
  displayNameText: {
    fontSize: scale(14),
    color: DARKGRAY,
  },
});

export default ProfileMain;
