import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchInputBox from '../../Components/Independent/Main/SearchInputBox';
import SearchSuccess from '../../Components/Independent/Main/SearchSuccess';
import { useEffect, useState } from 'react';
import SearchFail from '../../Components/Independent/Main/SearchFail';
import { useNavigation, useRoute } from '@react-navigation/native';

import { WHITE } from '../../color';
import { useUserContext } from '../../contexts/UserContext';
import { requestMainTextSearchBook } from '../../Api/Main/MainApi';
import { useMainContext } from '../../contexts/MainContext ';
import SearchShow from '../../Components/Independent/Main/SearchShow';
import Spinner from '../../Components/Common/Spinner';

const SearchScreen = () => {
  const { handleTokenExpiry } = useMainContext();
  const { user } = useUserContext();

  const insets = useSafeAreaInsets();

  const [bookName, setBookName] = useState('');

  const [isClick, setIsClick] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const goToHomePage = () => {
    navigation.goBack();
  };

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(0);
  const [isSpinner, setIsSpinner] = useState(false);

  const dropDownSubData = [
    { label: '전체', value: 'Keyword' },
    { label: '제목', value: 'Title' },
    { label: '저자', value: 'Author' },
    { label: '출판사', value: 'Publisher' },
  ];

  const [selectDropData, setDropData] = useState({
    label: '전체',
    value: 'Keyword',
  });

  const handleSelectDropData = (data) => {
    setDropData(data);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
      loadMoreData(currentPage + 1);
    }
  };

  const loadMoreData = async (current) => {
    if (currentPage > endPage) {
      return;
    } else {
      const { statusData, ...responseData } = await requestMainTextSearchBook(
        user.header,
        bookName,
        current,
        selectDropData.value
      );

      if (statusData === 200) {
        setData((prevData) => [...prevData, ...responseData.data]); // 이전 데이터와 새로운 데이터 합치기
        setCurrentPage(current);
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        Alert.alert(
          '안내사항',
          '시스템에 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    }
  };

  const handleSearch = async (page, querType) => {
    if (bookName.length < 1) {
      Alert.alert('안내사항', '책을 먼저 작성해주세요.');
    } else {
      if (!isClick) {
        setIsClick(true);
      }

      setIsSpinner(true);

      const { statusData, ...responseData } = await requestMainTextSearchBook(
        user.header,
        bookName,
        page,
        querType
      );
      console.log(statusData);

      if (statusData === 200) {
        setData(responseData.data);
        setCurrentPage(1);
        setEndPage(responseData.endPage);
      } else if (statusData === 401) {
        Alert.alert(
          '안내사항',
          '유효시간이 만료되었습니다. 다시 로그인해주세요.'
        );
      } else {
        Alert.alert(
          '안내사항',
          '시스템에 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    }
  };

  useEffect(() => {
    if (route.params) {
      const { avgStar, reviewCount, isbn13 } = route.params;
      // 상태 업데이트

      setData((prevData) =>
        prevData.map(
          (item) =>
            item.isbn13 === isbn13
              ? { ...item, avgStar, totalReviewCount: reviewCount } // 일치하는 항목의 avgStar, reviewCount 업데이트
              : item // 다른 항목은 그대로 유지
        )
      );
    }
  }, [route.params]);

  useEffect(() => {
    if (data) {
      setIsSpinner(false);
    }
  }, [data]);

  return (
    <View style={{ backgroundColor: WHITE, flex: 1 }}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        style={{
          paddingTop: insets.top,
        }}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <HeaderLeftButton pressFunc={goToHomePage} />
        </View>
        <SearchInputBox
          value={bookName}
          onChangeText={(book) => setBookName(book)}
          handleSearch={handleSearch}
          dropDownSubData={dropDownSubData}
          selectDropData={selectDropData}
          handleSelectDropData={handleSelectDropData}
        />
        {isSpinner ? <Spinner /> : <SearchShow data={data} isClick={isClick} />}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
