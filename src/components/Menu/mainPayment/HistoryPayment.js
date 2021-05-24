import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import jwt_decode from "jwt-decode";
import { socket } from "../../../Socket.io/socket.io";
const { height, width } = Dimensions.get("window");
var e;
export default class HistoryPayment extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      datanew: [],
      _id: "",
    };
    socket.on("sv-get-money-transaction-history", function (data) {
      if (data.success == true) {
        let listnew = _.orderBy(data.data, ["transaction_time"], ["desc"]);
        e.setState({ datanew: listnew });
      } else {
        console.log(data);
      }
    });
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("token");
    const decode = jwt_decode(token);
    this.setState({
      _id: decode._id,
    });
    const historypayment = {
      secret_key: token,
      skip: 0,
    };
    socket.emit("cl-get-money-transaction-history", historypayment);
  };
  
  render() {
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
              color="black"
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
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
            data={this.state.datanew}
            renderItem={({ item, index }) => {
              return (
                <View key={item._id}>
                  <View style={styles.timeheader}>
                    <Text>{new Date(item.transaction_time).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.search_item}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ justifyContent: 'center'}}>
                        <Foundation name="print" size={26} color="#71B7B7" />
                      </View>
                      <View style={{ flexDirection: "column", marginLeft: 30 }}>
                        <View>
                          <Text style={styles.text}>
                            {item.sender_id == this.state._id ? "Chuyển đi":"Chuyển đến"}
                          </Text>
                        </View>
                        <View>
                          <Text >
                            Tin Nhắn: {item.description}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <Text>{new Date(item.transaction_time).toLocaleDateString()}</Text>
                                </View>
                                <View>
                                    <Text>{new Date(item.transaction_time).toLocaleTimeString()}</Text>
                                </View>

                            </View>
                      </View>
                    </View>
                    <View>
                      <Text> {item.sender_id == this.state._id ? `-${item.money_amount}`: `+${item.money_amount}`}</Text>
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
    height: height * 0.1,
    shadowOffset: { width: 0, height: 3 },
    paddingLeft: 10,
    paddingTop: 15,
    backgroundColor: "#add2c9",
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
