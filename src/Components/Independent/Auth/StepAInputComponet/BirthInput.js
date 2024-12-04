import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  BLACK,
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  SELECTBLACK,
  WHITE,
} from '../../../../color';

import { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { PropTypes } from 'prop-types';
import { useUserContext } from '../../../../contexts/UserContext';
import { useSignUpContext } from '../../../../contexts/SignUpContext';
import { KeyboardTypes } from '../../../Common/InputBox';

const maleData = {
  male: { title: 'male', displayName: '남자' },
  female: { title: 'female', displayName: '여자' },
  default: { title: 'default', displayName: '성별' },
};

const BirthInput = ({
  handleInputActivie,
  handleNonInputActivie,
  birthActivie,
  birthInputRef,
  handleBirthSubmit,
  ...props
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;

  const [useMale, setUseMale] = useState(maleData['default']);

  const { userInfo, setUserInfo } = useSignUpContext();

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
        toValue: 80, // 높이를 메뉴 항목 수에 맞게 설정
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
    <View style={styles.birthBox}>
      <TextInput
        {...props}
        keyboardType={KeyboardTypes.NUMBER}
        onSubmitEditing={handleBirthSubmit}
        ref={birthInputRef}
        placeholder="생년월일(YYYYMMDD)"
        style={[
          styles.leftTextWidth,
          styles.darkGrayColor,
          styles.bottomBorder,
          {
            borderBottomColor: birthActivie ? SELECTBLACK : LIGHTGRAY,
          },
        ]}
        onFocus={() => {
          handleInputActivie('birthActivie');
        }}
        onBlur={() => {
          handleNonInputActivie('birthActivie');
        }}
        maxLength={8}
        placeholderTextColor={MEDIUMGRAY}
        selectionColor={BLACK}
      />
      <Pressable
        style={[styles.rightTextWidth, styles.bottomBorder, styles.dropDownCon]}
        onPress={() => {
          toggleMaleDropdown();
        }}
      >
        <Text
          style={{
            color: useMale.displayName === '성별' ? MEDIUMGRAY : DARKGRAY,
          }}
        >
          {useMale.displayName}
        </Text>

        <View>
          <Animated.View
            style={{ transform: [{ translateY: 3.5 }, { rotate: spin }] }}
          >
            <AntDesign name="down" size={14} color={DARKGRAY} />
          </Animated.View>
        </View>
        <Animated.View
          style={[styles.dropDownWrap, { height: animatedHeight }]}
        >
          <Pressable
            onPress={() => {
              toggleMaleDropdown();
              setUseMale(maleData['male']);
              setUserInfo({
                ...userInfo,
                gender: 'MALE',
              });
            }}
          >
            <View style={[styles.dropDownTextBox, styles.bottomBorder]}>
              <Text>남자</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              toggleMaleDropdown();
              setUseMale(maleData['female']);
              setUserInfo({
                ...userInfo,
                gender: 'FEMALE',
              });
            }}
          >
            <View style={styles.dropDownTextBox}>
              <Text>여자</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </View>
  );
};

BirthInput.propTypes = {
  handleInputActivie: PropTypes.func,
  handleNonInputActivie: PropTypes.func,
  birthActivie: PropTypes.bool,
  birthInputRef: PropTypes.object,
  handleBirthSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
  birthBox: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 20,
  },
  leftTextWidth: {
    width: '70%',
    textAlignVertical: 'top',
    borderBottomWidth: 1,
  },
  darkGrayColor: {
    color: DARKGRAY,
  },
  bottomBorder: {
    borderBottomColor: LIGHTGRAY,
    borderBottomWidth: 1,
  },
  rightTextWidth: {
    flex: 1,
    width: '100%',
  },
  dropDownCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  dropDownWrap: {
    position: 'absolute',
    width: '100%',
    top: '100%',
    backgroundColor: WHITE,
    elevation: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  dropDownTextBox: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BirthInput;
