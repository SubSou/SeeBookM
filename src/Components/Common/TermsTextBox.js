import { StyleSheet, Text, View } from "react-native";
import { SELECTBLACK } from "../../color";
import ItemStar from "./ItemStar";

const TermsTextBox = ({ text, marginTop }) => {
  return (
    <View style={[style.termsBox, { marginTop }]}>
      <ItemStar />
      <Text style={style.termsBoxText}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  termsBox: {
    width: "100%",
    paddingLeft: 30,
  },
  termsBoxText: {
    fontSize: 16,
    color: SELECTBLACK,
    fontWeight: "500",
  },
});

export default TermsTextBox;
