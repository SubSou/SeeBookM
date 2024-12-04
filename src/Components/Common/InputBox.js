import { Animated, Easing, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { LIGHTGRAY, MEDIUMGRAY, SELECTBLACK } from "../../color";

export const inputTypes = {
  email: "email",
  passWord: "passWord",
};

export const KeyboardTypes = {
  DEFAULT: "default",
  NUMBER: "numeric",
  EMAIL: "email-address",
};

export const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

const inputTypeStyleData = {
  email: {
    marginTop: 72,
    width: "100%",
    borderBottomWidth: 1,

    justifyContent: "center",
  },
  passWord: {
    marginTop: 48,
    width: "100%",
    borderBottomWidth: 1,

    justifyContent: "center",
  },
};

const InputBox = React.memo(({ type, title, value, inputRef, ...props }) => {
  const inputStyle = inputTypeStyleData[type];

  const transY = useRef(new Animated.Value(0));
  const fontSzie = useRef(new Animated.Value(14));
  const borderColor = useRef(new Animated.Value(0));

  const handleFocus = () => {
    animatedTransform(-20);
    animatedFontSize(12);
    animatedBorderColor(1);
  };

  const handleBlur = () => {
    animatedBorderColor(0);
    if (value) {
      return;
    }

    animatedTransform(0);
    animatedFontSize(14);
  };

  const labelColor = fontSzie.current.interpolate({
    inputRange: [12, 14],
    outputRange: [SELECTBLACK, MEDIUMGRAY],
    extrapolate: "clamp",
  });

  const chBorderColor = borderColor.current.interpolate({
    inputRange: [0, 1],
    outputRange: [LIGHTGRAY, SELECTBLACK],
    extrapolate: "clamp",
  });

  const animatedTransform = (toValue) => {
    Animated.timing(transY.current, {
      toValue,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const animatedFontSize = (toValue) => {
    Animated.timing(fontSzie.current, {
      toValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  const animatedBorderColor = (toValue) => {
    Animated.timing(borderColor.current, {
      toValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  return (
    <Animated.View style={[inputStyle, { borderBottomColor: chBorderColor }]}>
      <TextInput
        {...props}
        ref={inputRef}
        style={styles.inputContainer}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
      />
      <Animated.View
        style={[
          styles.labelContainer,
          { transform: [{ translateY: transY.current }] },
        ]}
      >
        <Animated.Text
          style={{ color: labelColor, fontSize: fontSzie.current }}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
});

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardTypes)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  secureTextEntry: PropTypes.bool,
  handleUserData: PropTypes.func,
  value: PropTypes.string,
};

// InputBox.defaultProps = {
//   keyboardType: KeyboardTypes.DEFAULT,
//   returnKeyType: ReturnKeyTypes.DONE,
//   secureTextEntry: false,
// };

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 5,
  },
  labelContainer: {
    paddingBottom: 5,
    position: "absolute",
  },
});

export default InputBox;
