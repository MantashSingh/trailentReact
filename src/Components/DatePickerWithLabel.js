import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  textScale,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';
import commonStyles from '../styles/commonStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import strings from '../constants/lang';
import { getColorCodeWithOpactiyNumber } from '../utils/helperFunctions';

const DatePickerWithLabel = ({
  label,
  placeHolder,
  marginBottom = 18,
  onDateChange,
  isDob = true,
  date = '',
  minDate = false,
  rightImg = false,
  inputStyle,
  mode = 'date',
  headerText = strings.PICK_A_DATE,
}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    // alert()
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    if (mode === 'time') {
      let time = moment(date).format('h:mm a');
      setSelectedDate(time);
      onDateChange(time);
      hideDatePicker();
      //console.log("this is date with time", time)
    } else {
      const newDdate = moment(date).format('MMM, D, Y');
      // console.log("A date has been picked: ", newDdate);
      setSelectedDate(newDdate);
      onDateChange(newDdate);
      hideDatePicker();
    }
  };
  return (
    <View style={{marginBottom: marginBottom, ...styles.container}}>
      <Text
        style={{
          ...commonStyles.fontSize14,
          color: '#838595',
        }}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          ...styles.inputStyle,
          ...inputStyle,
          backgroundColor: 'transparent',
        }}
        activeOpacity={0.8}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              flex: 1,
              ...commonStyles.fontSize14,
              fontFamily: "futura",
              textAlign: 'left',
              color:
                selectedDate == null ? getColorCodeWithOpactiyNumber(838595,60) : "black",
              right:moderateScale(15),
              
            }}>
            {selectedDate == null
              ? placeHolder
              : moment(selectedDate).format("DD/MM/YYYY")}
          </Text>
          {/* <Image source={imagePath.ic_dropdown} style={{marginRight:20 , marginLeft:"auto" , marginTop:"auto" , marginBottom:"auto"}}/> */}

          

          {isDatePickerVisible && (
            <DateTimePickerModal
              maximumDate={isDob ? new Date(2250, 12) : null}
              minimumDate={minDate ? new Date() : null}
              isVisible={isDatePickerVisible}
              mode={mode}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              headerTextIOS={headerText}
            />
          )}
        </View>
        {rightImg ? <Image source={imagePath.icDropDown} /> : null}
      </TouchableOpacity>
    </View>
  );
};
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
  inputStyle: {
    backgroundColor: colors.bgInputColor,
    borderRadius: moderateScale(4),
    minHeight: moderateScaleVertical(35),
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScaleVertical(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DatePickerWithLabel;
