import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import Loader from './Loader';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const WrapperContainer = ({
  children,
  isLoading,
  bgColor = "#fff",
  statusBarColor = colors.white,
  barStyle = 'dark-content',
  showGradient = true,
}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: statusBarColor}}>
      <StatusBar backgroundColor={colors.white} barStyle={barStyle} />
      {showGradient ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E6E7ED', '#FFFFFF']}
          style={{flex: 1}}>
          {children}
        </LinearGradient>
      ) : (
        <View style={{backgroundColor: bgColor, flex:1}}>{children}</View>
      )}

      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default WrapperContainer;
