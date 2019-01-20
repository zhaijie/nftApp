/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, Image} from "react-native";

import {recordDetailStyle} from '../style/recordStyle'
import {getCashRecordDetails, getIntegralRecordDetails} from '../api/RecordServer'

let navigation;
let recordImgObj = {
    integralIn: require('../image/record_integral1.png'),
    integralOut: require('../image/record_integral2.png'),
    cashIn: require('../image/record_cash1.png'),
    cashOut: require('../image/record_cash2.png'),
};
let incomeSpending;
let detailImg;
export default class RecordDetailView extends React.Component {
    static navigationOptions = ({navigation}) => {
        if (!navigation.state.params) {
            return
        }

        let title = navigation.state.params.type === 'integral' ? '积分' : '现金';
        return ({
            headerTitle: title + '记录详情',
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            type: 'integral',
            detailData: {},
            detailDom: []
        }
    }


    componentWillMount() {
        this.state.type = this.props.navigation.state.params.type;
        incomeSpending = this.props.navigation.state.params.incomeSpending + '';

        if (this.state.type === 'integral') {
            getIntegralRecordDetails({id: this.props.navigation.state.params.recordId}, (data) => {
                this.setState({detailData: data.item});
            });
            if (incomeSpending === '1') {
                detailImg = recordImgObj.integralIn
            } else {
                detailImg = recordImgObj.integralIn
            }
        } else {
            getCashRecordDetails({id: this.props.navigation.state.params.recordId}, (data) => {
                this.setState({detailData: data.item});
            });
            if (incomeSpending === '1') {
                detailImg = recordImgObj.cashIn
            } else {
                detailImg = recordImgObj.cashOut
            }
        }
    }

    render() {
        navigation = this.props.navigation;
        return (
            <View style={recordDetailStyle.recordDetailBox}>
                <View style={recordDetailStyle.detailInfo}>
                    <View style={recordDetailStyle.detailTop}>
                        <Image source={detailImg}
                               style={this.state.type === 'integral' ? recordDetailStyle.detailImg : recordDetailStyle.detailImgCash}/>
                        <Text style={recordDetailStyle.detailNum}>
                            {incomeSpending === '1' ? '+' : '-'}{this.state.detailData.number}
                        </Text>
                        <Text style={{color: '#999'}}>
                            {incomeSpending === '1' ? '已放出' : '已从'}
                            {this.state.type === 'integral' ? "积分" : "现金"}
                            {incomeSpending === '1' ? '账户' : '账户扣除'}
                        </Text>
                    </View>
                    <View style={recordDetailStyle.detailBottom}>
                        {this.renderDetailDec()}
                    </View>
                </View>
            </View>
        )
    }

    renderDetailDec() {
        let detailDom = [];
        for (let k in this.state.detailData) {

            switch (k) {
                case'type':
                    detailDom.push(<View style={recordDetailStyle.detailDec} key={this.state.detailData.type}>
                        <Text style={{color: '#999'}}>获取方式</Text><Text>{this.state.detailData.type}</Text>
                    </View>);
                    break;
                case'time':
                    detailDom.push(<View style={recordDetailStyle.detailDec} key={this.state.detailData.time}>
                        <Text style={{color: '#999'}}>获取时间</Text><Text>{this.state.detailData.time}</Text>
                    </View>);
                    break;
                case'note':

                    if (!this.state.detailData.note) {
                        break
                    }

                    detailDom.push(<View style={recordDetailStyle.detailDec} key={this.state.detailData.note}>
                        <Text style={{color: '#999'}}>{this.state.detailData.type}</Text>
                        <Text>{this.state.detailData.note}</Text>
                    </View>);
                    break;
            }
        }
        return detailDom
    }

}












