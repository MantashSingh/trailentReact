import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, CameraScreen , AddScreen, Profile} from '../Screens/index';
import imagePath from '../constants/imagePath';
import navigationStrings from '../constants/navigationStrings';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.HOME}
      // barStyle={{ backgroundColor: 'red' }}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: { borderTopWidth: 0  ,elevation: 0}
      }}>
      <Tab.Screen
        name=" "
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            focused?
            <Image
              source={imagePath.homeSel}
              style={{...styles.icon }}
            />
            :
            <Image
            source={imagePath.home}
            style={{...styles.icon }}
          />
          ),
        }}
      />

      <Tab.Screen
        name="   "
        component={CameraScreen}
        options={{
          tabBarIcon: ({focused}) => (
            focused?
            <Image
              source={imagePath.cameraSel}
              style={{...styles.icon }}
            />
            :
            <Image
            source={imagePath.camera}
            style={{...styles.icon }}
          />
          ),
        }}
      />

      <Tab.Screen
        name="  "
        component={AddScreen}
        options={{
          tabBarIcon: ({focused}) => (
            focused?
            <Image
              source={imagePath.addSel}
              style={{...styles.icon }}
            />
            :
            <Image
            source={imagePath.add}
            style={{...styles.icon }}
          />
          ),
        }}
      />

     
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
    // resizeMode: 'contain',
    
    
  },
});
