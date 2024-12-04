import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { scale, vScale } from '../../../Normalization';
import { AntDesign } from '@expo/vector-icons';
import { DARKGRAY, LIGHTGRAY, SELECTBLACK, WHITE } from '../../../color';
import { useRef, useState } from 'react';
import DropDown from '../../Common/DropDown';

const SearchDetailDropDown = ({
  dropDownSubData,
  selectDropData,
  handleSelectDropData,
}) => {
  return (
    <View style={styles.dropDownCon}>
      <View style={styles.dropDownWrap}>
        <DropDown
          dropDownSubData={dropDownSubData}
          selectDropData={selectDropData}
          handleSelectDropData={handleSelectDropData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownCon: {
    marginTop: vScale(15),
    zIndex: 100,

    alignItems: 'flex-end',
  },
  dropDownWrap: {
    width: 60,
  },
});

export default SearchDetailDropDown;
