import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, ScrollView, ToastAndroid, TouchableOpacity, Dimensions } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { height, width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
var gender = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 }
];

class ChangeProfileUser extends Component {
  constructor() {
    super();
    this.state = {
      PickerValue1: '',
      PickerValue2: '',
      PickerValue3: '',
      PickerValue4: '',
    }
  };
  clickme = () => {
    var data1 = this.state.PickerValue1;
    var data2 = this.state.PickerValue2;
    var data3 = this.state.PickerValue3;
    var data4 = this.state.PickerValue4;
    if (data1 == "") {
      alert("Please select day");
    }
    if (data2 == "") {
      alert("Please select month");
    }
    if (data3 == "") {
      alert("Please select year");
    }
    if (data4 == "") {
      alert("Please select region");
    }
  };
  render() {
    return (

      <View style={styles.container}>
        <View style={styles.header0}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate("ProfileUser")}>
            <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#71B7B7" />
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#71B7B7', marginLeft: 15, marginTop: -2 }}>Change Profile</Text>
          </TouchableOpacity>
        </View>
        <ScrollView >
          <Text style={styles.textall}>First Name</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Last Name</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Birthday</Text>
          <View style={styles.input}>
            <Picker
              style={styles.picker1}
              selectedValue={this.state.PickerValue1}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue1: itemValue })}
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
              <Picker.Item label='7' value='7' />
              <Picker.Item label='8' value='8' />
              <Picker.Item label='9' value='9' />
              <Picker.Item label='10' value='10' />
              <Picker.Item label='11' value='11' />
              <Picker.Item label='12' value='12' />
              <Picker.Item label='13' value='13' />
              <Picker.Item label='14' value='14' />
              <Picker.Item label='15' value='15' />
              <Picker.Item label='16' value='16' />
              <Picker.Item label='17' value='17' />
              <Picker.Item label='18' value='18' />
              <Picker.Item label='19' value='19' />
              <Picker.Item label='20' value='20' />
              <Picker.Item label='21' value='21' />
              <Picker.Item label='22' value='22' />
              <Picker.Item label='23' value='23' />
              <Picker.Item label='24' value='24' />
              <Picker.Item label='25' value='25' />
              <Picker.Item label='26' value='26' />
              <Picker.Item label='27' value='27' />
              <Picker.Item label='28' value='28' />
              <Picker.Item label='29' value='29' />
              <Picker.Item label='30' value='30' />
              <Picker.Item label='31' value='31' />
            </Picker>
            <Picker
              style={styles.picker2}
              selectedValue={this.state.PickerValue2}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue2: itemValue })}
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
              <Picker.Item label='7' value='7' />
              <Picker.Item label='8' value='8' />
              <Picker.Item label='9' value='9' />
              <Picker.Item label='10' value='10' />
              <Picker.Item label='11' value='11' />
              <Picker.Item label='12' value='12' />
            </Picker>
            <Picker
              style={styles.picker3}
              selectedValue={this.state.PickerValue3}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue3: itemValue })}
            >
            </Picker>
          </View>
          <Text style={styles.textall}>Gender</Text>
          <View style={styles.input}>
            <RadioForm
              radio_props={gender}
              initial={0}
              formHorizontal={true}
              onPress={(value) => { ToastAndroid.show(value.toString(), ToastAndroid.SHORT) }}
              buttonSize={10}
              selectedButtonColor={'#71B7B7'}
              selectedLabelColor={'black'}
              labelColor={'black'}
              buttonColor={'#71B7B7'}
            />
          </View>
          <Text style={styles.textall}>Identify Number</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Region</Text>
          <View style={styles.input}>
            <Picker
              style={styles.picker4}
              selectedValue={this.state.PickerValue4}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue4: itemValue })}
            >
            </Picker>
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
          <Text style={styles.textall}>University</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Major</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Bank</Text>
          <View style={styles.input}>
            <Picker
              style={styles.picker4}
              selectedValue={this.state.PickerValue5}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue5: itemValue })}
            >
            </Picker>
          </View>
          <Text style={styles.textall}>Account Number</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <Text style={styles.textall}>Release Date</Text>
          <View style={styles.input}>
            <Picker
              style={styles.picker5}
              selectedValue={this.state.PickerValue6}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue6: itemValue })}
            >
            </Picker>
            <Picker
              style={styles.picker6}
              selectedValue={this.state.PickerValue7}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue7: itemValue })}
            >
            </Picker>
          </View>
          <Text style={styles.textall}>Account Name</Text>
          <View style={styles.input}>
            <TextInput style={styles.textinput}></TextInput>
          </View>
          <View style={styles.vitributton}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileUser")} style={styles.button1}>
              <Text style={styles.buttontext}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttontext}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

    );
  }
}
export default ChangeProfileUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f9',
    flexDirection: 'column',
  },
  textall: {
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 30,
    fontSize: 15
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#faf9f9',
  },
  textinput: {
    backgroundColor: '#71B7B7',
    borderRadius: 3,
    color: 'black',
    width: 200,
    height: 30,
  },
  picker1: {
    backgroundColor: '#71B7B7',
    width: 50,
    height: 30,
    marginRight: 20
  },
  picker2: {
    backgroundColor: '#71B7B7',
    width: 50,
    height: 30,
    marginRight: 25
  },
  picker3: {
    backgroundColor: '#71B7B7',
    width: 57,
    height: 30,
  },
  picker4: {
    backgroundColor: '#71B7B7',
    borderRadius: 3,
    color: 'black',
    width: 200,
    height: 30,
  },
  picker5: {
    backgroundColor: '#71B7B7',
    width: 50,
    height: 30,
    marginRight: 30
  },
  picker6: {
    backgroundColor: '#71B7B7',
    width: 50,
    height: 30,
    marginRight: 65
  },
  header0: {
    height: height * 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS == 'android' ? 25 : null,
  },
  button: {
    backgroundColor: "#009387",
    justifyContent: 'center',
    borderRadius: 4,
    width: 80,
    height: 30,
    marginLeft: 80
  },
  button1: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: 4,
    width: 80,
    height: 30,
    marginRight: 30
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 15,
    color: "white",
  },
  vitributton: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    marginBottom: 50,

  },
})