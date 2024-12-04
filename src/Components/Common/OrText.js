import React from "react";
import { StyleSheet, Text, View } from "react-native";

const orShared = {
  height: 14,
  width: "100%",
  position: "relative",
  alignItems: "center",
  flexDirection: "row",
};

const orStylesDatas = {
  initPage: {
    ...orShared,
    marginTop: 20,
  },
  loginPage: {
    ...orShared,
    marginTop: 136,
  },
};

const OrText = ({ type }) => {
  const orStyleData = orStylesDatas[type];
  return (
    <View style={orStyleData}>
      <View style={styles.borderOnly}></View>
      <Text style={styles.textBox}>또는</Text>
      <View style={styles.borderOnly}></View>
    </View>
  );
};

export default React.memo(OrText);

const styles = StyleSheet.create({
  borderOnlyBox: {
    height: 14,
    width: "100%",
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
  },
  borderOnly: {
    height: 1,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  textBox: {
    fontSize: 12,
    color: "#A0A0A0",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
