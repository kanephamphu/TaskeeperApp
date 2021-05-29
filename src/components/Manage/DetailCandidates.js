import React from 'react';
import {StyleSheet, Text,Modal, View, Image,TouchableOpacity,Dimensions,FlatList,ScrollView,ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated';
import iconsuccess from '../../images/icon1.png';
import iconerror from '../../images/icon2.png';
import {socket} from "../../Socket.io/socket.io";
import avatarimage from '../../images/avatar11.png';
import io from 'socket.io-client/dist/socket.io';
import AppText from '../app-text';
import { toHumanSize } from 'i18n-js';

var e;

const { width, height } = Dimensions.get('screen')

export default class DetailCandidates extends React.Component {
  constructor(props){
    super(props);
        e=this;
       
        this.a1 = this.a.bind(this)
        this.onInvite = this.onInvite.bind(this)
        this.onApprove = this.onApprove.bind(this)
        this.onProfile = this.onProfile.bind(this)
        this.state={  
          secret_key:'',
          task_id:'',
          employee_id:'',
          loadingdata:false,
          dataTask:[],
          dataemployee:[],
          shownotice:false,
          keycheck:'',
          showrecommendperson:false
        }
        socket.on("sv-get-candidate-apply-job",function(data){
          var list=data.data
          if(data.success==false){
            console.log(JSON.stringify(data))
          }else if(data.success==true){
            e.setState({
              dataTask:list,
              loadingdata:true
            })
           
          }
        })
        socket.on('sv-approve-employee-to-work',function(data){
          if (data.success == true) {
            e.setState({
                shownotice: true,
                notice: 'Approve success!',
                key: "success"
            })
          }
          else if (data.success == false) {
              e.setState({
                  shownotice: true,
                  notice: 'Already Exist !',
                  key: "error",
                  keycheck: 'approved_exist'
              })
          }
        })
        socket.on('sv-send-work-invitation',function(data){
          if (data.success == true) {
            e.setState({
              shownotice: true,
              notice: 'Invite Success!',
              key: "success"
            })
          }
          else if (data.success == false) {
            console.log(data)
          }
        })
        socket.on("sv-get-recommend-candidate",function(data){
          var list=data.data
          e.setState({
            dataemployee:list,  
          })
        
        })
  }
  componentDidMount=async()=>{
    var token= await AsyncStorage.getItem('token')
    const decode=jwt_decode(token)
    this.setState({
      secret_key:token,  
      task_id : this.props.route.params.task_id
      //_id:decode._id
    })
    const task ={
      task_id : this.props.route.params.task_id,
      secret_key:this.state.secret_key, 
    }
    socket.emit("cl-get-candidate-apply-job",task)
    const getlistrecommend={
      secret_key:this.state.secret_key,
      task_id:this.props.route.params.task_id
    }
    socket.emit("cl-get-recommend-candidate",getlistrecommend)
    //console.log(getlistrecommend)
  }
  onInvite(_id){
    const inviteuser={
      secret_key:this.state.secret_key,
      task_id:this.state.task_id,
      invitee_id:_id
    }
    socket.emit("cl-send-work-invitation",inviteuser)
    const getlistrecommend={
      secret_key:this.state.secret_key,
      task_id:this.props.route.params.task_id
    }
    socket.emit("cl-get-recommend-candidate",getlistrecommend)
   
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
        <TouchableOpacity onPress={()=>this.bs.current.snapTo(1)} style={{
          width:300,
          height:40,
          marginTop:-10,
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
    socket.emit("cl-approve-employee-to-work",approve)
   
  }
  onProfile(first, last, _id) {
    this.props.navigation.navigate("Profilefriendmanage", { first_name: first, last_name: last, _id: _id })
    this.setState({
      showrecommendperson:false
    })
  }

  render(){
      return(
        <View style={styles.container}>
          <Modal 
            transparent={true}
            visible={this.state.shownotice}
            animationType='slide'
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                backgroundColor: '#faf9f9', borderRadius: 20,
                height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
              }}>
                <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                <Text>{this.state.notice}</Text>
                <TouchableOpacity onPress={() => {this.setState({ shownotice: false });this.bs.current.snapTo(1)}} style={{
                  width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                  height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal transparent={true}
                    visible={this.state.showrecommendperson}
                    animationType='slide'
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            marginLeft: 20, marginRight: 20, marginTop: 75,marginBottom: 125,
                            borderWidth: 2, borderColor: '#009387', padding: 20,
                            alignContent: 'center',alignItems:'center'
                        }}>
                            <AppText i18nKey={'home_manage.notice_show'} style={{color:'#488B8F',fontSize:20}}>Recommended for you</AppText>
                            <FlatList data={this.state.dataemployee} 
                                renderItem={({item,index})=>{                              
                                    return(
                                        <Candidates inviteClick={this.onInvite} stackProfile={this.onProfile} item={item} index={index}></Candidates>
                                    )
                                }}
                                keyExtractor={(item)=>item._id.toString()}
                            >
                            </FlatList>
                            <TouchableOpacity onPress={() => this.setState({ showrecommendperson: false })} style={styles.button}>
                                <AppText i18nKey={'cancel'} style={{fontSize:20,color:'#ffff'}}>Cancel</AppText> 
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                    <AppText style={{fontWeight:'bold',fontSize:20}} i18nKey={'home_manage.applies'}>Applies </AppText>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
                <View style={{alignItems:'center'}}>
                    <AppText i18nKey={'home_manage.titledetailcandidate'} style={{color:'#488B8F',fontSize:20}}>Business Analyst</AppText>
                    {!this.state.loadingdata == true ?
                    <View style={{ justifyContent:'center',marginTop:20}}>
                      <ActivityIndicator size='large'></ActivityIndicator>
                    </View>
                    :this.state.dataTask.length ===0 
                    ?
                    <View style={{ justifyContent:'center',marginTop:20}}>
                      <AppText i18nKey={'home_manage.blank_show'} style={{fontSize:16}}>Blank task apply list</AppText>
                    </View>
                    :
                    <View style={{height:height/3,marginBottom:20}}>
                    <FlatList data={this.state.dataTask} 
                          renderItem={({item,index})=>{
                           
                          return(
                              <RenderItem  stackProfile={this.onProfile} stackInner={this.a1} item={item} index={index}></RenderItem>
                          )
                      }}
                      keyExtractor={(item)=>item._id.toString()}
                      >
                    </FlatList>
                    </View>}
                    <TouchableOpacity onPress={()=>this.setState({showrecommendperson:true})} style={{
                      width:width-100,
                      height:40,
                      borderRadius:10,
                      backgroundColor:'#009387',
                      marginTop:20,
                      alignItems:'center',
                      justifyContent:'center',
                      shadowOffset:{width:0,height:3},
                      shadowOpacity:0.2,
                      shadowOpacity: 0.2,
                      elevation: 3,
                      borderColor:'#71B7B7',
                      borderWidth:1
                    }}>
                          <AppText i18nKey={'home_manage.btnrecommend'} style={{fontSize:20,color:'#ffff'}}>Recommend Candidates</AppText> 
                        </TouchableOpacity>
                </View>
            </View>
            </Animated.View>
        </View>
      )
  }
}

class RenderItem  extends React.Component{
  render(){
    var d = new Date();
    var name = this.props.item.candidate_last_name
    var demcount = this.props.item.candidate_first_name.length+this.props.item.candidate_last_name.length
    if(this.props.item.candidate_last_name.length>=11){
      name = name.slice(0,11);
    }
      return(
          <View style={styles.image_container}>
                  <View>
                      <View style={{flexDirection:'column',marginLeft:10,marginTop:10,alignItems:'flex-start',width:width-200}}>
                        <View style={{width:width-170}}>
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity  onPress={()=>{this.props.stackProfile(this.props.item.candidate_first_name,this.props.item.candidate_last_name,this.props.item.candidate_id)}}>
                            <View style={styles.imageview}>
                            <Image source={this.props.item.candidate_avatar? { uri:this.props.item.candidate_avatar }:avatarimage} style={styles.image}/>
                                        </View>
                                
                            </TouchableOpacity>
                            <View style={{flexDirection:'column',marginLeft:10}}>
                              <TouchableOpacity onPress={()=>{this.props.stackProfile(this.props.item.candidate_first_name,this.props.item.candidate_last_name,this.props.item.candidate_id)}}>
                                  {demcount>=11?<Text style={styles.name}>{name}</Text>:
                                  <Text style={styles.name}>{this.props.item.candidate_first_name} {this.props.item.candidate_last_name} </Text>}
                              </TouchableOpacity>
                              <View style={{flexDirection:'row',}}>
                                <Text style={{fontStyle:'italic'}}>{new Date(this.props.item.applied_time).toLocaleTimeString()}  </Text>
                                <Text>{new Date(this.props.item.applied_time).toLocaleDateString()}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={{flexDirection:'column',width:width-120,marginTop:2}}>
                            <AppText i18nKey={'home_manage.introduction'} style={{fontWeight:'bold'}}>Introduction: </AppText>
                            <Text>{this.props.item.introduction}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:2}}>
                            <AppText i18nKey={'home_manage.pricedeal'} style={{fontWeight:'bold'}}>Price dealing: </AppText>
                            <Text>{this.props.item.price}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:2}}>
                          <AppText i18nKey={'home_manage.rate'} style={{fontWeight:'bold'}}>Rate: </AppText>
                          <Text>{this.props.item.vote_average.toFixed(0)}/5</Text> 
                          <Image 
                              source={require('../../images/star.png')}
                              style={{width:20,height:20,top:1}}
                              resizeMode="cover"
                          />
                        </View>
                      </View>
                  </View>
                  <TouchableOpacity onPress={()=>this.props.stackInner(this.props.item.candidate_id)}  style={{position:'absolute',right:10,top:25}}>
                      <Entypo name="dots-three-vertical" size={24} color="#2d7474" />
                    </TouchableOpacity>
          </View>  
        )
  }
}

class Candidates  extends React.Component{
  render(){
    var name = this.props.item.last_name
    var demcount = this.props.item.first_name.length+this.props.item.last_name.length
    if(this.props.item.last_name.length>=11){
      name = name.slice(0,11);
    }
      return(
        <View style={styles.image_container1}>
          <TouchableOpacity onPress={()=>{this.props.stackProfile(this.props.item.first_name,this.props.item.last_name,this.props.item._id)}} style={{justifyContent:'center',marginLeft:10,height:52,width:52,borderRadius:50,backgroundColor:'white'}}>
              <Image source={this.props.item.avatar?{uri:this.props.item.avatar}:avatarimage} style={styles.image}/>
          </TouchableOpacity>
          <View>
              <View  style={{flexDirection:'column',marginLeft:10,marginTop:10,alignItems:'flex-start',width:width-180}}>
                <TouchableOpacity onPress={()=>{this.props.stackProfile(this.props.item.first_name,this.props.item.last_name,this.props.item._id)}}>
                  {demcount>=11?<Text style={{ fontWeight:'bold',fontSize:15}}>{name}</Text>:
                                  <Text style={{ fontWeight:'bold',fontSize:15}}>{this.props.item.first_name} {this.props.item.last_name}</Text>}
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.rate}>{this.props.item.votes.vote_point_average.toFixed(0)}/5</Text> 
                  <Image 
                      source={require('../../images/star.png')}
                      style={{width:20,height:20,top:1}}
                      resizeMode="cover"
                  />
                </View>
              </View>
          </View>
          <TouchableOpacity onPress={()=>this.props.inviteClick(this.props.item._id)} style={{
              width:70,
              height:30,
              borderRadius:10,
              backgroundColor:'#009387',
              alignItems:'center',
              justifyContent:'center',
              shadowOffset:{width:0,height:3},
              shadowOpacity:0.2,
              shadowOpacity: 0.2,
              elevation: 3,
              borderColor:'#71B7B7',
              borderWidth:1,
              position:'absolute',
              right:20,
              top:30
            }} >
              <Text style={{ fontSize:13,color:'#ffff'}}>Invite</Text>
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
    ...Platform.select({
      ios: {
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        paddingTop:30,
        paddingBottom:-30
      },
      android: {
        height:height*0.08, 
      shadowOffset:{width:0,height:3},
      shadowOpacity:0.2,
      padding: 10,
      shadowOpacity: 0.2,
      elevation: 1,
      },
      default: {
        // other platforms, web for example
      }
    })
   
  },
  footer:{  
      marginTop:80,
      backgroundColor:'#faf9f9',
      borderTopLeftRadius: 30,
      borderTopRightRadius:30,
      paddingVertical:50,
      marginBottom:200,
      paddingHorizontal:30,
      height:800
  },
  image_container:{
    marginBottom:10,
    paddingVertical:10,
    paddingHorizontal:10,
    flexDirection:'row',
    borderRadius:10,
    width:width-80,
    backgroundColor:'rgba(200,200,200,0.3)',
    margin:10,
    
  },
  image_container1:{
    marginBottom:10,
    paddingVertical:10,
    paddingHorizontal:10,
    flexDirection:'row',
    borderRadius:10,
    height:90,
    width:width-100,
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
      height:50,
      borderRadius: 50,
  },
  button:{
    width:width-300,
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
  imageview: {
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'green',
    shadowOpacity: 0.5,
    elevation: 10,
    borderColor: '#71B7B7',
    borderRadius: 50,
    height:52,width:52,backgroundColor:'white'
},
});
