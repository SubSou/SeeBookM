import { Pressable, StyleSheet, Text, View } from "react-native";
import { DARKGRAY, LIGHTGRAY } from "../../../color";

const CustomerDropDownSubItem = ({
  item,
  toggleMaleDropdown,
  handleSelectDropData,
}) => {
  const handleSubItem = (item) => {
    handleSelectDropData(item);
    toggleMaleDropdown();
  };

  return (
    <Pressable
      onPress={() => {
        handleSubItem(item);
      }}
      style={styles.curSubDropDownItemBox}
    >
      <View style={styles.curSubDropDownItem}>
        <Text style={styles.curSubDropDownText}>{item.label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  curSubDropDownItemBox: {
    width: "100%",
  },

  curSubDropDownItem: {
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  curSubDropDownText: {
    color: DARKGRAY,
  },
});

export default CustomerDropDownSubItem;
