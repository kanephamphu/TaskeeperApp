import React, { Component } from "react";
import { View, Text, StyleSheet,TextInput, Picker, ScrollView, ToastAndroid,TouchableOpacity ,Dimensions} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const {height,width} =Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 

export class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
    };
  }
  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    saveState({ email: "sam@test.com" });
    next();
  };

  render() {
    const { currentStep, totalSteps } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
        <View>
          <View style={{marginLeft:70,marginBottom:20}}>
              <Text style={{fontSize:20,fontStyle:'italic',fontWeight:'bold'}}>Contact Information</Text>
          </View>
          <Text style={styles.textall}>Email</Text>
                <View style={styles.input}>
                    <TextInput style={styles.textinput}></TextInput>
                </View>
                <Text style={styles.textall}>Phone</Text>
                <View style={styles.input}>
                    <TextInput style={styles.textinput}></TextInput>
                </View>
                <Text style={styles.textall}>Address</Text>
                <View style={styles.input}>
                    <TextInput style={styles.textinput}></TextInput>
                </View>
                <View style={{marginLeft:70}}>
                    <Text style={{fontSize:20,fontStyle:'italic',fontWeight:'bold',marginTop:20}}>Education Information</Text>
                </View>
                <Text style={styles.textall}>University</Text>
                <View style={styles.input}>
                    <TextInput style={styles.textinput}></TextInput>
                </View>
                <Text style={styles.textall}>Major</Text>
                <View style={styles.input}>
                    <TextInput style={styles.textinput}></TextInput>
                </View>
        </View>
        <View style={[styles.btnContainer, styles.marginAround]}>
          <TouchableOpacity onPress={this.props.back} style={[styles.btnStyle,{marginRight:20}]}>
              <FontAwesome5 name="angle-left" size={24} color="#71B7B7" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
              <FontAwesome5 name="angle-right" size={24} color="#71B7B7" />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default step2;
const styles = StyleSheet.create ({
  container: {
    flex: 1,
   justifyContent:'center'
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "6%"
  },
  btnStyle: {
    borderColor: "#71B7B7",
    borderWidth: 2,
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textall:{
    marginTop:20,
    marginBottom:8,
    marginLeft:50,
    fontSize:15
},
input:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#faf9f9',
},
textinput:{
    backgroundColor:'#71B7B7',
    borderRadius:3,
    color:'black',
    width:200,
    height:30,
  },
})