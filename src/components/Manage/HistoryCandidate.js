import React from 'react';
import { View, Text, StyleSheet,Button,FlatList,Image,Modal,Keyboard,TextInput,TouchableWithoutFeedback,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {Avatar} from 'react-native-paper'
import io from 'socket.io-client/dist/socket.io';
import iconsuccess from '../../images/icon1.png'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import avatarimage from '../../images/avatar11.png';

const {height,width} =Dimensions.get('window');
var e;

export default class HistoryCandidate extends React.Component {
  constructor(props){
    super(props);
    e=this;
    this.socket = io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state={
      loadingdata: false,
      secret_key:'',
      dataemployee:[],
      task_title:'',
      showvote:false,
      refreshing:false,
      shownotice:false,
      vote:'',
      user_id:'',
      comment:'',
    }
    this.socket.on("sv-get-work-employee-job",function(data){
      var list=data.data
      if(data.success==false){
        console.log(JSON.stringify(data))
      }else if(data.success==true){
        e.setState({
          dataemployee:list,
          loadingdata:true
        })
      }
     
    })
    this._showVote = this._showVote.bind(this),
    this.onVote = this.onVote.bind(this)
    this.socket.on("sv-send-vote", function (data) {
      if (data.success == true) {
        e.setState({
          showvote: false,
          shownotice:true,
          vote:'',
          comment:''
        })
      } else {
        console.log(JSON.stringify(data));
      }
    })
  }
  componentDidMount=async()=>{
    var token= await AsyncStorage.getItem('token')
    const decode=jwt_decode(token)
    const getemployee ={
      secret_key:token, 
    }
    this.socket.emit("cl-get-work-employee-job",getemployee)
  }
  refreshTop() {
    this.componentDidMount()
  }
  _rating(item) {
    let rating = [];
    for (i = 0; i < item; i++) {
        rating.push(
            <Image
                source={sao}
                style={{ width: 15, height: 15, marginRight: 3 }}
                resizeMode="cover"
            />

        )
    }
    return rating;
  }
onVote= async () =>  {
  const token = await AsyncStorage.getItem('token')
  const vote = {
      secret_key:token,
      user_id: this.state.user_id,
      vote_point: this.state.vote,
      vote_comment: this.state.comment
  }
  this.socket.emit("cl-send-vote", vote)
  if(this.state.comment==""){
      e.setState({ 
          notice:"Please enter a comment"
      })
  }else if(this.state.vote==""){
      e.setState({ 
          notice:"Please select a star rating"
      })
  }
}
  renderFooter=()=>{
    return(
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }
  _showVote(_id){
    this.setState({
      showvote:true,
      user_id:_id
    })
  }
  render(){
    return(
      <View style={styles.container}>
        <Modal transparent={true}
                    visible={this.state.showvote}
                    animationType='slide'
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                           

                            <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            height: 220, width: "70%", justifyContent: 'center', alignItems: 'center'
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Vote</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ vote: 1 })}>
                                    <AntDesign name={this.state.vote >= 1 ? "star" : "staro"} size={24} color={this.state.vote >= 1 ? "#FFD700" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 2 })}>
                                    <AntDesign name={this.state.vote >= 2 ? "star" : "staro"} size={24} color={this.state.vote >= 2 ? "#FFD700" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 3 })}>
                                    <AntDesign name={this.state.vote >= 3 ? "star" : "staro"} size={24} color={this.state.vote >= 3 ? "#FFD700" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 4 })}>
                                    <AntDesign name={this.state.vote >= 4 ? "star" : "staro"} size={24} color={this.state.vote >= 4 ? "#FFD700" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 5 })}>
                                    <AntDesign name={this.state.vote == 5 ? "star" : "staro"} size={24} color={this.state.vote == 5 ? "#FFD700" : "black"} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={'Comment'}
                                onChangeText={(comment) => this.setState({ comment })}
                                value={this.state.comment}
                                placeholderTextColor={'#cccc'}
                                underlineColorAndroid='transparent'
                                multiline={true}
                             
                            >
                            </TextInput>
                            <View>
                                <Text style={{color:'red',fontStyle:'italic'}}>{this.state.notice}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%" }}>
                                <TouchableOpacity onPress={() => this.setState({ showvote: false, vote: 0 })} style={{
                                        width: "50%", backgroundColor:'#ffff',
                                        borderWidth:1,borderColor:'#488B8F',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5
                                    }}>
                                    <Text style={{ color: '#488B8F', fontSize: 15, fontWeight: 'bold' }}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onVote()} style={{
                                        width: "50%", backgroundColor:'#488B8F',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 5
                                    }}>
                                    <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>   
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal transparent={true}
                            visible={this.state.shownotice}
                            animationType='slide'
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={iconsuccess} style={{ height: 50, width: 50 }}></Image>
                                    <Text>Rate Success!</Text>
                                    <TouchableOpacity onPress={() => this.setState({ shownotice: false })} style={{
                                        width: "50%", backgroundColor: 'green' ,
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                {!this.state.loadingdata == true ?
                  <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' }}>
                    <ActivityIndicator size='large'></ActivityIndicator>
                  </View>
                  :this.state.dataemployee.length ===0 
                  ?
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#ffff" }}>
                    <Text>Blank task apply list</Text>
                  </View>
                  :
                  <View style={styles.flatlist}>
                    <FlatList data={this.state.dataemployee}
                      renderItem={({item,index})=>{
                        return(
                          <RenderItem stackToDetail={this.props.stackDetail} stackToProfile={this.props.stackProfile} showRate={this.state.showrate} show={this._showVote} item={item} index={index}></RenderItem>
                        )
                      }}
                      keyExtractor={(item)=>item._id.toString()}
                      refreshing={this.state.refreshing}
                      onRefresh={() => { this.refreshTop() }}
                    >
                    </FlatList>
                  </View>}
        </View>
    )
  }
}
class RenderItem  extends React.Component{
  render(){
    var task_title = this.props.item.task_title;
        if(task_title.length>=60){
            task_title = task_title.slice(0,60)+'...';
        }
      return(
        <View>
          {this.props.item.work_employee_list.map((task) => {
            var name = task.employee_last_name
            var demcount = task.employee_first_name.length+task.employee_last_name.length
            if(task.employee_last_name.length>=11){
              name = name.slice(0,11);
            }
            return(
              <View style={styles.image_container} key={task._id}>
                <View style={{flexDirection:'column'}}>
                  <TouchableOpacity onPress={()=>this.props.stackToDetail(this.props.item._id)} style={{flexDirection:'row'}}>
                      <View style={{marginLeft:20,}}>
                        <Avatar.Image source={this.props.item.task_owner_avatar?{uri:this.props.item.task_owner_avatar}:avatarimage} size={40}/>
                      </View>
                      <View style={{marginTop:10,marginLeft:20,width:width-170}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{task_title}</Text>
                      </View>
                  </TouchableOpacity>
                  <View style={{flexDirection:'row',marginTop:15,marginLeft:20}}>
                    <TouchableOpacity style={{height:55,width:55,backgroundColor:'white',shadowOffset: { width: 0, height: 3 },
    shadowColor: 'green',
    shadowOpacity: 0.5,
    elevation: 10,
    borderColor: '#71B7B7',borderRadius:50,justifyContent: 'center',alignItems: 'center'}} onPress={()=>this.props.stackToProfile(task.employee_first_name,task.employee_last_name,task.employee_id)}>
                      <Image source={task.employee_avatar?{uri:task.employee_avatar}:avatarimage} style={styles.image}/>
                    </TouchableOpacity>
                    <View style={{marginLeft:10,flexDirection:'column'}}>
                      <TouchableOpacity onPress={()=>this.props.stackToProfile(task.employee_first_name,task.employee_last_name,task.employee_id)}>
                          {demcount>=11?<Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>{name}</Text>:<Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>{task.employee_first_name} {task.employee_last_name}</Text>}
                      </TouchableOpacity>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontStyle:'italic',fontSize:14}}>{new Date(task.approved_time).toLocaleTimeString()}  </Text>
                        <Text style={{fontSize:14}}>{new Date(task.approved_time).toLocaleDateString()}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{position:'absolute',right:15,bottom:15}}>
                <TouchableOpacity onPress={()=>this.props.show(task.employee_id)} style={{
                          width:90,
                          height:30,
                          borderRadius:5,
                          backgroundColor:'#009387',
                          alignItems:'center',
                          justifyContent:'center',
                          shadowOffset:{width:0,height:3},
                          shadowOpacity:0.2,
                          shadowOpacity: 0.2,
                          elevation: 3,
                          borderColor:'#71B7B7',
                          borderWidth:1,
                        }}>
                            <Text style={{fontSize:15,color:'#ffff'}}>Rate</Text> 
                      </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </View>  
      )
  }
}

const styles = StyleSheet.create({
    container: {
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
      width:width-60,
      backgroundColor:'rgba(200,200,200,0.3)',
      margin:10,
      borderWidth:1,
      borderColor:'#2d7474'
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
  position:{
    fontWeight:'bold',
    fontSize:18
    
  },
  amount:{
    fontSize:16
  },
  image:{
    width:50,
    height:50,
    borderRadius:50
  },
  input: {
    width:230,
    height: 55,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: -10,
    color: '#2d7474',
    marginHorizontal: 25,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#2d7474'
  },
  });
  