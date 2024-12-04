import { StyleSheet, Text, View } from 'react-native';
import { SELECTBLACK } from '../../color';
import React from 'react';

const MainProfileTitle = React.memo(({ msg, marginTop }) => {
  return (
    <View style={[styles.mainTitleCon, { marginTop: marginTop }]}>
      <Text style={styles.titleText}>{msg}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  mainTitleCon: {},
  titleText: {
    fontSize: 17,
    color: SELECTBLACK,
    fontWeight: '600',
  },
});

MainProfileTitle.displayName = 'MainProfileTitle'; // react.memo를 사용할 떄 밑에 추가

export default MainProfileTitle;
