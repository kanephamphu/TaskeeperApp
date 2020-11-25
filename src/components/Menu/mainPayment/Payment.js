import React from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import io from 'socket.io-client/dist/socket.io';
import master from '../../../images/master.png';
import jcb from '../../../images/jcb.png';
import visa from '../../../images/visacard.png';
const { height, width } = Dimensions.get('window');
var e;
export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
    this.state = {


    }
  };
  componentDidMount = async () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, height: 40 }}>

          <DropDownPicker
            items={[
              { label: 'Vp Bank-Ngân hàng Việt Nam', value:'Vp Bank-Ngân hàng Việt Nam'},
              { label: 'Vp Bank-Ngân hàng Việt Nam', value: 'Vp Bank-Ngân hàng Việt Nam'},
            ]}
            defaultNull
            placeholder="Bank"
            onChangeItem={(from_time) => this.setState({ from_time })}
            style={{
              backgroundColor: '#ffff',
              width: width-50,
              height: height,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />


        </View>
            <View style={{flexDirection: 'row',justifyContent:'center',marginTop: 20}}>
                <View style={{borderWidth:1,borderRadius:5,marginRight:10,justifyContent: 'center', alignItems: 'center'}}>
                  <Image style={styles.image} source={master}/>
                </View>
                <View style={{borderWidth:1,borderRadius:5,marginRight:10,marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.image} source={jcb}/>
                </View>
                <View style={{borderWidth:1,borderRadius:5,marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.image} source={visa}/>
                </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  image:{
    height:50,width:80, borderRadius:5
  },
 

  flatlist: {
    flex: 1,
    alignItems: 'center'
  },
  image_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    height: 90,
    width: 350,
    backgroundColor: 'rgba(200,200,200,0.3)',
    margin: 20
  },
  time: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#2d7474'

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
  company: {
    fontWeight: 'bold',
    fontSize: 18

  },
  position: {
    fontSize: 16
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row'
  }
})