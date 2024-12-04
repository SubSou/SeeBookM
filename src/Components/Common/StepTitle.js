import { StyleSheet, Text, View } from 'react-native';
import { SELECTBLACK } from '../../color';
import React from 'react';

const StepTitle = React.memo(({ title }) => {
  return (
    <View style={styles.stepTitleCon}>
      <Text style={styles.stepTitleText}>{title}</Text>
    </View>
  );
});

StepTitle.displayName = 'StepTitle';

export default StepTitle;

const styles = StyleSheet.create({
  stepTitleCon: {
    marginTop: 30,
  },
  stepTitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: SELECTBLACK,
  },
});
