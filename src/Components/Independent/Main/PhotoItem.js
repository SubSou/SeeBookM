import { BlurView } from 'expo-blur';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SIGNATURECOLOR } from '../../../color';
import React from 'react';

const PhotoItem = React.memo(({ item, isSelected, togglePhoto }) => {
  const width = useWindowDimensions().width / 3;

  return (
    <Pressable
      style={{ width, height: width }}
      onPress={() => togglePhoto(item)}
    >
      <Image source={{ uri: item.uri }} style={styles.photo} />
      {isSelected && (
        <BlurView
          style={[StyleSheet.absoluteFill, styles.checkIcon]}
          intensity={Platform.select({ ios: 10, android: 50 })}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={40}
            color={SIGNATURECOLOR}
          />
        </BlurView>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: '100%',
  },
  checkIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhotoItem;
