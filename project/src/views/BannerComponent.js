/**
 * @File         : BannerComponent.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/13 11:39
 */

import React, {Component} from 'react';
import {Image, View} from "react-native";
import Swiper from 'react-native-swiper';
import Colors from "../Colors";
const bannerApi='http://www.wanandroid.com/banner/json';

//广告
export default class BannerComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            showBanner:false
        }
    }
    componentDidMount() {
        this.getBanner();
    }
    render(){
        //ViewPageAndroid 和 可滚动界面一起使用时会显示不出来 要再刷新一次  Swiper 封装了 ViewPageAndroid 和 ScrollView
        if(this.state.showBanner){
            return(
                this.getPages(this.state.data)
            )}else {
            return(<View/>)
        }
    }
    getPages(data){
        let pages =[];
        for (let i = 0; i < data.length; i++) {
            pages.push(
                <View style={{flex:1}}  key={i} >
                    <Image
                        style={{flex:1}}
                        source={{uri: data[i].imagePath}}
                    />
                </View>
            );
        }

        return(
            <Swiper
                style={{height:140}}
                autoplay={true}
                paginationStyle={{marginBottom:-20}}
                activeDotColor={Colors.zColor1}
            >
                {pages}
            </Swiper >
        );
    }

    getBanner(){
        fetch(bannerApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            this.setState({
                data: responsJson.data,
                showBanner:true
            })
        }).catch((err) => {//2
            console.error(err);
        });
    }
}