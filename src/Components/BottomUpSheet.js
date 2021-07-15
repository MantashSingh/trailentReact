import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { height } from '../styles/responsiveSize';
export default function BottomUpSheet({children, sheetRef=()=>{}}) {
  return (
    <RBSheet
      ref={sheetRef}
      animationType="fade"
      closeOnDragDown={true}
      // height={450}
      openDuration={250}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(60,60,60,0.5)',
          backfaceVisibility: 'hidden',
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: height*.46,
        },
      }}
      // onClose={() => resetAll()}
    >
      {children}
    </RBSheet>
  );
}
