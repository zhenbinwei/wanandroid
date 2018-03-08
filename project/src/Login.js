import {Component} from "react";
import Colors from "./Colors";
import {Text, View, StyleSheet, TextInput, TouchableOpacity,Platform,ToastAndroid} from "react-native";
import React from "react";

/**
 * @File         : Login.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/8 11:17
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */

let loginApi='http://www.wanandroid.com/user/login';
export default class Login extends Component<Props> {
    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerTitle: '登陆'
    };

    constructor(props){
        super(props);
    }
    login(userName,pwd) {
        let formData = new FormData();
        formData.append("username",userName);
        formData.append("password",pwd);
        fetch(loginApi, {
            method: 'POST',
            headers: {},
            body: formData
        }
        ).then((response) => {
            return response.json()
        }).then((responsJson) => {
           if(responsJson.errorCode===0){
               if(Platform.OS==='android') {
                   ToastAndroid.show('登录成功', ToastAndroid.SHORT);
               }
           }else {
               if(Platform.OS==='android') {
                   ToastAndroid.show(responsJson.errorMsg, ToastAndroid.SHORT);
               }
           }
        }).catch((err) => {//2
            if(Platform.OS==='android') {
                ToastAndroid.show('登录失败', ToastAndroid.SHORT);
            }
        });
    }
    render() {
        let userName='';
        let pwd='';
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:100}}>
                    <Text style={styles.text}>{'用户名'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        onChangeText={(text)=>{
                            userName=text
                        }}
                        />
                </View>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Text style={styles.text}>{'密码'}</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        underlineColorAndroid={Colors.zColor1}
                        onChangeText={(text)=>{
                           pwd=text
                        }}
                        />
                </View>

                <TouchableOpacity style={styles.login}
                                  onPress={()=>{

                                      if(!userName){
                                          if(Platform.OS==='android') {
                                              ToastAndroid.show('用户名不能为空!', ToastAndroid.SHORT);
                                          }
                                          return '';
                                      }
                                      if(!pwd){
                                          if(Platform.OS==='android') {
                                              ToastAndroid.show('密码不能为空!', ToastAndroid.SHORT);
                                          }
                                          return '';
                                      }
                                     this.login(userName,pwd)
                                  }}>
                    <Text style={{fontSize:20,color:Colors.fontColor4}}>
                        {'登录'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUp}
                                  onPress={
                                      () => {
                                          this.props.navigation.navigate('SignUp')
                                      }
                                  }>
                    <Text style={{fontSize:20,color:Colors.fontColor0}}>
                        {'注册'}</Text>
                </TouchableOpacity>
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
    },
    login:{
        width:288,
        height:44,
        backgroundColor:Colors.zColor1,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        marginTop:8
    },
    signUp:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:8
    }
});