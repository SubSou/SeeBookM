import { StyleSheet, Text, View } from "react-native";
import CheckCircle from "../../Common/CheckCircle";

const TermsYear = () => {
  return (
    <View style={style.termsYearCon}>
      <View style={style.termsYearWrap}>
        <View style={style.termsYearItemBox}>
          <Text>1년 </Text>
          <CheckCircle />
        </View>
        <View style={style.termsYearItemBox}>
          <Text>3년 </Text>
          <CheckCircle />
        </View>
        <View style={style.termsYearItemBox}>
          <Text>5년 </Text>
          <CheckCircle />
        </View>
        <View style={style.termsYearItemBox}>
          <Text>탈퇴시 </Text>
          <CheckCircle />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  termsYearCon: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  termsYearWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  termsYearItemBox: {
    flexDirection: "row",
  },
});

export default TermsYear;
