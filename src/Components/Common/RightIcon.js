import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RightIcon = ({ isMargin = true }) => {
  return (
    <View style={{ marginLeft: isMargin ? 10 : 0 }}>
      <AntDesign name="right" size={15} color="#505050" />
    </View>
  );
};

export default RightIcon;
