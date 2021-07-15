import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import commonStyles from '../styles/commonStyles';
import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';
import { getColorCodeWithOpactiyNumber } from '../utils/helperFunctions';
export default function ChooseCountry({label, onSelect, country , placeHolder}) {
  const [countryPickerModalVisible, setcountryPickerModalVisible] = useState(
    false,
  );
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...commonStyles.fontSize14,
          color: '#838595',
        }}>
        {label}
      </Text>




      <TouchableOpacity
        style={{
          flexDirection: 'row',
          //   justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setcountryPickerModalVisible(true)}>
        {/* <Text
          style={{
            ...commonStyles.fontSize16,
            height: moderateScaleVertical(30),
          }}>
          {country}
        </Text> */}

<Text
            style={
              country
                ? styles.txt
                : [
                    styles.txt,
                    { ...commonStyles.fontSize14 , color: getColorCodeWithOpactiyNumber(838595,60),},
                  ]
            }>
            {country ? country : placeHolder}
          </Text>
      </TouchableOpacity>
      {countryPickerModalVisible && (
        <CountryPicker
          visible={countryPickerModalVisible}
          withFilter
          withAlphaFilter
          onSelect={onSelect}
          onClose={() => setcountryPickerModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBECF0',
    borderRadius: 12,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  txt: {
    ...commonStyles.fontSize16,
    zIndex: 0,
    textAlign: 'left',
    fontFamily: 'futura',
    fontSize: 16,
    color:"black",
    marginBottom:moderateScaleVertical(7),
    marginTop:moderateScaleVertical(2),
   

  },
});
