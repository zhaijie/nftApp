import React from 'react';
import {Image, View} from "react-native";

//原版本动画
//import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";


const StackNavigatorConfig = {
    initialRouteName: 'LoginView',
    // initialRouteParams: {initPara: ''}, //初始页面参数
    navigationOptions: {
        // title: '',
        headerTitleStyle: {
            fontSize: 18,
            color: '#333',
            flex: 1,
            textAlign: 'center',
            fontWeight: 'normal',
        },
        headerStyle: {
            elevation: 0, //android去除标题阴影
            height: 48,
            backgroundColor: '#fff',
            shadowColor: '#fff',
        },
        headerRight: <View/>, //防止android标题字体不居中
        headerBackTitle: null,
        headerBackImage: <View style={{height: 48, width: 30, justifyContent: 'center'}}>
            <Image source={require('../image/icon_back.png')} style={{height: 17, width: 10}}/>
        </View>,
        gesturesEnabled: true //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
    },
    mode: 'card',
    headerMode: 'screen', //screen标题与屏幕一起淡入和淡出
    cardStyle: {backgroundColor: "#ffffff"},
    transitionConfig: () => ({
        screenInterpolator: StackViewStyleInterpolator.forHorizontal //自定义界面跳转左右切换动画
    }),
    // onTransitionStart: (() => {
    //     console.log('页面跳转动画开始');
    // }),
    // onTransitionEnd: (() => {
    //     console.log('页面跳转动画结束');
    // }),
};

export default StackNavigatorConfig;