/**
 * @File         : detail.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 10:12
 */
import React, { Component } from 'react';
import {
    Text,
    View, WebView
} from 'react-native';
import CommonWebView from "./views/CommonWebView";
import TitleBar from "./views/TitleBar";
export default class Detail extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            url:this.props.navigation.state.params.url,
            title:this.props.navigation.state.params.title
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TitleBar
                    {...this.props}
                    centerText={this.state.title}
                />
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