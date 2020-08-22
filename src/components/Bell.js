import  React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

const Bell=()=> {
  return (
    <View style={styles.container}>
      <Text>This is form Bell</Text>
      <Button
        title="Click here"
        onPress={()=>alert('Hello everyone')}
      />
    </View>
  );
}
export default Bell;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',  
    backgroundColor: '#faf9f9'
  }
})