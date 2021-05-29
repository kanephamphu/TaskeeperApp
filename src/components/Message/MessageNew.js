import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import jwt_decode from "jwt-decode";
import { GiftedChat } from "react-native-gifted-chat";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import io from "socket.io-client/dist/socket.io";
const { height, width } = Dimensions.get("window");
import { socket, sockettest } from "../../Socket.io/socket.io";
import { TransferWithinAStationSharp } from "@material-ui/icons";
var e;
class Message extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      // message: 'asas',
      message: "",
      dataMessage: [],
      color: "green",
      isLoadingEarlier: false,
      secret_key: "",
      avatar: "",
      _id: "",
      first_name: "",
      last_name: "",
    };
    this.onsend = this.onSend.bind(this);

    sockettest.on("chat-one-messages", (mes) => {
      this.setState({ dataMessage: [...this.state.dataMessage, mes] });
    });
    sockettest.on("chat-messages", (data) => {
      this.setState({ dataMessage: data });
    });
  }
  // handleSend(message) {
  //   const write = message.map((m) => chatsRef.add(m))
  //   Promise.all(write)
  // }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token");
    const decode = jwt_decode(token);
    this.setState({
      secret_key: token,
      _id: decode._id,
      avatar: decode.avatar,
      first_name: decode.first_name,
      last_name: decode.last_name,
    });
    sockettest.emit("get-messages", {
      receiver_id: this.props.route.params.receiver_id,
      user_id: decode._id,
    });
    //5f2ac6648e857e00041dc2b9
  };
  s4() {
    return Math.random((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  createID = () => {
    return this.s4() + this.s4() + "-" + this.s4();
  };
  onLoadEarlier = () => {
    e.setState({ isLoadingEarlier: true }, () => {
      e.setState({ isLoadingEarlier: false });
    });
  };
  onSend = (data = []) => {
    const send = {
      _id: this.createID(),
      receiver_id: this.props.route.params.receiver_id,
      first_name: this.props.route.params.first_name,
      last_name: this.props.route.params.last_name,
      avatar_receiver: this.props.route.params.avatar,
      text: data[0].text,
      createdAt: new Date(),
      user: {
        _id: this.state._id,
        first_name: this.state.first_name,
        last_name:this.state.last_name,
        avatar: this.state.avatar,
      },
    };
    sockettest.emit("chat-message", send);
  };
  onListMess=async()=>{
    const token = await AsyncStorage.getItem("token");
    const decode = jwt_decode(token)
    const setread={
      userId:decode._id,
      receiver_id:this.props.route.params.receiver_id
    }
    sockettest.emit("cl-set-readed-message",setread)
    const sendID_Message = {
      userId: decode._id,
    };
    sockettest.emit("cl-get-list-message", sendID_Message);
  }
  render() {
    let listnew = _.orderBy(this.state.dataMessage, ["createdAt"], ["desc"]);
    return (
      <View style={styles.container}>
        <View style={styles.header0}>
          <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 10 }}>
            <TouchableOpacity onPress={() => {this.props.navigation.goBack();this.onListMess()}}>
              <Ionicons
                style={{ marginTop: 9, marginLeft: 5 }}
                name="ios-arrow-back"
                size={28}
                color="#faf9f9"
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                width: 300,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 25, color: "#2d7474" }}>
                {this.props.route.params.first_name +
                  " " +
                  this.props.route.params.last_name}
              </Text>
            </View>

            <View style={{ marginLeft: 30, marginTop: 8 }}>
              <TouchableOpacity>
                <Entypo name="dots-three-vertical" size={22} color="#faf9f9" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <GiftedChat
          scrollToBottom
          infiniteScroll
          alwaysShowSend
          renderUsernameOnMessage
          inverted={true}
          loadEarlier={true}
          renderAvatarOnTop
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          alwaysShowSend={true}
          messages={listnew}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state._id,
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            name: this.state.first_name+" "+this.state.last_name
          }}
        ></GiftedChat>
      </View>
    );
  }
}
export default Message;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf9f9",
  },
  textTitle: {
    fontWeight: "bold",
    color: "#71B7B7",
    fontSize: 20,
  },
  header_inner: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    marginLeft: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#e4e6eb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBulliten: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: 90,
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: -30,
    marginRight: 25,
    backgroundColor: "#ffff",
    shadowColor: "green",
    shadowOpacity: 0.1,
    elevation: 4,
    borderColor: "#71B7B7",
  },
  header0: {
    height: height * 0.13,
    backgroundColor: "rgba(113, 183, 183, 0.3)",
  },
});
