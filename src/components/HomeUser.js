import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, FlatList, _Text } from 'react-native';
import ProfileUser from './Menu/ProfileUser';
import TaskPage from './Menu/TaskPage';
import HistoryJob from './Menu/HistoryJob';
import update from './Menu/ChangeProfileUser';
import Posttask from '../components/PostTask'
import { Ionicons } from '@expo/vector-icons';
import Profile from './ProfileUser2'
import { createStackNavigator } from '@react-navigation/stack';
import io from 'socket.io-client/dist/socket.io'
const { width, height } = Dimensions.get("window");
import { Tab, Tabs, } from 'native-base'
const ProfileStack = createStackNavigator();
export default class HomeUser extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
    this.state = {
     
    }
    this.onPosttask=this.onPosttask.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    this.onEducation=this.onEducation.bind(this);
    this.onDetail=this.onDetail.bind(this)
  }
  onPosttask(){
    this.props.navigation.navigate('Posttask')
  }
  onUpdate(){
    this.props.navigation.navigate('Homeupdate');
  }
  onEducation(){
    this.props.navigation.navigate('Education')
  }
  onDetail(_id){
    this.props.navigation.navigate('Detailmenu',{_task_id: _id})
  }
  render() {
    const { first_name, last_name, _id } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.header0}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>{first_name} {last_name}</Text>
          </TouchableOpacity>

        </View>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#2d7474' }} >
          <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
            textStyle={{ color: '#444444' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
            heading="Profile" >

            <Profile _id={_id} onUp={this.onUpdate} onEd={this.onEducation}/>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
            textStyle={{ color: '#444444' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
            heading="History job" >
            <HistoryJob />
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
            textStyle={{ color: '#444444' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
            heading="Task Page">
            <Posttask detail={this.onDetail} />
          </Tab>
        </Tabs>
      </View>
    )
  }
}
const ProfileStackScreen = ({ navigation }) => {

  return (
    <ProfileStack.Navigator
      screenOptions={{

        headerStyle: {

          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ProfileStack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="update"
        component={update}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
const styles = StyleSheet.create({
  image_container: {
    ...Platform.select({
      ios: {
        width: 90,
        height: 90
      },
      android: {
        width: 90,
        height: 90
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  item: {
    ...Platform.select({
      ios: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
      },
      android: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  container: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: '#faf9f9',
      },
      android: {
        flex: 1,
        backgroundColor: '#faf9f9',
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
    paddingLeft: 10,
    paddingTop:15,
    shadowOpacity: 0.2,
    elevation: 1,
    
  },
  header: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        height: 36,
        position: "relative"
      },
      android: {
        flexDirection: 'row',
        marginTop: 20,
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
  touchable3: {
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
  touchable2: {
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
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      android: {
        left: 30,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        left: 50,
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