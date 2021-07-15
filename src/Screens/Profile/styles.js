import {StyleSheet, Platform, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import common_Styles from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';

export const commonStyles = StyleSheet.create({
  headerText: {
    ...common_Styles.fontSize18,
    textAlign: 'center',
  },
  profilImageRow: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(45),
  },
  profilImage: {
    width: moderateScale(85),
    height: moderateScaleVertical(85),
    resizeMode: 'contain',
  },
  editIcon: {
    // position:'relative',
    top: moderateScaleVertical(60),
    left: moderateScale(55),
    // flexDirection:'row',
    // marginTop:moderateScaleVertical(50),
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontFamily: fontFamily.bold,
  },
  button: {
    borderRadius: 24,
    backgroundColor: '#26C9FF',
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 35,
    marginBottom: moderateScaleVertical(20),
  },
});

export const profile = StyleSheet.create({
  headerText: {
    ...common_Styles.fontSize18,
    textAlign: 'center',
  },

  container: {
    marginHorizontal: moderateScale(30),
  },

  name: {
    ...common_Styles.fontSize24,
    width:moderateScale(220),
    color: colors.textColor,
    marginLeft: moderateScale(30),
  },
  codeView: {
    backgroundColor: colors.gray96,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(4),
    borderRadius: 4,
    marginRight: 'auto',
    marginLeft: moderateScale(30),
  },
  codeText: {
    ...common_Styles.fontSize12,
    color: colors.white,
    // width:moderateScale(200)
  },
});
//try commit 

export const edit_profile = StyleSheet.create({
  centerProfileImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  componentsView: {
    marginHorizontal: moderateScale(30),
    marginVertical: moderateScaleVertical(30),
  },
  profilImageRow: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(45),
    marginLeft: 'auto',
    marginRight: 'auto',
  
  },
});
