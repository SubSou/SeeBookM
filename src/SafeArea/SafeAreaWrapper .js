import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '../color';
const SafeAreaWrapper = ({ children }) => {
  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: WHITE,
      }}
    >
      {children}
    </View>
  );
};
export default SafeAreaWrapper;
