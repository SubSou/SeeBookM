import { StyleSheet } from 'react-native';
import { scale } from '../Normalization';
import { SELECTBLACK } from '../color';

export const MainFormat = StyleSheet.create({
  mainTextFormat: {
    fontSize: scale(16),
    color: SELECTBLACK,
    fontWeight: '700',
  },
});
