import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Stars from 'react-native-stars';
import { screenHeight, vScale } from '../../Normalization';
import {
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  NEARWHITE,
  SELECTBLACK,
  SIGNATURECOLOR,
  WHITE,
} from '../../color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

const ModifyCommentForm = ({ handleCommentModify, handleCloseModifyForm }) => {
  const [rating, setRating] = useState(2.5);
  const [text, setText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  useEffect(() => {
    // 키보드가 나타나고 사라지는 이벤트 구독
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      // 이벤트 구독 해제
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleUpdatePress = () => {
    if (text.length >= 1) {
      handleCommentModify(rating, text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modifyCon}>
        <View
          style={[
            styles.modifyWhiteWrap,
            {
              height: screenHeight,
              paddingTop: insets.top + 141,
              paddingBottom: 141,
            },
          ]}
        >
          <View style={styles.modifyWhiteItem}>
            <Pressable
              style={styles.modifyCancelBox}
              onPress={handleCloseModifyForm}
            >
              <View>
                <Feather name="x" size={15} color={DARKGRAY} />
              </View>
            </Pressable>

            <View style={styles.whiteItemTop}>
              <View>
                <Text style={styles.modifyTitleText}>리뷰 수정</Text>
              </View>
              <View style={styles.modifyStarTitleBox}>
                <Text style={styles.modifyStarTitle}>별점을 남겨주세요</Text>
              </View>
              <View style={styles.modifyStarBox}>
                <Stars
                  half={true}
                  default={2.5}
                  update={(val) => {
                    setRating(val);
                  }}
                  spacing={10}
                  starSize={37}
                  count={5}
                  fullStar={require('../Independent/Main/assets/bigFullStar.png')}
                  emptyStar={require('../Independent/Main/assets/bigEmptyStar.png')}
                  halfStar={require('../Independent/Main/assets/bigHalfStar.png')}
                />
              </View>
              <View style={styles.modifyContentBox}>
                <TextInput
                  placeholder="수정할 댓글을 입력해 주세요!"
                  style={styles.modifyContent}
                  value={text}
                  onChangeText={(value) => setText(value)}
                  multiline={true}
                  blurOnSubmit={true}
                  underlineColorAndroid="transparent"
                  returnKeyType="done"
                  maxLength={50}
                />
              </View>
            </View>
            <Pressable onPress={handleUpdatePress}>
              <View
                style={[
                  styles.modifyItemBottom,
                  {
                    backgroundColor:
                      text.length < 1 ? LIGHTGRAY : SIGNATURECOLOR,
                  },
                ]}
              >
                <Text style={{ color: text.length < 1 ? MEDIUMGRAY : WHITE }}>
                  수정
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.modifyBlackWrap}></View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modifyCon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  modifyWhiteWrap: {
    width: '100%',
    paddingHorizontal: 30,
  },
  modifyWhiteItem: {
    width: '100%',
    height: '100%',
    backgroundColor: WHITE,
    zIndex: 100,
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 20,
  },
  whiteItemTop: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  modifyBlackWrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
  },
  modifyTitleText: {
    fontSize: 16,
    color: SELECTBLACK,
  },
  modifyStarTitleBox: {
    marginTop: 40,
  },
  modifyStarTitle: {
    color: DARKGRAY,
    fontSize: 14,
  },
  modifyStarBox: {
    marginTop: 20,
  },
  modifyContentBox: {
    marginTop: 30,
    width: '100%',
    flex: 1,
  },
  modifyContent: {
    backgroundColor: NEARWHITE,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    textAlignVertical: 'top',
    color: DARKGRAY,
    width: '100%',
    height: '100%',
  },
  modifyItemBottom: {
    width: '100%',
    height: vScale(50),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifyCancelBox: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default ModifyCommentForm;
