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
  SIGNATURECOLOR,
  WHITE,
} from '../../../../color';

import { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { PropTypes } from 'prop-types';
import { useUserContext } from '../../../../contexts/UserContext';

const carrierData = {
  SKT: { title: 'SKT', displayName: 'SKT' },
  KT: { title: 'KT', displayName: 'KT' },
  LG: { title: 'LG', displayName: 'LG' },
  default: { title: 'default', displayName: '통신사' },
};

const CarrierInput = ({
  handleInputActivie,
  handleNonInputActivie,
  carrierActivie,
  carrierInputRef,
  handleOtpSubmit,
  handleChangeCarrier,
  isOtp,
  marginTop = 30,
  isDisabled,
  ...props
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;

  const [useCarrier, setUseCarrier] = useState(carrierData['default']);

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
        toValue: 120, // 높이를 메뉴 항목 수에 맞게 설정
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
    <View style={[styles.carrierBox, { marginTop: marginTop }]}>
      <Pressable
        disabled={isDisabled}
        style={[styles.rightTextWidth, styles.bottomBorder, styles.dropDownCon]}
        onPress={() => {
          toggleMaleDropdown();
        }}
      >
        <Text
          style={{
            color: useCarrier.displayName === '통신사' ? MEDIUMGRAY : DARKGRAY,
          }}
        >
          {useCarrier.displayName}
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
              handleChangeCarrier(carrierData['SKT'].title);
              // setUserInfo({ ...userInfo, carrier: carrierData['SKT'].title });
              setUseCarrier(carrierData['SKT']);
            }}
          >
            <View style={[styles.dropDownTextBox, styles.bottomBorder]}>
              <Text>SKT</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              toggleMaleDropdown();
              handleChangeCarrier(carrierData['KT'].title);
              // setUserInfo({ ...userInfo, carrier: carrierData['KT'].title });
              setUseCarrier(carrierData['KT']);
            }}
          >
            <View style={[styles.dropDownTextBox, styles.bottomBorder]}>
              <Text>KT</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              toggleMaleDropdown();
              handleChangeCarrier(carrierData['LG'].title);
              // setUserInfo({ ...userInfo, carrier: carrierData['LG'].title });
              setUseCarrier(carrierData['LG']);
            }}
          >
            <View style={styles.dropDownTextBox}>
              <Text>LG</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
      <TextInput
        {...props}
        ref={carrierInputRef}
        placeholder="휴대폰 번호"
        style={[
          styles.leftTextWidth,
          styles.darkGrayColor,
          styles.bottomBorder,
          {
            borderBottomColor: carrierActivie ? SELECTBLACK : LIGHTGRAY,
          },
        ]}
        onFocus={() => {
          handleInputActivie('carrierActivie');
        }}
        onBlur={() => {
          handleNonInputActivie('carrierActivie');
        }}
        placeholderTextColor={MEDIUMGRAY}
        selectionColor={BLACK}
        maxLength={13}
      />
      <View
        style={{
          position: 'absolute',
          right: 10,
          height: '100%',
        }}
      >
        <Pressable onPress={handleOtpSubmit}>
          <View
            style={{
              backgroundColor: WHITE,
              borderWidth: 1,
              borderColor: isOtp ? SIGNATURECOLOR : LIGHTGRAY,
              borderRadius: 15,
              paddingHorizontal: isOtp ? 6 : 10,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: isOtp ? SIGNATURECOLOR : MEDIUMGRAY,
              }}
            >
              {isOtp ? '인증번호 재전송' : '인증번호 전송'}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

CarrierInput.propTypes = {
  handleInputActivie: PropTypes.func,
  handleNonInputActivie: PropTypes.func,
  handleOtpSubmit: PropTypes.func,
  carrierActivie: PropTypes.bool,
  carrierInputRef: PropTypes.object,
};

const styles = StyleSheet.create({
  carrierBox: {
    flexDirection: 'row',
    gap: 20,
    zIndex: 90,
  },
  leftTextWidth: {
    width: '70%',
    borderBottomWidth: 1,

    textAlignVertical: 'top',
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

export default CarrierInput;
