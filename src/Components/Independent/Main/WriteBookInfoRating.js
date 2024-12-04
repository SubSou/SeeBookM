import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Pressable,
} from 'react-native';
import {
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  NEARWHITE,
  SIGNATURECOLOR,
  WHITE,
} from '../../../color';
import { scale, vScale } from '../../../Normalization';
import Stars from 'react-native-stars';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../../contexts/UserContext';
import { PropTypes } from 'prop-types';

const WriteBookInfoRating = ({
  screenUp,
  scrennDown,
  detailData,
  handleCommentWrite,
}) => {
  const [rating, setRating] = useState(0);

  const [text, setText] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        screenUp();
        // 키보드가 나타날 때 호출되는 함수
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        scrennDown();
        // 키보드가 숨겨질 때 호출되는 함수
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.wrtieBookInfoCon}>
      <Text style={styles.InfoText}>별점을 남겨주세요</Text>
      <View style={styles.InfoStarWrap}>
        <Stars
          half={true}
          default={0}
          update={(val) => {
            setRating(val);
          }}
          spacing={1}
          starSize={37}
          count={5}
          fullStar={require('./assets/bigFullStar.png')}
          emptyStar={require('./assets/bigEmptyStar.png')}
          halfStar={require('./assets/bigHalfStar.png')}
        />
      </View>
      <View style={styles.InfoMulTextWrap}>
        <TextInput
          placeholder="책과 무관한 내용 및 욕설 등은 삭제될 수 있어요"
          style={styles.InfoMulTextInput}
          onFocus={screenUp}
          onBlur={scrennDown}
          value={text}
          onChangeText={(value) => setText(value)}
          multiline={true}
          blurOnSubmit={true}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          maxLength={50}
          textDecorationLine="none"
        />
      </View>

      <Pressable
        onPress={() => {
          // navigation.goBack();
          handleCommentWrite(rating, text);
        }}
        style={{ width: '100%', marginTop: 72 }}
      >
        <View
          style={[
            styles.InfoBtn,
            {
              backgroundColor: text.length >= 1 ? SIGNATURECOLOR : LIGHTGRAY,
            },
          ]}
        >
          <Text style={{ color: text.length >= 1 ? WHITE : MEDIUMGRAY }}>
            리뷰 남기기
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

WriteBookInfoRating.propTypes = {
  screenUp: PropTypes.func,
  scrennDown: PropTypes.func,
};

const styles = StyleSheet.create({
  wrtieBookInfoCon: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
  },
  InfoText: {
    color: DARKGRAY,
    fontSize: scale(14),
  },
  InfoStarWrap: {
    marginTop: 20,
  },
  InfoMulTextWrap: {
    marginTop: 30,
    width: '100%',
    height: vScale(190),
  },

  InfoBtn: {
    width: '100%',
    height: vScale(50),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  InfoMulTextInput: {
    height: '100%',
    backgroundColor: NEARWHITE,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    textAlignVertical: 'top',
    color: DARKGRAY,
  },
  customPlaceholder: {
    position: 'absolute',
    top: 15,
    left: 20,
    color: MEDIUMGRAY,
  },
});

export default WriteBookInfoRating;
