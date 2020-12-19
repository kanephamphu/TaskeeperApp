import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SearchMap from '../Home/SearchMap';

const locations = require('../../locales/locations.json')
const width = Dimensions.get('window').width
export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      locations: locations
    }
  }
  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
  }
  render() {
    const { latitude, longitude } = this.state
    if (latitude) {
      return (
        <View style={styles.container}>
          <View style={{ width: width, flex: 1, position: 'absolute',marginTop:30 }}>
            <SearchMap />
          </View>
          <MapView provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            followsUserLocation
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              image={require('../../images/map_marker.png')}
              title='FPT Shop'
              description='Công Ty phần mềm số 1 miền Trung'
            />
            <Callout>

            </Callout>
          </MapView>


        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission!</Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
