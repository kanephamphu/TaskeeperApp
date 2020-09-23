import React,{Component} from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Image,Alert,Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
const {height,width} =Dimensions.get('window');
var e;
class Notice extends Component{
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
        this.socket.on("sv-read-notification",function(data){
            var list=data.data
            if(data.success==false){
              console.log(JSON.stringify(data))
            }else if(data.success==true){
              e.setState({
                dataSource:list,
                isLoading:false,
              })
              console.log(JSON.stringify(list))
            }
        })
        this.socket.on("sv-readed-all-notification",function(data){
            if(data.success==false){
              console.log(JSON.stringify(data))
            }else if(data.success==true){
              console.log(JSON.stringify(data))
              alert('Đã đọc tất cả')
            }
        })
      };
    componentDidMount=async()=>{
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key:token
        })
        const notice={
            secret_key:this.state.secret_key,
            number_notification : 10,
			skip : 1
        }
        this.socket.emit("cl-get-notification",notice)
    }
    readAllnotice(){
        const readall={
            secret_key:this.state.secret_key,
        }
        this.socket.emit("cl-readed-all-notification",readall)
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header0}>            
                    <View style={styles.header_inner}>
                        <View>
                            <Text style={{fontSize:25,color:'#EE9A49'}}>Notifications</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft:220,marginTop:5}} onPress={()=>Alert.alert(
                        'Confirmation',
                        'Do you want to mark all notifications have been ?',[
                            {text:'No', onPress:()=>console.log('cancel'),style:'cancle'},{text:'Yes',onPress:()=>this.readAllnotice()}
                        ],{cancelable:true}
                        )} >
                            <Entypo name="menu" size={26} color="#71B7B7" />
                        </TouchableOpacity>
                    </View>      
                </View>
                <View style={{height:1,borderWidth:2,borderColor:'#71B7B7',backgroundColor:'#71B7B7'}}></View>
                <View>
                    <View style={styles.header}>
                        <View>
                            <MaterialIcons name="notifications-active" size={35} color="#71B7B7" />
                        </View>
                        <View style={{flexDirection:'column',marginBottom:10,marginTop:5,marginLeft:30}}>
                            <View>
                                <Text style={styles.textTitle}> 
                                       Someone applied
                                </Text>
                            </View>
                            <View>
                                <Text style={{fontSize:16}}>
                                    pla pla
                                </Text>
                            </View>
                            <View>
                                <Text style={{fontSize:16}}>
                                        26.09.1000
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
               
            </View>
       
        );
    }
}
export default Notice;
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
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginLeft: 16,
    marginTop:5,marginBottom:10
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
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,
    },
})