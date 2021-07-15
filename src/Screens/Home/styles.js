import {StyleSheet, Platform, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';

export const common_Styles = StyleSheet.create({
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
    marginVertical:35
  },
  backToLogin: {
    borderRadius: 5,
    height: 48,
    width: '100%',
    borderRadius: 24,
    // marginVertical:10,
    backgroundColor: '#FFF8F3',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: '#2E2E2E',
    marginBottom: 20,
  },

  boldText: {fontFamily: fontFamily.AvenirHeavy, fontSize: 24},
});

export const passcode_3 = StyleSheet.create({
  heading: {
    fontSize: 30, textAlign: 'center', fontFamily: fontFamily.regular , color:"#334669",
    marginTop: moderateScaleVertical(50),
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fontFamily.medium,
    color:"#838595",
    color: '#838595',
  },
  underSubHeadingVIew: {
    marginTop: moderateScaleVertical(30),
    marginHorizontal: moderateScale(30),
  },
  scanCode: {
    flexDirection: 'row',
    height: moderateScaleVertical(68),
    borderRadius: 12,
    marginBottom: moderateScaleVertical(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },


  scanCodeText: {
    ...commonStyles.fontSize18,
    color: colors.textColor,
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  qrImage: {
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: moderateScaleVertical(49),
    width: moderateScale(49),
  },
  typeURL: {
    height: moderateScaleVertical(100),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  urlText: {
    ...commonStyles.fontSize18,
    color: colors.textColor,
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
  },
  urlTextInput: {
    marginHorizontal: moderateScale(8),
    marginVertical: moderateScaleVertical(8),
    borderRadius: 12,
    height: moderateScaleVertical(48),
    borderWidth: 1,
    borderColor: colors.gray96,
  },
  innertextInput: {
    ...commonStyles.fontSize18,
    paddingLeft: moderateScale(5),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export const home = StyleSheet.create({
    outterContainer: {
      marginHorizontal: moderateScale(30),
    },
    header: {
      textAlign: 'right',
    },
    hearderText: {
      ...commonStyles.fontSize26,
      right: moderateScale(120),
      color: colors.textColor,
    },
    rightIconStyle: {
      resizeMode:"cover",
      height:moderateScaleVertical(35),
      width:moderateScale(35),
      borderRadius:100
  },
    innerContainer: {
      marginTop: moderateScaleVertical(30),
    },
    searchView: {
      flexDirection: 'row',
      backgroundColor: '#EBECF0',
      borderRadius: 12,
      height: moderateScaleVertical(55),


      
    },
    shadow:{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 4,
    },
    searchIcon: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginHorizontal: moderateScale(12),
    },
    micIcon: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: moderateScale(12),
    },
    textInputStyle: {
      ...commonStyles.fontSize16,
      color: colors.textColor,
      width:moderateScale(240)
    },
    qrButton: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderRadius: 12,
      height: moderateScaleVertical(48),
      marginTop: moderateScaleVertical(23),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 4,
    },
    qrIcon: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
    },
    qrText: {
      ...commonStyles.fontSize18,
      color: colors.textColor,
      marginTop: 'auto',
      marginBottom: 'auto',
      marginRight: 'auto',
    },
    savedFormes: {
      ...commonStyles.fontSize20,
      color: colors.textColor,
      marginVertical: moderateScaleVertical(30),
    },
    
  });
  