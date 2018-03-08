import { AppRegistry } from 'react-native';
import {StackNavigator, TabNavigator} from "react-navigation";
import Main from "./project/src/Main";
import Detail from "./project/src/Detail";
import Me from "./project/src/Me";
import Home from "./project/src/Home";
import Category from "./project/src/Category";
import Colors from "./project/src/Colors";
import Login from "./project/src/Login";


const TabNav=TabNavigator({
    Home:{screen:Home},
    Category:{screen:Category},
    Me:{screen:Me}
},{
    tabBarOptions:{
        indicatorStyle:{
            height:0
        },
        style: {
            backgroundColor: Colors.zColor1,
        },
    },

    tabBarPosition:'bottom'
});
const App=StackNavigator({
    Main:{screen:Main},
    TabNav:{screen:TabNav},
    Detail:{screen:Detail},
    Login:{screen:Login}
},{
    mode:'card',
    headerMode:'screen'
});



AppRegistry.registerComponent('wanandroid', () => App);
