import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useUserContext } from '../../../contexts/UserContext';
import { scale, vScale } from '../../../Normalization';
import {
  MEDIUMGRAY,
  NEARWHITE,
  REDCOLOR,
  SELECTBLACK,
  SIGNATURECOLOR,
} from '../../../color';

import ReadRatingBar from './ReadRatingBar';
import { Entypo } from '@expo/vector-icons';
import { useMainContext } from '../../../contexts/MainContext ';
import { requestMainProfileForUser } from '../../../Api/Main/MainApi';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';

const SearchDetailCommentItem = ({ commentData, handelOpenActionSheet }) => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();
  function formatDateProcess(dateString) {
    // 날짜 문자열을 Date 객체로 변환합니다.
    const date = new Date(dateString);

    // 월을 두 자릿수 형식으로 변환합니다. 10보다 작으면 00으로 표시합니다.
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1을 합니다.
    const formattedMonth = month < 10 ? `0${month}` : month;

    // 연도의 마지막 두 자릿수를 추출합니다.
    const year = date.getFullYear();
    const yearTwoDigits = year % 100; // 연도의 마지막 두 자릿수
    const formattedYear =
      yearTwoDigits < 10 ? `0${yearTwoDigits}` : yearTwoDigits;

    // 월과 연도를 조합하여 "MM//YY" 형식으로 변환합니다.
    const formattedDate = `${formattedMonth}/${formattedYear}`;

    return formattedDate;
  }

  const handleProfileForUser = async (userId) => {
    const { statusData, ...responseData } = await requestMainProfileForUser(
      user.header,
      userId,
      1
    );

    const commentData = {
      ...responseData.data,
      userId,
    };

    if (statusData === 200) {
      navigation.navigate(MainStackRoutes.TheirReViewPage, commentData);
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else if (statusData === 404) {
      Alert.alert('안내사항', '자신이 작성한 댓글이 아닙니다.');
    } else {
      handleSystemError();
    }
  };

  if (commentData === undefined) {
    // 로딩 상태를 보여줌
    return <Text>Loading...</Text>;
  }

  if (commentData.length < 1) {
    return (
      <View style={styles.commentNoData}>
        <Text>리뷰가 없습니다.</Text>
      </View>
    );
  }

  return commentData.map((item, index) => (
    <Pressable
      key={item.reviewId}
      onPress={() => {
        handleProfileForUser(item.userId);
      }}
    >
      <View style={styles.commentCon}>
        <View style={styles.commentHeader}>
          <View style={styles.commentHeaderLeft}>
            <Image
              source={{ uri: item.profileImage }}
              style={styles.commentHeaderImg}
            />
            <View style={styles.commentHeaderSubBox}>
              <Text style={styles.commentHeaderLvText}>
                {'Lv' + item.level}
              </Text>
              <Text style={styles.commentHeaderNameText}>{item.nickname}</Text>

              <ReadRatingBar
                ratingScore={parseFloat(item.starRating)}
                marginTop={0}
                size={10}
              />
            </View>
          </View>
          <View style={styles.commnetHeaderRight}>
            <Text style={styles.commentHeaderDateText}>
              {formatDateProcess(item.createdDate)}
            </Text>
            <Pressable
              onPress={() => handelOpenActionSheet(item.reviewId)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Entypo
                name="dots-three-vertical"
                size={scale(10)}
                color={MEDIUMGRAY}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.commentBodyTextBoxWrap}>
          <View style={styles.commentBodyTextBox}>
            <Text
              numberOfLines={4}
              ellipsizeMode="tail"
              style={styles.commentBodyText}
            >
              {item.content}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  ));
};

const styles = StyleSheet.create({
  commentCon: {
    width: '100%',
    marginTop: 25,
    height: vScale(118),
    backgroundColor: NEARWHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commnetHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  commentHeaderImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  commentHeaderSubBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentHeaderLvText: {
    fontSize: scale(10),
    color: SIGNATURECOLOR,
    marginLeft: 10,
  },
  commentHeaderNameText: {
    fontSize: scale(14),
    color: SELECTBLACK,
    fontWeight: '700',
    marginLeft: 3,
    marginRight: 8,
  },
  commentHeaderDateText: {
    fontSize: scale(10),
    color: MEDIUMGRAY,
  },
  commentBodyTextBoxWrap: {
    marginTop: 4,
  },
  commentBodyTextBox: {
    width: '100%',
  },
  commentBodyText: {
    fontSize: scale(12),
    color: MEDIUMGRAY,
  },
  commentNoData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchDetailCommentItem;
