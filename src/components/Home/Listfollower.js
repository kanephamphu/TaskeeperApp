import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';
const {height,width} =Dimensions.get('window');
class Listfollower extends Component{
    constructor(props){
        super(props);
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
      
        this.state={
           first_name:'',
           last_name:'',
           email:'',
           username:'',
           id:'',  
           phone:''   ,   
           secret_key:'',
           data:[]
    }
    this.socket.on('sv-get-followers',function(data){
        var listdata=data.data
        if(data.success==true){ 
            e.setState({
                data:listdata,      
            }) 
            console.log(JSON.stringify(listdata))
        }
    })
    
}
componentDidMount= async()=> {  
    const token = await AsyncStorage.getItem("token")
    const getfollower={
        secret_key : token
    }
    this.socket.emit("cl-get-followers",getfollower)
  }
render(){
    return(
        <View style={styles.container}>
           
        </View>
           
       
    )
}
}
export default Listfollower;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
    iconBulliten:{
        flexDirection:'row',
        borderRadius:10,
        borderWidth:1,
        height:50,
        width:90,
        alignItems:'center',
        paddingLeft:5,
        marginBottom:-30,
        marginRight:45,
        backgroundColor:'#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor:'#71B7B7'
    },
    nof:{
        backgroundColor:'#71B7B7',
        height:250,
        borderRadius:10,
        marginHorizontal:16,
        marginVertical:15
    },
    image:{
        width:width-30,
        height:height*0.4,     
    },
    texttitle:{
        marginLeft:10,marginTop:20,width:150,borderBottomWidth:2,borderBottomColor:'#71B7B7'
    },
    texttitle1:{
        marginLeft:150,marginTop:20,width:90,borderBottomWidth:2,borderBottomColor:'red'
    },
    header:{
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,
        alignItems:'center',
       
       
    },
    icon:{
        marginLeft:10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 1,
    },
    searching:{
        backgroundColor:'white',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        paddingLeft:15,
        ...Platform.select({
          ios: {
            width:310,
            height:35
          },
          android: {
            width:310,
            height:35
          },
          default: {
            // other platforms, web for example
          }
        })
      },
    text:{
        position:'absolute',
        flexDirection:'row',
        marginTop:20,
        marginLeft:20
      
        
    },
    text1:{
        position:'absolute',
        marginTop:40,
        marginLeft:10
    },
    item:{
        marginTop:10,
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
    },
})
