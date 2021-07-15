import * as React from 'react';
//import NavigationService from './navigation/NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);
  console.log(userData , "routes userdata ")
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!!userData && userData.passphase_key
          ? MainStack(Stack)
          : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
