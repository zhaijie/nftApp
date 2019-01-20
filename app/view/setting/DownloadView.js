/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, Image, ImageBackground, Clipboard} from "react-native";

import {downloadStyle} from '../../style/settingStyle'
import ButtonComponent from "../component/ButtonComponent";
import {toastShow} from '../../utils/ToastUtil'
import {getDownload} from '../../api/SuggestionServer'


export default class DownloadView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            qrcode: ''
        };
    }

    componentWillMount() {
        getDownload((data) => {
            this.setState({
                address: data.item.address,
                qrcode: data.item.qrcode
            });
        })
    }

    render() {
        return (
            <View>
                <ImageBackground source={require('../../image/user/download_bg.png')} style={downloadStyle.downloadBg}>
                </ImageBackground>

                <View style={downloadStyle.downloadCode}>
                    <Text style={downloadStyle.downloadTitle}>农富通APP下载链接</Text>
                    <View style={downloadStyle.codeBox}>
                        <Image style={downloadStyle.codeImg} source={require('../../image/user/app.png')}/>
                        <Image style={downloadStyle.codeBg} source={require('../../image/user/download_codeBg.png')}/>
                    </View>
                    <Text style={downloadStyle.codeUrl}>{this.state.address}</Text>

                    <ButtonComponent title="复制下载链接" handle={this.copyCodeUrl} addStyle={[downloadStyle.copyBtn]}/>
                </View>
            </View>
        )
    }

    copyCodeUrl = () => {
        Clipboard.setString(this.state.address);
        toastShow('复制成功')
    }

}