/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {commonStyle} from '../../style/commonStyle'

export default class TabTitleComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[tabTitleStyle.titleBox, {backgroundColor: this.props.bgColor}]}>
                <Text
                    style={[tabTitleStyle.title, {color: this.props.color ? this.props.color : commonStyle.fontColor}]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}

const tabTitleStyle = StyleSheet.create({
    titleBox: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
    }
});

