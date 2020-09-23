import  React from 'react';
import { View, Text, StyleSheet,Button,FlatList,Image ,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-paper';
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import { Ionicons } from '@expo/vector-icons'; 
import Abc from '../Menu/mainApply/RenderItem' 
const {height,width} =Dimensions.get('window');
var e;
export default class HistoryJob extends React.Component {
  constructor(props){
    super(props);
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state={
      isLoading:false,
      refreshing:false,
      data:[
        {
          _id:1,
          time:'03-2019',
          company: 'Fancha Milktea',
          position: 'Staff',
          rating:3
        },
        {
          _id:2,
          time:'07-2019',
          company: "Crazy's Cat",
          position: 'Batender',
          rating:4
        },
        {
          _id:3,
          time:'02-2019',
          company: 'Fourdigit',
          position: 'FE Developer',
          rating:1
        },
        {
          _id:4,
          time:'01-2019',
          company: 'sadasdsadasd',
          position: 'FE Developer',
          rating:2
        },
        {
          _id:5,
          time:'02-2019',
          company: 'ccccccc',
          position: 'FE Developer',
          rating:5
        },
      ],
      dataHistoryjob:[

      ],
      user:{
        name:'Lê Ngân',
        job:'Business Analyst',
    },       
    }

    this.socket.on("sv-job-history",function(data){
      var list=data.data
      if(data.success==true){
        console.log(JSON.stringify(list))
        e.setState({
          dataHistoryjob:list,
          isLoading:true
        })
      }else{
        console.log(data.error)
      }
    })
  };
  componentDidMount=async()=>{
    const token= await AsyncStorage.getItem('token')
    const decode =jwt_decode(token)
    const historyjob={
      _user_id:decode._id,
      skip:1
    }
    this.socket.emit("cl-job-history",historyjob)
  }
 
  _rating(item){
      let rating = [];
      for(i=0;i<item;i++){
          rating.push(
            <Image 
                source={require('../../images/star.png')}
                style={{width:15,height:15,marginRight:3}}
                resizeMode="cover"
            />
          )
      }
      return rating;
  }
  renderItem = ({item}) => {
      return(
        <View key={item._id} style={{flexDirection:'column',marginTop:-5}}>
          <View style={styles.image_container} > 
            <Text style={styles.time}>{item.time}</Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.company}>{item.company}</Text>
                  <Text style={styles.position}>{item.position}</Text>
                  <View style={styles.rating}>
                      {this._rating(item.rating)}
                  </View>
              </View>
          </View>
          <View style={{height:1,
            marginTop:1, margin:5,
            width:350,borderWidth:2,backgroundColor:'#71B7B7',
            borderColor:'#71B7B7',borderRadius:10,}}>

          </View>
        </View>
       
    
      )
  };

  render(){
    return (
      <View style={styles.container}>
         <View style={styles.header0}> 
            <TouchableOpacity  style={{flexDirection:'row'}}onPress={()=>this.props.navigation.navigate("Menu")}>
                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#2d7474" />
                <Text style={{fontWeight:'bold',fontSize:25,color:'#2d7474',marginLeft:15,marginTop:-2}}>History job</Text>
            </TouchableOpacity>
          </View>
              <View style={styles.flatlist}>
                <FlatList
                  data={this.state.data}
                  renderItem={({item,index})=>{              
                    return(    
                        <View>
                             <RenderItem1 item={item} index={index}  ></RenderItem1>          
                        </View>
                    )
                }}
                  keyExtractor={(item)=>item._id.toString()}
                  ItemSeparatorComponent={this.ItemSeparatorComponent}
                  showsHorizontalScrollIndicator={false}
                  refreshing={this.state.refreshing}
                >
                   </FlatList>  
            </View>  
      </View>
    );
  }
}
class RenderItem1 extends React.Component{
  _rating(item){
    let rating = [];
    for(i=0;i<item;i++){
        rating.push(
          <Image 
              source={require('../../images/star.png')}
              style={{width:15,height:15,marginRight:3}}
              resizeMode="cover"
          />
        )
    }
    return rating;
  }
  render(){
    return(
      <View style={styles.image_container} key={this.props.item._id}>
          <View style={{flexDirection:'column',height:130}}>
              <View style={{width:15,height:15,borderRadius:50,backgroundColor:'#2d7474',marginLeft:-5.5}} >
                 
              </View>
              <View style={{width:1,height:100,borderWidth:2,borderColor:'#2d7474',backgroundColor:'#2d7474'}}>
                  
              </View>
              <View style={{width:15,height:15,borderRadius:50,backgroundColor:'#2d7474',marginLeft:-5.5}} >
                 
              </View>
          </View>
          <View style={{flexDirection:'column',height:130}}>
            <View style={{marginLeft:10}}>
              <Text>{this.props.item.time}</Text>
            </View>
            <View style={{flexDirection:'column',borderRadius:10,borderWidth:2,
            borderColor:'#2d7474',width:250,height:90,marginLeft:10,marginTop:5,justifyContent:'center',alignItems:'center'}}>
                <View>
                    <Text style={{fontWeight:'bold',color:'#2d7474',fontSize:18}}>{this.props.item.company}</Text>
                </View>
                <View >
                    <Text style={{fontWeight:'bold',color:'black',fontSize:18}}>{this.props.item.position}</Text>
                </View>
                <View>
                  <Text> {this._rating(this.props.item.rating)}</Text>
                </View>
            </View>
          </View>
      </View>
    )
  }
}
class RenderItem extends React.Component {
  _rating(item){
    let rating = [];
    for(i=0;i<item;i++){
        rating.push(
          <Image 
              source={require('../../images/star.png')}
              style={{width:15,height:15,marginRight:3}}
              resizeMode="cover"
          />
        )
    }
    return rating;
 }
  render(){
    return(
      <View style={{flexDirection:'column',marginTop:-5}} key={this.props.item._id}>
          <View style={styles.image_container} key={this.props.item._id} > 
            <Text style={styles.time}>{this.props.item.time}</Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.company}>{this.props.item.company}</Text>
                  <Text style={styles.position}>{this.props.item.position}</Text>
                  <View style={styles.rating}>
                      {this._rating(this.props.item.rating)}
                  </View>
              </View>
          </View>
          <View style={{height:1,
            marginTop:1, margin:5,
            width:350,borderWidth:2,backgroundColor:'#71B7B7',
            borderColor:'#71B7B7',borderRadius:10,}}>

          </View>
        </View>
    )
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
      flex:1,
      paddingVertical:10,
      paddingHorizontal:30,
      flexDirection:'row',
      borderRadius:10,
      height:140,
      width:350,
      backgroundColor:'#faf9f9',
      alignItems:'center',
      marginBottom:10
     
  },
  time:{
      fontSize:16
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
    justifyContent:'center',
    alignItems:'center',
    fontWeight:'bold',
    fontSize:19,
    color:'#2d7474'
  },
  position:{
    fontWeight:'bold',
    fontSize:18
  },
  rating:{
      marginTop:5,
      flexDirection:'row'
  }
})