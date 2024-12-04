import { Alert, Pressable, StyleSheet, View } from 'react-native';
import SearchContentItemBox from './SearchContentItemBox';
import { useUserContext } from '../../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';
import React, { useState } from 'react';
import { requestMainDetailItem } from '../../../Api/Main/MainApi';
import { useMainContext } from './../../../contexts/MainContext ';

const SearchSuccess = React.memo(({ data }) => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();
  const navigation = useNavigation();

  const [isClick, setIsClick] = useState(false);

  const goToSearchDetailPage = async (isbn) => {
    if (!isClick) {
      setIsClick(true);
      const { statusData, ...repsonseData } = await requestMainDetailItem(
        user.header,
        isbn,
        1
      );

      if (statusData === 200) {
        navigation.navigate(MainStackRoutes.DetailPage, {
          ...repsonseData.data,
        });
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }

      setTimeout(() => {
        setIsClick(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.searchSuCon}>
      {data.map((item, index) => (
        <Pressable
          onPress={() => {
            goToSearchDetailPage(item.isbn13, item);
          }}
          key={index}
        >
          <SearchContentItemBox item={item} />
        </Pressable>
      ))}
    </View>
  );
});

SearchSuccess.displayName = 'SearchSuccess';

const styles = StyleSheet.create({
  searchSuCon: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 30,
  },
});

export default SearchSuccess;
