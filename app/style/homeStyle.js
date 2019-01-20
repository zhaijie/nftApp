/**
 * Created by Administrator on 2018/12/27 0009.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

let bannerHeight = commonStyle.height * 0.24;
export const homeViewStyle = StyleSheet.create({
    container: {
        width: commonStyle.width,
    },
    //banner
    banner: {
        width: commonStyle.width - commonStyle.padding * 2,
        height: bannerHeight + 10,
        marginLeft: commonStyle.padding
    },
    bannerImg: {
        width: commonStyle.width - commonStyle.padding * 2,
        height: bannerHeight,
        borderRadius: commonStyle.borderRadius
    },
    paginationStyle: {
        bottom: 16
    },
    dotStyle: {
        backgroundColor: '#fff'
    },
    activeDotStyle: {
        backgroundColor: commonStyle.color,
    },
    switchBox: {
        backgroundColor: commonStyle.bgColor,
        paddingTop: commonStyle.padding,
        width: commonStyle.width,
        marginLeft: -commonStyle.padding
    }
});