/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from 'react';
import {View, Text} from "react-native";
import TabTitleComponent from './component/TabTitleComponent'

export default class InformationView extends React.Component {
    render() {
        return (
            <View>
                <TabTitleComponent title="资讯"/>
                <Text>
                    资讯页面
                </Text>
            </View>
        )
    }
}