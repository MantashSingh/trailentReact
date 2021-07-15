import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';
import {commonStyles} from './styles';
import common_Styles from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import OTPTextView from 'react-native-otp-textinput';
import {showSuccess} from '../../utils/helperFunctions';
import navigationStrings from '../../constants/navigationStrings';
export default function PhoneVerification({navigation}) {
  // useEffect(() => {
  //     alert(otp)
  // }, [otp])

  const [otp, setotp] = useState();
  // alert(otp)
  const _onSubmit = () => {
    showSuccess('OTP ' + otp + ' verified');
    navigation.navigate(navigationStrings.EDIT_PROFILE);
  };

  return (
    <WrapperContainer barStyle="dark-content">
      <Header
        centerTitle={strings.ENTER_VERIFICATION_CODE}
        textStyle={{...commonStyles.headerText}}
      />
      <View style={styles.wrapper}>
        <Text style={styles.enterVerficationText}>
          {strings.ENTER_VERIFICATION_CODE_RECIVED_ON_PHONE}
        </Text>

        <Text style={styles.verficationCodeText}>
          {strings.VERFICATION_CODE}
        </Text>

        <OTPTextView
          ref={e => (input1 = e)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          handleTextChange={text => setotp(JSON.stringify(text))}
          inputCount={4}
          // tintColor="transparent"
          keyboardType="numeric"
          returnKeyType={'done'}
        />
        <TouchableOpacity
          style={{...commonStyles.button, marginTop: moderateScaleVertical(24)}}
          onPress={() => _onSubmit()}>
          <Text style={commonStyles.buttonText}>{strings.SUBMIT}</Text>
        </TouchableOpacity>

        <Text style={styles.resendCodeText}>{strings.RESEND_CODE}</Text>
      </View>

      <View>
        <Text></Text>
      </View>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  resendCodeText: {
    ...common_Styles.fontSize18,
    textAlign: 'center',
    color: '#26C9FF',
  },
  enterVerficationText: {
    ...common_Styles.fontSize16,
    marginVertical: moderateScaleVertical(40),
    textAlign: 'center',
    color: '#838595',
  },
  wrapper: {
    marginHorizontal: moderateScale(25),
  },
  verficationCodeText: {
    ...common_Styles.fontSize18,
    textAlign: 'center',
  },
  roundedTextInput: {
    marginTop: moderateScaleVertical(24),
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    width: moderateScale(67),
    height: moderateScaleVertical(48),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 0,
    backgroundColor: '#EBECF0',
  },
});
