import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import EditProfileCard from '../../Components/EditProfileCard';
import Header from '../../Components/Header';
import PhoneNumberInput from '../../Components/PhoneNumberInput';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import {commonStyles, edit_profile} from './styles';
import {useSelector} from 'react-redux';
import actions from '../../redux/actions';
import common_Styles from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {saveUserData} from '../../redux/actions/auth';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {setUserData} from '../../utils/utils';
import DatePickerWithLabel from '../../Components/DatePickerWithLabel';
import ChooseCountry from '../../Components/ChooseCountry';
import DropDownComp from '../../Components/DropDownComp';
import colors from '../../styles/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import navigationStrings from '../../constants/navigationStrings';
import Loader from '../../Components/Loader';
import moment from 'moment';
export default function Edit_Profile({navigation}) {
  const userData = useSelector(state => state.auth.userData);
  // const [userData, setuserData] = useState()
  // useEffect(() => {

  //   }, []);

  console.log(userData, 'Edit profile');
  const [profileView, setprofileView] = useState(false);

  const [state, setState] = useState({
    profileView: false,
    contactView: false,
    workView: false,
    callingCode: '971',
  });

  const [selectedImage, setselectedImage] = !!userData?.profile_image
    ? useState('http://15.184.181.58/storage/' + userData?.profile_image)
    : useState();
  //personal
  const [firstName, setfirstName] =
    userData.name == null ? useState('') : useState(userData.name);
  const [middlename, setmiddlename] =
    userData.middle_name == null
      ? useState('')
      : useState(userData.middle_name);
  const [lastName, setlastName] =
    userData.last_name == null ? useState('') : useState(userData.last_name);
  const [dob, setdob] = useState(userData.dob);
  const [countryOfBirth, setcountryOfBirth] =
    userData.country_birth == null
      ? useState('')
      : useState(userData.country_birth);
  console.log(userData.dob, 'edit country');
  const [gender, setgender] =
    userData.gender == null ? useState('') : useState(userData.gender);
  const [maritalStatus, setmaritalStatus] =
    userData.marital_status == null
      ? useState('')
      : useState(userData.marital_status);
  const [height, setheight] =
    userData.height == null ? useState('') : useState(userData.height);
  const [weight, setweight] =
    userData.weight == null ? useState('') : useState(userData.weight);
  const [bloodGroup, setbloodGroup] =
    userData.blood == null ? useState('') : useState(userData.blood);
  const [eyeColor, seteyeColor] =
    userData.colour == null ? useState('') : useState(userData.colour);
  const [languageSpoken, setlanguageSpoken] =
    userData.language == null ? useState('') : useState(userData.language);
  const [signature, setSignature] = useState('');

  const selectGender = [
    {
      name: 'Male',
    },
    {
      name: 'Female',
    },
  ];

  const selectMaritalStatus = [
    {
      name: 'Yes',
    },
    {
      name: 'No',
    },
  ];

  const selectBloodGroup = [
    {
      name: 'A+',
    },
    {
      name: 'B+',
    },
  ];

  //contact
  const [address, setAddress] =
    userData.address == null ? useState('') : useState(userData.address);
  const [email, setemail] =
    userData.email == null ? useState('') : useState(userData.email);
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const [phone, setphone] =
    userData.phone_no == null ? useState('') : useState(userData.phone_no);

  //work
  const [occupation, setOccupation] =
    userData.occupation == null ? useState('') : useState(userData.occupation);
  const [employer, setEmployer] = useState(userData.profile?.employer);
  const [jobTitle, setJobTitle] = useState(userData.profile?.job_title);
  const [startDate, setStartDate] = useState(null);
  // const [work, setwork] = useState(userData.profile);
  const [work, setwork] = useState([]);

  // let work = [
  //   {
  //     job_title: 1,
  //     employer: 'emp1',
  //     start_date: '12-09-2019',
  //     end_date: '12-09-2019',
  //   },
  // ];
  //atryComment

  const [isloading, setisloading] = useState(false);
  //  const [isSaveButtonActive, setisSaveButtonActive] = useState(false)

  const renderWork = () => {
    // alert()
    return work.map((data, index) => {
      return (
        <View key={data.job_title}>
          <Text
            style={{
              fontSize: textScale(16),
              ...commonStyles.fontSize16,
              fontFamily: 'futura',
              color: colors.textColor,
              marginTop: moderateScaleVertical(5),
              marginBottom: moderateScaleVertical(10),
              textAlign: 'center',
            }}>
            Job {index + 1}
          </Text>
          <TextInputWithLabel
            label={strings.EMPLOYER}
            placeHolder={'Enter ' + strings.EMPLOYER}
            defaultValue={work[index].employer}
            onChangeText={value => (work[index].employer = value)}
          />
          <TextInputWithLabel
            label={strings.JOB_TITLE}
            placeHolder={'Enter ' + strings.JOB_TITLE}
            defaultValue={work[index].job_title}
            onChangeText={value => (work[index].job_title = value)}
          />
          <DatePickerWithLabel
            label={strings.START_DATE}
            placeHolder={'Enter ' + strings.START_DATE}
            onDateChange={value => (work[index].start_date = value)}
            date={work[index].start_date}
          />
          <DatePickerWithLabel
            label={strings.END_DATE}
            placeHolder={'Enter ' + strings.END_DATE}
            onDateChange={date => (work[index].end_date = date)}
            date={work[index].end_date}
          />
        </View>
      );
    });
  };

  const updateState = data => setState(state => ({...state, ...data}));

  const _onChangeText = key => val => {
    updateState({[key]: val});
  };

  const onDateChangeStartDate = date => {
    console.log(date);
    setStartDate(date);
  };
  const onDateChangedob = date => {
    console.log(date);
    setdob(date);
  };

  const _onCountryChange = data => {
    updateState({cca2: data.cca2, callingCode: data.callingCode[0]});
    return;
  };
  const _onLogut = () => {
    Alert.alert(
      strings.DO_YOU_WANT_TO_LOGOUT + ' ?',
      '',
      // "To register yourself press ok",
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: actions.onLogout},
      ],
    );
  };

  const _onSave = () => {
    let query =
      `name=${firstName}` +
      '&' +
      `middle_name=${middlename}` +
      '&' +
      `last_name=${lastName}` +
      '&' +
      `dob=${dob}` +
      '&' +
      `country_birth=${countryOfBirth}` +
      '&' +
      `marital_status=${maritalStatus}` +
      '&' +
      `height=${height}` +
      '&' +
      `weight=${weight}` +
      '&' +
      `blood=${bloodGroup}` +
      '&' +
      `colour=${eyeColor}` +
      '&' +
      `language=${languageSpoken}` +
      '&';

    const query2 =
      `address=${address}` +
      '&' +
      `email=${email}` +
      '&' +
      `phone_no=${phone}` +
      '&' +
      `gender=${gender}` +
      '&' +
      `occupation=${occupation}`;

    // `&` +
    // `institute=${email}` +
    // '&' +
    // `qualification=${email}` +
    // '&' +
    // `major=${email}` +
    // '&' +
    // `country=${email}` +
    // '&' +
    // `from=${email}` +
    // '&' +
    // `to=${email}`;

    // '&' +
    // `profile[0]?.major=${occupation}` +
    // '&' +
    // `profile[0]?.employer=${employer}` +
    // '&' +
    // `profile[0]?.job_title=${jobTitle}` +
    // '&' +
    // `profile[0]?.start_date=${startDate}` ;      ;

    console.log(query, 'amafisdfudsifdh');
    actions
      .editProfile(userData.passphase_key, query + query2, {
        work: work,
      })
      .then(res => {
        console.log(res.data, 'resolved.......');
        saveUserData(res.data);
        setUserData(res.data);
        showSuccess(res.message);
        setshowTick(false);
        updateState({
          profileView: false,
          contactView: false,
          workView: false,
        });
      })
      .catch(err => {
        console.log(err, 'error ,.....');
        showError(err.message);
      });
  };
  const createFormData = (media, body = {}) => {
    const data = new FormData();

    data.append('token', userData.passphase_key);
    // data.append("profile_image",('image/jpg',Platform.OS === 'ios' ? media?.uri?.replace('file://', '') : media.uri ))
    data.append('profile_image', {
      name: media.fileName,
      uri:
        Platform.OS === 'ios' ? media?.uri?.replace('file://', '') : media.uri,
      type: 'multipart/form-data',
    });

    return data;
  };

  const imageCallBack = res => {
    setisloading(true);
    if (res.uri) {
      setselectedImage('http://15.184.181.58/storage/' + res.uri);

      console.log(selectedImage, 'mandfhsbfshy');

      const profile = createFormData(res);
      console.log(profile);
      let token = userData.passphase_key;

      actions
        .uploadProfileImage(profile)
        .then(res => {
          console.log(res, 'mantash');
          setselectedImage(
            'http://15.184.181.58/storage/' + res.data.profile_image,
          );
          saveUserData(res.data);
          setUserData(res.data);
          setisloading(false);
        })
        .catch(err => {
          showError();
          setisloading(false);
        });
    } else {
      if (res.didCancel) {
        showError(strings.CANCEL_IMAGE_LOADING);
      }
      if (res.errorCode) {
        console.log(res);
        if (res.errorCode == 'camera_unavailable') {
          showError(strings.CAMERA_UNAVAILABLE);
        }
        if (res.errorCode == 'permission') {
          showError(strings.PERMISSION_ERROR);
        }
        if (res.errorCode == 'others') {
          showError(strings.CANCEL_IMAGE_LOADING);
        }
      }
    }
  };

  const openGallery = () => {
    let picker = launchImageLibrary(
      {
        mediaType: 'photo',
        allowsEditing: true,
        quality: 1,
      },
      res => imageCallBack(res),
    );
  };
  const _updateImage = () => {
    Alert.alert('Camera Access Required', 'Do you want to edit profile image', [
      {
        text: strings.NO,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: strings.YES, onPress: openGallery},
      // {text: strings.OPEN_CAMERA, onPress: this.openCamera},
    ]);
  };
  const [showTick, setshowTick] = useState(false);
  const image1 = {uri: selectedImage};
  console.log(image1, 'mantash');

  return (
    <WrapperContainer barStyle="dark-content">
      <ScrollView keyboardShouldPersistTaps="handled">
        <Header
          centerTitle={strings.EDIT_PROFILE}
          textStyle={{...commonStyles.headerText}}
          rightIcon={!!showTick ? imagePath.tick : ''}
          rightIconStyle={{width: 30, height: 30}}
          onPressRight={() => {
            _onSave();
          }}
          // onPressLeft={()=> {navigation.navigate(navigationStrings.PROFILE,{imageProfile:image1} )
          // console.log("yes")}}
        />
        <View style={edit_profile.profilImageRow}>
          <Pressable onPress={() => _updateImage()}>
            <Loader isLoading={isloading} />
            {!!userData?.profile_image ? (
              <ImageBackground
                source={image1}
                imageStyle={{borderRadius: 100}}
                resizeMode="cover"
                style={commonStyles.profilImage}>
                <Image source={imagePath.edit} style={commonStyles.editIcon} />
              </ImageBackground>
            ) : (
              <ImageBackground
                source={imagePath.profileImage}
                imageStyle={{borderRadius: 100}}
                resizeMode="contain"
                style={commonStyles.profilImage}>
                <Image source={imagePath.edit} style={commonStyles.editIcon} />
              </ImageBackground>
            )}
          </Pressable>
        </View>

        <View style={edit_profile.componentsView}>
          <EditProfileCard
            cardText={strings.PERSONAL}
            onTouch={() => {
              setshowTick(true);
              updateState({
                profileView: !state.profileView,
                contactView: false,
                workView: false,
              });
            }}
          />

          {/* ONPRESS EDIT VIEW */}
          {state.profileView && (
            <View>
              <TextInputWithLabel
                label={strings.FIRST_NAME}
                placeHolder={'Enter ' + strings.FIRST_NAME}
                defaultValue={firstName}
                onChangeText={value => setfirstName(value)}
              />
              <TextInputWithLabel
                label={strings.MIDDLE_NAME}
                placeHolder={'Enter ' + strings.MIDDLE_NAME}
                defaultValue={middlename}
                onChangeText={value => setmiddlename(value)}
              />
              <TextInputWithLabel
                label={strings.LAST_NAME}
                placeHolder={'Enter ' + strings.LAST_NAME}
                defaultValue={lastName}
                onChangeText={value => setlastName(value)}
              />
              <DatePickerWithLabel
                label={strings.DATE_OF_BIRTH}
                placeHolder={'Enter ' + strings.DATE_OF_BIRTH}
                onDateChange={onDateChangedob}
                date={dob}
              />
              <ChooseCountry
                label={strings.COUNTRY_OF_BIRTH}
                placeHolder={'Enter ' + strings.COUNTRY_OF_BIRTH}
                country={countryOfBirth}
                onSelect={value => setcountryOfBirth(value.name)}
              />

              <DropDownComp
                optionData={selectGender}
                label={strings.GENDER}
                placeHolder={'Enter ' + strings.GENDER}
                dropDownValuesHandler={value => setgender(value)}
                value={gender}
              />

              <DropDownComp
                optionData={selectMaritalStatus}
                label={strings.MARITAL_STATUS}
                placeHolder={'Enter ' + strings.MARITAL_STATUS}
                dropDownValuesHandler={value => setmaritalStatus(value)}
                value={maritalStatus}
              />

              <TextInputWithLabel
                label={strings.HEIGHT}
                placeHolder={'Enter ' + strings.HEIGHT}
                defaultValue={height}
                onChangeText={value => setheight(value)}
              />
              <TextInputWithLabel
                label={strings.WEIGHT}
                placeHolder={'Enter ' + strings.WEIGHT}
                defaultValue={weight}
                onChangeText={value => setweight(value)}
              />

              <DropDownComp
                optionData={selectBloodGroup}
                label={strings.BLOOD_GROUP}
                placeHolder={'Enter ' + strings.BLOOD_GROUP}
                dropDownValuesHandler={value => setbloodGroup(value)}
                value={bloodGroup}
              />

              <TextInputWithLabel
                label={strings.EYE_COLOUR}
                placeHolder={'Enter ' + strings.EYE_COLOUR}
                defaultValue={eyeColor}
                onChangeText={value => seteyeColor(value)}
              />
              <TextInputWithLabel
                label={strings.LANGUAGE_SPOKEN}
                placeHolder={'Enter ' + strings.LANGUAGE_SPOKEN}
                defaultValue={languageSpoken}
                onChangeText={value => setlanguageSpoken(value)}
              />

              {/* <TextInputWithLabel
                label={strings.SIGNATURE}
                placeHolder={'Enter ' + strings.SIGNATURE}
                defaultValue={signature}
                onChangeText={value => setSignature(value)}
              /> */}
            </View>
          )}
          <EditProfileCard
            cardText={strings.CONTACT}
            onTouch={() => {
              setshowTick(true);
              updateState({
                contactView: !state.contactView,
                profileView: false,
                workView: false,
              });
            }}
          />

          {state.contactView && (
            <View>
              <TextInputWithLabel
                label={strings.ADDRESS}
                placeHolder={'Enter ' + strings.ADDRESS}
                defaultValue={address}
                onChangeText={value => setAddress(value)}
              />
              <TextInputWithLabel
                label={strings.EMAIL_ADDRESS}
                placeHolder={'Enter ' + strings.EMAIL_ADDRESS}
                defaultValue={email}
                onChangeText={value => setemail(value)}
              />
              <View style={styles.VerfiyView}>
                <Text style={styles.pendinText}>
                  {strings.PENDING_FOR_VERIFICATION}
                </Text>
                <Text
                  style={styles.VerfiyText}
                  onPress={() => setisEmailVerified(true)}>
                  {strings.VERIFY_NOW}
                </Text>
              </View>

              {/* <TextInputWithLabel label={strings.MOBILE_NUMBER} defaultValue={"(406) 555-0120"} /> */}
              <View
                style={{
                  backgroundColor: '#EBECF0',
                  borderRadius: 12,
                  paddingHorizontal: moderateScale(16),
                  paddingVertical: moderateScaleVertical(8),
                  marginBottom: moderateScaleVertical(16),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 4,
                }}>
                <Text
                  style={{
                    ...commonStyles.fontSize14,
                    color: '#838595',
                    marginBottom: 0,
                  }}>
                  {strings.MOBILE_NUMBER}
                </Text>
                <PhoneNumberInput
                  returnKeyType={strings.DONE}
                  onCountryChange={_onCountryChange}
                  onChangePhone={value => setphone(value)}
                  cca2={state.cca2}
                  phoneNumber={phone}
                  callingCode={state.callingCode}
                />
              </View>
              <View style={styles.VerfiyView}>
                <Text style={styles.pendinText}>
                  {strings.PENDING_FOR_VERIFICATION}
                </Text>
                <Text
                  style={styles.VerfiyText}
                  onPress={() =>
                    navigation.navigate(navigationStrings.PHONE_VERIFICATION)
                  }>
                  {strings.VERIFY_NOW}
                </Text>
              </View>
            </View>
          )}
          <EditProfileCard
            cardText={strings.WORK}
            onTouch={() => {
              setshowTick(true);
              updateState({
                workView: !state.workView,
                profileView: false,
                contactView: false,
              });
            }}
          />
          {state.workView && (
            <View>
              <TextInputWithLabel
                label={strings.OCCUPATION}
                placeHolder={'Enter ' + strings.OCCUPATION}
                defaultValue={occupation}
                onChangeText={value => setOccupation(value)}
              />
              <View>{renderWork()}</View>

              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    work.pop();
                    setSignature(signature + 1);
                  }}>
                  <Image source={imagePath.minus} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    work.push({
                      job_title: '',
                      employer: '',
                      start_date: null,
                      end_date: null,
                    });
                    setSignature(signature + 1);
                    console.log(work);
                  }}>
                  <Image source={imagePath.plus} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* <EditProfileCard cardText={strings.EDUCATION} />
          <EditProfileCard cardText={strings.EMERGENCY} />
          <EditProfileCard cardText={strings.IDS} /> */}
        </View>

        {/* <TouchableOpacity style={commonStyles.button} onPress={() => _onSave()}>
          <Text style={commonStyles.buttonText}>{strings.SAVE}</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={commonStyles.button}
          // onPress={() => alert(email)}
          onPress={() => _onLogut()}>
          <Text style={commonStyles.buttonText}>{'Logout'}</Text>
        </TouchableOpacity>
        <Modal transparent visible={isEmailVerified}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={styles.emailViewWrapper}>
              <Text style={styles.verifyEmailText}>
                {strings.PLEASE_VERIFY_EMAIL}
              </Text>
              <TouchableOpacity
                style={{
                  ...commonStyles.button,
                  ...common_Styles.fontSize18,
                  width: moderateScale(120),
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: moderateScaleVertical(24),
                }}
                onPress={() => {
                  setisEmailVerified(false);
                }}>
                <Text style={commonStyles.buttonText}>{strings.CLOSE}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </WrapperContainer>
  );
}
const styles = StyleSheet.create({
  verifyEmailText: {
    ...common_Styles.fontSize22,
    color: '#334669',
    textAlign: 'center',
  },
  emailViewWrapper: {
    width: moderateScale(315),
    height: moderateScaleVertical(223),
    borderRadius: 12,
    backgroundColor: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingHorizontal: moderateScale(17),
    paddingVertical: moderateScaleVertical(25),
  },
  iconRow: {flexDirection: 'row', marginLeft: 'auto'},
  icon: {
    width: moderateScale(30),
    height: moderateScaleVertical(30),
    tintColor: colors.textColor,
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScaleVertical(10),
  },
  VerfiyView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginBottom: moderateScaleVertical(16),
  },
  pendinText: {
    ...common_Styles.fontSize12,
    color: 'red',
    marginRight: moderateScale(15),
  },
  VerfiyText: {
    ...common_Styles.fontSize12,
    color: '#26C9FF',
  },
});
