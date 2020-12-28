import React from 'react';
import MapView,{ Marker ,PROVIDER_GOOGLE,Callout } from 'react-native-maps';
import {Avatar} from 'react-native-paper'
import { StyleSheet, Text, View, Dimensions,Image,TouchableOpacity } from 'react-native';

const MyMapView = (props) => {
    return (
        <View style={styles.mapContainer}>
        <MapView
            followsUserLocation
            zoomEnabled={true}
            style={styles.mapStyle}
            region={props.region}
            showsUserLocation={true}
            minZoomLevel={0}  // default => 0
            maxZoomLevel={20} // default => 20
            zoom={3}
            zoomEnabled={true}
            enableZoomControl={true}
            zoomTapEnabled={true}
            /*onRegionChange={(reg) => props.onRegionChange(reg)}*/>

            <Marker coordinate={props.region} title={props.formatted_address==''?"Your Location":props.formatted_address} />
            
            {props.getJobsNear.map((item) => (
                <Marker key={item._id} coordinate={{latitude:item.location.geometry.location.coordinates[1],longitude:item.location.geometry.location.coordinates[0]}} 
                    onCalloutPress={() => props.onStackDetail(item._id)}
                >
                    <Avatar.Image style={{borderWidth:2,borderColor:'red'}} source={{uri:item.task_owner_avatar}} size={30} />
                    <Callout onPress={() =>props.onStackDetail(item._id)} style={{width:140,height:80}}>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                {item.task_title.length>=27?<Text style={styles.calloutTitle}>{item.task_title.slice(0,27)}...</Text>:<Text style={styles.calloutTitle}>{item.task_title}</Text>}
                                <Text style={styles.calloutDescription}>{item.task_type}</Text>
                            </View>
                        </Callout>
                </Marker>
            ))}
        </MapView>
        </View>
    )
}
export default MyMapView;
const styles = StyleSheet.create({
    mapStyle: {
      flex: 1,
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        zIndex: 0
    },
    calloutTitle: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold"
    },
    calloutDescription: {
        fontSize: 14
    }
  });