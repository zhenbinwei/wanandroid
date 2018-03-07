/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, { Component } from 'react';
import {
    Button,
    Text,
    View
} from 'react-native';
export default class Me extends Component<Props> {
    static navigationOptions={
        headerStyle:{
            height:45
        },
        headerLeft:null,
        headerTitle:'我的'
    };
    render() {
        return (
            <View style={{flex:1}}>
                <Text>me</Text>
                <Button title='点击跳转' onPress={
                    ()=>{
                        console.log('点击')
                        this.props.navigation.navigate('Detail')
                    }
                }/>
            </View>
        );
    }
}