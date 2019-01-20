import React from 'react';
import {View, Image, ScrollView} from "react-native";
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen'

// import HomeServer from '../api/HomeServer'

import {homeViewStyle} from '../style/homeStyle'
import TabTitleComponent from './component/TabTitleComponent'


export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerShow: false,
        };
    }

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <ScrollView style={homeViewStyle.container}>
                <TabTitleComponent title="商城"/>
                {this.renderBanner()}
            </ScrollView>
        )
    }

    // 轮播图
    renderBanner() {
        if (this.state.bannerShow) {
            return (
                <View style={homeViewStyle.banner}>
                    <Swiper
                        removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                        autoplay={true}
                        horizontal={true}
                        paginationStyle={homeViewStyle.paginationStyle}
                        dotStyle={homeViewStyle.dotStyle}
                        activeDotStyle={homeViewStyle.activeDotStyle}
                    >
                        <Image source={require('../image/banner1.png')} style={homeViewStyle.bannerImg}/>
                        <Image source={require('../image/banner1.png')} style={homeViewStyle.bannerImg}/>
                    </Swiper>
                </View>
            )
                ;
        } else {
            return (
                <View style={homeViewStyle.banner}>
                    <Image source={require('../image/banner1.png')} style={homeViewStyle.bannerImg}/>
                </View>
            );
        }
    }

    componentDidMount() {
        this.setState({
            bannerShow: true,
        });

        let timeoutTimer = setTimeout(() => {
            SplashScreen.hide();
            clearTimeout(timeoutTimer);
            timeoutTimer = null;
        }, 1000)
    }


}