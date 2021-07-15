import React from 'react';

import navigationStrings from '../constants/navigationStrings';
import { Edit_Profile, Feedback, Home, Passcode_3, PhoneVerification, WebViewScreen } from '../Screens';
import Profile from '../Screens/Profile/Profile';

import TabRoutes from './TabRoutes';

export default function (Stack) {
  return (
    <>
     <Stack.Screen
        name={navigationStrings.PASSCODE_3}
        component={Passcode_3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.WEB_VIEW_SCREEN}
        component={WebViewScreen}
        options={{headerShown: false}}
      />
    {/* <Stack.Screen
        name={navigationStrings.TAB_ROUTES}
        options={{headerShown: false}}
        component={TabRoutes}
      /> */}
      <Stack.Screen
        name={navigationStrings.HOME}
        options={{headerShown: false}}
        component={Home}
      />

    
      <Stack.Screen
        name={navigationStrings.PROFILE}
        options={{headerShown: false}}
        component={Profile}
      />
<Stack.Screen
        name={navigationStrings.FEEDBACK}
        options={{headerShown: false}}
        component={Feedback}
      />
     
      <Stack.Screen
        name={navigationStrings.EDIT_PROFILE}
        component={Edit_Profile}
        options={{headerShown: false}}
      />


<Stack.Screen
        name={navigationStrings.PHONE_VERIFICATION}
        options={{headerShown: false}}
        component={PhoneVerification}
      />
    </>
  );
}
