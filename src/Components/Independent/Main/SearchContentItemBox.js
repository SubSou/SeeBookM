import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, vScale } from '../../../Normalization';
import ReadRatingBar from './ReadRatingBar';
import { PropTypes } from 'prop-types';

const SearchContentItemBox = ({ item }) => {
  return (
    <View style={[styles.searchItemBox, { marginBottom: 20 }]}>
      <Image
        style={styles.itemImg}
        source={{ uri: item.imageLink }}
        resizeMode="contain"
      />
      <View style={styles.searchItem}>
        <Text style={{ fontSize: 14 }} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>

        <Text style={{ marginTop: 5, fontSize: 12, color: '#505050' }}>
          {item.publisher}
        </Text>
        <ReadRatingBar
          ratingScore={item.avgStar}
          ratingCount={item.totalReviewCount.toString()}
        />
      </View>
    </View>
  );
};

SearchContentItemBox.propTypes = {
  item: PropTypes.object,
};

const styles = StyleSheet.create({
  searchItemBox: {
    width: '100%',
    height: vScale(100),
    flexDirection: 'row',
  },

  itemImg: {
    width: scale(80),
    height: '100%',
    borderRadius: 10,
  },
  searchItem: {
    flex: 1,
    marginLeft: 15,
    height: vScale(100),
  },
});

export default SearchContentItemBox;
