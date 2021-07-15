import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import commonStyles from '../styles/commonStyles';
import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';

export default function ProfileCards({StringText, leftImage, onpress}) {
  return (
    <View
      style={{flexDirection: 'row', marginBottom: moderateScaleVertical(45)}}>
      <Image source={leftImage} style={styles.leftImageStyle} />
      <Text style={styles.stringText}> {StringText}</Text>
      <TouchableOpacity style={styles.backIcon} onPress={ onpress}>
        <Image source={imagePath.go} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  leftImageStyle: {},
  backIcon: {
    marginLeft: 'auto',
    bottom: 5,
  },
  stringText: {
    ...commonStyles.fontSize16,
    marginHorizontal: moderateScale(24),
    color: colors.textColor,
  },
});
