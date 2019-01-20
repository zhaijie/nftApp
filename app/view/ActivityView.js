/**
 * Created by Administrator on 2018/12/27 0009.
 */
import React from 'react';
import {View, Text} from "react-native";

import TabTitleComponent from './component/TabTitleComponent'

export default class ActivityView extends React.Component {
    render() {
        return (
            <View>
                <TabTitleComponent title="活动"/>
                <Text>
                    活动页面
                </Text>
            </View>
        )
    }
}