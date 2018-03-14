/**
 * @File         : TitleBar.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/14 11:18
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, Text, Image, BackHandler} from "react-native";
import Colors from "../Colors";

let width = Dimensions.get('window').width;
export default class TitleBar extends Component<Props> {


    constructor(props) {
        super(props);
        console.log('点击事件'+ this.props.onLeftPress)
        this.state = {
            leftText: this.props.leftText,
            leftView: this.props.leftView,
            centerText: this.props.centerText,
            centerView: this.props.centerView,
            rightText: this.props.rightText,
            rightView: this.props.rightView,
            onLeftPress: this.props.onLeftPress,
            onRightPress: this.props.onRightPress
        }
    }

    render() {
        console.log('点击事件'+ this.state.onLeftPress)
        return (
            <View style={{
               width:width, height: 44, justifyContent:'center'
            }}>
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.left} onPress={

                        this.state.onLeftPress ? this.state.onLeftPress : () => {
                            if (this.props.navigation) {
                                this.props.navigation.pop(1)
                            }
                        }
                    }>
                        {this.state.leftView ?
                            this.state.leftView : this.state.leftText ?
                                <Text style={styles.text} numberOfLines={1}>{this.state.leftText}</Text> :
                                <Image style={styles.defBack} source={require('../../res/back.png')}/>}
                    </TouchableOpacity>
                    <View style={styles.center}>
                        {this.state.centerView ? this.state.centerView : this.state.centerText ?
                            <Text numberOfLines={1} style={styles.text}>{this.state.centerText}</Text> : <View/>}
                    </View>
                    <TouchableOpacity style={styles.right}>
                        {this.state.rightView ? this.state.rightView : this.state.rightText ?
                            <Text numberOfLines={1} style={styles.text}>{this.state.rightText}</Text> : <View/>}
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: Colors.fColor1}}/>
            </View>)
    };
}
let styles = StyleSheet.create({
    bar: {
        height: 44,
        backgroundColor: Colors.zColor2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
        paddingLeft: 8,
    },
    center: {
        height: 44,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
        paddingLeft: 8,
    },
    right: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
        paddingLeft: 8,
    },
    text: {
        fontSize: 16,
        color: Colors.fontColor1,
    },
    defBack: {
        width: 25,
        height: 25
    }
});