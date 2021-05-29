import React, { Component } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { socket,sockettest } from "../../../Socket.io/socket.io";
import AsyncStorage from '@react-native-community/async-storage';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
export default class Setamount extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      searchString: "",
      static:0,
      amount:"",
      _id:"",
      message:"",
      check:""
    };
    this.onCheckMail = this.onCheckMail.bind(this)
    socket.on("sv-money-transfer-request", function (data) {
      if(data.success==true){
        e.setState({
          searchString: "",
          static:0,
          amount:"",
          _id:"",
          message:"",
          check:""
        })
        alert("Transfer Success")
      }
      console.log(data)
    })
    sockettest.on("sv-get-id-by-email",function (data) {
      if(data.success==true){
        e.setState({
          _id:data.data._id,
          check:true
        })
      }
      if(data.success==false){
        e.setState({
          check:false
        })
      }
    })
  }
  onTransferRequest = async () => {
    const token = await AsyncStorage.getItem("token");
    if(this.state.searchString==""){
      alert("Email not filled in");
    }
    else if(this.state.check===""){
      alert("Check mail please!!!");
    }
    else if(this.state.amount==""){
      alert("Amount not filled in");
    }
    else if(this.state.message==""){
      alert("Message not filled in");
    }
    else if(this.state.check===false){
      alert("Mail error, check again!");
    }
    else{
      const request = {
        secret_key: token,
        receiver_id: this.state._id,
        money_amount: this.state.amount,
        description: this.state.message,
      };
      socket.emit("cl-money-transfer-request", request);
      console.log(request);
    }
  };
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.search_item}>
          <Text>{first_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  onCheckMail(){
    const checkmail={
      email:this.state.searchString
    }
    sockettest.emit("cl-get-id-by-email",checkmail)
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
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
              style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}
            >
              Set Amount
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 18 }}>
              How much good you like to send?
            </Text>
          </View>
          <View>
            <View style={{ zIndex: 1 }}>
              <>
              <TextInput
                style={styles.input}
                placeholder={"Email (Check your mail before transfer!)"}
                placeholderTextColor={"#cccc"}
                underlineColorAndroid="transparent"
                onChangeText={(searchString) => this.setState({searchString})}
                value={this.state.searchString}
              >
              </TextInput>
              <View>
              {this.state.check===true?<Octicons style={{position:'absolute',right:30,top:-30}} name="check" size={24} color="#2d7474" />:null}
                {this.state.check===false?<MaterialCommunityIcons style={{position:'absolute',right:30,top:-30}} name="window-close" size={24} color="red" />:null}
                {this.state.check===false?<Text style={{position:'absolute',color:'red',left:40}}>email does not exist</Text>:null}
              </View>
              </>
              <TextInput
                style={styles.input}
                placeholder={"Amount (VND)"}
                placeholderTextColor={"#cccc"}
                underlineColorAndroid="transparent"
                value={this.state.amount}
                onChangeText={(amount)=>this.setState({amount,status:0})}
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder={"Message (up to 200 characters)"}
                placeholderTextColor={"#cccc"}
                underlineColorAndroid="transparent"
                multiline={true}
                value={this.state.message}
                onChangeText={(message)=>this.setState({message})}
              ></TextInput>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Quick Actions
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "70%",
              }}
            >
              {this.state.status==1?
              <TouchableOpacity onPress={()=>this.setState({amount:"1",status:1})} style={[styles.menhgia1,{backgroundColor:'#2d7474'}]}>
                <Text style={[styles.textmoney,{color:'white'}]}>1</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>this.setState({amount:"1",status:1})} style={styles.menhgia1}>
                <Text style={styles.textmoney}>1</Text>
              </TouchableOpacity>}
              {this.state.status==2?
              <TouchableOpacity onPress={()=>this.setState({amount:"2",status:2})} style={[styles.menhgia,{backgroundColor:'#2d7474'}]}>  
                <Text style={[styles.textmoney,{color:'white'}]}>2</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>this.setState({amount:"2",status:2})} style={styles.menhgia}>  
                <Text style={styles.textmoney}>2</Text>
              </TouchableOpacity>
              }
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "70%",
                marginTop: 15,
              }}
            >
              {this.state.status==5?
              <TouchableOpacity onPress={()=>this.setState({amount:"5",status:5})} style={[styles.menhgia1,{backgroundColor:'#2d7474'}]}>
                <Text style={[styles.textmoney,{color:'white'}]}>5</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>this.setState({amount:"5",status:5})} style={styles.menhgia1}>
                <Text style={styles.textmoney}>5</Text>
              </TouchableOpacity>}
              {this.state.status==10?
              <TouchableOpacity onPress={()=>this.setState({amount:"10",status:10})} style={[styles.menhgia,{backgroundColor:'#2d7474'}]}>  
                <Text style={[styles.textmoney,{color:'white'}]}>10</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>this.setState({amount:"10",status:10})} style={styles.menhgia}>  
                <Text style={styles.textmoney}>10</Text>
              </TouchableOpacity>
              }
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "70%",
                marginTop: 15,
              }}
            >
               {this.state.status==20?
              <TouchableOpacity onPress={()=>this.setState({amount:"20",status:20})} style={[styles.menhgia1,{backgroundColor:'#2d7474'}]}>
                <Text style={[styles.textmoney,{color:'white'}]}>20</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>this.setState({amount:"20",status:20})} style={styles.menhgia1}>
                <Text style={styles.textmoney}>20</Text>
              </TouchableOpacity>}
              {this.state.status==50?
              <TouchableOpacity onPress={()=>this.setState({amount:"50",status:50})} style={[styles.menhgia,{backgroundColor:'#2d7474'}]}>  
                <Text style={[styles.textmoney,{color:'white'}]}>50</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>this.setState({amount:"50",status:50})} style={styles.menhgia}>  
                <Text style={styles.textmoney}>50</Text>
              </TouchableOpacity>
              }
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={()=>this.onCheckMail()}
              style={{
                height: 40,
                width: 150,
                borderRadius: 5,
                backgroundColor: "#ffff",
                borderWidth: 1,
                marginRight: 10,
                borderColor: "#488B8F",
                
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "#488B8F", fontSize: 18 }}
              >
                Check Mail
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 150,
                backgroundColor: "#488B8F",
                marginLeft: 10,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => this.onTransferRequest()}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                Transfer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: "#faf9f9",
      },
      android: {
        flex: 1,
        backgroundColor: "#faf9f9",
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
  viewmini: {
    height: 50,
    width: 65,
    borderRadius: 5,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  header0: {
    ...Platform.select({
      ios: {
          height: height * 0.1,
          shadowOffset: { width: 0, height: 3 },
          paddingLeft: 10,
          paddingTop: 15,
          backgroundColor: "#add2c9",
          paddingTop:36
      },
      android: {
        height: height * 0.1,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop: 15,
        backgroundColor: "#add2c9",
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  body: {
    justifyContent: "center",
  },
  menhgia: {
    width: 100,
    height: 40,
    borderWidth: 1,
    marginLeft: 20,
    borderColor: "#2d7474",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  menhgia1: {
    width: 100,
    height: 40,
    borderWidth: 1,
    marginRight: 20,
    borderColor: "#2d7474",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textmoney: {
    fontWeight: "bold",
  },
  input: {
    width: width - 50,
    height: 40,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: -10,
    color: "#2d7474",
    marginHorizontal: 25,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#2d7474",
  },

  iconview: {
    position: "absolute",
    bottom: 7,
    right: 6,
  },
});
