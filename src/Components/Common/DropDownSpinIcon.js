import { Animated, View } from "react-native";
import { DARKGRAY } from "../../color";
import { AntDesign } from "@expo/vector-icons";

const DropDownSpinIcon = ({ spin, translateY = 3.5 }) => {
  return (
    <View>
      <Animated.View
        style={{ transform: [{ translateY: translateY }, { rotate: spin }] }}
      >
        <AntDesign name="down" size={14} color={DARKGRAY} />
      </Animated.View>
    </View>
  );
};

export default DropDownSpinIcon;
