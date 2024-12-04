import { Animated, Pressable, StyleSheet } from 'react-native';
import { scale, vScale } from '../../Normalization';
import { SIGNATURECOLOR } from '../../color';

import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../navigations/routes';
import { PropTypes } from 'prop-types';
import { useUserContext } from '../../contexts/UserContext';
import React, { useCallback } from 'react';
import { useMainContext } from '../../contexts/MainContext ';

const FAB = React.memo(({ icon, FABY = vScale(600), pressFunc }) => {
  const { transFABX } = useMainContext();

  return (
    <Animated.View style={[styles.FABCon, { top: FABY }]}>
      <Animated.View
        style={[
          styles.FABWrap,
          {
            transform: [{ translateX: transFABX.current }],
          },
        ]}
      >
        <Pressable onPress={pressFunc}>{icon}</Pressable>
      </Animated.View>
    </Animated.View>
  );
});

FAB.displayName = 'FAB';

FAB.propTypes = {
  FABY: PropTypes.number,
  goToPage: PropTypes.string,
  icon: PropTypes.node,
};

const styles = StyleSheet.create({
  FABCon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: scale(20),
  },

  FABWrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: SIGNATURECOLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FAB;
