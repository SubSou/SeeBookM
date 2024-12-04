import { StyleSheet, View } from 'react-native';
import CategoriLeftColumnItems from './CategoriLeftColumnItems';
import CategoriRightColumnItems from './CategoriRightColumnItems';

const CategoriContent = ({
  formattedData,
  handle1depthSelect,
  selected1depth,
  handle2depthSelect,
  selectedTitle,
}) => {
  return (
    <View style={styles.contentContainer}>
      <CategoriLeftColumnItems
        formattedData={formattedData}
        handle1depthSelect={handle1depthSelect}
        selected1depth={selected1depth}
        selectedTitle={selectedTitle}
      />
      <CategoriRightColumnItems
        selected1depth={selected1depth}
        formattedData={formattedData}
        handle2depthSelect={handle2depthSelect}
        selectedTitle={selectedTitle}
      />
    </View>
  );
};

export default CategoriContent;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
  },
});
