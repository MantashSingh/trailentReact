import React from 'react';
import {
  onBoarding,
  onBoarding1,
  Login,
  Profile,
  Edit_Profile,
  Passcode_3,
  Passphrase,
  WebViewScreen,
  WebViewForNewUser,
  ReturningUserPassphrase,
} from '../Screens';
import navigationStrings from '../constants/navigationStrings';

import TabRoutes from './TabRoutes';

export default function (Stack) {
  return (
    <>
      {/* <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />  */}
      <Stack.Screen
        name={navigationStrings.ON_BOARDING}
        component={onBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.ON_BOARDING1}
        component={onBoarding1}
        options={{headerShown: false}}
      />
     
     
    
      
      <Stack.Screen
        name={navigationStrings.PASSPHRASE}
        component={Passphrase}
        options={{headerShown: false}}
      />
  <Stack.Screen
        name={navigationStrings.RETURNING_USER_PASSPHRASE}
        component={ReturningUserPassphrase}
        options={{headerShown: false}}
      />
      

<Stack.Screen
        name={navigationStrings.WEB_VIEW_FOR_NEW_USER}
        component={WebViewForNewUser}
        options={{headerShown: false}}
      />







    </>
  );
}
