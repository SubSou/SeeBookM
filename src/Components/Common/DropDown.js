import { Animated, Easing, StyleSheet, View } from 'react-native';
import DropDowmMainItemBox from './DropDownMainItemBox';
import { useRef, useState } from 'react';
import DropDownSubItem from './DropDownSubItem';
import { WHITE } from '../../color';

const DropDown = ({
  dropDownSubData,
  selectDropData,
  handleSelectDropData,
  itemHeight = 40,
  width = 50,
}) => {
  const buttonRotation = useRef(new Animated.Value(0)).current;
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const subItemHeignt = itemHeight;
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
    <View style={{ position: 'relative' }}>
      <DropDowmMainItemBox
        spin={spin}
        toggleMaleDropdown={toggleMaleDropdown}
        selectDropData={selectDropData}
        width={width}
      />

      <Animated.View style={[styles.subBoxItem, { height: animatedHeight }]}>
        {dropDownSubData.map((item, index) => (
          <DropDownSubItem
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
  subBoxItem: {
    position: 'absolute',
    overflow: 'hidden',
    top: '100%',
    backgroundColor: WHITE,
    elevation: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },
});

export default DropDown;
