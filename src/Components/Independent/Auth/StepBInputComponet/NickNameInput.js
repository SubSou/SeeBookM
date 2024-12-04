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
import { ReturnKeyTypes } from '../../../Common/InputBox';

const NickNameInput = React.memo(
  ({ validateFunc, validInputEle, maxLength = 100, ...props }) => {
    const [resultMsg, setResultMsg] = useState('');
    const [colorData, setColorData] = useState('');
    const [isInputActivie, setInputIsActivie] = useState(false); // 각 비밀번호, 비밀번호 확인, 닉네임 input을 포커싱, non포커싱할 때 변수를 조정

    const { userInfo } = useUserContext();

    // 닉네임을 하나라도 입력했다가 다시 아예 입력하지 않는 상태일 때 다시 닉네임 에러 메시지를 초기화 해주는 useEffect
    useEffect(() => {
      setColorData('');
      setResultMsg('');
    }, [userInfo.nickname]);
    // 각 이름, 생년월일, 휴대폰 번호, otp를 포커싱 되었을때 밑줄에 검은색으로 변경해주는 함수
    const handleInputActivie = () => {
      setInputIsActivie(true);
    };

    // 각 이름, 생년월일, 휴대폰 번호, otp를 non포커싱 되었을때 밑줄에 회색으로 변경해주는 함수
    const handleNonInputActivie = () => {
      setInputIsActivie(false);
    };

    return (
      <View style={styles.commonBox}>
        <TextInput
          {...props}
          returnKeyType={ReturnKeyTypes.DONE}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={maxLength}
          style={[
            styles.textInputAlign,
            styles.darkGrayColor,
            {
              borderBottomColor: isInputActivie ? SELECTBLACK : LIGHTGRAY,
            },
          ]}
          placeholder={'닉네임'}
          onFocus={handleInputActivie}
          onBlur={handleNonInputActivie}
          placeholderTextColor={MEDIUMGRAY}
        />
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
            paddingVertical: 3,
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
        <SignCheckReslutMsg resultMsg={resultMsg} colorData={colorData} />
      </View>
    );
  }
);
const styles = StyleSheet.create({
  commonBox: {
    marginTop: 40,
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

NickNameInput.displayName = 'NickNameInput';

export default NickNameInput;
