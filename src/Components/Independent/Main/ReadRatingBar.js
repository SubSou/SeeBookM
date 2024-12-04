import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-rating-element';
import { scale } from '../../../Normalization';
import { MEDIUMGRAY } from '../../../color';
import { PropTypes } from 'prop-types';

const ReadRatingBar = ({
  ratingScore,
  ratingCount = '',
  marginTop = 5,
  size = 14,
}) => {
  return (
    <View style={[styles.ratingCon, { marginTop: marginTop }]}>
      <Rating
        rated={ratingScore}
        totalCount={5}
        size={scale(size)}
        direction="row"
        type="custom" // default is always to "icon"
        selectedIconImage={require('./assets/littleFullStar.png')}
        emptyIconImage={require('./assets/littlEmptyStar.png')}
        marginBetweenRatingIcon={0.1}
      />
      {ratingCount !== '' && (
        <View>
          <Text
            style={{
              fontSize: scale(size),
              lineHeight: scale(15),
              color: MEDIUMGRAY,
            }}
          >
            ({ratingCount})
          </Text>
        </View>
      )}
    </View>
  );
};

ReadRatingBar.propTypes = {
  ratingScore: PropTypes.number,
  ratingCount: PropTypes.string,
};

const styles = StyleSheet.create({
  ratingCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default ReadRatingBar;
