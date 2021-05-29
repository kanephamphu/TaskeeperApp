import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {WebView} from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get("window");
var e;
var daynow = new Date();
export default class Test extends React.Component {
    constructor(props) {
      super(props);
      e = this;
      this.state = {

      }
    }
    render(){
        return(
            <View style={{flex:1}}>
              <View style={styles.header0}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                    <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: 1 }}>Back</Text>
                </TouchableOpacity>
                </View>
                <WebView source={{uri:"https://gracious-hamilton-9eb340.netlify.app/?fbclid=IwAR0IQtYGGx1V5R-u2udSVxSuVDuRvCta8YOeALicN8DM7n3o6YKArHPIzSI"}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  header0: 
  {
      ...Platform.select({
        ios: {
          height: height * 0.08,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          paddingLeft: 10,
          paddingTop:15,
          shadowOpacity: 0.2,
          elevation: 1,
          paddingTop:36,
          backgroundColor:'white'
        },
        android: {
          height: height * 0.08,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          paddingLeft: 10,
          paddingTop:15,
          shadowOpacity: 0.2,
          elevation: 1,
          backgroundColor:'white'
        },
        default: {
          // other platforms, web for example
        }
      })
    },
  })