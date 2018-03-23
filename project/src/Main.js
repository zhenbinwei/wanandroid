import {Component} from "react";
import React from "react";
import {Button, Image, ScrollView, Text, TextInput, View} from "react-native";
import Colors from "./Colors";

/**
 * @File         : Main.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 15:21
 */
let  i=0;
export default class Main extends Component<{}> {

    constructor(props){
        super(props)
        this.state={
            text:''
        }
    }

    render() {

        console.log(this.state.text)
        return (
            <View
                style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:Colors.zColor2}}
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