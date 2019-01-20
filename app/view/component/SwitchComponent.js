/**
 * Created by Administrator on 2018/12/29 0009.
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {commonStyle} from '../../style/commonStyle'

export default class SwitchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {switchCurrent: 0}
    }

    render() {
        return (
            <View style={switchStyle.switch}>
                {this.props.switchList.map((item, i) => this.renderSwitchItem(item, i))}
            </View>
        )
    }

    //渲染每个选项
    renderSwitchItem(item, i) {
        if (this.state.switchCurrent === i) {
            return (
                <View
                    style={[switchStyle.switchItem, switchStyle.switchTextActive, i === 0 ? switchStyle.borderRadiusLeft : switchStyle.borderRadiusRight]}
                    key={i}>
                    <Text style={[switchStyle.switchText, {color: '#fff'}]}
                          onPress={this.tabSwitch.bind(this, i)}>
                        {item.title}
                    </Text>
                </View>
            );
        } else {
            return (
                <View
                    style={[switchStyle.switchItem, i === 0 ? switchStyle.borderRadiusLeft : switchStyle.borderRadiusRight]}
                    key={i}>
                    <Text style={switchStyle.switchText} onPress={this.tabSwitch.bind(this, i)}>{item.title}</Text>
                </View>
            );
        }
    }

    //点击切换tab
    tabSwitch = (i) => {
        this.setState({switchCurrent: i});

        if (this.props.handle) {
            this.props.handle(i);
        }
    }
}

const switchStyle = StyleSheet.create({
    switch: {
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    switchItem: {
        flex: 1,
        alignItems: 'center',
        borderColor: commonStyle.color,
        borderWidth: 1
    },
    switchText: {
        lineHeight: 36,
        textAlign: 'center',
        fontSize: 14,
        color: commonStyle.color
    },
    switchTextActive: {
        backgroundColor: commonStyle.color,
    },
    borderRadiusLeft: {
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
    },
    borderRadiusRight: {
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
    }
});

