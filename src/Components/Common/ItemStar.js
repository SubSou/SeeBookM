import { StyleSheet, Text } from "react-native";
import { TERMSSTAR } from "../../color";

const ItemStar = () => {
  return <Text style={style.itemStar}>*</Text>;
};

const style = StyleSheet.create({
  itemStar: {
    position: "absolute", // 절대 위치 설정
    top: "50%", // 상위 요소의 50% 위치로 이동
    transform: [{ translateY: -7 }], // 별표를 위로 이동
    left: 20,
    color: TERMSSTAR,
  },
});

export default ItemStar;
