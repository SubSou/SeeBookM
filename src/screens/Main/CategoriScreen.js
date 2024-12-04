import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// 가상의 CSV 데이터 (실제 데이터는 categoriData에서 가져옵니다)
import { categoriData } from '../../FormatCategoriData';
import { LIGHTGRAY, SELECTBLACK, WHITE } from '../../color';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import { vScale, scale } from '../../Normalization';
import { HomeFormTypes } from '../../reducers/HomeScreenReducer';
import CategoriTitleItems from '../../Components/Independent/Main/CategoriTitleItems';
import CategoriContent from '../../Components/Independent/Main/CategoriContent';
import CategoriSpaceBlock from '../../Components/Independent/Main/CategoriSpaceBlock';
import { requestMainCategoriGetData } from '../../Api/Main/MainApi';
import { useUserContext } from './../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../navigations/routes';

const CategoriScreen = ({ dispatch }) => {
  const { user, handleTokenExpiry, handleSystemError } = useUserContext();
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState({});
  const [selectedTitle, setSelectedTitle] = useState('국내도서'); // 기본값 설정
  const [selected1depth, setSelected1depth] = useState(null);
  const [selected2depth, setSelected2depth] = useState(null);
  const [scrollMode, setScrollMode] = useState(true); // 현재 scrollMode가 무엇인지 저장하는 변수
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수

  useEffect(() => {
    // CSV 데이터를 줄 단위로 나누기
    const rows = categoriData.trim().split('\n');
    setData(rows);
  }, []);

  useEffect(() => {
    // 데이터가 업데이트된 후 객체 형태로 변환
    const transformData = (data) => {
      const result = {};

      data.forEach((item) => {
        const [title, depth1, depth2] = item.split(',');

        if (!['국내도서', '외국도서'].includes(title)) return; // 타이틀 필터링

        if (!result[title]) {
          result[title] = {};
        }

        if (!result[title][depth1]) {
          result[title][depth1] = new Set();
        }

        result[title][depth1].add(depth2);
      });

      // Set을 Array로 변환
      for (const title in result) {
        for (const depth1 in result[title]) {
          result[title][depth1] = Array.from(result[title][depth1]);
        }
      }

      return result;
    };

    const transformedData = transformData(data);
    setFormattedData(transformedData);
  }, [data]);

  useEffect(() => {
    // 기본값으로 '국내도서'가 설정되면, 관련 1depth와 2depth 항목을 초기화
    setSelected1depth(null);
    setSelected2depth(null);
  }, [selectedTitle]);

  useEffect(() => {
    // 기본값으로 '국내도서'가 설정되면, 관련 1depth와 2depth 항목을 초기화
    if (formattedData[selectedTitle]) {
      const firstDepth1 = Object.keys(formattedData[selectedTitle])[0];
      setSelected1depth(firstDepth1); // 국내도서의 첫 번째 1depth 값 설정
    }
    setSelected2depth(null);
  }, [formattedData, selectedTitle]);

  const goToCategoriDetailPage = (responseData, cName) => {
    navigation.navigate(MainStackRoutes.CategoriDetailPage, {
      ...responseData,
      cName,
    });
  };

  const handleTitleSelect = (title) => {
    setSelectedTitle(title);
    if (formattedData[title]) {
      const firstDepth1 = Object.keys(formattedData[title])[0]; // 첫 번째 1depth 가져오기
      setSelected1depth(firstDepth1); // 1depth 설정
    }
    setSelected2depth(null); // 2depth 선택 초기화
  };

  const handle1depthSelect = (depth1) => {
    setSelected1depth(depth1);
    setSelected2depth(null); // 2depth 선택 초기화
  };

  const handle2depthSelect = async (depth2) => {
    setSelected2depth(depth2);

    const cName = `${selectedTitle}>${selected1depth}>${depth2}`;
    const { statusData, ...responseData } = await requestMainCategoriGetData(
      user.header,
      cName,
      1
    );
    console.log(responseData);
    if (statusData === 200) {
      goToCategoriDetailPage(responseData, cName);
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const updateHomeForm = (value) => {
    dispatch({ type: HomeFormTypes.UPDATE_TAB_BOTTOM, value });
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    if (contentOffset.y < prevScrollY || contentOffset.y <= 0) {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Up이면 실행 x
      if (!(scrollMode == 'Up')) {
        setScrollMode('Up');

        updateHomeForm(20);
      }
    } else {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Down이면 실행 x
      if (!(scrollMode == 'Down')) {
        setScrollMode('Down');

        updateHomeForm(-100);
      }
    }

    // 이전 스크롤 위치 업데이트
    setPrevScrollY(contentOffset.y);
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* 제목 버튼들 (국내도서, 외국도서) */}
        <CategoriTitleItems
          formattedData={formattedData}
          selectedTitle={selectedTitle}
          handleTitleSelect={handleTitleSelect}
        />

        <CategoriSpaceBlock />

        {/* 선택된 제목에 대한 1depth와 2depth 항목 표시 */}
        {selectedTitle && (
          <CategoriContent
            formattedData={formattedData}
            handle1depthSelect={handle1depthSelect}
            selected1depth={selected1depth}
            handle2depthSelect={handle2depthSelect}
            selectedTitle={selectedTitle}
          />
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: WHITE,
    paddingVertical: 22,
    paddingLeft: 30,
    height: 65,
  },

  selectedTitle: {
    color: SELECTBLACK,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
  },

  contentContainer: {
    flexDirection: 'row',
  },

  rightColumn: {
    flex: 1,
    marginLeft: 20,

    marginRight: 20,
  },
  depth1Button: {
    width: scale(80),
    height: vScale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  depth1BorderCon: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
  },
  depth1Text: {
    color: SELECTBLACK,
    fontWeight: '500',
    fontSize: 14,
  },
  depth1Boder: {
    backgroundColor: LIGHTGRAY,
    height: '100%',
  },
  depth2Button: {
    paddingVertical: 21,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
  },
  depth2Text: {
    color: SELECTBLACK,
    fontWeight: '500',
  },
  selectedDepth: {
    backgroundColor: '#ddd',
  },
  depthText: {
    marginBottom: 5,
  },
});

export default CategoriScreen;
