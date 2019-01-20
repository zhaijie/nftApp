/**
 * Created by Administrator on 2018/12/27 0011.
 */
import {AsyncStorage} from "react-native"

export default class StorageUtil {

    static async setItem(key, value) {
        //如果key value没有值
        if (!key || !value) {
            return Promise.resolve(false)
        }

        try {
            await AsyncStorage.setItem(key, value + '')
        } catch (err) {
            return Promise.resolve(false)
        }
        return Promise.resolve(true);
    }

    static async getItem(key) {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key);
        } catch (err) {
            return Promise.resolve(false)
        }

        return Promise.resolve(result)
    }

    static async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (err) {
            return Promise.resolve(false)
        }
        return Promise.resolve(true);
    }

    static async clear() {
        try {
            await AsyncStorage.clear();
        } catch (err) {
            return Promise.resolve(false)
        }
        return Promise.resolve(true);
    }
}
