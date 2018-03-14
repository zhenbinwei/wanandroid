/**
 * @File         : AndroidWebView.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/12 11:21
 */

import React, { Component } from 'react';
import {Platform, requireNativeComponent, WebView} from "react-native";
const RCTWebViewLayout = requireNativeComponent('RCTWebViewLayout', null);
export default class CommonWebView extends Component<Props> {


    constructor(props){
        super(props)
    }

    render(){
        if(Platform.OS === 'android'){
            return(
                <RCTWebViewLayout
                    {...this.props}
                    source={this.props.source.uri}
                />)
        }else {
            return(
              <WebView
                  {...this.props}
              />)
        }
    }

}