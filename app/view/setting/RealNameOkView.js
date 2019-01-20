/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Image, FlatList} from "react-native"

import {realNameStyle} from '../../style/realNameStyle'
import StorageUtil from '../../utils/StorageUtil'
import {cipherText} from '../../utils/Utiil'
import ButtonComponent from "../component/ButtonComponent";

let state;
export default class RealNameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            stateObj: {}
        }
    }

    componentWillMount() {
        state = this.props.navigation.state.params.state + '';
        if (state === '0') {
            this.setState({
                stateObj: {
                    title: '身份正在审核中，请耐心等待！',
                    imgPath: require('../../image/user/img_shz.png')
                }
            })
        } else if (state === '1') {
            StorageUtil.getItem('userInfo').then((data) => {
                let userInfo = JSON.parse(data);

                this.setState({
                    listData: [
                        {id: '1', title: '真实姓名', state: userInfo.name},
                        {id: '2', title: '认证号码', state: cipherText(userInfo.idCard)}
                    ],
                    stateObj: {
                        title: '您已完成高级实名认证！',
                        imgPath: require('../../image/user/img_ysm.png')
                    }
                })
            });
        } else {
            this.setState({
                stateObj: {
                    title: '身份审核失败',
                    imgPath: require('../../image/user/img_shsb.png')
                }
            })
        }
    }

    render() {
        return (
            <View>

                <View style={realNameStyle.realNameOk}>
                    <View style={realNameStyle.realNameOkTop}>
                        <Image source={this.state.stateObj.imgPath} style={{width: 106, height: 87}}/>
                        <Text style={{fontSize: 21, marginTop: 10}}>{this.state.stateObj.title}</Text>
                        {state === '2' &&
                        <View>
                            <Text style={realNameStyle.errorRemind}>请提供清晰的照片，可以提高审核通过率</Text>
                            <ButtonComponent title="重新提交"
                                             handle={() => this.props.navigation.navigate('SeniorNameView')}
                                             addStyle={{width: 320}}
                            />
                        </View>
                        }

                    </View>
                </View>

                <FlatList
                    data={this.state.listData}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}
                    ListHeaderComponent={() => {
                        if (this.state.listData.length) {
                            return ((<View style={realNameStyle.realNameOk}/>))
                        }
                        return null
                    }}
                />
            </View>
        )
    }


    _renderItem = ({item}) => {
        return (
            <View style={realNameStyle.listItem}>
                <View>
                    <Text style={realNameStyle.listTitle}>
                        {item.title}
                    </Text>
                </View>

                <View>
                    <Text style={{color: '#999'}}>
                        {item.state}
                    </Text>
                </View>
            </View>
        )
    }
}


