import React from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, Image, Dimensions, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout'
import iconsuccess from '../../images/icon1.png';
import iconerror from '../../images/icon2.png';
import iconwarning from '../../images/icon3.png';
import {socket} from "../../Socket.io/socket.io";
import avatarimage from '../../images/avatar11.png';
import AppText from '../app-text';
const { height, width } = Dimensions.get('window');
var e;
export default class RenderItem extends React.Component {
  constructor(props) {
    super(props)
    e=this;
    this.state = {
      show: false,
      secret_key: '',
      task_id: '',
      showarning: false,
      show1: false,
      notice: '',
      key: ''
    }
    this.deleteApplyjob=this.deleteApplyjob.bind(this)
 socket.on("sv-delete-apply-job", function (data) {
      if (data.success == false) {
        console.log(JSON.stringify(data))
      } else if (data.success == true) {
        e.setState({
          show1: true,
          notice: 'Xóa thành công!',
          key: "success",
        })
        console.log('xoa thanh cong')
      }
    })

  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token')
    this.setState({
      secret_key: token,
    })
  }
  deleteApplyjob () {
    const deleteApply = {
      secret_key:this.state.secret_key,
      task_id:this.props.item._id
    }
    socket.emit("cl-delete-apply-job", deleteApply)
    this.props.parenFlastlist();
  }
  render() {
    const swipeSetting={
      right:[
          {
             onPress:()=>{

             },
             text:'Delete',type:'delete'
          }
         ]
    }
    var task_title = this.props.item.task_title;
      
    var count = task_title.length;

    if (count >= 60) {
        task_title = task_title.slice(0, 60)+"...";
    }
    return (
      <View style={styles.image_container}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.stackToDetail(this.props.item._id)} style={{justifyContent:'center',marginLeft:10,height:55,width:55,backgroundColor:'white', shadowOffset: { width: 0, height: 3 },
          shadowColor: 'green',
          shadowOpacity: 0.5,
          elevation: 10,
          borderColor: '#71B7B7',
          borderRadius: 50}}>
            <Image source={this.props.item.task_owner_avatar?{uri:this.props.item.task_owner_avatar}:null} style={styles.image}/>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.stackToDetail(this.props.item._id)} style={{flexDirection:'column',marginLeft:10,alignItems:'flex-start',width:width-180,justifyContent:'center'}}>
            <Text style={[styles.name,{color:'#2d7474'}]}>{this.props.item.task_type}</Text>
            <View style={{width:width-180}}>
              <Text style={{fontWeight:'bold',fontSize:15}}>{task_title}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{position:'absolute',right:20,top:30}} onPress={()=>this.setState({showarning:true})} >
            <Entypo name="dots-three-vertical" size={24} color="#2d7474" />
        </TouchableOpacity>
        <Modal transparent={true}
          visible={this.state.showarning}
          animationType='slide'
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.show1 === false
              ?
              <View style={{
                backgroundColor: '#faf9f9', borderRadius: 20,
                height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
              }}>
                <Image source={iconwarning} style={{ height: 50, width: 50 }}></Image>
                <AppText i18nKey={'show_notice'}>Do you want to cancel this jobs ?</AppText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%" }}>

                  <TouchableOpacity onPress={() => this.setState({ showarning: false })} style={{
                    width: "50%", backgroundColor: '#ffff',
                    borderWidth: 1, borderColor: '#488B8F',
                    height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5
                  }}>
                    <AppText i18nKey={'cancel'} style={{ color: '#488B8F', fontSize: 15, fontWeight: 'bold' }}>Cancel</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.deleteApplyjob()} style={{
                    width: "50%", backgroundColor: '#488B8F',
                    height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 5
                  }}>
                    <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View style={{
                backgroundColor: '#faf9f9', borderRadius: 20,
                height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
              }}>
                <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                <Text>{this.state.notice}</Text>
                <TouchableOpacity onPress={() => this.setState({ showarning: false, show1: false })} style={{
                  width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                  height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                </TouchableOpacity>
              </View>
            }

          </View>
        </Modal>
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
  name:{
    fontWeight:'bold',
    fontSize:18
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
      width:55,
      height:55,
      borderRadius:50
  }
})