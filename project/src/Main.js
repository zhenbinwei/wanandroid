import {Component} from "react";
import React from "react";
import {Button, Image, View} from "react-native";
import Colors from "./Colors";

/**
 * @File         : Main.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 15:21
 */

export default class Main extends Component<{}> {
    render() {
        return (
            <View
                style={{flex:1,alignItems:'center',justifyContent:'center'}}
            >
                <View  style={{height:80,width:80,backgroundColor:Colors.zColor1,borderRadius:360,justifyContent:'center',alignItems:'center'}}>
                <Image
                    style={{height:60,width:60}}
                    source={require('../res/logo.png')}
                    resizeMode={'contain'}
                />
                </View>
            </View>
        );
    }

    componentDidMount() {
        setTimeout(()=>{
            this.props.navigation.replace('TabNav')
        },2000)
    }
}