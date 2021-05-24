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
import {socket} from "../../../Socket.io/socket.io";
import noitem from '../../../images/box.png';
import {connect} from 'react-redux';
import RenderItem  from './RenderItem';
import * as actions from '../../../actions';
const { width, height } = Dimensions.get("window");
var e;
class Savetask extends React.Component {
  constructor(props) {
    super(props)
    e = this;
    this.state = {
      secret_key: '',
      deleteRowkey: null,
      isLoading: false,
      refeshing: false,
      dataSave: [],
    }
    this.onDetail=this.onDetail.bind(this);
   socket.on("sv-get-saved-task", (data)=> {
      
      this.props.getAllSave(data.data);
     
  })
    this.refreshFlatlist = this.refreshFlatlist.bind(this);
  };
  refreshFlatlist = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({
      secret_key: token,
    })
    const apply = {
      secret_key: this.state.secret_key,
      number_task: 10,
      skip: 1
    }
    socket.emit("cl-get-saved-task", apply);
  }
  componentDidMount = async () => {
    this.refreshFlatlist()
  }
  onDetail(_id){
    this.props.navigation.navigate('Detailmenu',{_task_id: _id})
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header0}>
            <TouchableOpacity style={{ width:'7%' }} onPress={() => this.props.navigation.navigate("Menu")}>
              <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={25} color="#ffff" />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white', marginLeft: '20%', marginTop: -2 }}>List Task Save</Text>
           
        </View>
        {this.props.onstatus === true ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large'></ActivityIndicator>
          </View>
          :
          this.props.save.length === 0 ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={noitem} style={{ height: 100, width: 100 }}></Image>
              <Text>No item</Text>
            </View>
            :
            <View style={styles.flatlist}>
              <FlatList data={ this.props.save}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      <RenderItem item={item} index={index} parenFlastlist={this.refreshFlatlist} detail={this.onDetail} onDelete1={this.props.onDelete}></RenderItem>
                    </View>
                  )
                }}
                keyExtractor={(item) => item._id.toString()}
                ItemSeparatorComponent={this.ItemSeparatorComponent}
                showsHorizontalScrollIndicator={false}
              >
              </FlatList>
            </View>
        }

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      status:state.status,
      save:state.save.data,
      onstatus:state.save.isLoading
  }
}
const mapDispatchProps=(dispatch,props)=>{
  return {
    getAllSave:(data)=>{
          dispatch(actions.getAllSave(data));
      },
      onStatus:()=>{
          dispatch(actions.onStatus());
      },
      onDelete:(id)=>{
        dispatch(actions.deleteSave(id));
      }
  }
}
export default connect(mapStateToProps,mapDispatchProps)(Savetask)
const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  },
  image_container: {
    flexDirection: 'row',
    marginTop: 10, height: 80, width: width - 80, justifyContent: 'space-between',
    backgroundColor: 'rgba(200,200,200,0.3)',
    borderRadius: 10
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
    ...Platform.select({
      ios: {
        height: height * 0.11,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 7,
        backgroundColor:'#289696' ,
        alignItems:'center',
        borderBottomEndRadius:200,
        borderEndWidth:10,
        borderEndColor:'#2d7474',
        borderBottomStartRadius:20,
        flexDirection: 'row'
      },
      android: {
        height: height * 0.07,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 7,
        backgroundColor:'#289696' ,
        alignItems:'center',
        borderBottomEndRadius:200,
        borderEndWidth:10,
        borderEndColor:'#2d7474',
        borderBottomStartRadius:20,
        flexDirection: 'row'
      },
      default: {
        // other platforms, web for example
      }
    })
  }
})