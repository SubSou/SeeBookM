import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { MainFormat } from '../../../Styles/MainFormat';
import { scale } from '../../../Normalization';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';

const MainHeaderTitle = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrap}>
      <Text style={MainFormat.mainTextFormat}>SeeBook</Text>
      <Pressable
        onPress={() => {
          navigation.navigate(MainStackRoutes.SearchPage);
        }}
      >
        <AntDesign name="search1" size={scale(16)} color="#191919" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    marginTop: 30,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MainHeaderTitle;
