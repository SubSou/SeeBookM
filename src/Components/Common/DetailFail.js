import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailFail = () => {
  const navigation = useNavigation();

  const goToPrev = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.failCon}>
      <Text style={styles.failText}>검색된 책이 없어요!</Text>
      <Pressable onPress={goToPrev}>
        <Text style={styles.goBackText}>돌아가기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  failCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  failText: {
    marginBottom: 20,
  },
  goBackText: {
    color: '#A0A0A0', // 텍스트 색상
    textDecorationLine: 'underline', // 밑줄
    textDecorationColor: '#A0A0A0', // 밑줄 색상
    fontSize: 12, // 텍스트 크기
  },
});

export default DetailFail;
