import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, Picker, ScrollView, ToastAndroid, Dimensions } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { height, width } = Dimensions.get('window');
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';

var gender = [
  { label: "male", value: "male" },
  { label: "female", value: "female" }
];
var e;

class StepOne extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
    this.state = {
      totalSteps: "",
      currentStep: "",
      secret_key: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      gender: '',
      day_of_birth: '',
      month_of_birth: '',
      year_of_birth: '',
      items: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        { label: '25', value: '25' },
        { label: '26', value: '26' },
        { label: '27', value: '27' },
        { label: '28', value: '28' },
        { label: '29', value: '29' },
        { label: '30', value: '30' },
        { label: '31', value: '31' },
      ],
      itemsyear: [],
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.socket.on('sv-edit-info', function (data) {
      if (data.success == true) {
        alert('Update success');
      }
      else if (data.success == false) {
        var dataserver = data.errors
        if (data.errors.first_name) {
          alert("Chưa điền tên,vui lòng nhập!")
        } else if (data.errors.last_name) {
          alert("Chưa điền họ,vui lòng nhập! ")

        } else if (data.errors.email) {
          alert("Chưa điền email,vui lòng nhập!")

        } else if (data.errors.phone_number) {
          alert("Chưa nhập số điện thoại, vui lòng nhập!")

        }
        else if (data.errors.day_of_birth) {
          alert("Chưa nhập ngày sinh , vui lòng nhập!")
        }
        else if (data.errors.month_of_birth) {
          alert("Chưa nhập tháng sinh , vui lòng nhập!")
        }
        else if (data.errors.year_of_birth) {
          alert("Chưa nhập năm sinh , vui lòng nhập!")
        }
        
      }
    })
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    var dataitem = [];
    for (var i = 1990; i <= 2020; i++) {
      dataitem.push({ value: "" + i + "", label: "" + i + "" });
    }
    this.setState({
      secret_key: token,
      itemsyear: JSON.stringify(dataitem)
    })
  }
  onSubmit() {
    const updateprofile = {
      secret_key: this.state.secret_key,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      gender: this.state.gender,
      day_of_birth: this.state.day_of_birth.value,
      month_of_birth: this.state.month_of_birth.value,
      year_of_birth: this.state.year_of_birth.value
    }
    this.socket.emit("cl-edit-info", updateprofile)
  }
  change_day(item) {
    switch (item.value) {
      case '1': break;
      case '2': break;
      case '3': break;
      case '4': break;
      case '5': break;
      case '6': break;
      case '7': break;
      case '8': break;
      case '9': break;
      case '10': break;
      case '11': break;
      case '12': break;
      case '13': break;
      case '14': break;
      case '15': break;
      case '16': break;
      case '17': break;
      case '18': break;
      case '19': break;
      case '20': break;
      case '21': break;
      case '22': break;
      case '23': break;
      case '24': break;
      case '25': break;
      case '26': break;
      case '27': break;
      case '28': break;
      case '29': break;
      case '30': break;
      case '31': break;
    }

    this.setState({

    });
  }

  change_month(item) {
    switch (item.value) {
      case '1': break;
      case '2': break;
      case '3': break;
      case '4': break;
      case '5': break;
      case '6': break;
      case '7': break;
      case '8': break;
      case '9': break;
      case '10': break;
      case '11': break;
      case '12': break;
    }

    this.setState({

    });
  }
  change_year(item) {
    switch (item.value) {
      case '1': break;
      case '2': break;
    }

    this.setState({

    });
  }
  change_region(item) {
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

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;

    return (

      <View style={[styles.container]}>
        <ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}>Personal Information</Text>
          </View>
          <View >
            <Text style={styles.textall}>First Name:</Text>
            <View style={styles.input}>
              <TextInput placeholder="First name" onChangeText={(first_name) => this.setState({ first_name })} value={this.state.first_name} style={styles.textinput}></TextInput>
            </View>
            <Text style={styles.textall}>Last Name:</Text>
            <View style={styles.input}>
              <TextInput placeholder="Last name" onChangeText={(last_name) => this.setState({ last_name })} style={styles.textinput}></TextInput>
            </View>
            <Text style={styles.textall}>Email:</Text>
            <View style={styles.input}>
              <TextInput placeholder="Email" onChangeText={(email) => this.setState({ email })} value={this.state.email} style={styles.textinput}></TextInput>
            </View>
            <Text style={styles.textall}>Phone number:</Text>
            <View style={styles.input}>
              <TextInput placeholder="Phone number" onChangeText={(phone_number) => this.setState({ phone_number })} value={this.state.phone_number} style={styles.textinput}></TextInput>
            </View>
            <Text style={styles.textall}>Birthday:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <DropDownPicker
                items={this.state.items}
                defaultNull
                placeholder=""
                containerStyle={{ height: 30 }}
                onChangeItem={(day_of_birth) => this.setState({ day_of_birth })}
                style={styles.picker1}
              />
              <DropDownPicker
                items={[
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                  { label: '5', value: '5' },
                  { label: '6', value: '6' },
                  { label: '7', value: '7' },
                  { label: '8', value: '8' },
                  { label: '9', value: '9' },
                  { label: '10', value: '10' },
                  { label: '11', value: '11' },
                  { label: '12', value: '12' },
                ]}
                defaultNull
                placeholder=""
                onChangeItem={(month_of_birth) => this.setState({ month_of_birth })}
                style={styles.picker2}
              />
              <DropDownPicker
                items={[
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                ]}
                defaultNull
                placeholder=""
                onChangeItem={(year_of_birth) => this.setState({ year_of_birth })}
                style={styles.picker3}
              />
            </View>
            <Text style={styles.textall}>Gender:</Text>
            <View style={styles.input}>
              <RadioForm
                radio_props={gender}
                initial={0}
                formHorizontal={true}
                onPress={(gender) => this.setState({ gender })}
                buttonSize={10}
                selectedButtonColor={'#71B7B7'}
                selectedLabelColor={'black'}
                labelColor={'black'}
                buttonColor={'#71B7B7'}

              />

            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity /*onPress={this.nextStep}*/ onPress={this.onSubmit} style={styles.btnStyle}>
              <FontAwesome5 name="angle-right" size={24} color="#71B7B7" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default StepOne;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
  textall: {
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 50,
    fontSize: 15
  },
  input: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#faf9f9',
    alignContent: 'space-between'
  },
  textinput: {
    backgroundColor: '#ffff',
    borderRadius: 3,
    width: 300,
    height: 35,
    borderWidth: 1,
    padding: 10,
    borderColor: '#71B7B7'
  },
  picker1: {
    backgroundColor: '#ffff',
    width: 60,
    height: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#71B7B7'
  },
  picker2: {
    backgroundColor: '#ffff',
    width: 60,
    height: 30,
    marginRight: 10,
    borderColor: '#71B7B7',
    borderWidth: 1,
  },
  picker3: {
    backgroundColor: '#ffff',
    width: 90,
    height: 30,
    borderColor: '#71B7B7',
    borderWidth: 1,
  },
});