import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import navigationStrings from '../../constants/navigationStrings';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
export default function Login({navigation}) {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const updateState = data => setState(state => ({...state, ...data}));

  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {});
  };

  const {timer} = state;
  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <ProgressSteps>
        <ProgressStep label="STEP - 1">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 1!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="STEP - 2">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="STEP - 3">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="STEP - 4">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="STEP - 5">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="STEP - 6">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    alignContent: 'center',
  },
});
