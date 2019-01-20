/**
 * Created by Administrator on 2019/1/2 0002.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const userViewStyle = StyleSheet.create({
    container: {
        backgroundColor: commonStyle.bgColor
    },

    smallTitle: {
        fontSize: 12,
        color: '#fff'
    },

    remindSpot: {
        backgroundColor: '#FC403B',
        width: 7,
        height: 7,
        borderRadius: 3.5,
        position: commonStyle.absolute,
        top: 12,
        right: 15
    },

    userTopTile: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.end,
        backgroundColor: '#fff'
    },
    userTopImg: {
        width: 22,
        height: 22,
        marginRight: 16,
        marginLeft: 8,
        marginTop: 14
    },
    userInfo: {
        paddingTop: 25,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        paddingLeft: 17,
        backgroundColor: '#fff'
    },
    userPhone: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    userGrade: {
        backgroundColor: '#7FB130',
        flexDirection: commonStyle.row,
        height: 22,
        paddingHorizontal: 6,
        borderRadius: 11,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
        marginLeft: 12
    },
    gradeImg: {
        width: 16,
        height: 16,
        marginRight: 6
    },
    userAssets: {
        backgroundColor: '#fff',
        paddingTop: 14,
        paddingBottom: 20
    },
    userAssetsImg: {
        width: commonStyle.width * 0.87,
        height: (commonStyle.width * 0.87) * 0.37,
        marginLeft: 16,
        paddingHorizontal: 15,
        paddingVertical: 33,
    },
    assetsBox: {
        flexDirection: commonStyle.row
    },
    assetsTitle: {
        marginRight: 10,
    },
    assetsPrice: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 26
    },

    assetBtn: {
        alignSelf: commonStyle.end,
        height: 24,
        marginTop: -24,
        flexDirection: commonStyle.row
    },

    trade: {
        lineHeight: 24,
        borderRadius: 12,
        width: 54,
        borderWidth: 1,
        borderColor: '#fff',
        textAlign: commonStyle.center
    },

    withdrawalBtn: {
        backgroundColor: '#fff',
        color: '#FEBC45',
        marginLeft: 12
    },
    listItem: {
        backgroundColor: '#fff',
        height: 47,
        alignItems: commonStyle.center,
        paddingHorizontal: 16,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between
    },
    listSpacing: {
        height: 6,
        backgroundColor: commonStyle.bgColor
    },
    listBorder: {
        height: 1,
        backgroundColor: commonStyle.defaultBorderColor,
        width: commonStyle.width - 32,
        marginLeft: 16
    },
    listIcon: {
        width: 18,
        height: 18,
        marginRight: 16
    },
    userOrder: {
        height: 65,
        borderColor: commonStyle.defaultBorderColor,
        borderTopWidth: 1,
        width: commonStyle.width - 32,
        marginLeft: 18,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
        alignItems: commonStyle.center,
    },
    userOrderItem: {
        alignItems: commonStyle.center,
    },
    orderItemTitle: {
        color: '#999',
        fontSize: 13,
        marginTop: 5
    }
});
