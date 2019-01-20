/**
 * Created by Administrator on 2018/10/9 0009.
 */
import React from 'react';
import {Text, StyleSheet, View, Modal, Image} from 'react-native';

import {commonStyle} from '../../style/commonStyle';

let timer = null;
export default class ModalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: 3
        }
    }

    componentDidUpdate() {
        if (this.props.modalState && timer === null) {
            timer = setInterval(() => {
                this.state.time--;
                this.setState({time: this.state.time});
                if (this.state.time === 1) {
                    this.state.time = 3;
                    clearInterval(timer);
                    timer = null
                }
            }, 1000)
        }
    }

    render() {
        return (
            <Modal animationType="fade" transparent={true} visible={this.props.modalState}
                   onRequestClose={() => {
                   }}>
                <View style={modalStyle.alert}>
                    <View style={modalStyle.modal}>
                        <View style={modalStyle.modalTopBg}>
                        </View>
                        <View style={modalStyle.modalContent}>
                            <Image source={require('../../image/success_img.png')} style={modalStyle.remindImg}/>
                            <Text style={modalStyle.modalTitle}>{this.props.title}</Text>
                            <Text style={modalStyle.subTitle}>
                                <Text style={{color: commonStyle.color}}>{this.state.time}s</Text>后跳转至{this.props.text}页面
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const modalStyle = StyleSheet.create(
    {
        alert: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },

        modal: {
            backgroundColor: '#fff',
            width: 260,
            height: 200,
            borderRadius: 10
        },
        modalTopBg: {
            backgroundColor: commonStyle.modalTopBg,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 92,
            width: 260
        },
        modalContent: {
            marginTop: -50,
            alignItems: 'center'
        },
        remindImg: {
            width: 110,
            height: 80,
        },
        modalTitle: {
            color: commonStyle.color,
            fontSize: 18,
            marginTop: 18
        },
        subTitle: {
            color: '#999'
        }
    }
);


