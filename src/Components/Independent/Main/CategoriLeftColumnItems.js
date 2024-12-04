import { StyleSheet, View } from 'react-native';
import CategoriLeftColumnItem from './CategoriLeftColumnItem';

const CategoriLeftColumnItems = ({
  selected1depth,
  formattedData,
  handle1depthSelect,
  selectedTitle,
}) => {
  return (
    <View style={styles.leftColumn}>
      {formattedData[selectedTitle] &&
        Object.keys(formattedData[selectedTitle]).map((depth1) => (
          <CategoriLeftColumnItem
            key={depth1}
            depth1={depth1}
            handle1depthSelect={handle1depthSelect}
            selected1depth={selected1depth}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  leftColumn: {},
});

export default CategoriLeftColumnItems;
