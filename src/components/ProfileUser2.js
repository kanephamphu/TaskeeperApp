import  React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Animated,ScrollView,Dimensions } from 'react-native';
import {Avatar} from 'react-native-paper';
import io from 'socket.io-client/dist/socket.io'
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
const {height,width} =Dimensions.get('window');
var e;
export default class ProfileUser extends React.Component {
  constructor(props){
    super(props)
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state={
      _user_id:'',
      first_name:'',
      last_name:'',
      email:'',
      phone_number:'',
      skill:'',
      education:'',
    }
    this.socket.on("sv-user-detail",function(data){
      var list=data.data
      if(data.success==true){
        e.setState({
          email:list.email.current_email,
          last_name:list.last_name,
          first_name:list.first_name,
          phone_number:list.phone_number.current_phone_number,
        })
      }else{
        console.log(data.erro)
      }
    })
  }
  componentDidMount= async()=>{
    const token= await AsyncStorage.getItem('token')
    const decode =jwt_decode(token)
    const detail={
      _user_id:decode._id
    }
    this.socket.emit("cl-user-detail",detail)
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.header0}> 
            <TouchableOpacity  style={{flexDirection:'row'}}onPress={()=>this.props.navigation.navigate("Menu")}>
                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#2d7474" />
                <Text style={{fontWeight:'bold',fontSize:25,color:'#2d7474',marginLeft:15,marginTop:-2}}>Profile</Text>
            </TouchableOpacity>
        </View>   
         

        <ScrollView >
          <Animated.View
           style={{alignItems:'center'}}
          >
             <Avatar.Image
              source={{
                uri: 'https://api.adorable.io/avatars/80/'
              }} 
              size={100}
            />
            <Text style={{fontSize:30, fontWeight:'bold'}}>Lê Ngân</Text>
            <Text style={{fontSize:20}}>Business Analyst</Text>
            <View style={{flexDirection:'row', marginTop:20, marginBottom:20}}>
                <Text style={styles.fonttext}>Full name</Text>  
            <Text style={styles.fonttextinfor}>{this.state.first_name} {this.state.last_name}</Text>  
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Email</Text>  
            <Text style={styles.fonttextinfor}>{this.state.email}</Text>  
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Phone Number</Text>  
            <Text style={styles.fonttextinfor}>{this.state.phone_number}</Text> 
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Skill</Text>  
                <Text style={styles.fonttextinfor}>Teamwork,...</Text> 
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Language</Text>  
                <Text style={styles.fonttextinfor}>English,...</Text> 
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Education</Text>  
                <Text style={styles.fonttextinfor}>Duy Tan University</Text> 
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("update")} style={styles.btnLogin}>
              <Text style={{fontSize:20,color:'#ffff'}}>Update</Text>
            </TouchableOpacity>
          </Animated.View>
          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
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
  btnLogin:{
    width:300,
    height:45,
    borderRadius:10,
    backgroundColor:'#009387',
    marginTop:5,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset:{width:0,height:3},
    shadowOpacity:0.2,
    shadowOpacity: 0.2,
    elevation: 3,
    borderColor:'#71B7B7',
    borderWidth:1
},
  header:{
    ...Platform.select({
      ios: {
        flexDirection:'row',
        marginTop:10,
        marginBottom:20,
        height: 36,
        position: "relative"
      },
      android: {
        flexDirection:'row',
        marginTop:10,
        marginBottom:20,
        marginLeft:20,
        marginRight:30,
        height: 36,
        position: "relative"
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable1:{
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable2:{
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable3:{
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,

      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  fonttext:{
    ...Platform.select({
      ios: {
        left:30,
        fontWeight:'bold',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      android: {
        left:30,
        fontWeight:'bold',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  fonttextinfor:{
    ...Platform.select({
      ios: {
        left:50,
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      android: {
        left:50,
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
    header0:{
      height:height*0.08, 
      shadowOffset:{width:0,height:3},
      shadowOpacity:0.2,
      padding: 10,
      shadowOpacity: 0.2,
      elevation: 1,
      marginTop: Platform.OS == 'android' ? 25 : null,
  },
  button:{
    ...Platform.select({
      ios: {
        borderRadius:4,
        backgroundColor:"#009387",
        width:55,
        height:25

      },
      android: {
        borderRadius:4,
        backgroundColor:"#009387",
        width:55,
        height:25
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  buttontext:{
    textAlign:'center',
    ...Platform.select({
      ios: {
        fontSize:15,
        color:"white",
      },
      android: {
        fontSize:15,
        color:"white",
      },
      default: {
        // other platforms, web for example
      }
    })
  }
})