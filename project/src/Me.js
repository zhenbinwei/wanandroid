/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, {Component} from 'react';
import {
    Button, Image,
    Text, TouchableOpacity,
    View
} from 'react-native';
import Colors from "./Colors";

let logoutApi='http://www.wanandroid.com/user/logout';
export default class Me extends Component<Props> {
    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerLeft: null,
        headerTitle: '我的',
        tabBarLabel:'我的'
    };

    constructor(props){
        super(props);
        this.state={
            loginState:false,
            userInfo:null
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {

        if(!this.state.loginState){
        return (
            <View style={{flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:Colors.zColor2}}>
                <TouchableOpacity
                    style={{width: 100,height:44,backgroundColor:Colors.zColor1,alignItems:'center',justifyContent:'center',borderRadius:4}}
                    onPress={
                        () => {
                            this.props.navigation.navigate('Login',{
                                ...this.props.navigation.state.params,
                                callback:()=>{
                                    this.getUserInfo();
                                }
                            })
                        }
                    }>
                    <Text style={{color:Colors.fontColor4,fontSize:16}}>
                        {'去登陆'}
                    </Text>
                </TouchableOpacity>
            </View>
        );}else {
            return(
                <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                    <View style={{height:150, backgroundColor:Colors.zColor1,justifyContent:'center',
                        alignItems:'center'}}>
                        <View
                            style={{height:80,width:80,backgroundColor:Colors.zColor2}}
                        />
                        <Text style={{fontSize:16,marginTop:8}}>{this.state.userInfo.username}</Text>
                    </View>
                    <TouchableOpacity style={{height:44, backgroundColor:Colors.zColor2,justifyContent:'flex-start',
                        flexDirection:'row',
                        flexWrap:'wrap', alignItems:'center',borderBottomWidth :1,borderColor:Colors.fColor1 }}>
                        <Text style={{fontSize:16,marginLeft:8,color:Colors.fontColor2}}>
                            {'收藏'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:44, backgroundColor:Colors.zColor2,justifyContent:'flex-start',
                        flexDirection:'row',
                        flexWrap:'wrap', alignItems:'center',borderBottomWidth :1,borderColor:Colors.fColor1 }}>
                        <Text style={{fontSize:16,marginLeft:8,color:Colors.fontColor2}}>
                            {'设置'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:44, backgroundColor:Colors.zColor2,justifyContent:'center',
                         alignItems:'center',marginTop:40,
                    }}
                                      onPress={()=>{
                                        this.logout();
                                      }}>
                        <Text style={{fontSize:16,marginLeft:8,color:Colors.fontColor2}}>
                            {'退出登录'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    getUserInfo(){
        storage.load({
            key: 'UserInfoKey',
        }).then(ret => {
            console.log('数据'+ret)
            if(ret.username){
                this.setState({
                    loginState:true,
                    userInfo:ret
                })
            }
        }).catch(err => {
            this.setState({
                loginState:false
            })
        })
    }

    logout(){
        fetch(logoutApi, {
            method: 'GET',
        }).then((response) => {
            storage.remove({
                key: 'UserInfoKey'
            });
            this.setState({
                loginState:false,
                userInfo:null
            })
        }).catch((err) => {//2
            console.error(err);
        });
    }
}