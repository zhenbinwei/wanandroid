/**
 * @File         : EmptyComponent.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/28 9:41
 */

import React, {Component} from 'react';
import {Text, View,Dimensions} from "react-native";
import Colors from "../Colors";
//分隔线
let {height, width} = Dimensions.get('window');
export default class EmptyComponent extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={{flex:1,height:height-100,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontSize:16}}>{'空空如也'}</Text>
            </View>
        );
    }
};