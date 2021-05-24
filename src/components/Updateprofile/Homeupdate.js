import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, FlatList, _Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Education from './Education';
import Updateprofile from './Updateprofile';
import Working from './Working';
import AppText from '../app-text';
const { width, height } = Dimensions.get("window");
import { Tab, Tabs} from 'native-base'
export default class Homeupdate extends React.Component {
  
 
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header0}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
            <AppText i18nKey={'home_profile.editprofile'} style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>Edit profile</AppText>
          </TouchableOpacity>

        </View>
       
        <Tabs  tabBarUnderlineStyle={{ backgroundColor: '#2d7474' }} >
          <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
            textStyle={{ color: '#444444' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
            heading="Information" >

            <Updateprofile />
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
            textStyle={{ color: '#444444' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
            heading="Education" >
            <Education />
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
            textStyle={{ color: '#444444' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
            heading="Working">
            <Working />
          </Tab>
        </Tabs>
      </View>
    )
  }
}
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
    ...Platform.select({
      ios: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingLeft: 10,
        paddingTop:15,
        shadowOpacity: 0.2,
        elevation: 1,
        paddingHorizontal: 16,
        paddingTop:36
      },
      android: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingLeft: 10,
        paddingTop:15,
        shadowOpacity: 0.2,
        elevation: 1,
        paddingHorizontal: 16,
      },
      default: {
        // other platforms, web for example
      }
    })
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