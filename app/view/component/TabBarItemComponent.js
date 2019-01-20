/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from "react";
import {StyleSheet, Image} from "react-native";

export default class TabBarItemComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image style={styles.icon} source={this.props.icon}/>
        )
    }
};

// 样式
const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    }
});
