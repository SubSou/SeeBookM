import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SELECTBLACK } from "../../color";

const LeftBtnAndTitleHeader = ({ title, pressFunc, fontSize = 16 }) => {
  return (
    <View style={styles.headerCon}>
      <Pressable onPress={pressFunc} style={styles.leftBtnBox}>
        <View>
          <AntDesign name="left" size={15} color="#505050" />
        </View>
      </Pressable>
      <View>
        <Text style={[styles.titleText, { fontSize: fontSize }]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCon: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  leftBtnBox: {
    position: "absolute",
    left: 0,
  },
  titleText: {
    color: SELECTBLACK,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LeftBtnAndTitleHeader;
