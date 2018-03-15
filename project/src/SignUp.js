import {Component} from "react";
import Colors from "./Colors";
import {Text, View, StyleSheet, TextInput, TouchableOpacity,Platform,ToastAndroid} from "react-native";
import React from "react";
import TitleBar from "./views/TitleBar";

/**
 * @File         : Login.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/8 11:17
 */



const registerApi='http://www.wanandroid.com/user/register';
export default class Login extends Component<Props> {
    constructor(props){
        super(props);
    }
    register(username,password,repassword) {
        let formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);
        formData.append("repassword",repassword);
        fetch(registerApi, {
                method: 'POST',
                headers: {},
                body: formData
            }
        ).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(responsJson.errorCode===0){
                if(Platform.OS==='android') {
                    ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                }
                storage.save({
                    key:'UserInfoKey',
                    data:responsJson.data
                });
                this.props.navigation.state.params.callback();
                this.props.navigation.pop(2)
            }else {
                if(Platform.OS==='android') {
                    ToastAndroid.show(responsJson.errorMsg, ToastAndroid.SHORT);
                }
            }
        }).catch((err) => {//2
            if(Platform.OS==='android') {
                ToastAndroid.show('注册失败', ToastAndroid.SHORT);
            }
        });
    }
    render() {
        let username='';
        let password='';
        let repassword='';
        return (
            <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                <TitleBar
                    {...this.props}
                 centerText={'注册'}
                />
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:100}}>
                    <Text style={styles.text}>{'用户名'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        onChangeText={(text)=>{
                            username=text;
                        }}
                    />
                </View>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Text style={styles.text}>{'密码'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            password=text;
                        }}
                    />
                </View>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Text style={styles.text}>{'确认密码'}</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={Colors.zColor1}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            repassword=text;
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.signUp} onPress={()=>{
                    if(!username){
                        if(Platform.OS==='android') {
                            ToastAndroid.show('用户名不能为空!', ToastAndroid.SHORT);
                        }
                        return '';
                    }
                    if(!password){
                        if(Platform.OS==='android') {
                            ToastAndroid.show('密码不能为空!', ToastAndroid.SHORT);
                        }
                        return '';
                    }
                    if(!repassword){
                        if(Platform.OS==='android') {
                            ToastAndroid.show('确认密码不能为空!', ToastAndroid.SHORT);
                        }
                        return '';
                    }
                    this.register(username,password,repassword)
                }}>
                    <Text style={{fontSize:20,color:Colors.fontColor4}}>
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
    signUp:{
        width:288,
        height:44,
        backgroundColor:Colors.zColor1,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        marginTop:8
    }
});