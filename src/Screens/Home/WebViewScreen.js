import React, {useRef} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  DatePickerAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useKeyboard} from 'react-native-keyboard-height';
import {WebView} from 'react-native-webview';
import WrapperContainer from '../../Components/WrapperContainer';
import navigationStrings from '../../constants/navigationStrings';
import actions from '../../redux/actions';
import Header from '../../Components/Header';
import strings from '../../constants/lang';
import imagePath from '../../constants/imagePath';
import {useEffect, useState} from 'react';
import commonStyles from '../../styles/commonStyles';
import LinearGradient from 'react-native-linear-gradient';

import Clipboard from '@react-native-community/clipboard';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {
  getColorCodeWithOpactiyNumber,
  showSuccess,
} from '../../utils/helperFunctions';
import AboveKeyboard from '../../Components/AboveKeyboard';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function WebViewScreen({navigation, route}) {
  const userData = useSelector(state => state.auth.userData);
  const [text, setText] = useState('123');

  const webViewRef = useRef();

  useEffect(() => {
    webViewRef.current.injectJavaScript(script(text));
    console.log(text, 'here count');
  }, [text]);

  const script = text => `
  // var inputElem = document.getElementsByTagName('input');
  // var activeElementId = document.activeElement.id;
  document.activeElement.value = "${text}";
  // document.activeElement.focus();
  // document.getElementById(activeElementId).value = "${text}";
  


true;

  `;

  const didShow = height => {
    console.log('Keyboard show. Height is ' + height);
    setViewHeight(screenHeight - height);
  };

  const didHide = () => {
    console.log('Keyboard hide');
    setViewHeight(screenHeight);
  };

  const [keyboardHeigth] = useKeyboard(didShow, didHide);

  const [viewHeight, setViewHeight] = useState(screenHeight);

  useEffect(() => {
    console.log(keyboardHeigth, 'height');
  }, [keyboardHeigth]);

  const {url} = route.params;
  const [viewProfile, setProfile] = useState(false);
  const personal = [
    {
      id: 1,
      data: userData.name,
    },
    {
      id: 2,
      data: userData.middle_name,
    },
    {
      id: 3,
      data: userData.last_name,
    },
    {
      id: 4,
      data: userData.dob,
    },
    {
      id: 5,
      data: userData.name + ' ' + userData.last_name,
    },
    {
      id: 6,
      data: userData.country_birth,
    },
    {
      id: 7,
      data: userData.gender,
    },
    {
      id: 8,
      data: userData.marital_status,
    },
    {
      id: 9,
      data: userData.height,
    },
    {
      id: 10,
      data: userData.weight,
    },
    {
      id: 11,
      data: userData.blood,
    },
    {
      id: 12,
      data: userData.colour,
    },
    {
      id: 13,
      data: userData.language,
    },
  ];
  const contact = [
    {
      id: 1,
      data: userData.address,
    },
    {
      id: 2,
      data: userData.email,
    },
    {
      id: 3,
      data: userData.phone_no,
    },
  ];
  const work = [
    {
      id: 1,
      data: userData.occupation,
    },
    // {
    //   id: 2,
    //   data: userData?.profile[0].start_date,
    // },
    // {
    //   id: 3,
    //   data: userData?.profile[0].employer,
    // },
    // {
    //   id: 4,
    //   data: userData?.profile[0].job_title,
    // },
  ];
  const passphrase = useSelector(state => state.auth.passphrase);
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, data);
  };

  const sheetRef = useRef();
  const keyboardRef = useRef();

  const copyToClipboadrdCloseSheet = key => {
    // Clipboard.setString(key);
    // closeSheet();

    showSuccess(`${key}` + ' copied');
    // keyboardRef.current.focus();
    setText(key);
  };

  const renderDetails = arrayName => {
    return arrayName.map(data => {
      if (data.data == "null" || data.data == "") {
        return <View></View>;
        
      } else {
        return (
          <View key={data.id} style={sheet.textView}>
            <Text
              onPress={() => copyToClipboadrdCloseSheet(data.data)}
              style={sheet.textStyle}>
              {data.data}
            </Text>
          </View>
        );
      }
    });
  };
  const keyboardDissmis = () => {
    keyboardRef.current.focus();
    setProfile(false);
  };

  const showProfileDetails = () => {
    keyboardRef.current.focus();
    Keyboard.dismiss();
    setTimeout(() => {
      setProfile(true);
    }, 500);
  };

  return (
    <WrapperContainer showGradient={false}>
      {/* <Header
        centerTitle={strings.PERSONAL + ' details'}
        leftIcon=""
        rightIcon={imagePath.ic_dropdown}
        onPressRight={() => setProfile(true)}
      /> */}

      {url.includes('https://') || url.includes('http://') ? (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // injectedJavaScript={script(text)}
          ref={webViewRef}
          source={{
            uri: `${url}` + '/',
          }}
          // onNavigationStateChange={navState => onNavigationStateChange(navState)}
        />
      ) : (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // injectedJavaScript={script(text)}
          ref={webViewRef}
          source={{
            uri: 'https://' + `${url}` + '/',
          }}
          // onNavigationStateChange={navState => onNavigationStateChange(navState)}
        />
      )}

      {/* <BottomUpSheet sheetRef={sheetRef}> */}
      <TextInput style={{height: 0}} ref={keyboardRef} />
      {!!userData.name && (
        <AboveKeyboard setProfile={setProfile}>
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 2}}
              colors={['#DFE1E2', '#FFFFFF']}
              style={{
                // backgroundColor:"#DFE1E2",
                marginBottom:
                  Platform.OS === 'ios'
                    ? keyboardHeigth <= 315
                      ? moderateScaleVertical(keyboardHeigth + 25)
                      : moderateScaleVertical(keyboardHeigth - 35)
                    : 0,
                flexDirection: 'row',
                //  borderTopLeftRadius: 10,
                //  borderTopRightRadius: 10,
                //  borderWidth: 1,
                paddingTop: 10,
                borderBottomWidth: 0,
                //  width:moderateScale(385)
              }}>
              <TouchableOpacity
                onPress={() => keyboardDissmis()}
                style={{
                  marginTop: 0,
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                  marginBottom: 'auto',
                }}>
                <Image source={imagePath.Icon_29} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showProfileDetails()}
                style={{
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                  marginBottom: 'auto',
                }}>
                <Image source={imagePath.Icon_40} style={sheet.icon} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </AboveKeyboard>
      )}

      {viewProfile && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 2}}
          colors={['#DFE1E2', '#FFFFFF']}
          style={{
            // backgroundColor:"#DFE1E2",
            // marginBottom:
            //   Platform.OS === 'ios'
            //     ? keyboardHeigth <= 315
            //       ? moderateScaleVertical(keyboardHeigth + 25)
            //       : moderateScaleVertical(keyboardHeigth - 50)
            //     : 0,
            flexDirection: 'row',
            //  borderTopLeftRadius: 10,
            //  borderTopRightRadius: 10,
            //  borderWidth: 1,
            paddingTop: 10,
            borderBottomWidth: 0,
            //  width:moderateScale(385)
          }}>
          <View style={{...sheet.conatinerView}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => keyboardDissmis()}
                style={{
                  marginTop: 0,
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                }}>
                <Image source={imagePath.Icon_29} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showProfileDetails()}
                style={{
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                }}>
                <Image source={imagePath.Icon_40} style={sheet.icon} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={{flexDirection: 'row'}}>
                <Text style={sheet.headingText}>Personal</Text>
              </View>
              <View style={sheet.rowView}>{renderDetails(personal)}</View>

              <Text style={sheet.headingText}>Contact</Text>
              <View style={sheet.rowView}>{renderDetails(contact)}</View>

              <Text style={sheet.headingText}>Work</Text>
              <View style={sheet.rowView}>{renderDetails(work)}</View>
            </ScrollView>
          </View>
        </LinearGradient>
      )}

      {/* </BottomUpSheet> */}
    </WrapperContainer>
  );
}

const sheet = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignContent: 'stretch',
    flexWrap: 'wrap',
  },

  headingText: {
    ...commonStyles.fontBold14,
    fontSize: textScale(16),
    marginLeft: moderateScale(10),
    marginTop: moderateScaleVertical(5),
  },
  textStyle: {
    // backgroundColor: '',
    ...commonStyles.fontSize14,
    marginHorizontal: moderateScale(5),
    borderRadius: 100,
  },
  textView: {
    backgroundColor: getColorCodeWithOpactiyNumber('ADD8E6', 50),
    borderRadius: 20,
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScaleVertical(3),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5),
  },
  crossImage: {
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: moderateScale(10),
  },
  conatinerView: {
    height: moderateScaleVertical(290),
    // paddingTop: moderateScaleVertical(7),
    paddingLeft: moderateScale(2),
    // backgroundColor:"#DFE1E2",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderWidth: 1,
    borderBottomWidth: 0,
    // paddingTop: 10,
  },
  icon: {
    width: moderateScale(25),
    height: moderateScaleVertical(25),
    resizeMode: 'contain',
    tintColor: 'black',
  },
});
