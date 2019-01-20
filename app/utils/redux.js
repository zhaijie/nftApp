/**
 * Created by Administrator on 2018/12/27 0030.
 */
import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

export {
    middleware,
};