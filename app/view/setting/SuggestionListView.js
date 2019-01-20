/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, Image, FlatList} from "react-native";

import {suggestionStyle} from '../../style/settingStyle'
import {toastShow} from '../../utils/ToastUtil'
import {suggestionList, delSuggestion} from '../../api/SuggestionServer'

let params = {
    start: 1,
    offset: 10,
    isNext: 1
};
export default class SuggestionListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            refreshingState: true
        };
    }

    componentWillMount() {
        suggestionList(params, (data) => {
            params.isNext = data.isNext;
            this.setState({
                listData: data.items,
                refreshingState: false
            });
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>

                {this.state.listData.length === 0 &&
                <View style={suggestionStyle.noneBox}>
                    <View style={suggestionStyle.topBg}/>
                    <View style={suggestionStyle.noneSuggestion}>
                        <Image source={require('../../image/user/img_none.png')} style={suggestionStyle.noneImg}/>
                        <Text>暂无相关内容</Text>
                    </View>
                </View>
                }

                <View style={suggestionStyle.suggestionList}>
                    <FlatList
                        data={this.state.listData}
                        keyExtractor={(item) => item.id + ''}
                        renderItem={this._renderItem}
                        refreshing={this.state.refreshingState}
                        onEndReachedThreshold={0.001}
                        onEndReached={this.upLoad}
                        ListFooterComponent={this.showFooter}
                    />
                </View>
            </View>
        )
    }

    upLoad = () => {
        if (params.isNext && this.state.refreshingState === false) {
            this.setState({refreshingState: true});
            params.start++;
            suggestionList(params, (data) => {
                params.isNext = data.isNext;
                this.setState({
                    listData: data.items,
                    refreshingState: false
                });
            })
        }
    };

    _renderItem = ({item}) => {
        return (<View style={suggestionStyle.suggestionItem}>
            <View style={suggestionStyle.itemTop}>
                <Text style={{color: '#999'}}>{item.time}</Text>
                <Text style={suggestionStyle.delBtn} onPress={() => this.deleteSuggestion(item.id)}>删除反馈</Text>
            </View>

            <Text>{item.backContent}</Text>
            <Text style={suggestionStyle.replyTitle}>客服回复</Text>
            <Text>{item.replyContent}</Text>
        </View>)
    };

    //设置尾部
    showFooter = () => {
        //判断是否加载中
        if (this.state.refreshingState) {
            return (
                <View style={{marginTop: 15, alignItems: 'center', marginBottom: 10}}>
                    <Text style={{color: '#ccc'}}>数据加载中......</Text>
                </View>
            )
        }
        let text = params.isNext ? '加载更多' : '没有更多记录了';
        return (
            <View style={{marginTop: 15, alignItems: 'center', marginBottom: 10}}>
                <Text style={{color: '#ccc'}}>{text}</Text>
            </View>
        )
    };

    //删除反馈
    deleteSuggestion = (id) => {
        delSuggestion({id: id}, () => {
            toastShow('删除成功');
            for (let i = 0, len = this.state.listData.length; i < len; i++) {
                if (id === this.state.listData[i].id) {
                    this.state.listData.splice(i, 1);
                    this.setState({listData: this.state.listData});
                    return
                }
            }
        })
    }
}