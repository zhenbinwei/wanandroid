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

    /*
    遇到的问题：  再title里加入了textinput 通过修改state无法重新赋值

    * 如果只是简单的传值，并不需要这么麻烦。
题主说的问题我之前也是踩过坑的。出现这个问题的原因是我们多做了一步，就是把props
赋值给state然后再放到组件中。

为什么说多做了一步？

在react中，子组件是会自动响应父组件传的props的，而之所以值改变了子组件不刷新，问题就出在你一开始不最开始的props赋值给了state，而后面你更新props时并没有做相同的操作。

最好的做法就是，直接在组件中使用props，而不是state。这样父组件传的值一变子组件马上就变了。

另外如果你传的不是简单的值，需要覆写刷新那个生命周期函数进行修改。楼上已经提到了这里不再赘述
    *
    * */


    static defaultProps = {
        leftText: null,
        leftView: null,
        centerText: null,
        centerView: null,
        rightText: null,
        rightView: null,
        onLeftPress: null,
        onRightPress: null,
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
               width:width, height: 44, justifyContent:'center'
            }}>
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.left} onPress={

                        this.props.onLeftPress ? this.props.onLeftPress : () => {
                            if (this.props.navigation) {
                                this.props.navigation.pop(1)
                            }
                        }
                    }>
                        {this.props.leftView ?
                            this.props.leftView : this.props.leftText ?
                                <Text style={styles.text} numberOfLines={1}>{this.props.leftText}</Text> :
                                <Image style={styles.defBack} source={require('../../res/back.png')}/>}
                    </TouchableOpacity>
                    <View style={styles.center}>
                        {this.props.centerView ? this.props.centerView : this.props.centerText ?
                            <Text numberOfLines={1} style={styles.text}>{this.props.centerText}</Text> : <View/>}
                    </View>
                    <TouchableOpacity style={styles.right}>
                        {this.props.rightView ? this.props.rightView : this.props.rightText ?
                            <Text numberOfLines={1} style={styles.text}>{this.props.rightText}</Text> : <View/>}
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