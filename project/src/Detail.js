/**
 * @File         : detail.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 10:12
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
export default class Detail extends Component<Props> {

    static navigationOptions={
        headerStyle:{
            height:45
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text>detail</Text>
            </View>
        );
    }
}