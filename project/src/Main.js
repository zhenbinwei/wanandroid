import {Component} from "react";
import React from "react";
import {Button, View} from "react-native";

/**
 * @File         : Main.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 15:21
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */

export default class Main extends Component<{}> {
    render() {
        return (
            <View
                style={{flex:1}}
            >
                <Button
                    title='跳转主页'
                    onPress={
                        ()=>{this.props.navigation.navigate('TabNav')}}
                />
            </View>
        );
    }
}