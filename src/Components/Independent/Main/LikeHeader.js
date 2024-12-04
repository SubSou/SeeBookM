import { Pressable, StyleSheet, View } from 'react-native';
import HeaderLeftButton from '../../Common/HeaderLeftButton';
import { AntDesign } from '@expo/vector-icons';
import { LAVENDERPINK } from '../../../color';
import { useNavigation } from '@react-navigation/native';
import MainProfileTitle from '../../Common/MainProfileTitle';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';

const LikeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.likeCon}>
      <LeftBtnAndTitleHeader title={'찜 목록'} />
    </View>
  );
};

const styles = StyleSheet.create({
  likeCon: {
    paddingHorizontal: 30,
  },
});

export default LikeHeader;
