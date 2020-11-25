import  React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,Switch,ScrollView,ToastAndroid} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';  
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import {Avatar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
/*import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';*/
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

/*const homePlace = {description:'Home',geometry:{location:{lat:48.8152937,lng:2.4597668}}};
const workPlace = {description:'Work',geometry:{location:{lat:48.8496818,lng:2.2940881}}};*/
var e;
var gender = [
  {label:"Yes",value:0},
  {label:"No",value:1}
];

class PostTask extends Component {
  constructor(props) {
    super(props);
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state = {
      secret_key:'',
      task_requirement:'',
      task_description:'',
      task_type:'',
      price_type:'unextract',
      low_price:'',
      high_price:'',
      location:'',
      collapsed:true,
      visibility:false,
      collapsed1:true,
      visibility1:false,
      switchValue:false,
      DateDisplay:"",
      DateDisplay1:""
    };
  this.onSubmit = this.onSubmit.bind(this)
  this.socket.on('sv-new-tasks',function(data){
    if(data.success==true){
      alert('them thanh cong')
    }
    else if(data.success==false){
      alert(JSON.stringify(data.errors))
    }
  })
}
componentDidMount = async()=>{
  const token = await AsyncStorage.getItem('token');
  this.setState({
    secret_key:token,
  })
}
onSubmit(){
  if(this.state.task_requirement==""){
    alert("Vui lòng nhập task requirement")
  }
  else if(this.state.task_description=="")
  {
    alert("vui lòng nhập task description")
  }
  /*else if(this.state.task_type==""){
    alert("vui lòng nhập task type")
  }*/
  else if(this.state.location==""){
    alert("vui lòng nhập địa chỉ")
  }
  else if(this.state.floor_price==""){
    alert("vui lòng nhập giá khởi điểm")
  }
  else if(this.state.ceiling_price==""){
    alert("vui lòng nhập giá kết thúc")
  }
  else{
    const tasknew={
      secret_key:this.state.secret_key,
      task_title:this.state.task_requirement,
      task_description:this.state.task_description,
      task_type:'freelance',
      price_type:this.state.price_type,
      floor_price:this.state.low_price,
      ceiling_price:this.state.high_price,
      location:this.state.location,
    }
    this.socket.emit("cl-new-tasks",tasknew)
  }
}
toggleSwitch = (value) => {
  //onValueChange of the switch this function will be called
  this.setState({switchValue: value})
  //state changes according to switch
  //which will result in re-render the text
}
handleConfirm=(date)=>{
  this.setState({DateDisplay:date.toUTCString()})
} 
onPressCancel=()=>{
  this.setState({visibility:false})
}
onPressButton=()=>{
  this.setState({visibility:true}) 
}
toggleExpanded =() =>{
  this.setState({collapsed:!this.state.collapsed})
}
toggleExpanded1 =() =>{
  this.setState({collapsed1:!this.state.collapsed1})
}
handleConfirm1=(date)=>{
  this.setState({DateDisplay1:date.toUTCString()})
} 
onPressCancel1=()=>{
  this.setState({visibility1:false})
}
onPressButton1=()=>{
  this.setState({visibility1:true}) 
}
changeJob(item) { 
    switch (item.value) {
        case '1':
        break;
        case '2':
        break;
    }

    this.setState({
        
    });
}
changeLocation(item){
  switch (item.value) {
    case '1':
    break;
    case '2':
    break;
}

this.setState({
    
});
}
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginTop:40,marginLeft:20,flexDirection:'row'}}>
              <Entypo name="chevron-left" size={32} color="#5ea3a3" />
              <Text style={{fontSize:23,fontWeight:'bold',color:'#5ea3a3'}}>New Task</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSubmit} style={{marginTop:40,marginLeft:180}}>
              <Text style={{fontSize:23,fontWeight:'bold',color:'#5ea3a3' }}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/80/'
                }} 
                size={80}
                style={{marginTop:10, marginLeft:30}}
            />
            <View style={{marginTop:20,marginLeft:5,flexDirection:'column'}}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Thanh Ngan</Text>
              <View style={{flexDirection:'row'}}>
                <DropDownPicker
                      items={[
                          {label: 'Freelance', value: '1'},
                          {label: 'Coder', value: '2'},
                      ]}
                      defaultNull
                      placeholder=""
                      containerStyle={{height: 30,width:110}}
                      onChangeItem={(task_type)=> this.setState({task_type})}
                      style={{backgroundColor:'#5ea3a3'}}
                  />
                  <DropDownPicker
                      items={[
                          {label: 'Tam Ky', value: '1'},
                          {label: 'Da Nang', value: '2'},
                      ]}
                      defaultNull
                      placeholder="Place Location"
                      containerStyle={{height: 30,width:150}}
                      onChangeItem={item => this.changeLocation(item)}
                      style={{backgroundColor:'#5ea3a3',marginLeft:5}}
                  />
                </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.mainpost}>
            <View style={{position:'absolute',top:0,width:360,marginTop:20,borderBottomWidth:2,borderBottomColor:'#71B7B7'}}>
                <Text style={{left:15,fontWeight:'bold',fontSize:20,color:'black', }}>Enter position</Text>
            </View>
            <View style={{marginTop:60}}>
              <TextInput 
                style={styles.input}
                placeholder={'Job Description'} 
                onChangeText={(task_description)=> this.setState({task_description})}
                placeholderTextColor={'black'}
                underlineColorAndroid='transparent'
                multiline={true}
              >
              </TextInput>
              <View style={styles.inputIcon}>
                    <FontAwesome name="plus" size={28} color="#5ea3a3" />
              </View>
            </View>
            <View style={{marginTop:10,marginBottom:20}}>
              <TextInput 
                style={styles.input}
                placeholder={'Job Requirement'} 
                onChangeText={(task_requirement)=> this.setState({task_requirement})}
                placeholderTextColor={'black'}
                underlineColorAndroid='transparent'
                multiline={true}
              >
              </TextInput>
              <View style={styles.inputIcon}>
                    <FontAwesome name="plus" size={28} color="#5ea3a3" />
              </View>
            </View>
            <TouchableOpacity style={{marginBottom:10}} onPress={this.toggleExpanded}>
                <View style={{width:350,height:50,backgroundColor:'#fff',borderRadius:5,borderWidth:1,borderColor:'#2d7474',borderBottomWidth:3,borderBottomColor:'grey'}}>
                  <View style={{top:10,left:23,flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold',fontSize:18}}>Job Date</Text>
                    <MaterialCommunityIcons name="calendar" size={28} color="#5ea3a3" style={{marginLeft:200}} />
                  </View>
                </View>
            </TouchableOpacity>
            <Collapsible style={{backgroundColor:'#fff',height:100,width:350,borderBottomWidth:1,borderColor:"#2d7474",borderLeftWidth:1,borderLeftColor:"#2d7474",borderRightWidth:1,borderRightColor:"#2d7474",borderRadius:5}} collapsed={this.state.collapsed}>
                <TouchableOpacity style={{backgroundColor:'#fff',marginLeft:30}} onPress={this.onPressButton}><Text style={{fontSize:18,fontWeight:'bold'}}>From</Text></TouchableOpacity>
                <Text>{this.state.DateDisplay}</Text>
                <DateTimePickerModal 
                    isVisible={this.state.visibility}
                    onConfirm={this.handleConfirm}
                    onCancel={this.onPressCancel}
                    mode="date"
                />
                <TouchableOpacity style={{backgroundColor:'#fff',marginLeft:30}} onPress={this.onPressButton1}><Text style={{fontSize:18,fontWeight:'bold'}}>To</Text></TouchableOpacity>
                <Text>{this.state.DateDisplay1}</Text>
                <DateTimePickerModal 
                    isVisible={this.state.visibility1}
                    onConfirm={this.handleConfirm1}
                    onCancel={this.onPressCancel1}
                    mode="date"
                />
            </Collapsible>
            <View style={{justifyContent:'center',width:400,height:50, marginBottom:10}}>
              {/*<GooglePlacesAutocomplete
                  placeholder='Place your address'
                  minLength={2}
                  autoFocus={false}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}
                  getDefaultValue={()=>{
                    return 'Mataram';
                  }}
                  query={{
                    key: "AIzaSyAxdZB4lGeaCxY-Qiojx1EuVK25pxFyKkM",
                    language: 'en',
                    types:'(cities)'
                  }}
                  styles={{
                    description:{
                      fontWeight:'bold'
                    },
                    predefinedPlacesDescription:{
                      color:'#1faadb'
                    }
                  }}

                  filterReverseGeocodingByTypes={['locality','administrative_area_level_3']}
                  predefinedPlacesAlwaysVisible={true}
                />*/}
                <TextInput 
                style={styles.input}
                placeholder={'Address'} 
                onChangeText={(location)=> this.setState({location})}
                placeholderTextColor={'black'}
                underlineColorAndroid='transparent'
                multiline={true}
              >
              </TextInput>
              </View>
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'column'}}>
                <View style={{marginBottom:10}}>
                  <TextInput 
                    style={styles.input1}
                    placeholder={'Low Salary'} 
                    onChangeText={(low_price)=> this.setState({low_price})}
                    placeholderTextColor={'black'}
                    underlineColorAndroid='transparent'
                    multiline={true}
                  >
                  </TextInput>
                  <View style={styles.inputIcon}>
                        <MaterialIcons name="attach-money" size={28} color="#488B8F" />
                  </View>
                </View>
                <View >
                  <TextInput 
                    style={styles.input1}
                    placeholder={'High Salary'} 
                    onChangeText={(high_price)=> this.setState({high_price})}
                    placeholderTextColor={'black'}
                    underlineColorAndroid='transparent'
                    multiline={true}
                  >
                  </TextInput>
                  <View style={styles.inputIcon}>
                        <MaterialIcons name="attach-money" size={28} color="#488B8F" />
                  </View>
                </View>
              </View>
                <View style={{flexDirection:'row',marginTop:50,marginRight:60}}>
                  <View>
                    <Switch 
                      value={this.state.switchValue}
                      onValueChange = {this.toggleSwitch}
                    />
                  </View>
                  <Text style={{fontWeight:'bold',fontSize:18}}>Hide/Show</Text>
                </View>
            </View>
            <TouchableOpacity style={{marginTop:20}} onPress={this.toggleExpanded1}>
              <AntDesign name="circledown" size={28} color="black" />
            </TouchableOpacity>
            <Collapsible style={{alignItems:'center',height:220,width:390,backgroundColor:'#ffffe6',borderRadius:5, borderRightWidth:1,borderLeftWidth:1,borderBottomWidth:3,borderLeftColor:'grey',borderRightColor:'grey',borderBottomColor:'grey'}} collapsed={this.state.collapsed1}>
              <View style={{marginTop:10}}>
                    <TextInput 
                      style={{paddingTop:-10,paddingLeft:45,marginHorizontal:25,fontWeight:'bold',fontSize:18,borderBottomWidth:1,borderBottomColor:'#71B7B7',height:35,width:350}}
                      placeholder={'Office Name'} 
                      placeholderTextColor={'black'}
                      underlineColorAndroid='transparent'
                      multiline={true}
                    >
                    </TextInput>
                    <View style={styles.inputIcon2}>
                      <FontAwesome5 name="building" size={24} color="red" />
                    </View>
              </View>
              <View style={{marginTop:10}}>
                  <TextInput 
                    style={{paddingTop:-10,paddingLeft:45,marginHorizontal:25,fontWeight:'bold',fontSize:18,borderBottomWidth:1,borderBottomColor:'#71B7B7',height:35,width:350}}
                    placeholder={'Working Time'} 
                    placeholderTextColor={'black'}
                    underlineColorAndroid='transparent'
                    multiline={true}
                  >
                  </TextInput>
                  <View style={styles.inputIcon2}>
                    <FontAwesome5 name="calendar-alt" size={24} color="red" />
                  </View>
              </View>
              <View style={{flexDirection:'row',marginTop:10}}>
                  <Text style={{fontSize:18,fontWeight:'bold',marginRight:20,marginTop:12}}>Company Logo</Text>
                <TouchableOpacity onPress={()=>alert('Chưa đổi được đâu, lêu lêu')}>
                  <View>
                  <Image style={styles.imageStyle}
                        source={{uri: 'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/p960x960/61161994_2309453439313128_7136077429180727296_o.jpg?_nc_cat=111&_nc_sid=7aed08&_nc_ohc=WeYP7NkTBwMAX8LpnIK&_nc_ht=scontent-xsp1-1.xx&tp=6&oh=fa812121453885256498f4ea68981b91&oe=5F74B168'}}>
                  </Image>
                  <View style={{position:'absolute',top:35,left:35}}>
                    <AntDesign name="pluscircle" size={24} color="yellow" />
                  </View>
                  </View>
                </TouchableOpacity>
              </View>
                <View style={{marginTop:10,flexDirection:'row'}}>
                    <FontAwesome5 style={{marginRight:60}}  name="user-clock" size={28} color="red" />
                    <RadioForm  
                      style={{marginRight:80, marginTop:5}}
                      radio_props={gender}
                      initial={0}
                      formHorizontal={true}
                      onPress={(value) => {ToastAndroid.show(value.toString(),ToastAndroid.SHORT)}}
                      buttonSize={10}
                      selectedButtonColor={'black'}
                      selectedLabelColor={'black'}
                      labelColor={'black'}
                      buttonColor={'black'}
                    />
                </View>
            </Collapsible>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default PostTask;
const styles = StyleSheet.create({
  container:{
    flex: 1,  
    backgroundColor: '#faf9f9'
  },
  header:{
    height:180,
    flexDirection:'column',
  },
  mainpost:{
    flex: 1,
    alignItems: 'center', 
    flexDirection:'column',
  },
  input:{
    width:350,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#2d7474',
    borderBottomWidth:3,
    borderBottomColor:'grey',
    fontSize:18,
    paddingLeft:45,
    paddingTop:-10,
    backgroundColor:'#fff',
    marginHorizontal:25,
    marginTop:10,
    fontWeight:'bold'
  },
  input1:{
    width:150,
    height:50,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#2d7474',
    borderBottomWidth:3,
    borderBottomColor:'grey',
    fontSize:18,
    paddingLeft:45,
    paddingTop:-10,
    backgroundColor:'#fff',
    marginHorizontal:25,
    marginTop:10,
    fontWeight:'bold'
  },
  inputIcon:{
    position:'absolute',
    top:13,
    left:40
  },
  inputIcon2:{
    position:'absolute',
    top:5,
    left:40
  },
  imageStyle:{
    width: 50, height: 50,
    marginBottom:20,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,marginRight:100
  }
})