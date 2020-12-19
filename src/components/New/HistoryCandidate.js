import  React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Animated,ScrollView,Dimensions,FlatList } from 'react-native';


const { width,height } = Dimensions.get("window");

export default class HistoryCandidate extends React.Component {
  render(){
    return(
      <View style={styles.container}>
         <Text>History</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add2c9',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  