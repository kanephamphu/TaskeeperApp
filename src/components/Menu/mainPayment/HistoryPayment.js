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
export default class HistoryPayment extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.onDetailHistoryPayment=this.onDetailHistoryPayment.bind(this)
    this.state = {
      datanew: [],
      _id: "",
      datacheck: [],
      refreshing: false,
    };
    // socket.on("sv-get-money-transaction-history", function (data) {
    //   if (data.success == true) {
    //     let listnew = _.orderBy(data.data, ["transaction_time"], ["desc"]);
    //     e.setState({ datanew: listnew });
    //   } else {
    //     console.log(data);
    //   }
    // });
    sockettest.on("sv-get-history-payment", function (data) {
      let list = data.data;
      if (data.success == true) {
        e.setState({ datacheck: list });
      } else {
        // console.log(data);
      }
    });
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token");
    const decode = jwt_decode(token);
    this.setState({
      _id: decode._id,
    });
    // const historypayment = {
    //   secret_key: token,
    //   skip: 0,
    // };
    // socket.emit("cl-get-money-transaction-history", historypayment);
    const historypaymentcheck = {
      user_id: this.state._id,
      email: this.props.route.params.email,
      number_transaction: 30,
      skip: 0,
    };
    sockettest.emit("cl-get-history-payment", historypaymentcheck);
  };
  refreshTop() {
    this.componentDidMount();
  }
  onDetailHistoryPayment(_id,receiver_id,sender_id){
    this.props.navigation.navigate("DetailHistoryPayment",{_id:_id,receiver_id:receiver_id,sender_id:sender_id})
  }
  render() {
    let listnew = _.orderBy(
      this.state.datacheck.data,
      ["transaction_time"],
      ["desc"]
    );
    console.log(listnew)
    return (
      <View style={styles.container}>
        <View style={styles.header0}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              style={{ marginTop: 1 }}
              name="ios-arrow-back"
              size={28}
              color="#2d7474"
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "black",
                marginLeft: 15,
                marginTop: -2,
              }}
            >
              History Transaction
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={listnew}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.refreshTop();
            }}
            renderItem={({ item, index }) => {
              return (
                <View key={item._id}>
                  <View style={styles.timeheader}>
                    <Text>
                      {new Date(item.transaction_time).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.search_item}>
                    <TouchableOpacity onPress={()=>this.onDetailHistoryPayment(item._id,item.receiver_id,item.sender_id)} style={{ flexDirection: "row" }}>
                      <View style={{ justifyContent: "center" }}>
                        <Foundation name="print" size={26} color="#71B7B7" />
                      </View>
                      <View style={{ flexDirection: "column", marginLeft: 30 }}>
                        <View>
                          {item.receiver_id === "Company Taskeeper" &&
                          item.sender_id === this.state._id ? (
                            <Text style={styles.text}>Đã nộp</Text>
                          ) : null}
                          {item.sender_id === this.state._id &&
                          item.receiver_id !== "Company Taskeeper" ? (
                            <Text style={styles.text}>Chuyển đi</Text>
                          ) : null}
                          {item.sender_id !== this.state._id ? (
                            <Text style={styles.text}>Chuyển đến</Text>
                          ) : null}
                        </View>
                        <View>
                          <Text>Tin Nhắn: {item.description}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ marginRight: 10 }}>
                            <Text>
                              {new Date(
                                item.transaction_time
                              ).toLocaleDateString()}
                            </Text>
                          </View>
                          <View>
                            <Text>
                              {new Date(
                                item.transaction_time
                              ).toLocaleTimeString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <Text> + {item.money_amount}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item._id.toString()}
          ></FlatList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf9f9",
  },
  flatlist: {
    flex: 1,
  },
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
  timeheader: {
    backgroundColor: "rgba(92, 141, 137, 0.5)",
    height: height * 0.04,
    paddingLeft: 20,
    justifyContent: "center",
  },
  search_item: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginLeft: 16,
    margin: 10,
    justifyContent: "space-between",
  },
  image_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    borderRadius: 10,
    height: 90,
    width: 350,
    backgroundColor: "rgba(200,200,200,0.3)",
  },
  time: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#2d7474",
  },

  company: {
    fontWeight: "bold",
    fontSize: 18,
  },
  position: {
    fontSize: 16,
  },
  rating: {
    marginTop: 5,
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
