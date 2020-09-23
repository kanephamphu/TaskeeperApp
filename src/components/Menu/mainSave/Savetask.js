import  React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Animated,ScrollView,Alert,Dimensions,FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons'; 
const { width,height } = Dimensions.get("window");
var e;
export default class Savetask extends React.Component {
    constructor(props){
        super(props)
        e=this;
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
            secret_key:'',
            deleteRowkey:null,
            isLoading:true,
            refeshing:false,
            dataSave:[
            ],
        }
        this.socket.on("sv-get-saved-task",function(data){
            var list=data.data
            if(data.success==false){
              console.log(JSON.stringify(data))
            }else if(data.success==true){
              e.setState({
                dataSave:list,
                isLoading:false,
              })
            
            }
        })
    };
    /* refreshFlatlist=()=>{
    const apply ={
      secret_key:this.state.secret_key
    }
    this.socket.emit("cl-get-saved-task",apply)
  }*/
  componentDidMount=async()=>{
    var token= await AsyncStorage.getItem('token')
    this.setState({
      secret_key:token,
    })
    const save ={
      secret_key:this.state.secret_key,
      number_task :10,
	    skip : 1
    }
    this.socket.emit("cl-get-saved-task",save)
  }
  render(){
    return(
      <View style={styles.container}>
         <View style={styles.header0}> 
            <TouchableOpacity  style={{flexDirection:'row'}}onPress={()=>this.props.navigation.navigate("Menu")}>
                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#2d7474" />
                <Text style={{fontWeight:'bold',fontSize:25,color:'#2d7474',marginLeft:15,marginTop:-2}}>Save task list</Text>
            </TouchableOpacity>
        </View>    
              <View style={styles.flatlist}>
              <FlatList data={this.state.dataSave}
                    renderItem={({item,index})=>{              
                    return(    
                        <View>
                             <RenderItem item={item} index={index} parenFlastlist={this} ></RenderItem>          
                        </View>
                    )
                }}
                keyExtractor={(item)=>item._id.toString()}
                ItemSeparatorComponent={this.ItemSeparatorComponent}
                showsHorizontalScrollIndicator={false}
                >
            </FlatList>
            </View>  
      </View>
    )
  }
}
class RenderItem  extends React.Component{
    constructor(props){
      super(props)
      this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
      this.state={
        show:false,
        secret_key:'',
        _id:'',
      }
      this.socket.on("sv-remove-saved-task",function(data){
        if(data.success==false){
          console.log(JSON.stringify(data))
        }else {
          console.log('xoa thanh cong')
         /* Alert.alert('','Delete success',[
            {text:'Yes'}
          ],{cancelable:true})*/
        }
      })
      
    }
    componentDidMount=async()=>{
      const token = await AsyncStorage.getItem('token')
      this.setState({
          secret_key:token,
      })
    }
    deleteTasksave=()=>{
      const deleteSave={
        secret_key:this.state.secret_key,
        task_saved_id:this.props.item._id,
      }
      this.socket.emit("cl-remove-saved-task",deleteSave)
    }
      render(){
          return(
              <View style={styles.image_container}>
                  <View style={{justifyContent:'center',marginLeft:20}}>
                      <AntDesign name="clockcircleo" size={35} color="#009387" />
                  </View>
                  <View>
                    <View  style={{flexDirection:'column',marginLeft:20,alignItems:'flex-start',width:170}}>
                        <View style={{marginTop:1,flexDirection:'row'}}> 
                            <Text >{new Date(this.props.item.saved_time).toLocaleDateString()}</Text>
                            <View style={{marginLeft:10}}>
                                <Text >{new Date(this.props.item.saved_time).toLocaleTimeString()}</Text>
                            </View>
                        </View>
                         <View>
                        <Text style={styles.company}>{this.props.item.task_title}</Text>
                            </View>
                    </View>
                  </View>
                  <TouchableOpacity onPress={()=>Alert.alert(
                    '',
                    'Do you want to cancel this jobs ?',[
                      {text:'No', onPress:()=>console.log('cancel'),style:'cancle'},{text:'Yes',onPress:()=>{this.deleteTasksave()}}
                    ],{cancelable:true}
                  )} style={{marginLeft:60}} >
                      <Entypo name="dots-three-vertical" size={24} color="#009387" />
                  </TouchableOpacity>
              </View>    
            )
      }
  }
  
const styles = StyleSheet.create({
    flatlist:{
        flex:1,
        alignItems:'center'
    },
    image_container:{
        paddingVertical:10,
        paddingHorizontal:10,
        flexDirection:'row',
        borderRadius:10,
        height:90,
        width:350,
        backgroundColor:'rgba(200,200,200,0.3)',
        margin:20
    },
    time:{
      fontWeight:'bold',
      fontSize:19,
      color:'#2d7474'
        
    },
    company:{
      fontWeight:'bold',
      fontSize:18,
      
      
    },
    position:{
      fontSize:16
    },
    rating:{
        marginTop:5,
        flexDirection:'row'
    },
    container:{
      ...Platform.select({
        ios: {
          flex: 1,   
          backgroundColor: '#faf9f9',
        },
        android: {
          flex: 1,  
          backgroundColor: '#faf9f9',
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    header0:{
      height:height*0.08, 
      shadowOffset:{width:0,height:3},
      shadowOpacity:0.2,
      padding: 10,
      shadowOpacity: 0.2,
      elevation: 1,
      marginTop: Platform.OS == 'android' ? 25 : null,
      backgroundColor:'#faf9f9'
  },
  })