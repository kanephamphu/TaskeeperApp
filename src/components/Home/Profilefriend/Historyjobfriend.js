import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import {socket,sockettest} from "../../../Socket.io/socket.io";
import star from '../../../images/star.png';
import { Ionicons } from '@expo/vector-icons';
import avatarimage from '../../../images/avatar11.png';
const { height, width } = Dimensions.get('window');
import AppText from "../../app-text";
var e;
export default class Historyjobfriend extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      isLoading: false,
      refeshing: false,
      loadingdata:false,
      dataJob: [
      ],
    }

    sockettest.on("sv-get-history-job",function(data){
      var list=data.data
      if(data.success==false){
        console.log(JSON.stringify(data))
      }else if(data.success==true){
        e.setState({
          dataJob:list,
          loadingdata:true
        })
      }
     
    })
  };
  componentDidMount=async()=>{
    var token= await AsyncStorage.getItem('token')
    const decode=jwt_decode(token)
    const historyjob ={
      userId:this.props.route.params._id, 
      number:10,
      skip:0
    }
    sockettest.emit("cl-get-history-job",historyjob)
  }
  refreshTop() {
    this.componentDidMount()
  }

  render() {
    const { first, last} = this.props.route.params;
    return (
      <View style={styles.container}>
           <View style={styles.header0}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: 1 }}>{last}'s History jobs</Text>
          </TouchableOpacity>
        </View>
        {!this.state.loadingdata == true ?
          <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
            <ActivityIndicator size='large'></ActivityIndicator>
          </View>
          :
          this.state.dataJob.length ===0 
          ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#ffff" }}>
            <AppText i18nKey={'home_manage.blank_show'}>Blank task apply list</AppText>
          </View>
          :
          <View style={styles.flatlist}>
            <FlatList data={this.state.dataJob}
              renderItem={({item,index})=>{
                return(
                  <RenderItem item={item} index={index}></RenderItem>
                )
              }}
              keyExtractor={(item)=>item._id.toString()}
              refreshing={this.state.refeshing}
              onRefresh={() => { this.refreshTop() }}
            >
            </FlatList>
          </View>}
      </View>
    );
  }
}
class RenderItem  extends React.Component{
  render(){
    var task_title = this.props.item.task_title;
      
    var count = task_title.length;

    if (count >= 30) {
        task_title = task_title.slice(0, 30)+'...';
    }
    return(
      <View style={styles.image_container}>
        <TouchableOpacity  style={{flexDirection:'row'}}>
          <View style={{justifyContent:'center',alignItems: 'center',marginLeft:10,height:55,width:55,backgroundColor:'white',shadowOffset: { width: 0, height: 3 },
            shadowColor: 'green',
            shadowOpacity: 0.5,
            elevation: 10,
            borderColor: '#71B7B7',
            borderRadius: 50}}
          >
              <Image source={this.props.item.task_owner_avatar?{uri:this.props.item.task_owner_avatar}:avatarimage} style={styles.image}/>
          </View>
          <View  style={{flexDirection:'column',marginLeft:10,alignItems:'flex-start',width:width-180}}>
            <Text style={[styles.name,{color:'#2d7474'}]}>{task_title}</Text>
            <View >
              <Text style={{fontWeight:'bold',fontSize:15}}>{this.props.item.task_type}</Text>
            </View>
          </View>
        </TouchableOpacity>   
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header0: {
    ...Platform.select({
      ios: {
          backgroundColor: 'white',
          height: height * 0.09,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          paddingLeft: 10,
          paddingTop:15,
          shadowOpacity: 0.2,
          elevation: 1,
          paddingTop:36
      },
      android: {
        backgroundColor: 'white',
        height: height * 0.09,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingLeft: 10,
        paddingTop:15,
        shadowOpacity: 0.2,
        elevation: 1,
      },
      default: {
        // other platforms, web for example
      }
    })
   
  },
  container: {
    flex: 1,
    justifyContent: 'center',  
    backgroundColor: '#faf9f9'
  },
  name:{
    fontWeight:'bold',
    fontSize:18
  },
  flatlist:{
    flex:1,
    alignItems:'center',
    marginTop:10
  },
  image_container:{
      paddingVertical:10,
      paddingHorizontal:10,
      flexDirection:'row',
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      width:width-60,
      backgroundColor:'rgba(200,200,200,0.3)',
      margin:10,
      borderWidth:1,
      borderColor:'#2d7474'
  },
  time:{
    fontWeight:'bold',
    fontSize:19,
    color:'#2d7474'
      
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
    height:50,borderRadius:50
  },
  input: {
    width:230,
    height: 55,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: -10,
    color: '#2d7474',
    marginHorizontal: 25,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#2d7474'
  },
})