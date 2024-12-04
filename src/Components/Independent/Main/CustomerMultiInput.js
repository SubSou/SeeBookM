import { StyleSheet, TextInput, View } from "react-native";
import { LIGHTGRAY, MEDIUMGRAY, SELECTBLACK } from "../../../color";
import { useState } from "react";

const CustomerMultiInput = ({ ...props }) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleNonFocus = () => {
    setIsFocus(false);
  };

  return (
    <View
      style={[
        styles.multiCon,
        { borderColor: isFocus ? SELECTBLACK : LIGHTGRAY },
      ]}
    >
      <TextInput
        {...props}
        placeholder="문의사항을 적어 제출해주세요"
        placeholderTextColor={MEDIUMGRAY}
        multiline={true}
        blurOnSubmit={true}
        underlineColorAndroid="transparent"
        returnKeyType="done"
        maxLength={150}
        onFocus={handleFocus}
        onBlur={handleNonFocus}
        textDecorationLine="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  multiCon: {
    marginTop: 10,
    height: 200,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderColor: LIGHTGRAY,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default CustomerMultiInput;
