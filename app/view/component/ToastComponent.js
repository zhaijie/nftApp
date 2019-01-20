/**
 * Created by Administrator on 2018/10/12 0012.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Easing, Text, Animated} from 'react-native';

import width from '../../utils/WHUtils'
class ToastComponent extends Component {
    timer = null;
    state = {
        fadeOutOpacity: new Animated.Value(0),  // 透明度初始值设为0
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container} pointerEvents='none'>
                <Animated.View style={[styles.textContainer, {opacity: this.state.fadeOutOpacity}]}>
                    <Text
                        style={styles.defaultText}>
                        {this.props.message}
                    </Text>
                </Animated.View>
            </View>
        )
    }

    //组件首次渲染之前调用
    componentDidMount() {
        this.timingDismiss();
        //淡入效果显示动画
        this.AnimatedHandler(1);
    }

    //组件卸载后清除定时器
    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    //toast弹框消失定时器
    timingDismiss = () => {
        let _this = this;
        _this.timer = setTimeout(() => {
            if (_this.props.onDismiss) {
                //淡出效果隐藏
                _this.AnimatedHandler(0, 300, _this.props.onDismiss);
            }
        }, _this.props.time)
    };

    AnimatedHandler = (value, timer, callBack) => {
        timer = timer ? timer : 300;
        Animated.timing(
            this.state.fadeOutOpacity,// 动画中的变量值
            {
                toValue: value,// 透明度最终变为1，即完全不透明
                duration: timer,// 让动画持续一段时间
                easing: Easing.linear,// 线性的渐变函数
            }
        ).start(() => {
            if (callBack) {
                callBack();
            }
        });
    }
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: 'rgba(0,0,0,.6)',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        bottom: 60,
        maxWidth: width / 2,
        alignSelf: "flex-end",
    },
    defaultText: {
        color: "#FFF",
        fontSize: 15,
    },
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
    }
});
export default ToastComponent