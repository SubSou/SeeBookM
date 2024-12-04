import { Text, View } from 'react-native';

const SignCheckReslutMsg = ({
  resultMsg,
  colorData,
  customStyles = { right: 0 },
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: '100%',
        move: 0,
        paddingTop: 5,
        ...customStyles,
      }}
    >
      <Text style={{ color: colorData, fontSize: 10 }}>{resultMsg}</Text>
    </View>
  );
};
export default SignCheckReslutMsg;
