import { StyleSheet, TextInput, View } from 'react-native';
import {
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  REDCOLOR,
  WHITE,
} from '../../../../color';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import SignCheckReslutMsg from '../../../Common/SignCheckReslutMsg';
import { useUserContext } from '../../../../contexts/UserContext';
import { ReturnKeyTypes } from '../../../Common/InputBox';

const PasswordInput = React.memo(
  ({
    isActivie,
    bdColor,
    handlePassFocus,
    handlePassNonFocus,
    marginTop = 40,
    validInputEle,
    ...props
  }) => {
    return (
      <View style={[styles.commonBox, { marginTop: marginTop }]}>
        <TextInput
          {...props}
          style={[
            styles.textInputAlign,
            styles.darkGrayColor,
            {
              borderBottomColor: bdColor,
            },
          ]}
          returnKeyType={ReturnKeyTypes.NEXT}
          placeholder={'비밀번호'}
          onFocus={() => {
            handlePassFocus(isActivie.displayName);
          }}
          onBlur={() => {
            handlePassNonFocus(isActivie.displayName);
          }}
          placeholderTextColor={MEDIUMGRAY}
          maxLength={16}
          secureTextEntry
        />
      </View>
    );
  }
);

PasswordInput.propTypes = {
  handleInputActivie: PropTypes.func,
  handleNonInputActivie: PropTypes.func,
  title: PropTypes.string,
  props: PropTypes.object,
};

const styles = StyleSheet.create({
  commonBox: {
    flexDirection: 'row',
    gap: 20,
  },
  textInputAlign: {
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    width: '100%',
    color: DARKGRAY,
  },

  bottomBorder: {
    borderBottomColor: LIGHTGRAY,
    borderBottomWidth: 1,
  },
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
