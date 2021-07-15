/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  textScale,
} from '../../styles/responsiveSize';
import Header from '../../Components/Header';
// import { setPassphraseInReduxState } from '../../redux/actions/auth';

const Passphrase = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passphraseBackend, setPassphraseBackend] = useState('');
  const [passphraseFrontend, setPassphraseFrontend] = useState('');
  const {returning = false} = route.params;
  console.log(passphraseFrontend, 'returning .......');
  useEffect(() => {
    {
      !returning && getNewUserPassphrase();
    }

    // actions.setPassphraseInReduxState((data = {passphrase}));
    // setPassphrase(res.data.passphase_key);
  }, []);

  const getNewUserPassphrase = () => {
    setIsLoading(true);
    actions
      .getPassphrase()
      .then(res => {
        if (res.statuscode == 200) {
          console.log(res);
          setPassphraseFrontend(res.data.passphase.phase);
          setPassphraseBackend(res.data.passphase_key);
          actions.setPassphraseInReduxState(res.data.passphase_key);
          setIsLoading(false);
          // console.log(passphrase , "passphrase")
        }
      })
      .catch(res => {
        showError(res.message);
        // setPassphraseFrontend("adjust the phase of (something), especially so as to synchronize it with something else.");

        setIsLoading(false);
      });
  };

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

  const shareOptions = {
    title: 'Share passphrase',
    message: passphraseFrontend, // Note that according to the documentation at least one of "message" or "url" fields is required
    url: 'www.example.com',
    subject: strings.PASSPHRASE_GENERATED,
  };

  return (
    <WrapperContainer>
      <Header/>
      <View style={passphraseStyles.mainView}>
      
        <View style={passphraseStyles.subView}>
          <Text style={{...onBoardingStyles.heading , fontSize:textScale(26)}}>
            {strings.PASSPHRASE_GENERATED}
          </Text>
          <Text style={[onBoardingStyles.subHeading, {color: '#838595'}]}>
            {strings.PASSPHRASE_SUBHEADING}
          </Text>
          <Text style={passphraseStyles.subHeading}>{strings.PASSPHRASE}</Text>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E6E7ED', '#F7F8FA']}
            style={passphraseStyles.linearGradient}>
            {returning ? (
              <TextInput
                placeholder="Enter passphrase ..."
                multiline={true}
                numberOfLines={3}
                style={passphraseStyles.returningUserpassphraseText}
                onChangeText={value => setPassphraseFrontend(value)}
              />
            ) : (
              <Text style={passphraseStyles.passphraseText}>
                {passphraseFrontend}
              </Text>
            )}
          </LinearGradient>

          <TouchableOpacity onPress={() => Share.share(shareOptions)}>
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
          </TouchableOpacity>
        </View>

        <View style={passphraseStyles.subView1}>
          <TouchableOpacity
            style={[commonStyles.button, {marginHorizontal: 10}]}
            onPress={() => nextButton()}>
            <Text style={commonStyles.buttonText}>{strings.NEXT}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isLoading={isLoading} />
    </WrapperContainer>
  );
};

export default Passphrase;
