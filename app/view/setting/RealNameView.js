/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Image, FlatList, TouchableHighlight} from "react-native"

import {realNameStyle} from '../../style/realNameStyle'
import StorageUtil from '../../utils/StorageUtil'
import {isRealAuth} from '../../api/FormServer'


export default class RealNameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        }
    }

    componentWillMount() {

        isRealAuth((data) => {
            let temp = [
                {id: '1', title: '初级实名', state: '未认证', link: 'PrimaryNameView'},
                {id: '2', title: '高级实名', state: '未认证', link: 'SeniorNameView', params: ''}
            ];
            if (data.item.oneAuth === 2) {
                temp[0].state = '已认证';
                temp[1].params = data.item.twoAuth;
                switch (data.item.twoAuth) {
                    case 0:
                        temp[1].state = '审核失败';
                        temp[1].link = 'RealNameOkView';
                        break;
                    case 1:
                        temp[1].state = '已认证';
                        break;
                    case 2:
                        temp[1].state = '审核中';
                        temp[1].link = 'RealNameOkView';
                        break;
                }
            } else {
                temp[0].link = 'PrimaryNameView';
            }
            this.setState({listData: temp})
        });
    }


    render() {
        return (
            <View>
                <Image source={require('../../image/user/real_name.png')} style={realNameStyle.realBg}/>
                <FlatList
                    data={this.state.listData}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}
                />

                <View style={realNameStyle.remindBox}>
                    <Text style={realNameStyle.remindText}>温馨提示</Text>
                    <Text style={realNameStyle.remindText}>请依次填写初级认证、高级认证真实资料并提交审核，未高级认证用户不可进行资产的相关操作。</Text>
                </View>
            </View>
        )
    }


    _renderItem = ({item}) => {
        return (
            <TouchableHighlight underlayColor={'#fff'}
                                onPress={() => this.props.navigation.navigate(item.link, {state: item.params})}>
                <View style={realNameStyle.listItem}>
                    <View>
                        <Text style={realNameStyle.listTitle}>
                            {item.title}
                        </Text>
                    </View>

                    <View>
                        <Text style={realNameStyle.rightText}>
                            {item.state}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>)
    }
}
