import  React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, Picker, ScrollView, ToastAndroid,TouchableOpacity ,Dimensions} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const {height,width} =Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 
import AnimatedMultistep from "react-native-animated-multistep";
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
const allSteps = [
  {name:'step 1',component: StepOne},
  {name:'step 2',component: StepTwo},
  {name:'step 3',component: StepThree},
];
var e;
class ChangeProfileUser extends Component {
  constructor(props){
    super(props);
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state={};
  }
  onNext = () => {
    console.log("Next");
  };
  onBack = () => {
    console.log("Back");
  };

  finish = state => {
    console.log("TCL: App -> state", state);
  };
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header0}> 
            <TouchableOpacity  style={{flexDirection:'row'}}onPress={()=>this.props.navigation.goBack()}>
                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#71B7B7" />
                  <Text style={{fontWeight:'bold',fontSize:25,color:'#71B7B7',marginLeft:15,marginTop:-2}}>Change Profile</Text>
            </TouchableOpacity>
        </View>
          <AnimatedMultistep
            steps={allSteps}
            onFinish={this.finish}
            animate={true}
            onBack={this.onBack}
            onNext={this.onNext}
          />
      </View>
    );
  }
}
export default ChangeProfileUser;
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: "#faf9f9",
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
});