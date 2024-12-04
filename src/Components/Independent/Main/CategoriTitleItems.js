import { StyleSheet, View } from "react-native";
import CategoriTItleItem from "./CategoriTItleItem";
import { WHITE } from "../../../color";

const CategoriTitleItems = ({
  formattedData,
  selectedTitle,
  handleTitleSelect,
}) => {
  // formattedData가 있는지 확인하고 map 함수를 통해 JSX를 반환
  return (
    <View style={styles.titleCon}>
      {formattedData &&
        Object.keys(formattedData).map((title, index) => (
          <CategoriTItleItem
            key={index}
            index={index}
            title={title}
            selectedTitle={selectedTitle}
            handleTitleSelect={handleTitleSelect}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  titleCon: {
    flexDirection: "row",

    backgroundColor: WHITE,
    paddingVertical: 22,
    paddingLeft: 30,
    height: 65,
  },
});

export default CategoriTitleItems;
