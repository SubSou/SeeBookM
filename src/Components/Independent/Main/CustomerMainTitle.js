import { StyleSheet, Text, View } from "react-native";
import { SELECTBLACK } from "../../../color";

const CustomerMainTitle = () => {
  return (
    <View style={styles.mainTitleCon}>
      <Text style={styles.titleText}>도움이 필요하신가요?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitleCon: {
    marginTop: 29,
  },
  titleText: {
    fontSize: 17,
    color: SELECTBLACK,
    fontWeight: "600",
  },
});

export default CustomerMainTitle;
