/**
 * Created by Administrator on 2019/1/2 0002.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const settingViewStyle = StyleSheet.create({
    container: {
        backgroundColor: commonStyle.bgColor,
        paddingTop: 12,
        flex: 1
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
    listItem: {
        backgroundColor: '#fff',
        height: 47,
        alignItems: commonStyle.center,
        paddingHorizontal: 16,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between
    },
    listTitle: {
        fontSize: 15
    },
    rightText: {
        color: commonStyle.color
    },
    quit: {
        backgroundColor: '#fff',
        height: 48,
        marginTop: 32,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center
    },
    quitText: {
        width: commonStyle.width,
        lineHeight: 48,
        color: commonStyle.color,
        fontSize: 15,
        textAlign: commonStyle.center
    },

});

//客服中心
export const customerStyle = StyleSheet.create({
    customerBg: {
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
});

//关于我们
export const aboutStyle = StyleSheet.create({

    about: {
        flex: 1,
        height: commonStyle.height,
        backgroundColor: commonStyle.bgColor
    },
    aboutBg: {
        width: commonStyle.width,
        height: commonStyle.width * 0.328,
        position: commonStyle.absolute,
        bottom: 70,
    },
    aboutContent: {
        position: commonStyle.relative,
        backgroundColor: '#fff',
        alignItems: commonStyle.center,
        width: commonStyle.width,
        height: commonStyle.height - 12,
        marginTop: 12,
    },

    logoImg: {
        width: 97,
        height: 140,
        marginTop: 35
    },
    version: {
        color: commonStyle.color,
        fontSize: 15,
        marginTop: 15
    },
    aboutText: {
        width: commonStyle.width - 32,
        marginHorizontal: 16,
        marginTop: 32
    }
});

//下载App
export const downloadStyle = StyleSheet.create({
    downloadBg: {
        width: commonStyle.width,
        height: commonStyle.width * .69,
    },
    downloadCode: {
        alignItems: commonStyle.center,
        marginTop: '-50%'
    },
    codeBox: {
        width: 180,
        height: 180,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
        marginTop: 25
    },
    codeImg: {
        width: 180,
        height: 180,
        position: commonStyle.relative,
        zIndex: 1
    },
    downloadTitle: {
        fontSize: 21,
        color: commonStyle.color
    },
    codeBg: {
        width: 235,
        height: 22,
        position: commonStyle.relative,
        top: -11
    },
    codeUrl: {
        marginTop: 25,
        fontSize: 16,
        width: commonStyle.width * .75,
        textAlign: commonStyle.center
    },
    copyBtn: {
        width: 320,
        marginTop: 35
    }
});

//意见反馈
export const suggestionStyle = StyleSheet.create({
    topBg: {
        height: 12,
        backgroundColor: commonStyle.bgColor
    },
    inputBox: {
        paddingVertical: 12,
    },
    suggestionInput: {
        borderWidth: 1,
        borderColor: commonStyle.defaultBorderColor,
        padding: 12,
        borderRadius: 5,
        textAlignVertical: "top"
    },
    contactInput: {
        width: '100%',
        height: 48,
        borderColor: commonStyle.defaultBorderColor,
        borderWidth: 1,
        paddingHorizontal: 13,
        marginBottom: 18
    },
    goListBtn: {
        marginTop: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: commonStyle.color
    },
    noneBox: {
        backgroundColor: '#fff',
        height: commonStyle.height
    },
    noneSuggestion: {
        marginTop: 90,
        alignItems: commonStyle.center
    },
    noneImg: {
        width: 225,
        height: 140,
        marginBottom: 29
    },
    suggestionList: {
        flex: 1,
        backgroundColor: commonStyle.bgColor,
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    suggestionItem: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginBottom: 12
    },
    itemTop: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
        marginBottom: 16
    },
    delBtn: {
        color: commonStyle.color
    },
    replyTitle: {
        color: '#999',
        marginTop: 15,
        marginBottom: 5
    },

});













