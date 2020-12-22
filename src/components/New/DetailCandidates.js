import React from 'react';
import {StyleSheet, Text,Modal, View, Image,TouchableOpacity,Dimensions,FlatList,ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated';
import io from 'socket.io-client/dist/socket.io';
import { toHumanSize } from 'i18n-js';

var e;

const { width, height } = Dimensions.get('screen')

export default class DetailCandidates extends React.Component {
  constructor(props){
    super(props);
        e=this;
        this.socket = io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.a1 = this.a.bind(this)
        this.onApprove = this.onApprove.bind(this)
        this.state={  
          secret_key:'',
          //task_id:'5f1c581dcde7010774853652',
          task_id:'',
          employee_id:'',
          dataTask:[],
        }
        this.socket.on("sv-get-candidate-apply-job",function(data){
          var list=data.data
          if(data.success==false){
            console.log(JSON.stringify(data))
          }else if(data.success==true){
              //console.log(JSON.stringify(list))
            e.setState({
              dataTask:list,
              isLoading:false,
            })
            console.log(list)
            //5fbe7fbdca3d9c20a8444d55
            //5fbf34a9eff3c200041cf2ad
          }
        })
        this.socket.on('sv-approve-employee-to-work',function(data){
          console.log(data)
        })
        
  }
  componentDidMount=async()=>{
    var token= await AsyncStorage.getItem('token')
    const decode=jwt_decode(token)
    this.setState({
      secret_key:token,  
      //_id:decode._id
    })
    const task ={
      task_id :this.props.route.params.task_id,
      secret_key:this.state.secret_key, 
    }
    this.socket.emit("cl-get-candidate-apply-job",task)
    
  }
  renderInner = () => (
    <View style={styles.panel}>
        <TouchableOpacity onPress={this.onApprove} style={{
          width:300,
          height:40,
          borderRadius:10,
          backgroundColor:'#009387',
          alignItems:'center',
          justifyContent:'center',
          shadowOffset:{width:0,height:3},
          shadowOpacity:0.2,
          shadowOpacity: 0.2,
          elevation: 3,
          marginTop:20,
          borderColor:'#71B7B7',
          borderWidth:1
        }}>
            <Text style={{fontSize:20,color:'#ffff'}}>Approve</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={{
          width:300,
          height:40,
          borderRadius:10,
          backgroundColor:'#009387',
          alignItems:'center',
          justifyContent:'center',
          shadowOffset:{width:0,height:3},
          shadowOpacity:0.2,
          shadowOpacity: 0.2,
          elevation: 3,
          borderColor:'#71B7B7',
          borderWidth:1
        }}>
            <Text style={{fontSize:20,color:'#ffff'}}>Unapprove</Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.bs.current.snapTo(1)} style={{
          width:300,
          height:40,
          marginBottom:20,
          borderRadius:10,
          backgroundColor:'#009387',
          alignItems:'center',
          justifyContent:'center',
          shadowOffset:{width:0,height:3},
          shadowOpacity:0.2,
          shadowOpacity: 0.2,
          elevation: 3,
          borderColor:'#71B7B7',
          borderWidth:1
        }}>
            <Text style={{fontSize:20,color:'#ffff'}}>Close</Text> 
        </TouchableOpacity>
    </View>
  )
  bs = React.createRef()
  fall = new Animated.Value(1);
  a(empid){
    this.bs.current.snapTo(0)
    this.setState({
      employee_id:empid
    })
  }
  onApprove(){
    const approve={
      secret_key:this.state.secret_key,
      task_id:this.props.route.params.task_id,
      employee_id:this.state.employee_id
    }
    this.socket.emit("cl-approve-employee-to-work",approve)
    console.log(approve)
  }
  render(){
      return(
        <View style={styles.container}>
           <BottomSheet
              ref={this.bs}
              callbackNode={this.fall}
              snapPoints={[200,0]}
              renderHeader={this.renderInner}
              initialSnap={1}
              enabledGestureInteraction={true}
              enabledContentGestureInteraction={false}
            />
            <Animated.View style={{
                opacity: Animated.add(0.4,Animated.multiply(this.fall,1.0))
              }}>
            <View style={styles.header}>
              <View style={{flexDirection:'row',marginTop:10}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                  <FontAwesome name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>Applies </Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
                <View style={{alignItems:'center'}}>
                    <Text style={{color:'#488B8F',fontSize:20}}>Business Analyst</Text>
                    <FlatList data={this.state.dataTask} 
                          renderItem={({item,index})=>{
                           
                          return(
                              <RenderItem stackInner={this.a1} item={item} index={index}></RenderItem>
                          )
                      }}
                      keyExtractor={(item)=>item._id.toString()}
                      >
                    </FlatList>
                    <TouchableOpacity style={styles.button}>
                          <Text style={{fontSize:20,color:'#ffff'}}>Recommend Candidates</Text> 
                        </TouchableOpacity>
                </View>
            </View>
            </Animated.View>
        </View>
      )
  }
}

/*<TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("update")}>
                          <Text style={{fontSize:20,color:'#ffff'}}>Recommend Candidates</Text> 
                        </TouchableOpacity>*/

class RenderItem  extends React.Component{
  render(){
      return(
          <View style={styles.image_container}>
                  <View style={{justifyContent:'center',marginLeft:10}}>
                      <Image source={{uri:this.props.item.candidate_avatar}} style={styles.image}/>
                  </View>
                  <View>
                      <View  style={{flexDirection:'column',marginLeft:10,marginTop:10,alignItems:'flex-start',width:170}}>
                        <View>
                            <Text style={styles.name}>{this.props.item.candidate_first_name} {this.props.item.candidate_last_name}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.rate}>/5</Text> 
                        <Image 
                            source={require('../../images/star.png')}
                            style={{width:20,height:20,top:1}}
                            resizeMode="cover"
                        />
                        </View>
                      </View>
                  </View>
                  <TouchableOpacity onPress={()=>this.props.stackInner(this.props.item._id)} style={{position:'absolute',right:20,top:30}} >
                      <Entypo name="dots-three-vertical" size={24} color="#2d7474" />
                    </TouchableOpacity>
          </View>  
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add2c9',
  },
  header:{
    height:height*0.08, 
    shadowOffset:{width:0,height:3},
    shadowOpacity:0.2,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 1,
   
  },
  footer:{  
      marginTop:80,
      backgroundColor:'#faf9f9',
      borderTopLeftRadius: 30,
      borderTopRightRadius:30,
      paddingVertical:50,
      paddingHorizontal:30,
      height:800
  },
  image_container:{
    marginBottom:10,
    paddingVertical:10,
    paddingHorizontal:10,
    flexDirection:'row',
    borderRadius:10,
    height:90,
    width:width-80,
    backgroundColor:'rgba(200,200,200,0.3)',
    margin:10,
    
  },
  name:{
    fontWeight:'bold',
    fontSize:18
    
  },
  rate:{
    fontSize:16
  },
  image:{
      width:50,
      height:50
  },
  button:{
    width:300,
    height:40,
    borderRadius:10,
    backgroundColor:'#009387',
    marginTop:40,
    alignItems:'center',
    justifyContent:'center',
    shadowOffset:{width:0,height:3},
    shadowOpacity:0.2,
    shadowOpacity: 0.2,
    elevation: 3,
    borderColor:'#71B7B7',
    borderWidth:1
  },
  panel: {
    backgroundColor: 'white',
    height:210,
    alignItems:'center',
    justifyContent:'space-evenly',
    
  },
});
