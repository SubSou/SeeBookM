import { Pressable, StyleSheet, Text, View } from "react-native";
import { LIGHTGRAY, MEDIUMGRAY } from "../../../color";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "../../../navigations/routes";

const LoginRecovery = () => {
  const navigation = useNavigation();

  const goToFindEmail = () => {
    navigation.navigate(AuthRoutes.FindEmailPage);
  };

  const goToPrevFindPassword = () => {
    navigation.navigate(AuthRoutes.PasswordChangeVerificationPage);
  };

  return (
    <View style={styles.recoveryStyle}>
      <View
        style={{
          paddingRight: 10,
          borderRightColor: LIGHTGRAY,
          borderRightWidth: 1,
        }}
      >
        <Pressable onPress={goToFindEmail}>
          <Text style={[styles.textMediumColor, styles.smallFontSize]}>
            이메일
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          paddingLeft: 10,
        }}
      >
        <Pressable onPress={goToPrevFindPassword}>
          <Text style={[styles.textMediumColor, styles.smallFontSize]}>
            비밀번호 찾기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recoveryStyle: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  smallFontSize: {
    fontSize: 12,
  },
  textMediumColor: {
    color: MEDIUMGRAY,
  },
});

export default LoginRecovery;
