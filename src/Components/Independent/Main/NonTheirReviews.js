import { StyleSheet, Text, View } from "react-native";
import { DARKGRAY } from "../../../color";

const NonTheirReviews = () => {
  return (
    <View style={styles.nonReviewBox}>
      <Text style={styles.nonReview}>작성된 댓글이 없습니다!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nonReviewBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  nonReview: {
    fontSize: 12,
    color: DARKGRAY,
  },
});

export default NonTheirReviews;
