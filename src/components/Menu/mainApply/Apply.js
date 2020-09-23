import  React from 'react';
import { View, Text, StyleSheet,Button,Alert,FlatList,Image ,Dimensions,TouchableOpacity,Modal,ActivityIndicator} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons'; 
import RenderItem from '../mainApply/RenderItem'
const {height,width} =Dimensions.get('window');
var e;
export default class Apply extends React.Component {
  constructor(props){
    super(props);
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state={
      secret_key:'',
      deleteRowkey:null,
      isLoading:true,
      refeshing:false,
      dataApply:[
      ],
      user:{
        name:'Lê Ngân',
        job:'Business Analyst',
    },  
    }
    this.socket.on("sv-get-applied-job",function(data){
        var list=data.data
        if(data.success==false){
          console.log(JSON.stringify(data))
        }else if(data.success==true){
          e.setState({
            dataApply:list,
            isLoading:false,
          })
        }
    })
  };
  refreshFlatlist=()=>{
    const apply ={
      secret_key:this.state.secret_key
    }
    this.socket.emit("cl-get-applied-job",apply)
  }
  componentDidMount=async()=>{
    var token= await AsyncStorage.getItem('token')
    this.setState({
      secret_key:token
    })
    const apply ={
      secret_key:this.state.secret_key
    }
    this.socket.emit("cl-get-applied-job",apply)
  }
  render(){
    return (
     /* this.state.dataApply==''
      ?
      <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#ffff"}}>
        <Text>Blank task apply list</Text>
      </View>
      :   */
      this.state.dataApply==''
      ?
      <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:"#ffff"}}>
        <Text>Blank task apply list</Text>
      </View>
      :       
      <View style={styles.container}>
              <View style={styles.flatlist}>
              <FlatList data={this.state.dataApply}
                    renderItem={({item,index})=>{              
                    return(    
                        <View>
                             <RenderItem item={item} index={index} parenFlastlist={this} ></RenderItem>          
                        </View>
                    )
                }}
                keyExtractor={(item)=>item._id.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.refreshFlatlist()}
                >
            </FlatList>
            </View>  
      </View>
              
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',  
    backgroundColor: '#faf9f9'
  },
  flatlist:{
      flex:1,
      alignItems:'center'
  },
  image_container:{
      paddingVertical:10,
      paddingHorizontal:10,
      flexDirection:'row',
      borderRadius:10,
      height:90,
      width:350,
      backgroundColor:'rgba(200,200,200,0.3)',
      margin:20
  },
  time:{
    fontWeight:'bold',
    fontSize:19,
    color:'#2d7474'
      
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
  company:{
    fontWeight:'bold',
    fontSize:18
    
  },
  position:{
    fontSize:16
  },
  rating:{
      marginTop:5,
      flexDirection:'row'
  }
})