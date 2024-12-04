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
import { ReturnKeyTypes } from '../../../Common/InputBox';
import { useSignUpContext } from '../../../../contexts/SignUpContext';

const PasswordChkInput = React.memo(
  ({
    isActivie,
    bdColor,
    handlePassFocus,
    handlePassNonFocus,
    validInputEle,
    ...props
  }) => {
    const { userInfo } = useSignUpContext();

    const [passErrmsg, setPassErrmsg] = useState('');
    const [passErrColor, setPassErrColor] = useState(WHITE);

    useEffect(() => {
      console.log(userInfo);
      if (
        userInfo.passwordChk.length != 0 &&
        userInfo.password.length != 0 &&
        validInputEle.passwordCheck === false
      ) {
        setPassErrmsg('비밀번호가 일치하지 않아요.');
        setPassErrColor(REDCOLOR);
      } else {
        setPassErrmsg('');

        setPassErrColor(WHITE);
      }
    }, [userInfo.passwordChk, userInfo.password, validInputEle]);

    return (
      <View style={styles.commonBox}>
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
          placeholder={'비밀번호 확인'}
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

        <SignCheckReslutMsg
          resultMsg={passErrmsg}
          colorData={passErrColor}
          customStyles={{ left: 0 }}
        />
      </View>
    );
  }
);

PasswordChkInput.propTypes = {
  handleInputActivie: PropTypes.func,
  handleNonInputActivie: PropTypes.func,
  title: PropTypes.string,
  props: PropTypes.object,
};

const styles = StyleSheet.create({
  commonBox: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 40,
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

PasswordChkInput.displayName = 'PasswordChkInput';

export default PasswordChkInput;
