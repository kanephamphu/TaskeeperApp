import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, Modal,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import iconsuccess from '../../../images/checked.png';
import iconerror from '../../../images/close.png';
import iconwarning from '../../../images/warning.png';
import noitem from '../../../images/box.png';
import {connect} from 'react-redux';
import {socket} from "../../../Socket.io/socket.io";
import * as actions from '../../../actions';
import { FontAwesome5 } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
class RenderItem extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        show: false,
        secret_key: '',
        _id: '',
        showarning: false,
        show1: false,
        notice: '',
        key: ''
      }
   
    socket.on("sv-remove-saved-task",  (data)=> {
        if (data.success == false) {
          console.log(JSON.stringify(data))
        } else if (data.success == true) {
          this.setState({
            show1: true,
            notice: 'Deleted successfully!',
            key: "success",
          })
         
        }
        
      })
  
    }
    componentDidMount = async () => {
      const token = await AsyncStorage.getItem('token')
      this.setState({
        secret_key: token,
      })
    }
    deleteTasksave= () => {
      const deleteSave = {
        secret_key: this.state.secret_key,
        task_saved_id: this.props.item._id,
      }
     socket.emit("cl-remove-saved-task", deleteSave);
    }
    render() {
      var task_title = this.props.item.task_title;
     
      var count = task_title.length;
     
      if (count >= 25) {
          task_title = task_title.slice(0, 20)+"...";
      }
      return (
        <View style={{marginLeft:15}}>
          <Text style={{fontSize:16, fontWeight:'bold'}} >{new Date(this.props.item.saved_time).toLocaleDateString()}</Text>
        <View style={styles.image_container}>
          <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
              <FontAwesome5 name="history"  size={35} color="#009387" />
            </View>
            <View>
              <View style={{ flexDirection: 'column', marginLeft: 10, alignItems: 'flex-start', width: width - 200 }}>
                <TouchableOpacity onPress={() =>this.props.detail(this.props.item.task_id)}>
                  <Text style={styles.company}>{task_title}</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 1, flexDirection: 'row' }}>
                  <View style={{  }}>
                    <Text >{new Date(this.props.item.saved_time).toLocaleTimeString()}</Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{marginLeft:'10%'}} onPress={() => this.setState({ showarning: true })}>
              <Entypo name="dots-three-vertical" size={24} color="#009387" />
            </TouchableOpacity>
          </View>
  
  
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
                  <Text>Do you want to cancel this jobs ?</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%" }}>
  
                    <TouchableOpacity onPress={() => this.setState({ showarning: false })} style={{
                      width: "50%", backgroundColor: '#ffff',
                      borderWidth: 1, borderColor: '#488B8F',
                      height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5
                    }}>
                      <Text style={{ color: '#488B8F', fontSize: 15, fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteTasksave()} style={{
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
                  <TouchableOpacity onPress={() =>  this.props.onDelete(this.props.item._id)} style={{
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
        </View>
  
      )
    }
  }
  const mapStateToProps = (state) => {
    return {
       
    }
  }
  const mapDispatchProps=(dispatch,props)=>{
    return {
        onDelete:(id)=>{
          dispatch(actions.deleteSave(id));
        }
    }
  }
export default connect(mapStateToProps,mapDispatchProps)(RenderItem);
const styles = StyleSheet.create({
    flatlist: {
      flex: 1,
      alignItems: 'center'
    },
    container: {
      flex: 1,
      justifyContent: 'center', alignItems: 'center'
    },
    image_container: {
      flexDirection: 'row',
      marginTop: 5, height: 80, width: width * 0.92, justifyContent: 'space-between',
      backgroundColor: 'rgba(200,200,200,0.3)',
      borderRadius: 10,
      
    },
    time: {
      fontWeight: 'bold',
      fontSize: 19,
      color: '#2d7474'
  
    },
    company: {
      fontWeight: 'bold',
      fontSize: 18,
  
  
    },
    position: {
      fontSize: 16
    },
    rating: {
      marginTop: 5,
      flexDirection: 'row'
    },
    container: {
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
    header0: {
      height: height * 0.15,
      shadowOffset: { width: 0, height: 3 },
      paddingLeft: 10,
      paddingTop: 15,
      backgroundColor: '#faf9f9',
  
    },
  })