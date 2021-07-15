import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  homeheet,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Header';
import HomeCards from '../../Components/HomeCards';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import commonStyles from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import {home} from './styles';
import {useSelector} from 'react-redux';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Voice from 'react-native-voice';
import ProgressCircle from 'react-native-progress-circle';
export default function Home({navigation}) {
  const [state, setState] = useState({});
  const [isQRModalVisible, setisQRModalVisible] = useState(false);
  const [isMicModalVisible, setisMicModalVisible] = useState(false);
  const updateState = data => setState(state => ({...state, ...data}));
  const userData = useSelector(state => state.auth.userData);

  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const onSuccess = e => {
    setTimeout(() => {
      console.log(e.data, 'edata ....');
      navigation.navigate(navigationStrings.PASSCODE_3, {urlFromHome: e.data});
      setisQRModalVisible(false);
    }, 2000);
  };

  var [selectedImage, setselectedImage] = !!userData?.profile_image
    ? useState('http://15.184.181.58/storage/' + userData?.profile_image)
    : useState();

  (() => {
    selectedImage =
      !!userData?.profile_image &&
      'http://15.184.181.58/storage/' + userData?.profile_image;
    console.log(selectedImage, 'home vali ');
  })();

  const image1 = {uri: selectedImage};

  //Voice
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setisMicModalVisible(true);
      setTimeout(() => {
        stopRecognizing();
        setisMicModalVisible(false);
      }, 5000);

      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      setTimeout(() => {
        stopRecognizing();
        setisMicModalVisible(false);
      }, 5000);
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <WrapperContainer
      barStyle="dark-content"
      statusBarColor="#FFF"
      showGradient={false}>
      <ScrollView style={home.outterContainer} keyboardShouldPersistTaps='handled'>
        {!!userData?.profile_image ? (
          <Header
            leftIcon=""
            rightIcon={image1}
            rightIconStyle={home.rightIconStyle}
            onPressRight={moveToNewScreen(navigationStrings.PROFILE)}
            centerTitle={strings.HOME}
            textStyle={home.hearderText}
          />
        ) : (
          <Header
            leftIcon=""
            rightIcon={imagePath.profileImageSmall}
            rightIconStyle={home.rightIconStyle}
            onPressRight={moveToNewScreen(navigationStrings.PROFILE)}
            centerTitle={strings.HOME}
            textStyle={home.hearderText}
          />
        )}

        <View style={home.innerContainer}>
          <View style={home.shadow}>

          
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E6E7ED', '#F7F8FA']}
            style={home.searchView}>
            <TouchableOpacity
              style={home.searchIcon}
              onPress={() => stopRecognizing()}>
              <Image source={imagePath.search} />
            </TouchableOpacity>

            <TextInput
              placeholder={strings.SEARCH_FOLDER}
              style={home.textInputStyle}
              // onChangeText={setPartialResults}
              value={partialResults[0]}
            />
            <TouchableOpacity
              style={home.micIcon}
              onPress={() => startRecognizing()}>
              <Image source={imagePath.mic} />
            </TouchableOpacity>
          </LinearGradient>
          </View>
          <TouchableOpacity
            style={home.qrButton}
            onPress={() => setisQRModalVisible(true)}>
            <Image source={imagePath.QR} style={home.qrIcon} />
            <Text style={home.qrText}> {strings.SCAN_QR}</Text>
          </TouchableOpacity>

          <Text style={home.savedFormes}>{strings.SAVED_FORMS}</Text>

          {/* <HomeCards cardText={'Apex College'} />
          <HomeCards cardText={'Childcare hospital'} />
          <HomeCards cardText={'A-one Gym'} /> */}

          <Modal transparent visible={isQRModalVisible}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <View style={styles.topView}></View>

              <View style={styles.bottomView}>
                <View style={styles.header}>
                  <Text
                    style={styles.textCancel}
                    onPress={() => setisQRModalVisible(false)}>
                    {strings.CANCEL}
                  </Text>
                  <Text style={styles.textscanQR}>{strings.SCAN_QR_CODE}</Text>
                </View>
                <View>
                  <Text style={styles.placeQR}>
                    {strings.PLACE_THE_QR_CODEINSIDE_THIS_AREA}
                  </Text>
                  <Text style={styles.scaning}>
                    {strings.SCANNING_WILL_START_AUTOMATICALLY}
                  </Text>
                </View>

                <View>
                  <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                  />
                </View>
              </View>
            </View>
          </Modal>

          <Modal transparent visible={isMicModalVisible}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <View style={styles.micContainer}>
                <View style={styles.micModalImage}>
                  <ProgressCircle
                    percent={(pitch*10)}
                    radius={50}
                    borderWidth={30}
                    color="grey"
                    shadowColor="#fff"
                    bgColor="#fff">
                    <Image
                      source={imagePath.mic}
                      style={styles.micModalImage}
                    />
                  </ProgressCircle>
                  <View>
                    {/* <TouchableOpacity style={styles.micModalCloseBUtton} onPress={() =>{stopRecognizing(); 
                  setisMicModalVisible(false)}}>
                  <Text style={styles.closeText}>
                    Close
                  </Text>
                </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
}
const styles = StyleSheet.create({
  closeText: {
    marginTop: 0,
  },
  micModalCloseBUtton: {
    borderTopWidth: 1,
    borderColor: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
  },
  micModalImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  micContainer: {
    height: moderateScaleVertical(150),
    marginHorizontal: moderateScale(100),
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  topView: {
    height: moderateScaleVertical(90),
  },
  bottomView: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    height: moderateScaleVertical(50),
  },
  textscanQR: {
    ...commonStyles.fontSize18,
    color: '#334669',
    alignSelf: 'center',
    marginRight: 'auto',
    marginLeft: moderateScale(77),
  },
  textCancel: {
    ...commonStyles.fontSize16,
    color: '#007AFF',
    alignSelf: 'center',
    marginLeft: moderateScale(10),
  },
  placeQR: {
    ...commonStyles.fontSize20,
    color: '#334669',
    marginTop: moderateScaleVertical(10),
    textAlign: 'center',
  },
  scaning: {
    ...commonStyles.fontSize16,
    color: '#838595',
    textAlign: 'center',
    marginTop: moderateScaleVertical(5),
    marginBottom: moderateScaleVertical(70),
  },
});
