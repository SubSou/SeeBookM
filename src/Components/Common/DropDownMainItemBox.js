import { Pressable, StyleSheet, Text, View } from 'react-native';
import DropDownSpinIcon from './DropDownSpinIcon';

const DropDowmMainItemBox = ({
  spin,
  toggleMaleDropdown,
  selectDropData,
  width = 50,
}) => {
  return (
    <Pressable onPress={toggleMaleDropdown}>
      <View style={[styles.mainItemCon, { width: width }]}>
        <Text>{selectDropData.label}</Text>

        <DropDownSpinIcon spin={spin} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainItemCon: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default DropDowmMainItemBox;
