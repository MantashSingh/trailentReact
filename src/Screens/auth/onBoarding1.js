/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {commonStyles, onBoardingStyles} from './styles';

//constants
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';

//reusable components
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';

const onBoarding1 = ({navigation}) => {
  const moveToNewScreen = (screenName, data = {}) => {
    navigation.navigate(screenName, data);
  };

  return (
    <WrapperContainer>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={onBoardingStyles.mainView}>
          <View style={onBoardingStyles.subView}>
            <Text style={onBoardingStyles.heading}>Manage documents</Text>
            <Text style={onBoardingStyles.heading}>like a pro</Text>
            <Text style={onBoardingStyles.subHeading}>
              Lorem Ipsum is simply dummy text of the printing and typesetting.
            </Text>
          </View>
          <Image
            resizeMode="contain"
            source={imagePath.ic_onboard1}
            style={onBoardingStyles.imageView}
          />
        </View>
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => moveToNewScreen(navigationStrings.PASSPHRASE)}>
          <Text style={commonStyles.buttonText}>{strings.NEW_USER}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() =>
            moveToNewScreen(navigationStrings.PASSPHRASE, {returning: true})
          }>
          <Text style={commonStyles.buttonText}>{strings.RETURNING_USER}</Text>
        </TouchableOpacity>
      </ScrollView>
    </WrapperContainer>
  );
};

export default onBoarding1;
