import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import imagePath from '../constants/imagePath';
import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';
import commonStyles, {hitSlopProp} from '../styles/commonStyles';
import { getColorCodeWithOpactiyNumber } from '../utils/helperFunctions';

const {width, height} = Dimensions.get('window');

const DropDownComp = props => {
  const {
    value,
    dropDownValuesHandler,
    placeHolder,
    optionData,
    fix,
    right,
    label,
  } = props;
  /************************** User Sate
   */ const [showOptions, setShowOptions] = useState(false);

  // console.log("otpn data", optionData)
  const valueHandler = data => {
    setShowOptions(false);
    dropDownValuesHandler(data);
  };
  const modalHandler = () => {
    return (
      <Modal
        onRequestClose={() => setShowOptions(false)}
        transparent={true}
        visible={showOptions}
        animationType={'slide'}>
        <TouchableOpacity
          onPress={() => setShowOptions(false)}
          style={styles.modalCont}>
          {renderDorpDownData()}
        </TouchableOpacity>
      </Modal>
    );
  };

  const renderDorpDownData = () => {
    return (
      <View style={[styles.mainDataCont]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            minWidth: '50%',
          }}>
          {optionData.map((x, i) => (
            <View style={{zIndex: 99999, width: '100%'}} key={x.id}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => valueHandler(x.name)}
                style={[
                  styles.datCont,
                  {
                    // borderBottomWidth: (optionData.length - 1) == i ? 2 : 0
                  },
                ]}>
                <Text style={styles.dataTxt}>{x.name}</Text>
              </TouchableOpacity>
              <View
                style={{height: 0.5, backgroundColor: '#000', opacity: 0.2}}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
            ...commonStyles.fontSize14,
            color: '#838595',
        }}>
        {label}
      </Text>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setShowOptions(!showOptions);
        }}
        style={styles.textInput}>
        <View>
          <Text
            style={
              value
                ? styles.txt
                : [
                    styles.txt,
                    { ...commonStyles.fontSize14 , color: getColorCodeWithOpactiyNumber(838595,60)},
                  ]
            }>
            {value ? value : placeHolder}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          alignItems: 'center',
        }}>
        {modalHandler()}
      </View>
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
  textInput: {
    borderWidth: 0,
    borderColor: colors.themeMain,
    height: moderateScaleVertical(30),
    fontSize: moderateScaleVertical(16),
    fontFamily: 'futura',
    paddingVertical: 0,
    textAlign: 'left',
    paddingBottom: moderateScaleVertical(8),
  },
  txt: {
    zIndex: 0,
    ...commonStyles.fontSize16,
    textAlign: 'left',
    fontFamily: 'futura',
    fontSize: 16,
    color:"black"
  },
  dataTxt: {
    zIndex: 999999,
    textAlign: 'center',
    fontFamily: 'futura',
    fontSize: 12,
    width: '100%',
    color: colors.blackColor,
  },
  datCont: {
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
    // borderColor: colors.blackOpacity08,
    // borderWidth: 0.5,
    // borderBottomWidth: 0,
    paddingHorizontal: 16,
  },
  mainDataCont: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 350,
  },
  modalCont: {
    width: width,
    height: height,
    borderColor: colors.blackOpacity08,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default DropDownComp;
