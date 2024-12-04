import { View } from 'react-native';
import MyReviewItem from './MyReviewItem';

const MyReviewItems = ({ myReviewDatas, handelOpenActionSheet }) => {
  return (
    <View>
      {myReviewDatas.map((review, index) => (
        <MyReviewItem
          key={index}
          review={review}
          index={index}
          handelOpenActionSheet={handelOpenActionSheet}
        />
      ))}
    </View>
  );
};

export default MyReviewItems;
