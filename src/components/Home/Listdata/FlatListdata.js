import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Modal, Dimensions,LinearGradient,SafeAreaView,Alert} from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



import AsyncStorage from '@react-native-community/async-storage';
var e;
const {height,width} =Dimensions.get('window');
class FlatListdata extends Component{
    constructor(props){
        super(props);
        e=this;
        this.state={
           _id:'',
           introduction:'',
           ceiling_price:'',
           floor_price:'',
           secret_key:'',
           show:false,
          
        }
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.apply=this.applyJob.bind(this)
        this.socket.on("sv-apply-job",function(data){
            if(data.success==false){
                if(data.errors.introduction){
                    Alert.alert(
                        'Notice',
                        'Introduction blank',[
                            {text:'Ok'}
                        ],{cancelable:true}
                        )
                }else{
                    Alert.alert(
                        'Notice',
                        'Đax Apply',[
                            {text:'Ok'}
                        ],{cancelable:true}
                        )
                }
                console.log(JSON.stringify(data))
            }else if(data.success==true){
                Alert.alert(
                    'Notice',
                    'Apply Success',[
                        {text:'Ok'}
                    ],{cancelable:true}
                    )
            }
        })
        /*this.follow=this.followTask.bind(this)
        this.socket.on("sv-follow-user",function(data){
            if(data.success==false){
                console.log(JSON.stringify(data))
                alert('Đã follow ')
            }else if(data.success==true){
                alert('follow success')
            }
        })*/
        this.save=this.saveTask.bind(this);
        this.socket.on("sv-save-task",function(data){
            if(data.success==false){
                console.log(JSON.stringify(data))
               
            }else if(data.success==true){
                console.log("lua thanh cong")
                Alert.alert(
                    'Notice',
                    'Save Success',[
                        {text:'Ok'}
                    ],{cancelable:true}
                    )
            }
        })
    }
    componentDidMount=async()=>{
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key:token,
            _id:this.props.item._id,
            ceiling_price:this.props.item.price.ceiling_price,
            floor_price:this.props.item.price.floor_price,  
        })
    }
    applyJob=async()=>{
        this.setState({
            show:false
        })
        const apply={
            secret_key:this.state.secret_key,
            task_id:this.state._id,
            introduction:this.state.introduction,
            floor_price:this.state.floor_price,
            ceiling_price:this.state.ceiling_price
    }
        this.socket.emit("cl-apply-job",apply)

    }
    /*followTask=async()=>{
        const follow={
            secret_key:this.state.secret_key,
            task_id:this.state._id,
            introduction:'Tôi muốn theo dõi bạn',
            floor_price:this.state.floor_price,
            ceiling_price:this.state.ceiling_price
        }
        this.socket.emit("cl-follow-user",follow)
    }  */
    saveTask=()=>{
        const save ={
            secret_key:this.state.secret_key,
            task_id:this.state._id
        }
        this.socket.emit("cl-save-task",save)
    } 
    render(){
        return(
        <View style={{backgroundColor:'#71B7B7',
            marginHorizontal:10,
            marginVertical:10,
            borderRadius:8,
            paddingVertical:40,
            paddingHorizontal:15,
            marginBottom:5,
            height:400,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1, 
            elevation: 4,
        }} key={this.props.item._id}>
        <View style={{marginTop:10,flexDirection:'row'}}> 
            <Text >{new Date(this.props.item.created_time).toLocaleDateString()}</Text>
            <View style={{marginLeft:10}}>
                <Text >{new Date(this.props.item.created_time).toLocaleTimeString()}</Text>
            </View>
        </View>
        <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold'}}>
            
            <Text style={{fontWeight:'bold',fontSize:25,fontStyle:'italic'}}>{this.props.item.task_title}</Text>
            <Text >{this.props.item.task_description}</Text>
            <Text >{this.props.item.price.floor_price}</Text>
            <Text >{this.props.item.price.ceiling_price}</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom:-30}}>   
            <TouchableOpacity style={styles.iconBulliten} onPress={()=>this.setState({show:true})}>
                 <AntDesign style={{marginLeft:10}} name="pluscircle" size={30} color="#71B7B7" /> 
                 <Text style={{marginLeft:30}}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBulliten1} onPress={this.save}>
                <Entypo style={{marginLeft:10}} name="save" size={30} color="#71B7B7" />   
                <Text style={{marginLeft:30}}>Save</Text>
            </TouchableOpacity>                                                    
        </View>
        <Modal transparent={true}
                 visible={this.state.show}
                 animationType='slide'
                 >
                  <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#faf9f9',borderRadius:20,
                    height:300,marginLeft:40,marginRight:40,marginTop:75,
                    borderWidth:3,borderColor:'#009387',padding:20,
                    alignContent:'center'}}>
                        <View style={{alignContent:'center'}}>
                          <Text style={{fontSize:20,fontWeight:'bold',fontStyle:'italic'}}>Introduction:</Text>
                        </View>
                        <View style={{borderWidth:1,height:180,padding:10,borderColor:'#808080'}}>
                            <TextInput multiline={true}
                             onChangeText={(introduction)=> this.setState({introduction})}
                             value={this.state.introduction}  
                             placeholderTextColor={'#2d7474'}
                             underlineColorAndroid='transparent'
                            >

                            </TextInput>
                        </View>   
                        <View style={styles.controlStyle}>
                            <TouchableOpacity style={styles.cancle}  onPress={()=>this.setState({show:false})}>
                              <Text style={{color:'#ffff',fontSize:20}}>Cancle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.apply} onPress={this.apply}>
                              <Text style={{color:'#ffff',fontSize:20}}>Apply</Text>
                            </TouchableOpacity>
                        </View>            
                    </View>
                  </View>
                </Modal>
    </View>
            )              
        
    }         
    
    
}

export default FlatListdata;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
    iconBulliten:{
        flexDirection:'row',
        flex:1,
        paddingVertical:5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,marginRight:3,
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor:'#71B7B7'
    },
    iconBulliten1:{
        flexDirection:'row',
        flex:1,
        paddingVertical:5,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,marginLeft:3,
        alignItems:'center',
        backgroundColor:'#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor:'#71B7B7'
    },
    cancle:{
        flex:1,
        backgroundColor:'#2d7474',
        alignItems:'center',
        paddingVertical:5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,marginRight:3
        
    },
    apply:{
        flex:1,
        backgroundColor:'#2d7474',
        alignItems:'center',
        paddingVertical:5,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,marginLeft:3
    },
    controlStyle:{
        flexDirection:'row',
        marginTop:10,
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
