import React from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, Image, Dimensions, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout'
const { height, width } = Dimensions.get('window');
export default class RenderItem extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
    this.state = {
      show: false,
      secret_key: '',
      task_id: '',
    }
    this.socket.on("sv-delete-apply-job", function (data) {
      if (data.success == false) {
        console.log(JSON.stringify(data))
        console.log('that bai')
      } else {
        console.log('xoa thanh cong')
        /* Alert.alert('','Delete success',[
           {text:'Yes'}
         ],{cancelable:true})*/
      }
    })

  }
  componentDidMount = async () => {
   this.props.parenFlastlist();
  }
  deleteApplyjob = async () => {
    const token = await AsyncStorage.getItem('token')
    const deleteApply = {
      secret_key: token,
      task_id:this.props.item._id
    }
    this.socket.emit("cl-delete-apply-job", deleteApply)
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

 if (count >= 25) {
     task_title = task_title.slice(0, 20)+"...";
 }
    return (
      <View style={styles.image_container}>
        <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
        <View style={{ justifyContent: 'center'}}>
          <AntDesign name="clockcircleo" size={35} color="#009387" />
        </View>
        <View>
          <View style={{ flexDirection: 'column', marginLeft: 20, alignItems: 'flex-start'}}>
            <View>
              <Text style={styles.time}>{this.props.item.task_type}</Text>
            </View>
            <View>
              <Text style={styles.company}>{task_title}</Text>
            </View>
          </View>
        </View>
        </View>
       
        <TouchableOpacity onPress={() => Alert.alert(
          '',
          'Do you want to cancel this jobs ?', [
          { text: 'No', onPress: () => console.log('cancel'), style: 'cancle' }, { text: 'Yes', onPress: () => this.deleteApplyjob()  }
        ], { cancelable: true }
        )}  >
          <Entypo name="dots-three-vertical" size={24} color="#009387" />
        </TouchableOpacity>
       
      </View>
     
    )
   
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#faf9f9'
  },
  flatlist: {
    flex: 1,
    alignItems: 'center'
  },
  image_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    height: 90,
    width:width-100,
    backgroundColor: 'rgba(200,200,200,0.3)',
    margin: 20,
    justifyContent: 'space-between'
  },
  time: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#2d7474'

  },
  header0: {
    height: height * 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS == 'android' ? 25 : null,
  },
  company: {
    fontWeight: 'bold',
    fontSize: 18

  },
  position: {
    fontSize: 16
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row'
  }
})