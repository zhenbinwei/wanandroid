/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, {Component} from 'react';
import {
    Button,
    Text, TouchableOpacity,
    View
} from 'react-native';
import Colors from "./Colors";

export default class Me extends Component<Props> {
    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerLeft: null,
        headerTitle: '我的'
    };

    render() {
        return (
            <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                    style={{width: 100,height:45,backgroundColor:Colors.zColor1,alignItems:'center',justifyContent:'center',borderRadius:4}}
                    onPress={
                        () => {
                            this.props.navigation.navigate('Login')
                        }
                    }>
                    <Text style={{color:Colors.fontColor4,fontSize:16}}>
                        {'去登陆'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}