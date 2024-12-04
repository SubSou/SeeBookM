import { View } from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';

import { useCallback, useState } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import LeftBtnAndTitleHeader from '../../Components/Common/LeftBtnAndTitleHeader';
import ImagePick from '../../Components/Independent/Main/ImagePick';
import ImagePickHeader from '../../Components/Independent/Main/ImagePickHeader';

const ImagePickerScreen = () => {
  const maxCount = 1;

  const navigation = useNavigation();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isSelectedColor, setIsSelectedColor] = useState(false);

  const stateRoutes = useNavigationState((state) => state.routes);

  const goToPrev = () => {
    navigation.goBack();
  };

  const onSelect = useCallback(() => {
    if (isSelectedColor) {
      const prevScreenName = stateRoutes[stateRoutes.length - 2].name;
      navigation.navigate(prevScreenName, { selectedPhotos });
    }
  });

  const isSelectedPhoto = (photo) => {
    return selectedPhotos.findIndex((item) => item.id === photo.id) > -1;
  };

  const togglePhoto = (photo) => {
    setIsSelectedColor(!isSelectedColor);
    const isSelected = isSelectedPhoto(photo);
    setSelectedPhotos((prev) => {
      if (isSelected) {
        return prev.filter((item) => item.id !== photo.id);
      }

      if (maxCount > prev?.length) {
        return [...prev, photo];
      }

      return prev;
    });
  };

  return (
    <SafeAreaWrapper>
      <View style={{ paddingHorizontal: 30 }}>
        <ImagePickHeader
          goToPrev={goToPrev}
          onSelect={onSelect}
          title={'프로필 사진 선택'}
          isSelectedColor={isSelectedColor}
        />
      </View>
      <ImagePick togglePhoto={togglePhoto} isSelectedPhoto={isSelectedPhoto} />
    </SafeAreaWrapper>
  );
};

export default ImagePickerScreen;
