/**
 * Created by Administrator on 2019/1/7 0007.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const transferStyle = StyleSheet.create({
    transferBox: {
        backgroundColor: commonStyle.bgColor,
        paddingVertical: 12
    },
    transferInputBox: {
        backgroundColor: '#fff',
        padding: 17,
        paddingBottom: 0
    },
    transferNum: {
        justifyContent: commonStyle.between,
        flexDirection: commonStyle.row
    },
    transferInput: {
        height: 100,
        marginTop: 18,
        fontSize: 15,
        marginLeft: -4
    },
    transferInputFocus: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    errorRemind: {
        color: commonStyle.errColor,
        width: commonStyle.width,
        marginLeft: -17,
        lineHeight: 36,
        paddingHorizontal: 16
    },
    infoInputItem: {
        position: commonStyle.relative,
        height: 48
    },
    infoInput: {
        position: commonStyle.absolute,
        left: 0,
        right: 0,
        paddingLeft: 88
    },
    infoInputText: {
        position: commonStyle.absolute,
        left: 0,
        lineHeight: 48,
        fontSize: 15
    },
    disabledButton: {
        backgroundColor: 'rgba(24, 140, 63, .3)'
    },

    remindItem: {
        flexDirection: commonStyle.row,
    },
    remindColor: {
        color: commonStyle.priceColor
    },
});