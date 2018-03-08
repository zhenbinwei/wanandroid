import {Component} from "react";
import Colors from "./Colors";
import {Text, View, StyleSheet, TextInput} from "react-native";
import React from "react";

/**
 * @File         : Login.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/8 11:17
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */

export default class Login extends Component<Props> {
    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerLeft: null,
        headerTitle: '登陆'
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>{'用户名'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>{'密码'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>{'确认密码'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        />
                </View>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    text: {
        width:80,
        margin: 8,
        fontSize:20,
        color:Colors.zColor1
    },
    input:{
        width:200,
        padding: 0,
    }
});