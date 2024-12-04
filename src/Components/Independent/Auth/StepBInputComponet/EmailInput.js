import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  SELECTBLACK,
  SIGNATURECOLOR,
} from '../../../../color';
import React, { useEffect, useState } from 'react';
import SignCheckReslutMsg from '../../../Common/SignCheckReslutMsg';
import { useUserContext } from '../../../../contexts/UserContext';
import { KeyboardTypes, ReturnKeyTypes } from '../../../Common/InputBox';
import { useSignUpContext } from '../../../../contexts/SignUpContext';

const EmailInput = React.memo(
  ({
    isActivie,
    validateFunc,
    validInputEle,
    maxLength = 100,
    btnUse = true,
    ...props
  }) => {
    const [resultMsg, setResultMsg] = useState('');
    const [colorData, setColorData] = useState('');
    const [isSelect, setIsSelect] = useState(false);

    const handleInputActivie = () => {
      setIsSelect(true);
    };

    const handleNonInputActivie = () => {
      setIsSelect(false);
    };

    const { userInfo } = useSignUpContext();

    const { emailInputRef } = useSignUpContext();

    // 이메일을 하나라도 입력했다가 다시 아예 입력하지 않는 상태일 때 다시 이메일 에러 메시지를 초기화 해주는 useEffect
    useEffect(() => {
      setColorData('');
      setResultMsg('');
    }, [userInfo.email]);

    if (!userInfo) {
      return <View></View>;
    }

    return (
      <View style={styles.commonBox}>
        <TextInput
          {...props}
          returnKeyType={ReturnKeyTypes.DONE}
          keyboardType={KeyboardTypes.DEFAULT}
          autoCapitalize="none"
          autoCorrect={false}
          ref={emailInputRef}
          maxLength={maxLength}
          style={[
            styles.textInputAlign,
            styles.darkGrayColor,
            {
              borderBottomColor: isSelect ? SELECTBLACK : LIGHTGRAY,
            },
          ]}
          placeholder={'이메일'}
          onFocus={handleInputActivie}
          onBlur={handleNonInputActivie}
          placeholderTextColor={MEDIUMGRAY}
        />
        {btnUse ? (
          <Pressable
            onPress={async () => {
              const { msg, colorData } = await validateFunc();
              setResultMsg(msg);
              setColorData(colorData);
            }}
            style={{
              position: 'absolute',
              right: 0,
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 2,
              paddingHorizontal: 10,
              borderColor: validInputEle ? SIGNATURECOLOR : LIGHTGRAY,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 8,
                  color: validInputEle ? SIGNATURECOLOR : MEDIUMGRAY,
                }}
              >
                중복확인
              </Text>
            </View>
          </Pressable>
        ) : (
          <></>
        )}

        {btnUse ? (
          <SignCheckReslutMsg resultMsg={resultMsg} colorData={colorData} />
        ) : (
          <></>
        )}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  commonBox: {
    marginTop: 50,
  },
  textInputAlign: {
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    width: '100%',
  },
  darkGrayColor: {
    color: DARKGRAY,
  },
  rightTextWidth: {
    flex: 1,
    width: '100%',
  },
  bottomBorder: {
    borderBottomColor: LIGHTGRAY,
    borderBottomWidth: 1,
  },
});

EmailInput.displayName = 'EmailInput';

export default EmailInput;
