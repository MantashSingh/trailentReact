import React, {useState , useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Header from '../../Components/Header';
import ProfileCards from '../../Components/ProfileCards';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import {commonStyles, profile} from './styles';
import {useSelector} from 'react-redux';

export default function Profile({navigation }) {
  const userData = useSelector(state => state.auth.userData);
  const updateState = data => setState(state => ({...state, ...data}));
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {});
  };
  var [selectedImage, setselectedImage] = 
  !!userData?.profile_image
    ? useState('http://15.184.181.58/storage/' +userData?.profile_image )
    : useState();
  


(()=>{
 
  selectedImage= !!userData?.profile_image
    &&'http://15.184.181.58/storage/' +userData?.profile_image
  
})()
const image1 = {uri: selectedImage}
    

   
  return (
    <WrapperContainer barStyle="dark-content">
      <Header
        centerTitle={strings.PROFILE}
        textStyle={{...commonStyles.headerText}}
      />
      <View style={profile.container}>
        <View style={commonStyles.profilImageRow}>
          <TouchableOpacity
            onPress={moveToNewScreen(navigationStrings.EDIT_PROFILE)}>
            {/* <ImageBackground
              source={image1}
              imageStyle={{borderRadius: 100}}
                resizeMode="cover"
              style={commonStyles.profilImage}>
              <Image source={imagePath.edit} style={commonStyles.editIcon} />
            </ImageBackground> */}

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
          </TouchableOpacity>

          <View style={{flexDirection: 'column'}}>
            <Text style={profile.name}>{userData?.name} {userData?.middle_name} {userData?.last_name}</Text>
            <View style={profile.codeView}>
              <Text style={profile.codeText}>{userData.passphase_key}</Text>
            </View>
          </View>
        </View>
        <ProfileCards
          leftImage={imagePath.lock}
          StringText={strings.MY_PASSPHRASE}
        />
        <ProfileCards
          leftImage={imagePath.safety}
          StringText={strings.SECURITY}
        />
        <ProfileCards
          onpress={moveToNewScreen(navigationStrings.FEEDBACK)}
          leftImage={imagePath.like}
          StringText={strings.GIVE_US_FEEDBACK}
        />
        {/* <ProfileCards
          leftImage={imagePath.lock}
          StringText={strings.LEGAL_AND_PRIVACY}
        /> */}
      </View>
    </WrapperContainer>
  );
}
