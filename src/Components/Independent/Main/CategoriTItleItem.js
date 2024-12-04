import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LIGHTGRAY, SELECTBLACK, TERMSAF, WHITE } from "../../../color";

const CategoriTItleItem = ({
  title,
  index,
  selectedTitle,
  handleTitleSelect,
}) => {
  return (
    <TouchableOpacity
      key={title}
      style={{
        paddingRight: index === 0 ? 26 : 0,
        borderRightWidth: index === 0 ? 1 : 0,
        borderRightColor: index === 0 ? LIGHTGRAY : WHITE,
        paddingLeft: index === 0 ? 0 : 26,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => handleTitleSelect(title)}
    >
      <Text
        style={[
          styles.titleText,
          { color: title === selectedTitle ? SELECTBLACK : TERMSAF },
        ]}
      >
        {title === "국내도서" ? "국내" : "해외"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CategoriTItleItem;
