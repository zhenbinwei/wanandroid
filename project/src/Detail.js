/**
 * @File         : detail.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 10:12
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, { Component } from 'react';
import {
    Text,
    View, WebView
} from 'react-native';
import CommonWebView from "./views/CommonWebView";
export default class Detail extends Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
        headerStyle:{
            height:45
        },
    });
    constructor(props){
        super(props)
        this.state={
            url:this.props.navigation.state.params.url,
        }
    }

    render() {
        console.log('text:'+this.props.navigation.state.params.text);
        return (
            <View style={{flex:1}}>
                <CommonWebView
                    style={{flex:1}}
                    automaticallyAdjustContentInsets={false}

                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    scalesPageToFit={true}
                    startInLoadingState={true}

                />
            </View>
        );
    }
}