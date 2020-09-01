import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient,SafeAreaView} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../images/abc.png';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Search from './Search';

import AsyncStorage from '@react-native-community/async-storage';
var e;
const {height,width} =Dimensions.get('window');
class Home extends Component{
    constructor(props){
        super(props);
        e=this;
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        
        this.state={
           first_name:'',
           last_name:'',
           email:'',
           username:'',
           id:'',  
           phone:''   ,   
           secret_key:'',
           introduction :'',
           floor_price:'',
           ceiling_price:'',
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
           
            ],
            number_task:10,
            skip:0,
            datasource :[],
            _id:'',
            price:''
        }
        this.socket.on('sv-get-default-tasks',function(data){
            var listdata=data.data
            if(data.success==true){ 
                e.setState({
                    datasource:listdata,
                    
                }) 
                console.log(JSON.stringify(listdata))
               
            }
        })
        this.apply=this.applyJob.bind(this)
        this.socket.on("sv-apply-job",function(data){
            if(data){
                console.log(JSON.stringify(data))
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
        const gettask={
            number_task:this.state.number_task,
            skip:this.state.skip
        }
        this.socket.emit("cl-get-default-tasks",gettask)
      }
    
    applyJob=async()=>{
        const token = await AsyncStorage.getItem("token")
        const apply={
            secret_key:token,
           
            
        }
        this.socket.emit("cl-apply-job",apply)
    }
    render(){
        const Bulletina=({_id,created_time,task_description,task_title,price,introduction,floor_price,ceiling_price})=>{
            return(
                     <View style={{backgroundColor:'#71B7B7',
                        marginHorizontal:10,
                        marginVertical:10,
                        borderRadius:8,
                        paddingVertical:40,
                        paddingHorizontal:15,
                        marginTop:30,
                        marginBottom:20,
                        height:250,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: 'green',
                        shadowOpacity: 0.1, 
                        elevation: 4,
                }}>
                    <View style={{marginTop:-60}}> 
                            <Text>{created_time}</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold'}}>
                        
                        <Text style={{fontWeight:'bold',fontSize:25,fontStyle:'italic'}}>{task_title}</Text>
                        <Text >{task_description}</Text>
                        <Text>{_id}</Text>
                       
                    </View>
                    
                    <View style={{flexDirection:'row',marginLeft:-11    }}>
                        <TouchableOpacity style={styles.iconBulliten}  onPress={() => alert('Follow')}>
                            <AntDesign style={{marginRight:5}} name="pluscircle" size={30} color="#71B7B7" /> 
                            <Text>Follow</Text>
                        </TouchableOpacity>         
                        <TouchableOpacity style={styles.iconBulliten} onPress={this.apply}>
                             <Ionicons style={{marginRight:5}} name="md-checkmark-circle" size={30} color="#71B7B7" />
                             <Text>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('save')}>
                            <Entypo style={{marginRight:5}} name="save" size={30} color="#71B7B7" />
                           
                            <Text>Save</Text>
                        </TouchableOpacity>                                                    
                    </View>
                </View>
               
                
            )
        }
        return( 
            <View style={styles.container}>
                <Search/>
                <ScrollView > 
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
                 
                   <View style={{flexDirection:'row'}}>
                    <View style={styles.texttitle}>
                        <Text style={{fontWeight:'bold',fontSize:18,color:'#71B7B7',fontStyle:'italic'}}>Recommend Work</Text>
            
                    </View>
                   </View>
                   
                   <View style={styles.recommend}>
                        <ScrollView horizontal={true}>
                            <View style={{flexDirection:'row'}}>
                                {this.state.data.map((task,index)=><Task key={index} name={task.name}
                                image={task.image}
                                location={task.location}
                                />)}
                                <TouchableOpacity onPress={()=>this.props.navigation.push("Listrecommend")} style={{marginTop:100,marginRight:30,marginLeft:10}} >
                                    <MaterialCommunityIcons  name="skip-next-circle" size={50} color='#ffff'/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                   </View>
                   <View style={{marginLeft:10,marginTop:10,width:130,borderBottomWidth:2,borderBottomColor:'#71B7B7'}}>
                       <Text style={{fontWeight:'bold',fontSize:18,color:'#71B7B7',fontStyle:'italic'}}>Bulletin Board</Text>
                   </View>
                   <View style={{marginTop:10}}>                      
                            {this.state.data.map((task,index) =>                                                              
                                            <Bulletin key={index} name={task.name}
                                            image={task.image} 
                                            location={task.location}
                                            />
                                
                                )
                            }              
                   </View>   
                   <View style={{marginTop:10}}>                      
                            {this.state.datasource.map((task,index) =>                                                              
                                            <Bulletina key={index} created_time={task.created_time}
                                            task_description={task.task_description} 
                                            task_title={task.task_title} _id={task.id} introduction={task.introduction}
                                            ceiling_price={task.ceiling_price} floor_price={task.floor_price} 
                                            />
                                
                                )
                            }              
                   </View>   
                  
                </ScrollView>    
            </View>
           
               
           
        )
    }
}   
const Bulletin=({name,image,location})=>{
    return(
             <View style={{backgroundColor:'#71B7B7',
            marginHorizontal:10,
            marginVertical:10,
            borderRadius:8,
            paddingVertical:40,
            paddingHorizontal:15,
            marginTop:30,
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
            
            <View style={{flexDirection:'row',marginLeft:-11    }}>
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
       
        
    )
}
const Task=({name,image,location})=>{
    return(
        <TouchableOpacity>
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
            height:200
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
        width:127,
        alignItems:'center',
        paddingLeft:5,
        marginBottom:-35,
        marginRight:1,
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
        width:width-30,
        height:height*0.4,     
    },
    texttitle:{
        marginLeft:10,marginTop:20,width:150,borderBottomWidth:2,borderBottomColor:'#71B7B7'
    },
    texttitle1:{
        marginLeft:150,marginTop:20,width:90,borderBottomWidth:2,borderBottomColor:'red'
    },
    header:{
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,  
       
       
    },
    icon:{
        marginLeft:10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 1,
    },
    viewimage:{
        width:width-30,
        height:height*0.4,    
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        marginHorizontal:16,
        marginVertical:10,
        elevation:3,
        borderTopColor:'#71B7B7',
        backgroundColor:'#ffff'
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
        height:height*0.35, 
        marginTop:10,
        marginRight:10,
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        backgroundColor:'#71B7B7',
        borderRadius:15,
        elevation:2,
        borderColor:'#71B7B7'
    }
})
