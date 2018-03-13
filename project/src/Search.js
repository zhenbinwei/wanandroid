

import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "./Colors";

export default class Search extends Component<Props> {
    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerTitle:( <TextInput
            style={{ flex:1}}
            underlineColorAndroid={Colors.zColor1}
            placeholder={'输入关键字 空格隔开...'}
            returnKeyType={'search'}
        />),
        headerRight:(<TouchableOpacity style={{marginRight:15}}>
            <Text>{'搜索'}</Text>
        </TouchableOpacity>)
    };

    render(){
        return(<View/>)
    }
}