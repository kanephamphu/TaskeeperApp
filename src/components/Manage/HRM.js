import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import io from "socket.io-client/dist/socket.io";
import AsyncStorage from "@react-native-community/async-storage";
import jwt_decode from "jwt-decode";
import avatarimage from "../../images/avatar11.png";
import { connect } from "react-redux";
import {socket} from "../../Socket.io/socket.io";
import * as actions from "../../actions";
import AppText from '../app-text';
const { height, width } = Dimensions.get("window");
var e;
class HRM extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      secret_key: "",
      number_task: 10,
      skip: 10,
      refreshing: false,
      loadingdata: false,
      dataTask: [],
      test: "",
    };
    socket.on("sv-get-task-manage", (data)=> {
      this.props.getAllHRM(data.data)
  })
  }
  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("token");
    const decode = jwt_decode(token);
    this.setState({
      secret_key: token,
    });
    const task = {
      secret_key: token,
      number_task: this.state.number_task,
      skip: 0,
    };
    socket.emit("cl-get-task-manage", task);
  };
  refreshTop() {
    this.componentDidMount();
  }
  renderFooter() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.onstatus === true ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        ) : this.props.hrm.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffff",
            }}
          >
            <AppText i18nKey={'home_manage.blank_show'}>Blank task apply list</AppText>
          </View>
        ) : (
          <View style={styles.flatlist}>
            <FlatList
              data={this.props.hrm}
              renderItem={({ item, index }) => {
                return (
                  <RenderItem
                    stackScreen={this.props.stack}
                    item={item}
                    index={index}
                  ></RenderItem>
                );
              }}
              ListFooterComponent={
                this.props.test === true ? this.renderFooter : null
              }
              keyExtractor={(item) => item._id.toString()}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
              showsHorizontalScrollIndicator={false}
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.refreshTop();
              }}
            ></FlatList>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hrm: state.hrm.data,
    onstatus:state.hrm.isLoading,
    test:state.hrm.test
  };
};
const mapDispatchProps = (dispatch, props) => {
  return {
    getAllHRM: (data) => {
      dispatch(actions.getAllHrm(data));
    },
  };
};
export default connect(mapStateToProps,mapDispatchProps)(HRM);
class RenderItem extends React.Component {
  render() {
    var d = new Date();
    var task_title = this.props.item.task_title;
    if (task_title.length >= 40) {
      task_title = task_title.slice(0, 40) + "...";
    }
    return (
      <View style={styles.image_container}>
        <TouchableOpacity
          onPress={() => this.props.stackScreen(this.props.item._id)}
          style={{
            justifyContent: "center",
            marginLeft: 10,
            height: 55,
            width: 55,
            backgroundColor: "white",
            shadowOffset: { width: 0, height: 3 },
            shadowColor: "green",
            shadowOpacity: 0.5,
            elevation: 10,
            borderColor: "#71B7B7",
            borderRadius: 50,
          }}
        >
          <Image
            source={
              this.props.item.task_owner_avatar
                ? { uri: this.props.item.task_owner_avatar }
                : avatarimage
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={{ width: width - 140 }}>
          <View style={{ width: width - 140 }}>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 20,
                marginTop: 10,
                alignItems: "flex-start",
                width: 170,
              }}
            >
              <View style={{ width: width - 160 }}>
                <TouchableOpacity
                  onPress={() => this.props.stackScreen(this.props.item._id)}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Create time: </Text>
                    <Text style={{ fontStyle: "italic" }}>
                      {new Date(
                        this.props.item.created_time
                      ).toLocaleTimeString()}{" "}
                    </Text>
                    <Text>
                      {new Date(
                        this.props.item.created_time
                      ).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.position}>{task_title}</Text>
                </TouchableOpacity>
                {new Date(this.props.item.created_time).toLocaleDateString() ==
                d.toLocaleDateString() ? (
                  <>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: "red",
                        top: 0,
                        right: 0,
                        position: "absolute",
                      }}
                    >
                      (new)
                    </Text>
                  </>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#faf9f9",
  },
  flatlist: {
    flex: 1,
    alignItems: "center",
  },
  image_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 10,
    width: width - 60,
    backgroundColor: "rgba(200,200,200,0.3)",
    margin: 10,
  },
  time: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#2d7474",
  },
  header0: {
    height: height * 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS == "android" ? 25 : null,
  },
  position: {
    fontWeight: "bold",
    fontSize: 18,
  },
  amount: {
    fontSize: 16,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});
