import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import io from 'socket.io-client/dist/socket.io'
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons'; 
import avatarimage from '../images/avatar.jpg';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';


const { height, width } = Dimensions.get('window');
var e;
export default class ProfileUser extends React.Component {
  constructor(props) {
    super(props)
    e = this;
    this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
    this.state = {
      _user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      skill: '',
      education: [],
      avatar: '',
      day_of_birth: '',
      gender: '',
      month_of_birth: '',
      working_information: [],
      year_of_birth: '',
      nof: '',
      isLoading: false,
    }
    this.onUpdate = this.onUpdate.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onUpdateimages=this.onUpdateimages.bind(this);
    this.socket.on("sv-user-detail", function (data) {
      var list = data.data
      if (data.success == true) {
        e.setState({
          email: list.email.current_email,
          last_name: list.last_name,
          first_name: list.first_name,
          phone_number: list.phone_number.current_phone_number,
          day_of_birth: list.day_of_birth,
          month_of_birth: list.month_of_birth,
          year_of_birth: list.year_of_birth,
          gender: list.gender,
          working_information: list.working_information,
          education: list.education_information,
          avatar: list.avatar,
          isLoading: true    
          })
        
      } else {
        console.log(data.erro)
      }
    })
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token')
    const decode = jwt_decode(token)
    const detail = {
      _user_id: this.props._id,
    }
    this.socket.emit("cl-user-detail", detail)
  }
  onAdd() {
    alert('ok them');
  }
  onUpdate() {
    alert('ok cap nhat');
  }
  onUpdateimages=async()=>{
    
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flexDirection: 'column', margin: 10,alignItems: 'center' }}>
            <View
              style={{ alignItems: 'center', margin: 10,position:'relative'
              ,width: '30%',justifyContent:'center'}}
            >
              <Avatar.Image
                source={this.state.avatar ? { uri: this.state.avatar } : avatarimage}
                size={100}
              />
              <TouchableOpacity onPress={this.onUpdateimages} style={{position:'absolute',bottom:5,right:10,backgroundColor:"#cccc",
              borderRadius:100,width:30,height:30,justifyContent: 'center',alignItems: 'center'}}>
                <Entypo name="camera" size={15} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', }}>
            <ShimmerPlaceholder style={{height: 45, borderRadius: 7}} autoRun visible={this.state.isLoading}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{this.state.first_name} {this.state.last_name}</Text>
                  </ShimmerPlaceholder>
              <Text style={{ fontSize: 20 }}>Business Analyst</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Full name:</Text>
                </View>
                <View style={styles.content}>
                  <ShimmerPlaceholder style={{height: 23, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                    <Text style={{ fontSize: 17 }}>{this.state.first_name} {this.state.last_name}</Text>
                  </ShimmerPlaceholder>
                </View>
              </View>
              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Email:</Text>
                </View>
                <View style={styles.content}>
                  <ShimmerPlaceholder style={{height: 23, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                    <Text style={{ fontSize: 17 }}>{this.state.email}</Text>
                  </ShimmerPlaceholder>


                </View>
              </View>
              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Birthday:</Text>
                </View>
                <View style={styles.content}>
                  <ShimmerPlaceholder style={{ height: 20, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                    <Text style={{ fontSize: 17 }}>{this.state.day_of_birth}/{this.state.month_of_birth}/{this.state.year_of_birth}</Text>
                  </ShimmerPlaceholder>

                </View>
              </View>
              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Gender</Text>
                </View>
                <View style={styles.content}>
                  <ShimmerPlaceholder style={{ height: 20, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                    <Text style={{ fontSize: 17 }}>{this.state.gender}</Text>
                  </ShimmerPlaceholder>

                </View>
              </View>
              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Phone number:</Text>
                </View>
                <View style={styles.content}>
                  <ShimmerPlaceholder style={{ height: 20, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                    <Text style={{ fontSize: 17 }}>{this.state.phone_number}</Text>
                  </ShimmerPlaceholder>
                </View>

              </View>
              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Education:</Text>
                </View>
                <View style={styles.content}>
                  {this.state.education.map((item) => {
                    return (
                      <View key={item._id} style={{ flexDirection: 'column', marginRight: 5 }} >
                        <ShimmerPlaceholder style={{height: 23, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                          <Text style={{ fontSize: 17 }}>+ {item.school_name}</Text>
                        </ShimmerPlaceholder>
                      </View>
                    )
                  })}
                </View>
              </View>
              <View style={styles.viewinformation}>
                <View style={styles.title}>
                  <Text style={styles.texttitle}>Working:</Text>
                </View>
                <View style={styles.content}>
                  {this.state.working_information.map((item) => {
                    return (
                      <View key={item._id} style={{ flexDirection: 'column', marginRight: 5 }} >
                        <ShimmerPlaceholder style={{height: 23, marginTop: 2, borderRadius: 7 }} autoRun visible={this.state.isLoading}>
                          <Text style={{ fontSize: 17 }}>+ {item.company_name}</Text>
                        </ShimmerPlaceholder>

                      </View>
                    )
                  })}
                </View>
              </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity onPress={this.props.onUp
              } style={styles.btnLogin}>
                <Text style={{ fontSize: 20, color: '#ffff' }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: '#faf9f9',
      },
      android: {
        flex: 1,
        backgroundColor: '#faf9f9',
        justifyContent: 'center',
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  viewinformation: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    width: 125
  },
  texttitle: {
    fontSize: 17, fontWeight: 'bold'
  },
  content: {
    marginLeft: 10,
    paddingLeft: 5, width: width - 170, borderRadius: 7,
  },
  btnLogin: {
    width: width-100,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#71B7B7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowOpacity: 0.2,
    elevation: 3,
    marginTop: -5,
    borderColor: '#71B7B7',
    borderWidth: 1
  },
  header: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        height: 36,
        position: "relative"
      },
      android: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 30,
        height: 36,
        position: "relative"
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable1: {
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable2: {
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable3: {
    ...Platform.select({
      ios: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,

      },
      android: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  fonttext: {
    ...Platform.select({
      ios: {
        left: 30,
        fontWeight: 'bold',
        flex: 1,


        fontSize: 17,
      },
      android: {
        left: 30,
        fontWeight: 'bold',
        flex: 1,

        fontSize: 17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  fonttextinfor: {
    ...Platform.select({
      ios: {
        left: 50,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      android: {

        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      default: {
        // other platforms, web for example
      }
    })
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
    ...Platform.select({
      ios: {
        borderRadius: 4,
        backgroundColor: "#009387",
        width: 55,
        height: 25

      },
      android: {
        borderRadius: 4,
        backgroundColor: "#009387",
        width: 55,
        height: 25
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  buttontext: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontSize: 15,
        color: "white",
      },
      android: {
        fontSize: 15,
        color: "white",
      },
      default: {
        // other platforms, web for example
      }
    })
  }
})