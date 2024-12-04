import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SIGNATURECOLOR } from '../../color';

const Spinner = () => {
  return (
    <View style={styles.SpinCon}>
      <ActivityIndicator size="large" color={SIGNATURECOLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  SpinCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Spinner;
