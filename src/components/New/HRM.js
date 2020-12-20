import React from 'react';
import { View, Text, StyleSheet,Button,FlatList,Image ,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode'

const {height,width} =Dimensions.get('window');
var e;
export default class HRM extends React.Component {
    constructor(props){
        super(props);
        e=this;
        this.socket = io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
          applier_number:'',
          secret_key:'',
          number_task:30,
          skip:0,
          dulieu:[],
          refreshing: false,
          loadingdata: false,
          dataTask:[
          ],
        
        }
        this.socket.on("sv-get-task-manage",function(data){
          var list=data.data
          //var dulieu = e.state.dataTask
          //dulieu = dulieu.concat(list)
          if(data.success==false){
            console.log(JSON.stringify(data))
          }else if(data.success==true){
             
            e.setState({
              dataTask:list,
              loadingdata:true
              //isLoading:false,
            })

          }
      })
    }
    componentDidMount=async()=>{
      var token= await AsyncStorage.getItem('token')
      const decode=jwt_decode(token)
      const task ={
        secret_key:token,
        number_task:this.state.number_task,
        skip:this.state.skip,
        applier_number:this.state.applier_number
      }
      this.socket.emit("cl-get-task-manage",task)
    }
    refresh=async()=>{
      var token= await AsyncStorage.getItem('token')
      const decode=jwt_decode(token)
      const newtask ={
        secret_key:token,
        number_task:this.state.number_task,
        skip:this.state.skip,
        applier_number:this.state.applier_number
      }
      this.socket.emit("cl-get-task-manage",newtask)
      //console.log(newtask)
    }
    /*refreshbottom=async()=>{
      var token= await AsyncStorage.getItem('token')
      const decode=jwt_decode(token)
      this.setState({
        skip:this.state.skip+1,
        number_task:this.state.number_task,
      })
      const newtaskbottom ={
        secret_key:token,
        number_task:this.state.number_task,
        skip:this.state.skip,
        applier_number:this.state.applier_number
      }
      this.socket.emit("cl-get-task-manage",newtaskbottom)
    }*/
   
    render(){
        return (
         /* this.state.dataApply==''
      ?*/
          <View style={styles.container}>
            {!this.state.loadingdata == true ?
                        <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
                            <ActivityIndicator size='large'></ActivityIndicator>
                        </View>
                        :
                  <View style={styles.flatlist}>
                  <FlatList data={this.state.dataTask}
                        renderItem={({item,index})=>{
                        return(
                            <RenderItem stackScreen={this.props.stack} item={item} index={index}></RenderItem>
                        )
                    }}
                    keyExtractor={(item)=>item._id.toString()}
                    refreshing={this.state.refreshing}
                    onRefresh={() => { this.refresh() }}
                    //onEndReachedThreshold={0.5}
                    //nEndReached={this.refreshbottom}
                    >
                </FlatList>
                  </View> } 
          </View>
        );
      }
    }
class RenderItem  extends React.Component{
    render(){
        return(
            <View style={styles.image_container}>
                    <TouchableOpacity onPress={()=>this.props.stackScreen(this.props.item._id)}>
                        <View  style={{flexDirection:'column',marginLeft:20,marginTop:10,alignItems:'flex-start',width:170}}>
                        <View style={{width:width-80}}>
                        <Text style={styles.position}>{this.props.item.task_title}</Text>
                        </View>
                        <View>
                            <Text style={styles.amount}></Text> 
                        </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{position:'absolute',right:20,top:30}} >
                        <FontAwesome name="plus-square" size={24} color="white" />
                    </TouchableOpacity>
            </View>    
          )
    }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',  
      backgroundColor: '#faf9f9'
    },
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
        width:width-60,
        backgroundColor:'rgba(200,200,200,0.3)',
        margin:10
    },
    time:{
      fontWeight:'bold',
      fontSize:19,
      color:'#2d7474'
        
    },
    header0:{
      height:height*0.08, 
      shadowOffset:{width:0,height:3},
      shadowOpacity:0.2,
      padding: 10,
      shadowOpacity: 0.2,
      elevation: 1,
      marginTop: Platform.OS == 'android' ? 25 : null,
  },
    position:{
      fontWeight:'bold',
      fontSize:18
      
    },
    amount:{
      fontSize:16
    },
    image:{
        width:50,
        height:50
    }
  })