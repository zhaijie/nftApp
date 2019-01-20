/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, Image} from "react-native";
import DeviceInfo from 'react-native-device-info';

import {aboutStyle} from '../../style/settingStyle'


export default class AboutView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={aboutStyle.about}>
                <View style={aboutStyle.aboutContent}>
                    <Image source={require('../../image/user/logo.png')} style={aboutStyle.logoImg}/>

                    <Text style={aboutStyle.version}>当前版本信息为v{DeviceInfo.getVersion()}</Text>
                    <Text style={aboutStyle.aboutText}>
                        农富通APP为相关说明相关说明相关说明相关说明相关说明相关说明相关说明相关说明相关说明相关说明相关说明相关说明相关说明。
                    </Text>
                    <Image source={require('../../image/user/abuot_bg.png')} style={aboutStyle.aboutBg}/>
                </View>
            </View>
        )
    }
}