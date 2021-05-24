import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions } from 'react-native';
const {height,width} =Dimensions.get('window');

function MapInput2(props){
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    //console.log(data,details);
                    
                    props.notifyChange(details.geometry.location,details.formatted_address);
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyBbIXxfOXwOvG4zigHOi8xLUwMwQebBAFg',
                    language: 'vi', // language of the results
                  
                  }}
                  styles={{
                    textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 13,
                        borderWidth:1,
                        borderColor:'grey',
                        marginLeft:10,
                        marginRight:10,
                      },
                      listView: {
                        flex: 1,
                        position: 'absolute',
                        top: 40,
                        height:100,
                        backgroundColor: 'white',
                        marginHorizontal: 5,
                        marginLeft:10,
                        marginRight:10,
                        zIndex:3
                    },
                  }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
            />
        );
}
export default MapInput2;
