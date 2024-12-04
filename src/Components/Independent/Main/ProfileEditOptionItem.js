import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DARKGRAY, LIGHTGRAY } from '../../../color';
import { AntDesign } from '@expo/vector-icons';

const ProfileEditOptionItem = ({ optionText, index, pressFunc }) => {
  return (
    <Pressable onPress={pressFunc}>
      <View style={[styles.optionItemBox, { marginTop: index != 0 ? 30 : 45 }]}>
        <Text style={styles.itemText}>{optionText}</Text>
        <AntDesign name="right" size={13} color="#505050" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  optionItemBox: {
    width: '100%',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: DARKGRAY,
    fontSize: 19,
  },
});

export default ProfileEditOptionItem;
