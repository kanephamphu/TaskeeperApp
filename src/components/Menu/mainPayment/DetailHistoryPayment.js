import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import jwt_decode from "jwt-decode";
import { Fontisto } from "@expo/vector-icons";
import _ from "lodash";
import { socket, sockettest } from "../../../Socket.io/socket.io";
const { height, width } = Dimensions.get("window");
var e;
export default class DetailHistoryPayment extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      _id:"",
      emailsender:"",
      emailreceiver:"",
      first_name_sender:"",
      last_name_sender:"",
      phone_number_sender:"",
      description:"",
      money_amount:"",
      transaction_time:"",
      first_name_receiver:"",
      last_name_receiver:"",
      phone_number_receiver:"",
    };
    sockettest.on("sv-get-detail-transaction", function (data) {
      let list = data.result;
      if (data.success == true) {
        e.setState({
          emailsender:list.infoSender.email.current_email,
          emailreceiver:list.infoReciver.email.current_email,
          first_name_sender:list.infoSender.first_name,
          last_name_sender:list.infoSender.last_name,
          phone_number_sender:list.infoSender.phone_number.current_phone_number,
          description:list.infoTransaction.description,
          money_amount:list.infoTransaction.money_amount,
          transaction_time:list.infoTransaction.transaction_time,
          first_name_receiver:list.infoReciver.first_name,
          last_name_receiver:list.infoReciver.last_name,
          phone_number_receiver:list.infoReciver.phone_number.current_phone_number
        })
      } else {
        console.log(data);
      }
    });
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token")
    const decode = jwt_decode(token)
        this.setState({
          _id:decode._id
        })
    const sendReq = {
      _id: this.props.route.params._id,
    };
    sockettest.emit("cl-get-detail-transaction", sendReq);
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#E5E5E5",
          flexDirection: "column",
        }}
      >
        <View style={styles.header0}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Ionicons
              style={{ marginTop: 1 }}
              name="ios-arrow-back"
              size={28}
              color="#2d7474"
            />
          </TouchableOpacity>
          <View style={{ alignItems: "center", width: "93%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "black",
                marginLeft: 15,
                marginTop: -2,
              }}
            >
              Detail Transaction
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#2d7474",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ margin: 10, flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              The transaction was successful
            </Text>
            <Text style={{ fontSize: 14, color: "white" }}>
              Money amount: ${this.state.money_amount}
            </Text>
            <Text style={{ fontSize: 14, color: "white", marginBottom: 15 }}>
              Message: {this.state.description}
            </Text>
            <Text style={{ fontSize: 14, color: "white" }}>
              Transaction made on{" "}
              {
                <Text
                  style={{
                    fontStyle: "italic",
                    textDecorationLine: "underline",
                  }}
                >
                  {new Date(this.state.transaction_time).toLocaleDateString()} {new Date(
                                this.state.transaction_time
                              ).toLocaleTimeString()}
                </Text>
              }
            </Text>
          </View>
          <View style={{ margin: 30 }}>
            <Fontisto name="money-symbol" size={60} color="white" />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 15,
            flexDirection: "column",
          }}
        >
          <View style={{ flexDirection: "row", margin: 10 }}>
            <FontAwesome
              name="send-o"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>
              Information Sender
            </Text>
          </View>
          <View style={{ marginLeft: 40, marginBottom: 15 }}>
            <Text style={{ fontSize: 14, color: "black" }}>{this.state.first_name_sender+" "+this.state.last_name_sender}</Text>
            <Text style={{ fontSize: 14, color: "black" }}>{this.state.phone_number_sender}</Text>
            <Text style={{ fontSize: 14, color: "black" }}>
              {this.state.emailsender}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 15,
            flexDirection: "column",
          }}
        >
          <View style={{ flexDirection: "row", margin: 10 }}>
            <EvilIcons name="location" size={33} color="black" />
            <Text style={{ fontSize: 15, color: "black", fontWeight: "bold" }}>
              Information Receiver
            </Text>
          </View>
          <View style={{ marginLeft: 40, marginBottom: 15 }}>
            <Text style={{ fontSize: 14, color: "black" }}>{this.state.first_name_receiver+" "+this.state.last_name_receiver}</Text>
            <Text style={{ fontSize: 14, color: "black" }}>{this.state.phone_number_receiver}</Text>
            <Text style={{ fontSize: 14, color: "black" }}>
              {this.state.emailreceiver}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            bottom: 0,
            position: "absolute",
            width: "100%",
            height: 90,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          {this.props.route.params.receiver_id === "Company Taskeeper" &&
          this.props.route.params.sender_id === this.state._id ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2d7474",
                width: "90%",
                height: "45%",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={()=>this.props.navigation.navigate("Test")}
            >
              <Text
                style={{
                  margin: 10,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Payment Again
              </Text>
            </TouchableOpacity>
          ) : null}
          {this.props.route.params.sender_id === this.state._id &&
          this.props.route.params.receiver_id !== "Company Taskeeper" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2d7474",
                width: "90%",
                height: "45%",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={()=>this.props.navigation.navigate("Setamount")}
            >
              <Text
                style={{
                  margin: 10,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Payment Again
              </Text>
            </TouchableOpacity>
          ) : null}
          {this.props.route.params.sender_id !== this.state._id ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#2d7474",
                width: "90%",
                height: "45%",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={()=>this.props.navigation.navigate("Setamount")}
            >
              <Text
                style={{
                  margin: 10,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Payment Again
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header0: {
    ...Platform.select({
      ios: {
        height: height * 0.1,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop: 15,
        backgroundColor: "white",
        paddingTop: 36,
        flexDirection: "row",
      },
      android: {
        height: height * 0.1,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop: 20,
        backgroundColor: "white",
        flexDirection: "row",
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
});
