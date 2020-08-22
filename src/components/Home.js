import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../images/abc.png';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import AsyncStorage from '@react-native-community/async-storage';
const {height,width} =Dimensions.get('window');
class Home extends Component{
    constructor(props){
        super(props);
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
      
        this.state={
           first_name:'',
           last_name:'',
           email:'',
           username:'',
           id:'',  
           phone:''   ,   
           secret_key:'',
           data:[{
               key:'1',
               name:'Business Analyst',
               image:require('../images/fourdigit.png'),
               location:'Da Nang'
           },
            {
                key:'2',
                name:'Business Analyst',
                image:require('../images/cmc.png'),
                location:'Da Nang'
            },
            {
                key:'3',
                name:'Business Analyst',
                image:require('../images/nexle.png'),
                location:'Da Nang'
            },{
                key:'4',
                name:'Business Analyst',
                image:require('../images/taseco.jpg'),
                location:'Da Nang'
            },
            {
                key:'5',
                name:'Business Analyst',
                image:require('../images/taseco.jpg'),
                location:'Da Nang'
            },
            {
                key:'6',
                name:'Business Analyst',
                image:require('../images/taseco.jpg'),
                location:'Da Nang'
            },
            {
                key:'7',
                name:'Business Analyst',
                image:require('../images/taseco.jpg'),
                location:'Da Nang'
            },
           
        ]
        }
        this.socket.on("sv-change-password",function(data){
            if(data){
                alert('thanh cong')
            }else if(data.success==false){
                alert(JSON.stringify(data.errors))
            }
        })
    }
    componentDidMount= async()=> {  
        const token = await AsyncStorage.getItem("token")
        const decode=jwt_decode(token)
        this.setState({
          first_name:decode.first_name,
          email:decode.email,
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
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row',paddingHorizontal:20}}>                                                
                         <AntDesign name="search1" size={25} color="#71B7B7" style={{marginRight:10,marginLeft:1,top:6}} />                  
                            <TextInput
                                style={styles.searching}
                                placeholder="Searching ..." 
                                placeholderTextColor='#71B7B7'
                                underlineColorAndroid="transparent"
                                />                                        
                            <AntDesign name="message1" size={30} color="#71B7B7" style={styles.icon} 
                        onPress={() => alert('This is a button!')}
                        />
                    </View>
                    
                </View>
                <ScrollView> 
                    <View style={styles.viewimage}>
                        <Image style={styles.image} source={girl}/>
                        <View style={styles.text1}>
                            <Text style={{fontStyle:'italic'}}>The suitable of for you today !!!</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{fontWeight:'bold',fontSize:20}}>Hi </Text>
                            <Text style={{fontSize:20}}>{this.state.first_name} !</Text>
                        </View>
                   </View> 
                 
                   
                   <View style={{marginLeft:10,marginTop:20,borderBottomWidth:1,borderBottomColor:'#71B7B7'}}>
                       <Text style={{fontWeight:'bold',fontSize:18,color:'#71B7B7',fontStyle:'italic'}}>Recommend Work</Text>
                   </View>
                   <View style={styles.recommend}>
                        <ScrollView horizontal={true}>
                            {this.state.data.map(task=><Task name={task.name}
                             image={task.image}
                              location={task.location}
                            />)}
                        </ScrollView>
                   </View>
                   <View style={{marginLeft:10,marginTop:20,borderBottomWidth:1,borderBottomColor:'#71B7B7'}}>
                       <Text style={{fontWeight:'bold',fontSize:18,color:'#71B7B7',fontStyle:'italic'}}>Bulletin Board</Text>
                   </View>
                   <View>
                        <ScrollView >
                            {this.state.data.map(task=><Bulletin  name={task.name}
                             image={task.image}
                              location={task.location}
                            />)}
                        </ScrollView>
                   </View>
                  
                  <View>
                        <TouchableOpacity onPress={this.logout}>
                            <Text>logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>    
            </View>
               
           
        )
    }
}
const Bulletin=({key ,name,image,location})=>{
    return(
        <TouchableOpacity onPress={() => alert('Detail')} >
       
             <View style={{backgroundColor:'#71B7B7',
            
            marginHorizontal:10,
            marginVertical:10,
            borderRadius:8,
            paddingVertical:40,
            paddingHorizontal:15,
            marginTop:25,
            marginBottom:20,
            height:250,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
        }}>
            <View style={{marginTop:-60}}> 
                <Image source={image} style={{width:80,marginTop:-10
                    ,height:80,borderRadius:50,}}></Image>
            </View>
            <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold'}}>
                
                <Text style={{fontWeight:'bold',fontSize:25,fontStyle:'italic'}}>{name}</Text>
                <Text >{location}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.iconBulliten}  onPress={() => alert('Follow')}>
                    <AntDesign style={{marginRight:5}} name="pluscircle" size={30} color="#71B7B7" /> 
                    <Text>Follow</Text>
                </TouchableOpacity>         
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('Apply')}>
                     <Ionicons style={{marginRight:5}} name="md-checkmark-circle" size={30} color="#71B7B7" />
                     <Text>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('save')}>
                    <Entypo style={{marginRight:5}} name="save" size={30} color="#71B7B7" />
                   
                    <Text>Save</Text>
                </TouchableOpacity>                                                    
            </View>
        </View>
       
        </TouchableOpacity>
    )
}
const Task=({key ,name,image,location})=>{
    return(
        <TouchableOpacity onPress={() => alert('chuyển!')}>
             <View style={{backgroundColor:'#ffff',
            flexDirection:'row',
            marginHorizontal:10,
            marginVertical:10,
            borderRadius:8,
            paddingVertical:10,
            paddingHorizontal:15,
            marginTop:20,
            marginBottom:20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
        }}>
            
            <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold'}}>
                 <Image source={image} style={{width:100
                   ,height:100,borderRadius:10,}}></Image>
                <Text >{name}</Text>
                <Text >{location}</Text>
            </View>
        </View>
       
        </TouchableOpacity>
       
    )
}
export default Home;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
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
        marginRight:45,
        backgroundColor:'#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor:'#71B7B7'
    },
    nof:{
        backgroundColor:'#71B7B7',
        height:250,
        borderRadius:10,
        marginHorizontal:16,
        marginVertical:15
    },
    image:{
        resizeMode:'cover',
        height:null,
        width:null,
        flex:1,
        top:10,
        
    },
    header:{
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 30 : null,
        alignItems:'center',
       
    },
    icon:{
        marginLeft:10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 1,
    },
    viewimage:{
        width:width-40,
        height:height*0.4,    
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        marginLeft:20
    },
    searching:{
        backgroundColor:'white',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        paddingLeft:15,
        ...Platform.select({
          ios: {
            width:310,
            height:35
          },
          android: {
            width:310,
            height:35
          },
          default: {
            // other platforms, web for example
          }
        })
      },
    text:{
        position:'absolute',
        flexDirection:'row',
        marginTop:20,
        marginLeft:20
      
        
    },
    text1:{
        position:'absolute',
        marginTop:40,
        marginLeft:10
    },
    item:{
        marginTop:10,
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
    },
    recommend:{
        height:height*0.3, 
        marginTop:10,
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        backgroundColor:'#71B7B7',
        borderRadius:15,
    }
})
