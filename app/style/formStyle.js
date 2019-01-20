/**
 * Created by Administrator on 2018/12/27 0009.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

export const formViewStyle = StyleSheet.create(
    {
        formBox: {
            height: commonStyle.height,
            borderTopWidth: 1,
            borderColor: '#eee'
        },

        loginImgBox: {
            alignItems: 'center',
            marginTop: 60,
            marginBottom: 30
        },

        loginImg: {
            width: 90,
            height: 90
        },

        inputBox: {
            width: commonStyle.width * .95,
            borderRadius: 5,
            marginLeft: commonStyle.width * 0.025,
            alignItems: commonStyle.center,
        },
        inputContent: {
            marginTop: 20,
            width: commonStyle.width * .8
        },

        inputText: {
            fontSize: 12,
            marginBottom: 10,
        },

        //跳转操作
        jumpOperation: {
            marginTop: 17,
            width: commonStyle.width * .8,
            flexDirection: commonStyle.row,
        },

        jumpItem: {
            flex: 1,
        },
        jumpForget: {
            fontSize: 15,
        },

        jumpRegister: {
            fontSize: 15,
            textAlign: 'right'
        },

        seeImg: {
            width: 16,
            height: 8,
            alignSelf: commonStyle.end,
            marginTop: -19,
        },

        isSeeImg: {
            height: 16,
            marginTop: -27,
        },

        //验证码
        inputCode: {
            alignSelf: commonStyle.end,
            width: 90,
            marginTop: -35,
        },
        codeText: {
            height: 24,
            lineHeight: 24,
            fontSize: 14,
            color: commonStyle.color,
            borderLeftWidth: 1,
            borderColor: commonStyle.color,
            textAlign: commonStyle.center
        },

        codeImg: {
            height: 32,
        },

        marginTop30: {
            marginTop: 30
        },

        disabledButton: {
            backgroundColor: 'rgba(24, 140, 63, .3)'
        },

        remindText: {
            marginTop: 15,
            width: commonStyle.width * .8,
        },

        remindTitle: {
            marginBottom: 10
        },

        protocolTitle: {
            color: commonStyle.color
        },

        //更换手机
        phoneContainer: {
            borderTopWidth: 1,
            borderTopColor: commonStyle.defaultBorderColor,
            paddingTop: 33,
            paddingHorizontal: 32,
            flex: 1
        },

        phone: {
            fontSize: 21,
            fontWeight: 'bold'
        }

    });