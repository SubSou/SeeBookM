import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '../../color';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import WriteBookInfoSection from '../../Components/Independent/Main/WriteBookInfoSection';
import WriteBookInfoRating from '../../Components/Independent/Main/WriteBookInfoRating';
import React, { useState } from 'react';
import { useMainContext } from '../../contexts/MainContext ';
import { useUserContext } from '../../contexts/UserContext';
import {
  requestMainCommentWrite,
  requestMainDetailItem,
} from '../../Api/Main/MainApi';
import { useNavigation, useRoute } from '@react-navigation/native';

const CommentWriteScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const { detailData, handleTokenExpiry, handleSystemError, setDetailData } =
    useMainContext();
  const { user } = useUserContext();

  const [keyBoardY, setKeyBoardY] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const responseData = route.params;
  const bookInfoData = responseData;

  const goToDetailPage = (response) => {
    setDetailData(response.data);
    navigation.goBack();
  };

  const goToBack = () => {
    navigation.goBack();
  };

  const handleCommentWrite = async (starRating, content) => {
    if (content.length > 0) {
      const statusData = await requestMainCommentWrite(
        user.header,
        bookInfoData.bookId,
        starRating,
        content
      );

      if (statusData === 200) {
        const { statusData, ...repsonseData } = await requestMainDetailItem(
          user.header,
          bookInfoData.isbn13,
          1
        );
        if (statusData === 200) {
          goToDetailPage(repsonseData);
        } else if (statusData === 401) {
          handleTokenExpiry();
        } else {
          handleSystemError();
        }
      } else if (statusData == 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  const screenUp = () => {
    setKeyBoardY(-150);
  };

  const scrennDown = () => {
    setKeyBoardY(0);
  };

  return (
    <View style={[styles.writeCon, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{ paddingHorizontal: 30 }}>
          <HeaderLeftButton pressFunc={goToBack} />
          <WriteBookInfoSection bookInfoData={bookInfoData} />
          <WriteBookInfoRating
            screenUp={screenUp}
            scrennDown={scrennDown}
            detailData={detailData}
            handleCommentWrite={handleCommentWrite}
          />
        </View>
      </ScrollView>
    </View>
  );
});

CommentWriteScreen.displayName = 'CommentWriteScreen'; // react.memo를 사용할 떄 밑에 추가

const styles = StyleSheet.create({
  writeCon: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default CommentWriteScreen;
