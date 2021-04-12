import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, } from 'react-native';
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
const { height, width } = Dimensions.get('window');
import {socket} from "../../Socket.io/socket.io";
var e;
export default class HistoryJob extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      isLoading: false,
      refreshing: false,
      data: [
        {
          _id: 1,
          time: '03-2019',
          company: 'Fancha Milktea',
          position: 'Staff',
          rating: 3
        },
        {
          _id: 2,
          time: '07-2019',
          company: "Crazy's Cat",
          position: 'Batender',
          rating: 4
        },
        {
          _id: 3,
          time: '02-2019',
          company: 'Fourdigit',
          position: 'FE Developer',
          rating: 1
        },
        {
          _id: 4,
          time: '01-2019',
          company: 'sadasdsadasd',
          position: 'FE Developer',
          rating: 2
        },
        {
          _id: 6,
          time: '02-2019',
          company: 'ccccccc',
          position: 'FE Developer',
          rating: 5
        },
      ],
      dataHistoryjob: [

      ],
      user: {
        name: 'Lê Ngân',
        job: 'Business Analyst',
      },
    }

    socket.on("sv-job-history", function (data) {
      var list = data.data
      if (data.success == true) {
        console.log(JSON.stringify(list))
        e.setState({
          dataHistoryjob: list,
          isLoading: true
        })
      } else {
        console.log(data.error)
      }
    })
  };
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token')
    const decode = jwt_decode(token)
    const historyjob = {
      _user_id: decode._id,
      skip: 1
    }
   socket.emit("cl-job-history", historyjob)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlist}>
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <RenderItem1 item={item} index={index}  ></RenderItem1>
                </View>
              )
            }}
            keyExtractor={(item) => item._id.toString()}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            showsHorizontalScrollIndicator={false}
            refreshing={this.state.refreshing}
          >
          </FlatList>
        </View>
      </View>
    );
  }
}
class RenderItem1 extends React.Component {
  _rating(item) {
    let rating = [];
    for (i = 0; i < item; i++) {
      rating.push(
             <Image
            source={require('../../images/star.png')}
            style={{ width: 15, height: 15, marginRight: 3 }}
            resizeMode="cover"
        />

      )
    }
    return rating;
  }
  render() {
    return (
      <View style={styles.image_container} key={this.props.item._id}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: '#2d7474', marginLeft: -5.5 }} >

          </View>
          <View style={{ width: 1, height: 100, borderWidth: 2, borderColor: '#2d7474', backgroundColor: '#2d7474' }}>

          </View>
          <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: '#2d7474', marginLeft: -5.5, marginTop: -0.5 }} >

          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Detail")} style={{ marginLeft: 10 }}>
            <Text>{this.props.item.time}</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection: 'column', borderRadius: 10, borderWidth: 2,
            borderColor: '#2d7474', width: width-100, height: 90, marginLeft: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center'
          }}>
            <View>
              <Text style={{ fontWeight: 'bold', color: '#2d7474', fontSize: 18 }}>{this.props.item.company}</Text>
            </View>
            <View >
              <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>{this.props.item.position}</Text>
            </View>
            <View key={this.props.item._id} >
              <Text> {this._rating(this.props.item.rating)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#faf9f9'
  },
  flatlist: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  image_container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    borderRadius: 10,
    height: 130,
    width: width,
    backgroundColor: '#faf9f9',
    alignItems: 'center',
    marginBottom: 10, 
    justifyContent: 'center',

  },
  time: {
    fontSize: 16
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
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    color: '#2d7474'
  },
  position: {
    fontWeight: 'bold',
    fontSize: 18
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row'
  }
})