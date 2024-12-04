import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DARKGRAY, LIGHTGRAY, MEDIUMGRAY, WHITE } from '../../../color';
import { AntDesign } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import DropDownSpinIcon from '../../Common/DropDownSpinIcon';
import CustomerDropDownSubItem from './CustomerDropDownSubItem';

const CustomerDropDown = ({
  dropMainTitle,
  handleSelectDropData,
  isSelect,
  dropDownSubData,
}) => {
  const buttonRotation = useRef(new Animated.Value(0)).current;
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const subItemHeignt = 46;
  const subItemLength = dropDownSubData.length;

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggleMaleDropdown = () => {
    if (isDropdownVisible) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setDropdownVisible(false);
      });

      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      setDropdownVisible(true);
      Animated.timing(animatedHeight, {
        toValue: subItemHeignt * subItemLength, // 높이를 메뉴 항목 수에 맞게 설정
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      Animated.spring(buttonRotation, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.cusMainDropDownCon}>
      <Pressable onPress={toggleMaleDropdown}>
        <View style={styles.cusMainDropDownWrap}>
          <Text style={{ color: isSelect ? DARKGRAY : MEDIUMGRAY }}>
            {dropMainTitle.label}
          </Text>
          <DropDownSpinIcon translateY={0} spin={spin} />
        </View>
      </Pressable>
      <Animated.View
        style={[styles.curSubDropDownCon, { height: animatedHeight }]}
      >
        {dropDownSubData.map((item, index) => (
          <CustomerDropDownSubItem
            key={index}
            item={item}
            toggleMaleDropdown={toggleMaleDropdown}
            handleSelectDropData={handleSelectDropData}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cusMainDropDownCon: {
    marginTop: 15,
    width: '100%',
    height: 46,
    borderColor: LIGHTGRAY,
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 100,
  },
  cusMainDropDownWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
    height: '100%',
  },
  cusMainDropDownText: {
    color: MEDIUMGRAY,
  },

  curSubDropDownCon: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    top: '100%',
    alignItems: 'center',
    backgroundColor: WHITE,
    elevation: 2,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  curSubDropDownItemBox: {
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  curSubDropDownText: {
    color: DARKGRAY,
  },
});

export default CustomerDropDown;
