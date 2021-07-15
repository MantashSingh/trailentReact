import {StyleSheet, Platform, Dimensions} from 'react-native';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import common_Styles from '../../styles/commonStyles';
const screenWidth = Dimensions.get('window').width;
export const commonStyles = StyleSheet.create({
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
    marginVertical: 10,
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

export const onBoardingStyles = StyleSheet.create({
  mainView: {marginHorizontal: 0, alignItems: 'center'},
  subView: {
    marginHorizontal: 20,
    marginTop: moderateScaleVertical(10),
    alignItems: 'center',
  },
  logo: {width: 56, height: 57, marginVertical: 20},
  heading: {
    fontSize:textScale(30),
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    color: '#334669',
  },
  subHeading: {
    fontSize: textScale(16),
    textAlign: 'center',
    marginVertical:moderateScaleVertical(10),
    fontFamily: fontFamily.medium,
    color: '#838595',
  },
  imageView: {marginVertical: moderateScaleVertical(60)},
  bottomView: {height: 10},
});

export const passphraseStyles = StyleSheet.create({
  mainView: {flex: 1, marginHorizontal: 30,},
  subView: {flex: 0.6, paddingTop: 0},
  subView1: {flex: 0.3, marginTop: moderateScaleVertical(350)},
  heading: {fontSize: 30, textAlign: 'center', fontFamily: fontFamily.medium , backgroundColor:"green"},
  subHeading: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fontFamily.bold,
    color: '#334669',
  },
  returningUserpassphraseText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fontFamily.medium,
    color: '#334669',
    minHeight: moderateScaleVertical(84),
    // maxHeight: moderateScaleVertical(100),

    // width: moderateScale(300),
  },
  passphraseText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: fontFamily.medium,
    color: '#334669',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  linearGradient: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
});
