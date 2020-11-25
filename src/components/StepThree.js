import React, { Component } from "react";
import { View, Text, StyleSheet,TextInput, Picker, ScrollView, ToastAndroid,TouchableOpacity ,Dimensions} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const {height,width} =Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker';

export class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: ""
    };
  }
  change_bank(item) { 
    switch (item.value) {
        case '1': break;
        case '2': break;
    }

    this.setState({
        
    });
};
change_year(item) { 
  switch (item.value) {
      case '1': break;
      case '2': break;
  }

  this.setState({
      
  });
};
change_month(item) { 
  switch (item.value) {
      case '1': break;
      case '2': break;
  }

  this.setState({
      
  });
}
  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  render() {
    const { currentStep, totalSteps } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
         <View style={{marginLeft:70,marginBottom:20}}>
            <Text style={{fontSize:20,fontStyle:'italic',fontWeight:'bold'}}>Payment Information</Text>
        </View>
        <View>
        <Text style={styles.textall}>Bank</Text>
          <View style={styles.input}>
              <DropDownPicker        
                  items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                  ]}
                  defaultNull
                  placeholder=""
                  containerStyle={{height: 30}}
                  onChangeItem={(item)=> this.change_bank({item})}
                  style={styles.textinput}
              />
          </View>
          <Text style={styles.textall}>Account Number</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Release Date</Text>
          <View style={styles.input}>
              <DropDownPicker        
                  items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                  ]}
                  defaultNull
                  placeholder=""
                  containerStyle={{height: 30}}
                  onChangeItem={(item)=> this.change_month({item})}
                  style={styles.picker5}
              />
              <DropDownPicker        
                  items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                  ]}
                  defaultNull
                  placeholder=""
                  containerStyle={{height: 30}}
                  onChangeItem={(item)=> this.change_year({item})}
                  style={styles.picker6}
              />
          </View>
          <Text style={styles.textall}>Account Name</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <View style={styles.vitributton}>
            <TouchableOpacity style={styles.button1}>
                  <Text style={styles.buttontext}>CANCEL</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>alert('Nhin la dua 5k')}>
                  <Text style={styles.buttontext}>SAVE</Text> 
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
              <FontAwesome5 name="angle-left" size={24} color="#71B7B7" />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default StepThree;
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
    alignItems: "center"
  },
  textall:{
    marginTop:20,
    marginBottom:8,
    marginLeft:30,
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
  picker5:{
    backgroundColor:'#71B7B7',
    width:50,
    height:30,
    marginRight:30
  },
  picker6:{
    backgroundColor:'#71B7B7',
    width:50,
    height:30,
    marginRight:65
  },
  
  button:{
    backgroundColor:"#009387",
    justifyContent: 'center',
    borderRadius:4,
    width:80,
    height:30,
    marginLeft:80
  },
  button1:{
    backgroundColor:'grey',
    justifyContent: 'center',
    borderRadius:4,
    width:80,
    height:30,
    marginRight:30
  },
  buttontext:{
    textAlign:'center',
    fontSize:15,
    color:"white",
  },
  vitributton:{
    flexDirection:'row',
    marginTop:30,
    justifyContent:'center',
    marginBottom:50,
    
  },
})