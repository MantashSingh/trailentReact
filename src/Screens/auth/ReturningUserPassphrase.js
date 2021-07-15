import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  Share,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import {commonStyles, onBoardingStyles, passphraseStyles} from './styles';

//constants
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';

//reusable components
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';

import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-community/clipboard';
import {showError, showSuccess} from '../../utils/helperFunctions';
import actions from '../../redux/actions';
import Loader from '../../Components/Loader';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../styles/responsiveSize';
import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { setPassphraseInReduxState } from '../../redux/actions/auth';

const ReturningUserPassphrase = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passphraseBackend, setPassphraseBackend] = useState('');
  const [passphraseFrontend, setPassphraseFrontend] = useState('');
  console.log(passphraseFrontend, 'returning .......');
 




  const nextButtonLogin = () => {
    let login =
      'http://15.184.181.58/api/user/login?token=' + `${passphraseFrontend}`;
    actions.setPassphraseInReduxState(passphraseBackend);
    actions
      .login(login)
      .then(res => {
        console.log(res, 'afeter login');
      })
      .catch(err => {
        showError(err.message);
      });
  };
  const nextButton = () => {
    if (passphraseFrontend == '') {
      showError('Please enter Passphrase');
      return;
    }
    nextButtonLogin();
  };

  
  return (
    <WrapperContainer>
      <KeyboardAwareScrollView>
        <Header />
      <View style={passphraseStyles.mainView}>
          
        <View style={{...passphraseStyles.subView , flex:0.5}}>
          <Text style={{...onBoardingStyles.heading}}>
            {/* {strings.PASSPHRASE_GENERATED} */}
            Enter Passphrase
          </Text>
          {/* <Text style={[onBoardingStyles.subHeading, {color: '#838595'}]}>
            {strings.PASSPHRASE_SUBHEADING}
          </Text>
          <Text style={passphraseStyles.subHeading}>{strings.PASSPHRASE}</Text> */}

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E6E7ED', '#F7F8FA']}
            style={passphraseStyles.linearGradient}>
        
              <TextInput
                placeholder="Enter passphrase ..."
                multiline={true}
                numberOfLines={4}
                style={passphraseStyles.returningUserpassphraseText}
                onChangeText={value => setPassphraseFrontend(value)}
              />
            
          </LinearGradient>

          {/* <TouchableOpacity onPress={() => Share.share(shareOptions)}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#E6E7ED', '#F7F8FA']}
              style={{
                ...passphraseStyles.linearGradient,
                height: moderateScaleVertical(64),
              }}>
              <Text style={passphraseStyles.passphraseText}>
                {strings.COPY_EMAIL_CLIPBOARD}
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>

        <View >
          <TouchableOpacity
            style={[commonStyles.button, {marginHorizontal: 10 ,marginTop:50}]}
            onPress={() => nextButton()}>
            <Text style={commonStyles.buttonText}>{strings.NEXT}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isLoading={isLoading} />
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default ReturningUserPassphrase;