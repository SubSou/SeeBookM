import { StyleSheet, View } from "react-native";
import UnderLineText from "../../Common/UnderLineText";
import { authModeTypes } from "../../../mode";
import React from "react";

const InitEmailLogin = React.memo(() => {
  return (
    <View style={styles.emailLogin}>
      <UnderLineText type={authModeTypes.INIT} title={"이메일로 로그인"} />
    </View>
  );
});

const styles = StyleSheet.create({
  emailLogin: {
    marginTop: 20,
    height: 14,
  },
});

export default InitEmailLogin;
