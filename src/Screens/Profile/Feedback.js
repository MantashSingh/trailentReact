import React ,{useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput , TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import common_Styles from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';

import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import { showError, showSuccess } from '../../utils/helperFunctions';

export default function Feedback() {
    const [feedback, setfeedback] = useState("")
  const  _onSubmit=()=>{
      if(!!feedback){
        showSuccess("Feedback sent")

      }
      showError("Please share some feedback")
    }
  return (
    <WrapperContainer barStyle="dark-content">
      <Header centerTitle={strings.GIVE_US_FEEDBACK} />

      <View style={styles.wraperContainer}>
        <Text style={styles.cardTextStyle}>Tell us what you love</Text>
        <Image source={imagePath.ic_dropdown} style={styles.cloudcheckIcon} />
      </View>

      <View
        style={{...styles.wraperContainer, marginTop: 10, paddingVertical: 0}}>
        <TextInput
          placeholder={strings.SHARE_YOUR_FEEDBACK + '...'}
          multiline={true}
          style={styles.shareFeedbackTextinput}
          onChange={value=>setfeedback(value)}
        />
      </View>
      <TouchableOpacity
          style={styles.button}
          // onPress={() => alert(email)}
          onPress={() => _onSubmit()}>
          <Text style={styles.buttonText}>{'Submit'}</Text>
        </TouchableOpacity>

    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  shareFeedbackTextinput: {
    height: moderateScaleVertical(235),
    ...common_Styles.fontSize16,
    marginTop: moderateScaleVertical(5),
    textAlignVertical: 'top',
  },
  wraperContainer: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(30),
    marginTop: moderateScaleVertical(40),
    paddingVertical: moderateScaleVertical(17),
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScaleVertical(16),
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
  cardTextStyle: {
    ...common_Styles.fontSize16,
    color: colors.textColor,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  cloudcheckIcon: {
    marginLeft: 'auto',
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
