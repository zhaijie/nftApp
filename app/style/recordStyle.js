/**
 * Created by Administrator on 2019/1/7 0007.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const recordStyle = StyleSheet.create({

    recordTab: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.around,
        alignItems: commonStyle.center,
        paddingBottom: 16
    },

    recordTabActive: {
        color: commonStyle.color
    },

    recordMonth: {
        fontSize: 12,
        color: '#999',
        width: '100%',
        lineHeight: 32,
        backgroundColor: commonStyle.bgColor,
        paddingLeft: 16
    },
    recordItem: {
        height: 64,
        paddingHorizontal: 16,
        justifyContent: commonStyle.center
    },
    recordItemRow: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between
    },
    recordItemTime: {
        fontSize: 12,
        color: '#999',
        marginTop: 3
    },
    listBorder: {
        height: 1,
        backgroundColor: commonStyle.defaultBorderColor,
        width: '100%',
    },

});

export const recordDetailStyle = StyleSheet.create({

    recordDetailBox: {
        backgroundColor: commonStyle.bgColor,
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16
    },
    detailInfo: {
        width: '100%',
        // height: 250,
        backgroundColor: '#fff',
        borderRadius: 5
    },
    detailTop: {
        height: 150,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
        borderBottomWidth: 1,
        borderColor: commonStyle.defaultBorderColor,
        borderStyle: 'dashed'
    },
    detailImg: {
        width: 60,
        height: 36
    },
    detailImgCash: {
        width: 34,
        height: 36
    },
    detailNum: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold'
    },
    detailBottom: {
        // height: 95,
        paddingVertical: 18,
        paddingHorizontal: 12
    },
    detailDec: {
        justifyContent: commonStyle.between,
        flexDirection: commonStyle.row,
        marginBottom: 15
    }

});