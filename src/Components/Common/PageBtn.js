import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { DARKGRAY, SELECTBLACK, TERMSAF } from "../../color";

const PageBtn = ({
  pageData,
  setPageData,
  handelNextBtnPage,
  handelPrevBtnPage,
  handlePageBtn,
  prevBtnActive,
  nextBtnActive,
  currentPage,
}) => {
  return (
    <View style={styles.pageBtnCon}>
      <Pressable onPress={handelPrevBtnPage}>
        <View>
          <AntDesign
            name="left"
            size={14}
            color={prevBtnActive ? DARKGRAY : TERMSAF}
          />
        </View>
      </Pressable>

      <View style={styles.pageBtnNumber}>
        {pageData.map((item, index) => {
          return (
            <Pressable key={index} onPress={() => handlePageBtn(item)}>
              <View>
                <Text
                  style={
                    item === currentPage
                      ? styles.seleceNumber
                      : styles.nonSelectNumber
                  }
                >
                  {item}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <Pressable onPress={handelNextBtnPage}>
        <View>
          <AntDesign
            name="right"
            size={14}
            color={nextBtnActive ? DARKGRAY : TERMSAF}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pageBtnCon: {
    width: "100%",
    marginTop: 79,
    paddingHorizontal: 110,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  pageBtnNumber: {
    gap: 20,
    flexDirection: "row",
  },
  seleceNumber: {
    color: SELECTBLACK,
    fontWeight: "600",
  },
  nonSelectNumber: {
    color: TERMSAF,
  },
});

export default PageBtn;
