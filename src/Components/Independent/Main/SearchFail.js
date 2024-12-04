import { StyleSheet, Text, View } from 'react-native';

const SearchFail = ({ isClick }) => {
  return (
    <View style={styles.failCon}>
      {isClick ? (
        <Text>검색된 책이 없습니다</Text>
      ) : (
        <Text>책을 검색해 주세요!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  failCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchFail;
