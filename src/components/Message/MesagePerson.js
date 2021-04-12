import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import jwt_decode from 'jwt-decode'
import { GiftedChat } from 'react-native-gifted-chat'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
const { height, width } = Dimensions.get('window');
import {socket} from "../../Socket.io/socket.io";
var e;
class Message extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      message: 'asas',
      data: []
      ,
      isLoading: true,
      refeshing: false,
      secret_key: '',
      _id: ''
    }
    this.onsend = this.onSend.bind(this);

   socket.on("sv-send-message", function (data) {
      if (data.success == false) {
        console.log(JSON.stringify(data))
      } else {
        console.log(JSON.stringify(data))
      }
    })
  socket.on("sv-get-private-message", function (data) {
      if (data.success == true) {
        var list = data.data
        e.setState({
          data: list
        })
        console.log(JSON.stringify(list))
      } else if (data.success == false) {
        console.log(JSON.stringify(data))
      }
    })
  }
  handleSend(message) {
    const write = message.map((m) => chatsRef.add(m))
    Promise.all(write)
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token")
    const decode = jwt_decode(token)
    this.setState({
      secret_key: token,
      _id: decode._id,
    })
    const loadMessage = {
      secret_key: this.state.secret_key,
      receiver_id:'5f2ac6648e857e00041dc2b9',
      skip: 0
    }
    socket.emit("cl-get-private-message", loadMessage)
    console.log(JSON.stringify(loadMessage))
  }
  onSend(data = []) {
    const newtext = {
      secret_key: this.state.secret_key,
      receiver_id: '5f2ac6648e857e00041dc2b9',
      text: data[0].text
    }
    socket.emit("cl-send-message", newtext)
    console.log(JSON.stringify(newtext))
    this.setState((previousState) => {
      return {
        data: GiftedChat.append(data,previousState.data)
      }
    })
  }
  render() {
    const { receiver_id} = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.header0}>
          <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons style={{ marginTop: 1, marginLeft: 5 }} name="ios-arrow-back" size={28} color="#faf9f9" />
            </TouchableOpacity>
            <View style={{
              flexDirection: 'column', width: 300,
              justifyContent: 'center', alignItems: 'center', marginLeft: 20
            }}>
              <Text style={{ fontSize: 25, color: '#2d7474' }}>NGuyen Minh Nha</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 3 }}>
                  <Octicons name="primitive-dot" size={22} color="green" />
                </View>
                <Text>Online</Text>
              </View>
            </View>

            <View style={{ marginLeft: 30, marginTop: 8 }}>
              <TouchableOpacity>
                <Entypo name="dots-three-vertical" size={22} color="#faf9f9" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 30, backgroundColor: '#faf9f9', justifyContent: 'center', alignItems: 'center' }}>
          <Text>10:25,08 Sep</Text>
        </View>

        <GiftedChat   alwaysShowSend={true} messages={this.state.data}  onSend={(messages) => this.onSend(messages)
              }
           user={{
            _id: this.state._id,
          }} >

        </GiftedChat>



      </View>
    );
  }
}
export default Message;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#71B7B7',
    fontSize: 20
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  header: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 5, marginBottom: 10
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBulliten: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: 90,
    alignItems: 'center',
    paddingLeft: 5,
    marginBottom: -30,
    marginRight: 25,
    backgroundColor: '#ffff',
    shadowColor: 'green',
    shadowOpacity: 0.1,
    elevation: 4,
    borderColor: '#71B7B7'
  },
  header0: {
    height: height * 0.13,
    backgroundColor: 'rgba(113, 183, 183, 0.3)',

  },
})