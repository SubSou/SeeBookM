import { StyleSheet, Text, View } from "react-native";
import { SELECTBLACK } from "../../../color";

import { PropTypes } from "prop-types";

import CheckCircle from "../../Common/CheckCircle";
import ItemStar from "../../Common/ItemStar";
import RightIcon from "../../Common/RightIcon";

const TermsMustItem = ({ text, handleCheckboxChange, term }) => {
  return (
    <View style={style.termsContentWrap}>
      <View style={style.itemCon}>
        <ItemStar />
        <View style={style.itemBox}>
          <Text style={{ color: SELECTBLACK }}>{text}</Text>

          <RightIcon />
        </View>
        <CheckCircle handleCheckboxChange={handleCheckboxChange} term={term} />
      </View>
    </View>
  );
};

TermsMustItem.propTypes = {
  text: PropTypes.string.isRequired,
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
});

export default TermsMustItem;
