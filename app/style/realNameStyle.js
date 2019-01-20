/**
 * Created by Administrator on 2019/1/3 0003.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const realNameStyle = StyleSheet.create({
    container: {
        width: commonStyle.width,
    },
    realBg: {
        width: commonStyle.width,
        height: commonStyle.width * .24,
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomColor: commonStyle.defaultBorderColor,
        borderBottomWidth: 1,
        height: 47,
        alignItems: commonStyle.center,
        marginHorizontal: 16,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between
    },
    listTitle: {
        fontSize: 15
    },
    rightText: {
        color: commonStyle.color
    },
    remindBox: {
        marginHorizontal: 16,
        marginTop: 12
    },

    remindText: {
        color: '#999',
        marginTop: 4
    },

    //初级实名
    primary: {
        borderTopWidth: 1,
        borderTopColor: commonStyle.defaultBorderColor,
        paddingHorizontal: 33,
        paddingTop: 48
    },

    primaryMode: {
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
    },
    modeText: {
        fontSize: 17
    },
    modeIcon: {
        width: 16,
        height: 16,
        marginLeft: 24,
        marginRight: 6
    },
    modeTextActive: {
        color: commonStyle.color
    },
    inputContent: {
        marginTop: 20,
        width: commonStyle.width * .8
    },

    inputText: {
        fontSize: 12,
        marginBottom: 10,
    },
    disabledButton: {
        backgroundColor: 'rgba(24, 140, 63, .3)'
    },

    //高级认证
    seniorTop: {
        width: commonStyle.width,
        backgroundColor: '#C1E1CC',
        color: commonStyle.color,
        height: 36,
        lineHeight: 36,
        textAlign: commonStyle.center
    },
    senior: {
        marginTop: 32,
        paddingHorizontal: 13,
    },

    seniorItem: {
        flexDirection: commonStyle.row,
        marginBottom: 16
    },
    seniorText: {
        marginLeft: 17,
        justifyContent: commonStyle.center
    },
    seniorLook: {
        fontSize: 15,
        color: commonStyle.color,
        marginTop: 3
    },

    //已经实名认证
    realNameOk: {
        backgroundColor: commonStyle.bgColor,
        paddingTop: 12
    },
    realNameOkTop: {
        backgroundColor: '#fff',
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
        paddingVertical: 36
        // height: 196
    },
    errorRemind: {
        marginTop: 5,
        marginBottom: 36
    }
});