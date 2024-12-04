import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "../../Normalization";
import { SELECTBLACK } from "../../color";

import { MainFormat } from "../../Styles/MainFormat";
import RightIcon from "./RightIcon";
import React from "react";

const MainReviewTitle = React.memo(
  ({ isIconUse = false, title, isMargin = false, pressFunc = () => {} }) => {
    return (
      <Pressable onPress={pressFunc}>
        <View style={style.reviewTitleWrap}>
          <Text style={MainFormat.mainTextFormat}>{title}</Text>
          {isIconUse ? <RightIcon isMargin={isMargin} /> : <></>}
        </View>
      </Pressable>
    );
  }
);

const style = StyleSheet.create({
  reviewTitleWrap: {
    paddingHorizontal: 30,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MainReviewTitle;
