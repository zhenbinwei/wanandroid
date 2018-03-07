/**
 * @File         : category.js
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
export default class Category extends Component<Props> {
    static navigationOptions={
        headerStyle:{
            height:45
        },
        headerLeft:null,
        headerTitle:'分类'
    };
    render() {
        return (
            <View >
                <View style={{flex:1}}>
                    <Text>category</Text>
                </View>
            </View>
        );
    }
}