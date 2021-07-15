import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import commonStyles, {hitSlopProp} from '../styles/commonStyles';
import fontFamily from '../styles/fontFamily';

const TextInputWithLabel = ({
  label,
  onChangeText,
  value,
  active = false,
  secureTextEntry = false,
  rightIcon,
  customTextStyle = {...commonStyles.fontSize14},
  placeHolder="abc",
  onPress = () => {},
  onPressRightIcon = () => {},
  ...rest
}) => {
  let currentColor = active ? colors.themeColor : colors.textGrey;
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...commonStyles.fontSize14,
        color: '#838595',
          
        }}>
        {label}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          {...rest}
          placeholder={placeHolder}
          secureTextEntry={secureTextEntry}
          // onFocus={onFocus}
          style={{
            flex: 1,
            ...styles.textInput,
            borderColor: currentColor,
            ...customTextStyle,
            
          }}
          onChangeText={onChangeText}
          value={value}
        />
        {!!rightIcon && (
          <TouchableOpacity
            hitSlop={hitSlopProp}
            onPress={onPressRightIcon}
            style={{alignItems: 'center', justifyContent: 'center',marginLeft:6}}>
            <Image source={rightIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInputWithLabel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBECF0',
    borderRadius: 12,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(8),
    marginBottom:moderateScaleVertical(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    },
    
  textInput: {
    borderWidth: 0,
    borderColor: colors.themeMain,
    height: moderateScaleVertical(30),
    fontSize: moderateScaleVertical(14),
    fontFamily: "futura",
    paddingVertical: 0,
    textAlignVertical: 'center',
    paddingBottom:moderateScaleVertical(8)
  },
});


