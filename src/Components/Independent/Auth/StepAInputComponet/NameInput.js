import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  BLACK,
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  SELECTBLACK,
} from '../../../../color';
import { PropTypes } from 'prop-types';
const NameInput = ({
  handleInputActivie,
  handleNonInputActivie,
  nameActivie,
  handleNameSubmit,
  nameInputRef,
  ...props
}) => {
  return (
    <View style={styles.nameBox}>
      <TextInput
        {...props}
        ref={nameInputRef}
        placeholder="이름"
        style={[
          styles.leftTextWidth,
          styles.darkGrayColor,
          {
            borderBottomColor: nameActivie ? SELECTBLACK : LIGHTGRAY,
          },
        ]}
        placeholderTextColor={MEDIUMGRAY}
        selectionColor={BLACK}
        onFocus={() => {
          handleInputActivie('nameActivie');
        }}
        onBlur={() => {
          handleNonInputActivie('nameActivie');
        }}
        onSubmitEditing={handleNameSubmit}
        maxLength={5}
      />
      <View style={[styles.rightTextWidth, styles.bottomBorder]}>
        <Text style={{ color: MEDIUMGRAY }}>내국인</Text>
      </View>
    </View>
  );
};

NameInput.propTypes = {
  handleInputActivie: PropTypes.func,
  handleNonInputActivie: PropTypes.func,
  nameActivie: PropTypes.bool,
  handleNameSubmit: PropTypes.func,
};

const styles = StyleSheet.create({
  nameBox: {
    marginTop: 50,
    flexDirection: 'row',
    gap: 20,
  },
  leftTextWidth: {
    width: '70%',
    textAlignVertical: 'top',
    borderBottomWidth: 1,
  },
  darkGrayColor: {
    color: DARKGRAY,
  },
  rightTextWidth: {
    flex: 1,
    width: '100%',
  },
  bottomBorder: {
    borderBottomColor: LIGHTGRAY,
    borderBottomWidth: 1,
  },
});

export default NameInput;
