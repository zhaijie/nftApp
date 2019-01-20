/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Image, TouchableHighlight} from "react-native"
import {NavigationActions, StackActions} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

import {realNameStyle} from '../../style/realNameStyle'
import ButtonComponent from "../component/ButtonComponent";
import {toastShow} from '../../utils/ToastUtil'
import {seniorAuthentication} from '../../api/FormServer'

const photoOptions = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择照片',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true
    }
};
let imgPath = require('../../image/user/add_img.png');
let file = [];
export default class SeniorNameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: false,
            imgPath: [],
        }
    }

    render() {
        return (
            <View>
                <Text style={realNameStyle.seniorTop}>您已初级认证成功，请继续进行高级认证</Text>

                <View style={realNameStyle.senior}>
                    <TouchableHighlight underlayColor={'#fff'} onPress={() => this.choosePicker(0)}>
                        <View style={realNameStyle.seniorItem}>
                            <View>
                                <Image style={{width: 120, height: 74}}
                                       source={this.state.imgPath[0] ? this.state.imgPath[0] : imgPath}/>
                            </View>
                            <View style={realNameStyle.seniorText}>
                                <Text style={{fontSize: 16}}>上传身份证正面照片</Text>
                                <Text style={realNameStyle.seniorLook}>查看范例</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'#fff'} onPress={() => this.choosePicker(1)}>
                        <View style={realNameStyle.seniorItem}>
                            <View>
                                <Image style={{width: 120, height: 74}}
                                       source={this.state.imgPath[1] ? this.state.imgPath[1] : imgPath}/>
                            </View>
                            <View style={realNameStyle.seniorText}>
                                <Text style={{fontSize: 16}}>上传身份证背面照片</Text>
                                <Text style={realNameStyle.seniorLook}>查看范例</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'#fff'} onPress={() => this.choosePicker(2)}>
                        <View style={realNameStyle.seniorItem}>
                            <View>
                                <Image style={{width: 120, height: 74}}
                                       source={this.state.imgPath[2] ? this.state.imgPath[2] : imgPath}/>
                            </View>
                            <View style={realNameStyle.seniorText}>
                                <Text style={{fontSize: 16}}>上传手持身份证照片</Text>
                                <Text style={realNameStyle.seniorLook}>查看范例</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <ButtonComponent title="立即提交" handle={this.submitHandle}
                                     addStyle={[{marginTop: 32}, this.state.buttonState ? '' : realNameStyle.disabledButton]}/>
                </View>
            </View>
        )
    }

    submitHandle = () => {
        if (!this.state.imgPath[0]) {
            toastShow('请上传身份证正面照片');
            return
        }
        if (!this.state.imgPath[1]) {
            toastShow('请上传身份证背面照片');
            return
        }
        if (!this.state.imgPath[2]) {
            toastShow('请上传手持身份证照片');
            return
        }
        let params = {
            oneAddress: file[0],
            twoAddress: file[1],
            threeAddress: file[2],
        };
        seniorAuthentication(params, () => {
            toastShow('提交成功');
            this.props.navigation.navigate('RealNameOkView', {state: '0'})
        })
    };

    //选择图片
    choosePicker = (current) => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            }
            else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            }
            else {
                console.warn(response);
                let source = {uri: response.uri};
                let temp = this.state.imgPath;
                file[current] = response;
                temp[current] = source;
                this.state.buttonState = this.isClick(temp);
                this.setState({imgPath: temp})
            }
        });
    };

    isClick = (temp) => {
        let isHas = 0;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]) {
                isHas++;
            } else {
                return false
            }
        }

        if (isHas === 3) {
            return true
        }
    }
}