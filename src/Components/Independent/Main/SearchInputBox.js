import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LIGHTGRAY, MEDIUMGRAY, SELECTBLACK } from '../../../color';
import { AntDesign } from '@expo/vector-icons';

import { scale } from '../../../Normalization';

import DropDown from '../../Common/DropDown';

const SearchInputBox = ({
  handleSearch,
  dropDownSubData,
  selectDropData,
  handleSelectDropData,
  ...props
}) => {
  return (
    <View style={styles.searchInputCon}>
      <View style={styles.searchInputWrap}>
        <DropDown
          dropDownSubData={dropDownSubData}
          selectDropData={selectDropData}
          handleSelectDropData={handleSelectDropData}
        />
        <View style={styles.inputBox}>
          <TextInput
            {...props}
            placeholderTextColor={MEDIUMGRAY}
            style={styles.input}
            placeholder="어떤 책을 찾고 있나요?"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
          />
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => {
              handleSearch(1, selectDropData.value);
            }}
          >
            <AntDesign name="search1" size={scale(16)} color="#191919" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputCon: {
    marginTop: 26,
    zIndex: 100,
    paddingHorizontal: 30,
  },
  searchInputWrap: {
    paddingBottom: 14,
    borderBottomWidth: 3,
    borderBottomColor: LIGHTGRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 14,
    color: SELECTBLACK,
  },
});

export default SearchInputBox;
