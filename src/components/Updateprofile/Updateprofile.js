import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet, Modal, ScrollView, ToastAndroid, Dimensions } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { height, width } = Dimensions.get('window');
import DropDownPicker from 'react-native-dropdown-picker';
import io from 'socket.io-client/dist/socket.io';
import iconsuccess from '../../images/checked.png';
import iconerror from '../../images/close.png';
import {socket} from "../../Socket.io/socket.io";
import AsyncStorage from '@react-native-community/async-storage';

var gender = [
    { label: "male", value: "male" },
    { label: "female", value: "female" }
];
var e;

class Updateprofile extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            totalSteps: "",
            currentStep: "",
            secret_key: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            gender: 'male',
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
            shownotice:false
        };
        this.onSubmit = this.onSubmit.bind(this)
      socket.on('sv-edit-info', function (data) {
            if (data.success == true) {
                e.setState({
                    showedit:false,
                    shownotice:true,
                    notice:'Updated successfully!',
                    key:"success"
                })
                console.log(data)
            }
            else if (data.success == false) {
                var dataserver = data.errors
                console.log(data.errors)
                if (data.errors.first_name) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your first name!',
                        key:"error"
                    })
                } else if (data.errors.last_name) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your last name!',
                        key:"error"
                    })

                } else if (data.errors.email) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your email!',
                        key:"error"
                    })

                } else if (data.errors.phone_number) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your phone number!',
                        key:"error"
                    })
                }
                else if (data.errors.day_of_birth) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your day of birth!',
                        key:"error"
                    })
                }
                else if (data.errors.month_of_birth) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your month of birth!',
                        key:"error"
                    })
                }
                else if (data.errors.year_of_birth) {
                    e.setState({             
                        shownotice:true,
                        notice:'Please enter your year of birth!',
                        key:"error"
                    })
                }
                   
            }
        })
    }
    componentDidMount = async () => {
       
       this.onRefresh()
    }
    onRefresh= async () => {
        const token = await AsyncStorage.getItem('token');
        var dataitem = [];
        for (var i = 1990; i <= 2020; i++) {
            dataitem.push({ value: "" + i + "", label: "" + i + "" });
        }
        this.setState({
            secret_key: token,
            itemsyear: JSON.stringify(dataitem),
        })
    }
    onSubmit() {
        const updateprofile = {
            secret_key: this.state.secret_key,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            gender: this.state.gender,
            day_of_birth: this.state.day_of_birth.value,
            month_of_birth: this.state.month_of_birth.value,
            year_of_birth: this.state.year_of_birth.value
        }
        socket.emit("cl-edit-info", updateprofile)
       
        this.onRefresh()
    }
   
    change_region(item) {
        switch (item.value) {
            case '1': break;
            case '2': break;
        }

        this.setState({

        });
    }
    goBack() {
        const { back } = this.props;
        // Go to previous step
        back();
    }

    render() {
        return (
            <View style={[styles.container]}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }}>Personal Information</Text>
                    </View>
                    <View style={{backgroundColor:'#faf9f9'}}>
                        <Text style={styles.textall}>First Name:</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="First name"  onChangeText={(first_name) => this.setState({ first_name })} value={this.state.first_name} style={styles.textinput}></TextInput>
                        </View>
                        <Text style={styles.textall}>Last Name:</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="Last name" onChangeText={(last_name) => this.setState({ last_name })} value={this.state.last_name} style={styles.textinput}></TextInput>
                        </View>
                        <Text style={styles.textall}>Phone number:</Text>
                        <View style={styles.input}>
                            <TextInput placeholder="Phone number" onChangeText={(phone_number) => this.setState({ phone_number })} value={this.state.phone_number} value={this.state.phone_number} style={styles.textinput}></TextInput>
                        </View>
                            <Text style={styles.textall}>Birthday:</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <DropDownPicker
                                items={this.state.items}
                                placeholder=""
                                containerStyle={{ height: 30 }}
                                onChangeItem={(day_of_birth) => this.setState({ day_of_birth })}
                                style={styles.picker1}
                            />
                            <DropDownPicker
                                items={[
                                    { label: '1', value: 1 },
                                    { label: '2', value: 2 },
                                    { label: '3', value: 3 },
                                    { label: '4', value: 4 },
                                    { label: '5', value: 5},
                                    { label: '6', value: 6 },
                                    { label: '7', value: 7 },
                                    { label: '8', value: 8 },
                                    { label: '9', value: 9 },
                                    { label: '10', value: 10 },
                                    { label: '11', value: 11 },
                                    { label: '12', value: 12 },
                                ]}
                                defaultNull
                                placeholder=""
                                onChangeItem={(month_of_birth) => this.setState({ month_of_birth })}
                                style={styles.picker2}
                            />
                            <DropDownPicker
                                items={ [
                                    { label: '1990', value: 1990 },
                                    { label: '1991', value: 1991 },
                                    { label: '1992', value: 199 },
                                    { label: '1993', value: 1993 },
                                    { label: '1994', value: 1994},
                                    { label: '1995', value: 1995 },
                                    { label: '1996', value: 1996 },
                                    { label: '1997', value: 1997 },
                                    { label: '1998', value: 1998 },
                                    { label: '1999', value: 1999 },
                                    { label: '2000', value: 2000 },
                                    { label: '2001', value: 2001 },
                                    { label: '2002', value: 2002 }, 
                                    { label: '2003', value: 2003 },  
                                    { label: '2004', value: 2004 },  
                                    { label: '2005', value: 2005 },  
                                    { label: '2006', value: 2006 },    
                                ]}
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
                                defaultValue={this.state.gender}
                                selectedButtonColor={'#71B7B7'}
                                selectedLabelColor={'black'}
                                labelColor={'black'}
                                buttonColor={'#71B7B7'}

                            />

                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity /*onPress={this.nextStep}*/ onPress={this.onSubmit} style={styles.btnStyle}>
                           <Text style={{fontWeight: 'bold',color: '#ffff',fontSize: 20}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
                                    <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                                    <Text>{this.state.notice}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ shownotice: false })} style={{
                                        width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
            </View>
        );
    }
}

export default Updateprofile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#faf9f9'
    },
    header0: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        padding: 10,
        marginTop: Platform.OS == 'android' ? 25 : null,
        backgroundColor: '#faf9f9'
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    btnStyle: {
        borderColor: "#71B7B7",
        borderWidth: 1,
        width:width-100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#488B8F',
        borderRadius:5
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