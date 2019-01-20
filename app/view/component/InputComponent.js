/**
 * Created by Administrator on 2018/9/21 0021.
 */
import React from "react";
import {StyleSheet, TextInput} from "react-native";
import {commonStyle} from '../../style/commonStyle'

export default class InputComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onFocus: false,
        };
    }

    render() {
        return (
            <TextInput
                style={[InputStyle.input, this.state.onFocus ? InputStyle.inputFocus : '', {height: this.props.height}, this.props.addStyle]}
                onFocus={() => {
                    this.setState({onFocus: true});
                    if (this.props.inputFocus) {
                        this.props.inputFocus()
                    }
                }}
                onBlur={() => {
                    this.setState({onFocus: false});
                    if (this.props.inputBlur) {
                        this.props.inputBlur()
                    }
                }}

                onChangeText={(value) => {
                    if (this.props.valueChange) {
                        this.props.valueChange(value)
                    }
                }}

                maxLength={this.props.maxLength}
                defaultValue={this.props.defaultValue}
                editable={this.props.editable === undefined ? true : this.props.editable}
                placeholderTextColor={commonStyle.placeholderColor} secureTextEntry={this.props.password}
                underlineColorAndroid="transparent" placeholder={this.state.onFocus ? '' : this.props.explain}/>
        )
    }
};

const InputStyle = StyleSheet.create(
    {
        input: {
            color: commonStyle.fontColor,
            fontSize: 15,
            padding: 0,
            borderBottomColor: commonStyle.defaultInputBorderColor,
            borderBottomWidth: 1,
            height: 36
        },
        inputFocus: {
            borderBottomColor: commonStyle.color,
        },
    }
);
