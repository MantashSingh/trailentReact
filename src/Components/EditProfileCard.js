import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import commonStyles from '../styles/commonStyles';
import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';

export default function EditProfileCard({cardText , onTouch =()=>{}}) {
  return (
      <TouchableOpacity onPress={()=>onTouch()}>
    <View style={styles.wraperContainer}>
      <Text style={styles.cardTextStyle}>{cardText}</Text>
      <Image source={imagePath.cloudcheck} style={styles.cloudcheckIcon} />
    </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  wraperContainer: {
      flexDirection:"row",
      paddingVertical:moderateScaleVertical(12),
    paddingHorizontal:moderateScale(16),
    marginBottom:moderateScaleVertical(16),
    backgroundColor: colors.white, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  cardTextStyle:{
    
      ...commonStyles.fontSize18,
      color:colors.textColor

  },
  cloudcheckIcon:{
      marginLeft:"auto"
  }
});
