import React, {Component} from 'react';
import {View} from "react-native"
import {Provider} from 'react-redux';

import RootNavigation from './app/RootNavigation'
import {store} from './app/router/AppNavigation'

let rootView;

export default class InitApp extends Component {
    constructor(props) {
        super(props);
        rootView = this;
        this.state = {
            view: null,
        };
    }

    render() {
        return (
            <View style={{flex: 1, position: 'relative'}}>
                <Provider store={store}>
                    <RootNavigation/>
                </Provider>
                {this.state.view}
            </View>
        );
    }

    static setView = (view) => {
        //此处不能使用this.setState
        rootView.setState({view: view})
    };
}
