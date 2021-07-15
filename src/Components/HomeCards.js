import { ModalSlideFromBottomIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'
import React from 'react'
import { View, Text , StyleSheet , TouchableOpacity , Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import imagePath from '../constants/imagePath'

import colors from '../styles/colors'
import commonStyles from '../styles/commonStyles'
import { moderateScale, moderateScaleVertical } from '../styles/responsiveSize'
export default function HomeCards({cardText}) {
    return (
        <TouchableOpacity >
            <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#E6E7ED', '#F7F8FA']}
                        style={styles.outterCover}>
            <Image source={imagePath.board} style={styles.boardIcon}/>
            <Text style={styles.cardText}>{cardText}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    outterCover:{
        height:moderateScaleVertical(64),
        flexDirection:"row",
        borderRadius:12,
        backgroundColor:"#E6E7ED",
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
    cardText:{
        ...commonStyles.fontSize16,
        color:colors.textColor,
        marginTop:"auto",
    marginBottom:"auto",
    
    },
    boardIcon:{
        marginTop:"auto",
    marginBottom:"auto",
    marginLeft:moderateScale(19),
    marginRight:moderateScale(12)
    }
})

