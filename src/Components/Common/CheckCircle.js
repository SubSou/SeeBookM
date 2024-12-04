import { Animated, Easing, Pressable, StyleSheet } from "react-native";
import { TERMSAF, WHITE, SIGNATURECOLOR } from "../../color";
import { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const CheckCircle = ({ handleCheckboxChange, term }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const bkColorValue = useRef(new Animated.Value(0)).current;

  const chBkColor = bkColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [WHITE, SIGNATURECOLOR],

    extrapolate: "clamp",
  });

  const chBorderColor = bkColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [TERMSAF, SIGNATURECOLOR],
    extrapolate: "clamp",
  });

  const [check, setCheck] = useState(true);

  const handleIcon = () => {
    const toggleValue = check ? 1 : 0;
    setCheck(!check);
    animatedIconCheckColor();
    animatedIconBkColor(toggleValue);
    handleCheckboxChange(term);
  };

  const animatedIconCheckColor = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
    ]).start();
  };

  const animatedIconBkColor = (toValue) => {
    Animated.timing(bkColorValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  return (
    <Pressable
      onPress={() => {
        handleIcon();
      }}
    >
      <Animated.View
        style={[
          style.iconBox,
          { backgroundColor: chBkColor, borderColor: chBorderColor },
        ]}
      >
        <Animated.View style={{ opacity: opacity, zIndex: 99 }}>
          {check ? (
            <AntDesign name="down" size={15} color={TERMSAF} />
          ) : (
            <AntDesign name="down" size={15} color={WHITE} />
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  iconBox: {
    width: 20,
    height: 20,
    borderRadius: 10,

    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckCircle;
