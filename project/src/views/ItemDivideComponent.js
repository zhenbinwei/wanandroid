/**
 * @File         : ItemDivideComponent.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/13 11:40
 */


import React, {Component} from 'react';
import {View} from "react-native";
import Colors from "../Colors";
    //分隔线
export default class ItemDivideComponent extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={{height: 1, backgroundColor: Colors.fColor1, marginLeft: 8, marginRight: 8}}/>
        );
    }
};