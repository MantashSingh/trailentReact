import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';

export default function CameraScreen() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const updateState = data => setState(state => ({...state, ...data}));

  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {});
  };

  return (
    <WrapperContainer barStyle="dark-content">
      <View>
        <Text style={styles.header}>Camera</Text>
      </View>
    </WrapperContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    alignContent: 'center',
  },
});
