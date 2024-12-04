import { FlatList, StyleSheet, View } from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';
import PhotoItem from './PhotoItem';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useRef, useState } from 'react';

const initialListInfo = { endCursor: '', hasNextPage: true };

const ImagePick = ({ togglePhoto, isSelectedPhoto }) => {
  const navigation = useNavigation();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [photos, setPhotos] = useState([]);
  const listInfo = useRef(initialListInfo);
  const [refreshing, setRefreshing] = useState(false);

  const getPhotos = useCallback(async () => {
    const options = {
      first: 30,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };

    if (listInfo.current.endCursor) {
      options['after'] = listInfo.current.endCursor;
    }

    if (listInfo.current.hasNextPage) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync(options);
      setPhotos((prev) => (options.after ? [...prev, ...assets] : assets));
      listInfo.current = { endCursor, hasNextPage };
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    listInfo.current = initialListInfo;
    await getPhotos();
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      if (status?.granted) {
        getPhotos();
      }
    })();
  }, [status?.granted]);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={photos}
          renderItem={({ item }) => (
            <PhotoItem
              item={item}
              togglePhoto={togglePhoto}
              isSelected={isSelectedPhoto(item)}
            />
          )}
          numColumns={3}
          onEndReached={getPhotos}
          onEndReachedThreshold={0.4}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
});

export default ImagePick;
