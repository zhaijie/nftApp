/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from 'react';
import {TouchableHighlight, Text, StyleSheet, ScrollView, ImageBackground, View, Image} from 'react-native';

import {commonStyle} from '../../style/commonStyle';
import {getAmountTotal, getIntegralTotal} from '../../api/AssetServer'

export default class AssetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amountTotal: '0.00',
            integralTotal: '0',
            amountTotalShow: false,
            integralTotalShow: false,
        }
    }

    componentWillMount() {
        //获取现金总额
        getAmountTotal((data) => {
            this.setState(
                {amountTotal: parseFloat(data.item.amountTotal).toFixed(2)}
            );
        });

        //获取积分总额
        getIntegralTotal((data) => {
            this.setState(
                {integralTotal: data.integralTotal.integralTotal.toFixed(2)}
            );
        });
    }

    render() {
        return (
            <ScrollView
                ref={(scroll) => {
                    if (scroll !== null && this.props.isEnd) {
                        scroll.scrollToEnd({animated: true});
                    }
                }}
                style={assetStyle.userAssets}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onMomentumScrollEnd={this.onScrollEnd}>

                <ImageBackground source={require('../../image/user/asset_bg01.png')}
                                 style={assetStyle.userAssetsImg}>
                    <View style={assetStyle.assetsBox}>
                        <Text style={[assetStyle.smallTitle, assetStyle.assetsTitle]}>现金总额(元)</Text>
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={() => {
                            this.setState({amountTotalShow: !this.state.amountTotalShow})
                        }}>
                            <Image
                                source={this.state.amountTotalShow ? require('../../image/user/asset_see_ok.png') : require('../../image/user/asset_see_no.png')}
                                style={{width: 16, height: 16}}/>
                        </TouchableHighlight>
                    </View>

                    <View>
                        <Text style={assetStyle.assetsPrice}>
                            {this.state.amountTotalShow ? this.state.amountTotal : '*****' }
                        </Text>

                        <View style={assetStyle.assetBtn}>
                            <Text style={[assetStyle.smallTitle, assetStyle.trade]}>充值</Text>
                            <Text
                                style={[assetStyle.smallTitle, assetStyle.trade, assetStyle.withdrawalBtn]}>
                                提现
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                <ImageBackground source={require('../../image/user/asset_bg02.png')}
                                 style={[assetStyle.userAssetsImg, {marginRight: 16}]}>
                    <View style={assetStyle.assetsBox}>
                        <Text style={[assetStyle.smallTitle, assetStyle.assetsTitle]}>积分总额(个)</Text>
                        <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={() => {
                            this.setState({integralTotalShow: !this.state.integralTotalShow})
                        }}>
                            <Image
                                source={this.state.integralTotalShow ? require('../../image/user/asset_see_ok.png') : require('../../image/user/asset_see_no.png')}
                                style={{width: 16, height: 16}}/>
                        </TouchableHighlight>
                    </View>

                    <View>
                        <Text style={assetStyle.assetsPrice}>
                            {this.state.integralTotalShow ? this.state.integralTotal : '*****' }
                        </Text>
                        <View style={assetStyle.assetBtn}>
                            <Text
                                style={[assetStyle.smallTitle, assetStyle.trade]}
                                onPress={() => this.props.navigation.navigate('TransferView', {integralTotal: this.state.integralTotal})}
                            >
                                划转
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        )
    }

    onScrollEnd = (e) => {
        let offsetX = e.nativeEvent.contentOffset.x; //滑动距离

        if (offsetX === 0) {
            if (this.props.isStartHandle) {
                this.props.isStartHandle()
            }
            return
        }

        let contentSizeWidth = e.nativeEvent.contentSize.width; //scrollView contentSize高度
        let oriageScrollWidth = e.nativeEvent.layoutMeasurement.width; //scrollView高度
        if (offsetX + oriageScrollWidth >= contentSizeWidth) {
            if (this.props.isEndHandle) {
                this.props.isEndHandle()
            }
        }
    }

}

const assetStyle = StyleSheet.create({
    userAssets: {
        backgroundColor: '#fff',
        paddingTop: 14,
        paddingBottom: 20
    },
    userAssetsImg: {
        width: commonStyle.width * 0.87,
        height: (commonStyle.width * 0.87) * 0.37,
        marginLeft: 16,
        paddingHorizontal: 15,
        paddingVertical: 33,
    },
    assetsBox: {
        flexDirection: commonStyle.row
    },
    assetsTitle: {
        marginRight: 10,
    },
    assetsPrice: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 26
    },

    assetBtn: {
        alignSelf: commonStyle.end,
        height: 24,
        marginTop: -24,
        flexDirection: commonStyle.row
    },

    trade: {
        lineHeight: 24,
        borderRadius: 12,
        width: 54,
        borderWidth: 1,
        borderColor: '#fff',
        textAlign: commonStyle.center
    },

    withdrawalBtn: {
        backgroundColor: '#fff',
        color: '#FEBC45',
        marginLeft: 12
    },
    smallTitle: {
        fontSize: 12,
        color: '#fff'
    },

});


