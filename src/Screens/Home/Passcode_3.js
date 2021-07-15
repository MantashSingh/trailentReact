import React, {useState , useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import actions from '../../redux/actions';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {passcode_3, common_Styles} from './styles';
import {useSelector} from 'react-redux';
import commonStyles from '../../styles/commonStyles';

export default function Passcode_3({navigation, route}) {
  const userData = useSelector(state => state.auth.userData);
  const [isQRModalVisible, setisQRModalVisible] = useState(false);
  const {urlFromHome} = !!route.params ? route.params : '';
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, data);
  };

  console.log(urlFromHome , "urlFromHome")
  const [url, setUrl] = urlFromHome?useState(urlFromHome) : useState('');

  useEffect(() => {
    if(urlFromHome){
      
      setUrl(urlFromHome)
    }
    
  }, [urlFromHome])
  console.log(url , "url")
  const goToLinkButton = () => {
    if (url == '' || url == undefined) {
      showError('Please enter URL');
      return;
    }
    navigation.navigate(navigationStrings.WEB_VIEW_SCREEN, {
      url: url,
    });
    sendUrlToBackEnd();
  };

  const closeModal = () => {
    setisQRModalVisible(false);
  };
  const sendUrlToBackEnd = () => {
    actions
      .sendUrlToBackEnd(userData.id, url)
      .then(res => {
        showSuccess(res.message);
      })
      .catch(err => {
        showError(res.message);
      });
  };

  const onSuccess = e => {
    setTimeout(() => {
      setUrl(e.data);
      setisQRModalVisible(false);
      console.log(e.data, 'edata ....');
    }, 2000);

    
  };

  // console.log(url)
  return (
    <WrapperContainer barStyle="dark-content">
      <ScrollView>
        <View style={{flex: 1}}>
          <Text style={passcode_3.heading}>
            {strings.ARE_YOU_FILLING_A_FORM}
          </Text>
          <Text style={passcode_3.subHeading}>
            {strings.SCAN_A_QR_OR_TYPE_A_URL}
          </Text>

          <View style={passcode_3.underSubHeadingVIew}>
            <TouchableOpacity onPress={() => setisQRModalVisible(true)}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#E6E7ED', '#F7F8FA']}
                style={passcode_3.scanCode}>
                <Text style={passcode_3.scanCodeText}>{strings.SCAN_QR}</Text>
                <Image source={imagePath.QR_2} style={passcode_3.qrImage} />
              </LinearGradient>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress = {moveToNewScreen(navigationStrings.WEB_VIEW_SCREEN)}> */}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#E6E7ED', '#F7F8FA']}
              style={passcode_3.typeURL}>
              <Text style={passcode_3.urlText}>{strings.TYPE_URL}</Text>
              <View style={passcode_3.urlTextInput}>
                <TextInput
                  style={passcode_3.innertextInput}
                  onChangeText={value => setUrl(value)}
                  value={url}
                />
              </View>
            </LinearGradient>
            {/* </TouchableOpacity> */}
          </View>
          <View
            style={{
              marginTop: 'auto',
              marginBottom: moderateScaleVertical(50),
            }}>

            {!!url &&
            <TouchableOpacity
            onPress={() => goToLinkButton()}
            style={{
              ...common_Styles.button,
              marginHorizontal: moderateScale(30),
              marginTop: moderateScaleVertical(50),
              marginVertical: 0,
            }}>
            {/* onPress={moveToNewScreen(navigationStrings.TAB_ROUTES)}> */}
            <Text style={common_Styles.buttonText}>
              {/* {strings.NOT_NOW} */}
              Next
            </Text>
          </TouchableOpacity>
            }  
            
            <TouchableOpacity
              style={{
                ...common_Styles.button,
                marginHorizontal: moderateScale(30),
                marginVertical: 20,
              }}
              onPress={moveToNewScreen(navigationStrings.HOME)}>
              <Text style={common_Styles.buttonText}>{strings.NOT_NOW}</Text>
            </TouchableOpacity>

            <Modal transparent visible={isQRModalVisible}>
              <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={styles.topView}></View>

                <View style={styles.bottomView}>
                  <View style={styles.header}>
                    <Text
                      style={styles.textCancel}
                      onPress={() => closeModal()}>
                      {strings.CANCEL}
                    </Text>
                    <Text style={styles.textscanQR}>
                      {strings.SCAN_QR_CODE}
                    </Text>
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
          </View>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
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
