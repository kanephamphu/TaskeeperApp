import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Animated, TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../../images/abc.png';
import { Ionicons } from '@expo/vector-icons'; 
import profile from '../../images/nha.jpg'
import AsyncStorage from '@react-native-community/async-storage';
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import Collapsible from 'react-native-collapsible';
const {height,width} =Dimensions.get('window');
var e;
class New extends Component{
    constructor(props){
        super(props);
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        e=this;
        this.state={
           first_name:'',
           last_name:'',
           email:'',
           username:'',
           id:'',  
           phone:''   ,   
           secret_key:'',  
           collapsed:true,
           showPass:true,
           press:false,
           old_password : '',
           new_password : '',
           confirm_password : '',
           nof:'',
           avatar:'',

           
        }   
        this.onSubmitPassword = this.onSubmitChangePassword.bind(this)      
        this.socket.on("sv-change-password",function(data){
            if(data.success==false){
                var dataserver=data.errors
                console.log(JSON.stringify(dataserver))
                if(data.errors.old_password){
                    e.setState({
                        nof:dataserver.old_password.message
                    });
                }else if(data.errors.new_password){
                    e.setState({
                        nof:dataserver.new_password.message
                    });
                }else if(data.errors.confirm_password){
                    e.setState({
                        nof:dataserver.confirm_password.message
                    });
                } 
            }else {
                e.setState({
                    nof:'Đổi mật khẩu thành công'
                })
            }
        })
      
     
    }
    toggleExpanded =() =>{
        this.setState({collapsed:!this.state.collapsed})
    }
    showPass =()=>{
        if(this.state.press==false){
            this.setState({showPass:false,press:true})
        }else{
            this.setState({showPass:true,press:false})
        }

    }
    componentDidMount= async()=> {  
        const token = await AsyncStorage.getItem("token")
        const decode=jwt_decode(token)
        this.setState({
          first_name:decode.first_name,
          last_name:decode.last_name,
          email:decode.email,
          avatar:decode.avatar
        })
      }
      logout=async()=>{
        try {
            await AsyncStorage.removeItem('token');
        } catch(e) {
            console.log(e);
        }
        this.props.navigation.navigate('Login')
        var token= await AsyncStorage.getItem('token')
        this.socket.emit("client-send-logout-request",token)
    }
    onSubmitChangePassword=async()=>{
        if(this.state.new_password!=this.state.confirm_password){
            alert('không khớp')
        }else{
            var token1 =await AsyncStorage.getItem('token')
            const newpassword={
                secret_key:token1,            
                old_password :this.state.old_password ,
                new_password : this.state.new_password,
                confirm_password :this.state.confirm_password 
             }
             this.socket.emit("cl-change-password",newpassword)
        }
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.header0}>
                        <Text style={{fontWeight:'bold',fontSize:25,color:'#2d7474',marginLeft:15,marginTop:-2}}>Menu</Text>
                    </View>
                    <ScrollView>
                    <View style={styles.header}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.push("ProfileUser")} style={{borderColor:'#71B7B7',
                                shadowOffset:{width:0,height:3},
                                shadowOpacity:0.2,
                                shadowOpacity: 0.2,
                                height:120,
                                borderRadius:30,
                                width:150,marginTop:10,
                                marginLeft:20,elevation:3}}> 
                                <Image source={this.state.avatar?{uri:this.state.avatar}:null}
                                     style={styles.Image}/>   
                            </TouchableOpacity>
                            <View style={{flexDirection:'column',marginTop:35,marginLeft:20}}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("HomeApply")}>
                                    <Text style={{fontWeight:'bold',fontSize:30}}>{this.state.first_name} {this.state.last_name}</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <View style={{flexDirection:'row'}} >
                                        <SimpleLineIcons style={{marginRight:3}} name="user-follow" size={12} color="#71B7B7"/>
                                        <Text style={{fontSize:12}}>
                                            Follower 34
                                        </Text>
                                    </View>
                                    <View style={{flexDirection:'row',marginLeft:30}} >
                                        <SimpleLineIcons style={{marginRight:3}} name="user-following" size={12} color="#71B7B7"/>
                                        <Text style={{fontSize:12}}>
                                            Follower 23
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                       
                    </View>
                  
                    <View style={styles.body}>
                        <View style={{marginTop:10,
                           paddingTop:8}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("history")} style={{flexDirection:'row'}}>
                                <View style={styles.iconstyle}>
                                    <FontAwesome name="history" size={30} color="#71B7B7" />
                                </View>
                                    <View style={styles.texticon}>
                                        <Text style={styles.text}>History job</Text>
                                    </View>
                                    <View style={styles.iconstyle}>
                                        <MaterialIcons name="navigate-next" size={30} color="#71B7B7" />
                                    </View>
                                </TouchableOpacity> 
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("taskpage")} style={{flexDirection:'row'}}>
                                    <View  style={styles.iconstyle}>
                                         <Octicons  name="tasklist" size={30} color="#71B7B7"/>
                                    </View>
                                    <View style={styles.texticon}>
                                        <Text style={styles.text}>Task page</Text>
                                    </View>
                                    <View style={styles.iconstyle}>
                                        <MaterialIcons name="navigate-next" size={30} color="#71B7B7" />
                                    </View>
                                </TouchableOpacity> 
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,
                            borderBottomWidth:2,borderColor:'#71B7B7',
                            height:height*0.07,paddingTop:8}}>
                            <Ionicons style={{marginLeft:20}} name="md-settings" size={30} color="#71B7B7" />
                            <Text style={{fontSize:23,marginLeft:15}}>Setting</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.toggleExpanded} style={{flexDirection:'row'}}>
                                <View  style={styles.iconstyle}>
                                    <MaterialCommunityIcons   name="key-change" size={30} color="#71B7B7" />
                                </View>
                                <View style={styles.texticon}>
                                 <Text style={styles.text}>Change password</Text>
                                </View>
                            </TouchableOpacity> 
                            <Collapsible collapsed={this.state.collapsed}>
                            
                                <View style={{flexDirection:'column',alignItems:'center'}}>
                                                              
                                    <TextInput 
                                        style={styles.input}
                                        placeholder={'Password'} 
                                        onChangeText={(old_password)=> this.setState({old_password})}
                                        value={this.state.old_password}  
                                        placeholderTextColor={'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.showPass}
                                    >
                                    </TextInput>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder={'New Password'} 
                                        onChangeText={(new_password)=> this.setState({new_password})}
                                        value={this.state.new_password}  
                                        placeholderTextColor={'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.showPass}
                                    >
                                    </TextInput>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder={'Confim new Password'} 
                                        onChangeText={(confirm_password)=> this.setState({confirm_password})}
                                        value={this.state.confirm_password}  
                                        placeholderTextColor={'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.showPass}
                                    >
                                    </TextInput>
                                    <View><Text>{this.state.nof}</Text></View>
                                    <TouchableOpacity onPress={this.onSubmitPassword} style={styles.btnLogin}>
                                            <Text style={{fontSize:18,fontWeight:'bold',color:'#ffff'}}>Save</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                           
                            </Collapsible>
                        </View>
                        <View>
                            <TouchableOpacity   style={{flexDirection:'row'}}>
                                <View  style={styles.iconstyle}>
                                    <MaterialIcons  name="language" size={30} color="#71B7B7" />
                                </View>
                                <View style={styles.texticon}>
                                    <Text style={styles.text}>Language</Text>
                                </View>
                            </TouchableOpacity> 
                           
                        </View>
                        <TouchableOpacity style={{flexDirection:'row'}}>
                            <View  style={styles.iconstyle}>
                                <Ionicons  name="md-notifications" size={30} color="#71B7B7" />
                            </View>
                            <View style={styles.texticon}>
                                <Text style={styles.text}>Notification</Text>
                            </View>                 
                        </TouchableOpacity> 
                        <TouchableOpacity style={{flexDirection:'row'}}>
                            <View  style={styles.iconstyle}>
                                <Ionicons   name="ios-help-buoy" size={30} color="#71B7B7" />
                            </View>
                            <View style={styles.texticon}>
                                 <Text style={styles.text}>Help</Text>
                            </View>
                        </TouchableOpacity> 
                        <View style={{flexDirection:'row',marginTop:10,
                            borderBottomWidth:2,borderColor:'#71B7B7',
                            height:height*0.07,paddingTop:8}}>
                            <Fontisto style={{marginLeft:20}} name="persons" size={30} color="#71B7B7" />
                            <Text style={{fontSize:23,marginLeft:15}}>Personal</Text>
                        </View>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.props.navigation.navigate("Savetask")}  >
                            <View style={{width:350}}>
                                <Text style={{fontSize:20,marginLeft:10,marginTop:10}}>Introduced</Text> 
                            </View>
                            <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                <MaterialIcons  name="navigate-next" size={30} color="#71B7B7" />
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("MesageStackScreen")} style={{flexDirection:'row'}}>
                            <View style={{width:350}}>
                                <Text style={{fontSize:20,marginLeft:10,marginTop:10}} >Candidate</Text>
                            </View>
                            <View style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                <MaterialIcons  name="navigate-next" size={30} color="#71B7B7" />  
                            </View>
                        </TouchableOpacity> 
                        <View style={{flexDirection:'row',marginTop:10,
                            borderBottomWidth:2,borderColor:'#71B7B7',
                            height:height*0.07,paddingTop:8}}>
                            <MaterialIcons style={{marginLeft:18}} name="payment" size={30} color="#71B7B7" />
                            <Text style={{fontSize:23,marginLeft:15}}>Payment</Text>
                        </View>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.props.navigation.navigate("HomePayment")} >
                            <View  style={styles.iconstyle}>
                                <MaterialCommunityIcons   name="bank" size={30} color="#71B7B7" />
                            </View>
                            <View style={styles.texticon}>
                                <Text style={styles.text}>PayPal,Visa</Text>
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={this.logout} style={{flexDirection:'row',marginTop:10,    
                            height:height*0.07,paddingTop:8}}>
                                <View  style={styles.iconstyle}>
                                    <AntDesign name="logout" size={30} color="#71B7B7" />
                                </View>
                                <View style={styles.texticon}>
                                    <Text style={styles.text}>Log out</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView> 
               
         
               
           
        )
    }
}

export default New;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
    header:{
        height:height*0.20, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        shadowOpacity: 0.2,
        elevation: 2,
        flexDirection:'column',
      
    },
    iconstyle:{
        width:50,
        alignItems:'center',
        justifyContent:'center'
    },
    texticon:{
        width:300,
    },
    text:{
        fontSize:20,marginLeft:10,marginTop:10
    },
    btnLogin:{
        width:300,
        height:45,
        borderRadius:10,
        backgroundColor:'#71B7B7',
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        shadowOpacity: 0.2,
        elevation: 1,
        borderColor:'#71B7B7',
        borderWidth:2
    },
    input:{
        width:300,
        height:40,
        borderRadius:10,
        fontSize:16,
        paddingLeft:20,
        paddingTop:-10,
        borderWidth:1,
        backgroundColor:'#fff',
        color:'#2d7474',
        marginHorizontal:25,
        marginTop:10,
    },
    iconmore:{
        marginLeft:15,marginTop:10
    },
    body:{
        borderColor:'#71B7B7',
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        shadowOpacity: 0.2,
        elevation: 2,
        marginTop:5,
        },
    Image:{
        height:119,
        width:149,
        borderRadius:30
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
})
