import { StyleSheet, Text, View } from 'react-native';

const LikeNoItem = () => {
  return (
    <View style={styles.likeCon}>
      <Text>찜한 내역이 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  likeCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikeNoItem;
