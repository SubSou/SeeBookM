import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MEDIUMGRAY, SELECTBLACK } from '../../../color';

const ImagePickHeader = ({ title, onSelect, goToPrev, isSelectedColor }) => {
  return (
    <View style={styles.headerCon}>
      <Pressable onPress={goToPrev}>
        <View>
          <AntDesign name="left" size={15} color="#505050" />
        </View>
      </Pressable>
      <View>
        <Text style={[styles.titleText, { fontSize: 16 }]}>{title}</Text>
      </View>
      <Pressable onPress={onSelect}>
        <View>
          <Text style={{ color: isSelectedColor ? SELECTBLACK : MEDIUMGRAY }}>
            완료
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCon: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleText: {
    color: SELECTBLACK,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImagePickHeader;
