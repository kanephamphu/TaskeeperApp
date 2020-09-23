import React,{Component} from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Image,Alert,Dimensions,TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import SearchMessage from '../Home/SearchMessage'
import job from '../../images/job.png' ;
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import profile from '../../images/nha.jpg'
import girl from '../../images/abc.png';
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons'; 
const {height,width} =Dimensions.get('window');
var e;
class Message extends Component{
    constructor(props){
        super(props);
        e=this;
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
          dataSource:[],
          isLoading:true,
          refeshing:false,
          secret_key:''
        }
    }
    render(){
        return (
            <View style={styles.container}>
                    <View style={styles.header0}> 
                            <View style={{flexDirection:'row',marginTop:40,marginLeft:10}}>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Menu")}>
                                      <Ionicons style={{marginTop:1,marginLeft:5}} name="ios-arrow-back" size={28} color="#faf9f9" />
                                    </TouchableOpacity>
                                    <Text style={{fontSize:25,color:'#2d7474',marginLeft:120,marginTop:-2}}>Message</Text>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'flex-end',marginLeft:110}}>
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        underlayColor={"#ccd0d5"}
                                        onPress={this._onFocus}
                                        style={styles.search_icon_box}
                                        >
                                        <AntDesign name="search1" size={22} color="#000000" />
                                    </TouchableHighlight>
                                </View>
                            </View>
                    </View>   
                <ScrollView>
                <View style={{height:30,backgroundColor:'#faf9f9',justifyContent:'center',alignItems:'center'}}>
                        <Text>You have 1 unread meassage</Text>
                </View>
                <View>
                <View style={styles.header}>    
                        <View>
                            <Image source={profile} style={{width:80
                            ,height:80,borderRadius:50,}}></Image>
                            <View style={{width:30
                            ,height:30,borderRadius:50,backgroundColor:'#71B7B7',
                            alignItems:'center',justifyContent:'center',position:'absolute',left:50,top:-10
                            }}>
                                <Text style={{color:'#ffff'}}>2</Text>
                            </View>
                        </View>
                        <View >
                            <View style={{flexDirection:'column',marginBottom:10,marginTop:5,marginLeft:30,width:170}}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("MesagePerson")} >
                                    <Text style={styles.textTitle}> 
                                        Nguyen Minh Nha
                                    </Text>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{fontSize:16}}>
                                        pla pla
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginLeft:60}}>
                            <Text>10:25</Text>
                        </View>
                    </View>
                    <View style={{height:1,borderWidth:2,borderColor:'#e6e4eb',backgroundColor:'#e6e4eb',marginLeft:100}}></View>
                    <View style={styles.header}>    
                        <View>
                            <Image source={profile} style={{width:80
                            ,height:80,borderRadius:50,}}></Image>
                            <View style={{width:30
                            ,height:30,borderRadius:50,backgroundColor:'#71B7B7',
                            alignItems:'center',justifyContent:'center',position:'absolute',left:50,top:-10
                            }}>
                                <Text style={{color:'#ffff'}}>2</Text>
                            </View>
                        </View>
                        <View >
                            <View style={{flexDirection:'column',marginBottom:10,marginTop:5,marginLeft:30,width:170}}>
                                <View>
                                    <Text style={styles.textTitle}> 
                                        Pham Phu Tai
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:16}}>
                                        pla pla
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginLeft:60}}>
                            <Text>10:25</Text>
                        </View>
                    </View>
                    <View style={{height:1,borderWidth:2,borderColor:'#e6e4eb',backgroundColor:'#e6e4eb',marginLeft:100}}></View>
                    <View style={styles.header}>    
                        <View>
                            <Image source={profile} style={{width:80
                            ,height:80,borderRadius:50,}}></Image>
                            <View style={{width:30
                            ,height:30,borderRadius:50,backgroundColor:'#71B7B7',
                            alignItems:'center',justifyContent:'center',position:'absolute',left:50,top:-10
                            }}>
                                <Text style={{color:'#ffff'}}>2</Text>
                            </View>
                        </View>
                        <View >
                            <View style={{flexDirection:'column',marginBottom:10,marginTop:5,marginLeft:30,width:170}}>
                                <View>
                                    <Text style={styles.textTitle}> 
                                        Nguyen Minh Nha
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:16}}>
                                        pla pla
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginLeft:60}}>
                            <Text>10:25</Text>
                        </View>
                    </View>
                    <View style={{height:1,borderWidth:2,borderColor:'#e6e4eb',backgroundColor:'#e6e4eb',marginLeft:100}}></View>
                    <View style={styles.header}>    
                        <View>
                            <Image source={profile} style={{width:80
                            ,height:80,borderRadius:50,}}></Image>
                            <View style={{width:30
                            ,height:30,borderRadius:50,backgroundColor:'#71B7B7',
                            alignItems:'center',justifyContent:'center',position:'absolute',left:50,top:-10
                            }}>
                                <Text style={{color:'#ffff'}}>2</Text>
                            </View>
                        </View>
                        <View >
                            <View style={{flexDirection:'column',marginBottom:10,marginTop:5,marginLeft:30,width:170}}>
                                <View>
                                    <Text style={styles.textTitle}> 
                                        Do Dang Phat
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:16}}>
                                        pla pla
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginLeft:60}}>
                            <Text>10:25</Text>
                        </View>
                    </View>
                    <View style={{height:1,borderWidth:2,borderColor:'#e6e4eb',backgroundColor:'#e6e4eb',marginLeft:100}}></View>
                    <View style={styles.header}>    
                        <View>
                            <Image source={profile} style={{width:80
                            ,height:80,borderRadius:50,}}></Image>
                            <View style={{width:30
                            ,height:30,borderRadius:50,backgroundColor:'#71B7B7',
                            alignItems:'center',justifyContent:'center',position:'absolute',left:50,top:-10
                            }}>
                                <Text style={{color:'#ffff'}}>2</Text>
                            </View>
                        </View>
                        <View >
                            <View style={{flexDirection:'column',marginBottom:10,marginTop:5,marginLeft:30,width:170}}>
                                <View>
                                    <Text style={styles.textTitle}> 
                                        Thanh Ngan
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{fontSize:16}}>
                                        pla pla
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{marginLeft:60}}>
                            <Text>10:25</Text>
                        </View>
                    </View>
                    <View style={{height:1,borderWidth:2,borderColor:'#e6e4eb',backgroundColor:'#e6e4eb',marginLeft:100}}></View>
                </View>
                </ScrollView>
            </View>
        );
    }
}
export default Message;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  textTitle:{
    fontWeight:'bold',
    color:'#71B7B7',
    fontSize:20
  },
  header_inner: {
    flex:1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  header:{
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginLeft: 16,
    marginTop:5,marginBottom:10
  },
  search_icon_box: {
    width:40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBulliten:{
    flexDirection:'row',
    borderRadius:10,
    borderWidth:1,
    height:50,
    width:90,
    alignItems:'center',
    paddingLeft:5,
    marginBottom:-30,
    marginRight:25,
    backgroundColor:'#ffff',
    shadowColor: 'green',
    shadowOpacity: 0.1,
    elevation: 4,
    borderColor:'#71B7B7'
    },
    header0:{
        height:height*0.13, 
        backgroundColor: 'rgba(113, 183, 183, 0.3)',
        
    },
})