/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {BoxShadow} from 'react-native-shadow'

import {commonStyle} from '../../style/commonStyle'


let productWidth;
let productHeight;
productHeight = productWidth = (commonStyle.width * .5) - (commonStyle.padding + commonStyle.padding * .5);

class ProductItemComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const shadowOpt = {
            width: productWidth,
            height: productHeight + 60,
            color: "#15AAFF",
            border: 3,
            radius: 5,
            opacity: 0.2,
            x: 0,
            y: 0,
            style: productStyle.productItem
        };

        return (
            <View style={productStyle.productList}>
                <BoxShadow setting={shadowOpt}>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        this.props.navigation.navigate('ProductDetailView')
                    }}>
                        <Image source={require('../../image/product.png')} style={productStyle.productImage}/>
                        <Text style={productStyle.productName}>商品item</Text>
                        <Text style={productStyle.productPrice}>￥16.00</Text>
                    </TouchableOpacity>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                    <Image source={require('../../image/product.png')} style={productStyle.productImage}/>
                    <Text style={productStyle.productName}>商品item</Text>
                    <Text style={productStyle.productPrice}>￥16.00</Text>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                    <Image source={require('../../image/product.png')} style={productStyle.productImage}/>
                    <Text style={productStyle.productName}>商品item</Text>
                    <Text style={productStyle.productPrice}>￥16.00</Text>
                </BoxShadow>
                <BoxShadow setting={shadowOpt}>
                    <Image source={require('../../image/product.png')} style={productStyle.productImage}/>
                    <Text style={productStyle.productName}>商品item</Text>
                    <Text style={productStyle.productPrice}>￥16.00</Text>
                </BoxShadow>
            </View>
        )
    }
}

export default withNavigation(ProductItemComponent)

const productStyle = StyleSheet.create({
        productList: {
            width: commonStyle.width,
            paddingBottom: 40,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        productItem: {
            marginLeft: commonStyle.padding,
            marginTop: commonStyle.padding,
        },
        productImage: {
            width: productWidth,
            height: productHeight,
            borderTopLeftRadius: commonStyle.borderRadius,
            borderTopRightRadius: commonStyle.borderRadius
        },
        productName: {
            backgroundColor: '#fff',
            paddingLeft: commonStyle.padding,
            paddingTop: commonStyle.padding,
            color: commonStyle.fontColor
        },
        productPrice: {
            backgroundColor: '#fff',
            color: commonStyle.priceColor,
            paddingLeft: commonStyle.padding,
            paddingBottom: 8,
            fontSize: 17,
            borderBottomLeftRadius: commonStyle.borderRadius,
            borderBottomRightRadius: commonStyle.borderRadius
        }
    })
;

