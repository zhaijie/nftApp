/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

import {commonStyle} from '../../style/commonStyle';

export default class ButtonComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                style={[buttonStyle.button, this.props.addStyle]}
                activeOpacity={1}
                underlayColor={commonStyle.buttonClickColor}
                onPress={this.onPress}
            >
                <Text style={[buttonStyle.text, {color: this.props.color || '#fff'}]}>{this.props.title}</Text>
            </TouchableHighlight>
        )
    }

    onPress = () => {
        if (this.props.handle) this.props.handle();
    }
}

const buttonStyle = StyleSheet.create(
    {
        button: {
            height: 44,
            backgroundColor: commonStyle.color,
            borderRadius: 22,
            justifyContent: commonStyle.center,
            alignItems: commonStyle.center,
        },
        text: {
            color: '#fff',
            fontSize: 16
        }
    }
);


