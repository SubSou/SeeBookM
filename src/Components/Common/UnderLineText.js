import { memo } from 'react';
import { Text, View } from 'react-native';

const lineShared = {
  fontSize: 12,
  borderBottomWidth: 1,
};

const lineStyleDatas = {
  initPage: {
    ...lineShared,
    color: '#A0A0A0',
    borderBottomColor: '#A0A0A0',
  },
  loginPage: {
    ...lineShared,
    color: '#BA6262',
    borderBottomColor: '#BA6262',
  },
};

const UnderLineText = memo(({ type, title }) => {
  const lineStyle = lineStyleDatas[type];

  return (
    <View>
      <Text style={lineStyle}>{title}</Text>
    </View>
  );
});

export default UnderLineText;
