/**
 * @File         : Storage.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/9 10:18
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import Storage from 'react-native-storage';
const storage = new Storage({
    size: 1000,
    defaultExpires: null,
    enableCache: true,
});
global.storage = storage;