import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  LIGHTGRAY,
  MEDIUMGRAY,
  SELECTBLACK,
  SIGNATURECOLOR,
} from '../../../color';
import { useState } from 'react';

const ChangeNickNameInput = ({
  errMsg,
  borderColor,
  errColor,
  handleNickNameVerification,
  ...props
}) => {
  return (
    <View style={styles.nameInputWrap}>
      <View style={[styles.nameInputBox, { borderBottomColor: borderColor }]}>
        <TextInput
          {...props}
          style={styles.nameInputText}
          placeholder="수정할 닉네임"
        />
        <Pressable onPress={handleNickNameVerification}>
          <View style={styles.checkBox}>
            <Text style={styles.checkText}>중복체크</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.nameVerifiBox}>
        <Text style={[styles.nameVerifiText, { color: errColor }]}>
          {errMsg}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameInputWrap: {
    marginTop: 58,
  },

  nameInputBox: {
    paddingBottom: 14,
    borderBottomWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameInputText: {
    color: SELECTBLACK,
  },
  checkBox: {
    borderWidth: 1,
    borderColor: SIGNATURECOLOR,
    width: 74,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  checkText: {
    fontSize: 10,
    color: SIGNATURECOLOR,
  },
  nameVerifiBox: {
    marginTop: 10,
  },
  nameVerifiText: {
    fontSize: 12,
  },
});

export default ChangeNickNameInput;
