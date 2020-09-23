import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Keyboard,
    ScrollView
} from 'react-native'
var e;
import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
class SearchTask extends Component{
    constructor(props){
        super(props)
        e=this
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
            dataSearch:[],
            search_string:'lap'
        }
        this.socket.on("sv-search-task",function(data){
            if(data.success==false){
                console.log(JSON.stringify(data))
            }else if(data.success==true){
                var list = data.data
                e.setState({
                    dataSearch:list
                })
                console.log(JSON.stringify(list))
            }
        })
    }
    componentDidMount=()=>{
        this.onSearchtask(this)
    }
    onSearchtask=()=>{
        const searchtask={
            search_string:this.state.search_string
        }
        this.socket.emit("cl-search-task",searchtask)
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>abc</Text>
                <Text>abc</Text>
                <Text>abc</Text>
                <Text>abc</Text>
                <Text>abc</Text>
            </View>
        )
    }
}
export  default SearchTask
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9'
    },
    
})