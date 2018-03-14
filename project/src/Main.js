import {Component} from "react";
import React from "react";
import {Button, View} from "react-native";
import TitleBar from "./views/TitleBar";

/**
 * @File         : Main.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 15:21
 */

export default class Main extends Component<{}> {
    static navigationOptions={
        header:null
    }
    render() {
        return (
            <View
                style={{flex:1,alignItems:'center',justifyContent:'center'}}
            >
                <TitleBar
                    centerText={'标题'}
                    rightText={'取消'}
                />
                <Button
                    title='跳转主页'
                    onPress={
                        ()=>{
                            this.props.navigation.replace('TabNav')
                        }}
                />
            </View>
        );
    }
}