import React from "react";
import { Image, StyleSheet, View } from "react-native";

const IconImage = React.memo(() => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require("../../../assets/SeebookIcon.png")}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 88,
    height: 88.75,
    marginTop: 82,
  },
});

export default IconImage;
