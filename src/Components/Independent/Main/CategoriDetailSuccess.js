import { ScrollView, StyleSheet, View } from 'react-native';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';
import EdgeBooks from '../../Common/EdgeBooks';
import { useNavigation } from '@react-navigation/native';

const CategoriDetailSuccess = ({ data, handleIsbnData, handleScroll }) => {
  const navigation = useNavigation();
  const goToPrev = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.successCon}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <LeftBtnAndTitleHeader
            pressFunc={goToPrev}
            title={'원하는 책을 선택하세요!'}
          />
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <EdgeBooks data={data} handleIsbnData={handleIsbnData} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  successCon: {
    flex: 1,
  },
});

export default CategoriDetailSuccess;
