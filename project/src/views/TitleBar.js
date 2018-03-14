/**
 * @File         : TitleBar.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/14 11:18
 */
import React, {Component} from 'react';
import {View,StyleSheet} from "react-native";
import Colors from "../Colors";

export default class TitleBar extends Component<Props> {


       render(){
           return(<View style={styles.bar}></View>)
       };
}
let styles = StyleSheet.create({
     bar:{
         height:44,
         backgroundColor:Colors.zColor2,

     }
});