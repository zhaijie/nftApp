/**
 * Created by Administrator on 2019/1/9 0009.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const safeStyle = StyleSheet.create({
    joinInBox: {
        flex: 1,
        backgroundColor: commonStyle.bgColor
    },

    switchBox: {
        height: 60,
        borderColor: commonStyle.defaultBorderColor,
        borderTopWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },

    joinInCountBox: {
        borderRadius: 9,
        backgroundColor: '#fff',
        height: 120,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center
    },

    joinInCount: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomColor: commonStyle.defaultBorderColor,
        borderBottomWidth: 1,
        height: 47,
        alignItems: commonStyle.center,
        paddingHorizontal: 16,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between
    },
    rightText: {
        color: '#FEBC45',
        fontWeight: "bold"
    },

    not_join: {
        marginTop: 12,
        height: commonStyle.height - 12,
        backgroundColor: '#fff',
        alignItems: commonStyle.center,
        paddingHorizontal: 28
    },
    not_img: {
        width: 225,
        height: 110,
        marginTop: 120
    },
    levelBtn: {
        marginTop: 36,
        width: '100%'
    }
});

export const shadowOpt = {
    width: commonStyle.width - 32,
    height: 120,
    color: "#188C3F",
    border: 3,
    radius: 9,
    opacity: 0.1,
    x: 0,
    y: 0,
    style: {
        marginHorizontal: 16,
        marginVertical: 12,
    }
};