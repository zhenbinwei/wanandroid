/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
export default class Home extends Component<Props> {

    static navigationOptions={
      header:null
    };

    render() {
        return (
            <View style={{flex:1}}>
                <Text>home</Text>
            </View>
        );
    }
}