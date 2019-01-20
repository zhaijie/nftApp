/**
 * Created by Administrator on 2018/12/27 0030.
 */
import React from 'react';
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer
} from 'react-navigation-redux-helpers';
import RouterConfig from './RouterConfig'

//创建中间件
const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const AppNavigator = reduxifyNavigator(RouterConfig, 'root');
export const navReducer = createNavigationReducer(RouterConfig);
export const appReducer = combineReducers({
    nav: navReducer,
});

export const store = createStore(
    appReducer,
    applyMiddleware(middleware),
);

export default AppNavigator