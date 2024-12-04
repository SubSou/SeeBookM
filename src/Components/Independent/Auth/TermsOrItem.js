import { StyleSheet, Text, View } from "react-native";
import { SELECTBLACK, TERMSAF } from "../../../color";
import CheckCircle from "../../Common/CheckCircle";

const TermsOrItem = ({ leftText, rightText, handleCheckboxChange, term }) => {
  return (
    <View style={style.termsContentWrap}>
      <View style={style.itemCon}>
        <View style={style.itemBox}>
          <Text style={{ color: SELECTBLACK }}>{leftText}</Text>
          <View style={style.itemCircle}></View>
          <Text style={{ color: SELECTBLACK }}>{rightText}</Text>
          <Text style={{ color: TERMSAF }}>(선택)</Text>
        </View>
        <CheckCircle handleCheckboxChange={handleCheckboxChange} term={term} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  termsContentWrap: {
    width: "100%",

    paddingRight: 30,
  },
  itemCon: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemBox: {
    marginLeft: 33,
    alignItems: "center",
    flexDirection: "row",
  },
  itemCircle: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: SELECTBLACK,
  },
});

export default TermsOrItem;
