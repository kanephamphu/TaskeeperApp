import  React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Animated,ScrollView,Dimensions } from 'react-native';
import { t } from '../locales';
import {Avatar} from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
const { width } = Dimensions.get("window");

export default class ProfileUser extends React.Component {
  state = {
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      xTabThree:0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),
      translateXTabThree: new Animated.Value(width),
      translateY: -1000
  };
  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree
    } = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver:false
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver:false
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver:false
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: width,
          duration: 100,
          useNativeDriver:false
        }).start()
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver:false
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver:false
        }).start(),
        Animated.spring(translateXTabThree, {
          toValue: 0,
          duration: 100,
          useNativeDriver:false
        }).start()
      ]);
    }
  };
  render() {
    let {
      xTabOne,
      xTabTwo,
      xTabThree,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateXTabThree,
      translateY
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.View 
          style={{
          position: "absolute",
          width: "33.333%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: "#009387",
          borderRadius: 4,
          transform: [
            {
              translateX
            }
          ]
          }}
          />
          <TouchableOpacity style={styles.touchable1}
            onLayout={event => this.setState({
              xTabOne: event.nativeEvent.layout.x
            })
            }
            onPress={() =>
              this.setState({ active: 0 }, () =>
                this.handleSlide(xTabOne)
              )
            }
          >
          <Fontisto 
            style={{
              color: active === 0 ? "#fff" : "black"
            }} 
            name="person" size={24}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable2}
            
            onLayout={event =>this.setState({
              xTabTwo: event.nativeEvent.layout.x
            })
            }
            onPress={() =>
              this.setState({ active: 1 }, () =>
                this.handleSlide(xTabTwo)
              )
            }
          >
          <AntDesign 
            style={{
                color: active === 1 ? "#fff" : "black"
            }} 
            name="menu-unfold" size={24}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable3}
            
            onLayout={event =>this.setState({
              xTabThree: event.nativeEvent.layout.x
            })
            }
            onPress={() =>
              this.setState({ active: 2 }, () =>
                this.handleSlide(xTabThree)
              )
            }
          >
          <AntDesign 
            style={{
                color: active === 2 ? "#fff" : "black"
            }} 
            name="menu-unfold" size={24}/>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: [
              {
                translateX: translateXTabOne
              }
              ]
            }}
            onLayout={event =>this.setState({
              translateY: event.nativeEvent.layout.height
            })
            }
          >
             <Avatar.Image
              source={{
                uri: 'https://api.adorable.io/avatars/80/'
              }} 
              size={100}
            />
            <Text style={{fontSize:30, fontWeight:'bold'}}>Lê Ngân</Text>
            <Text style={{fontSize:20}}>Business Analyst</Text>
            <View style={{flexDirection:'row', marginTop:20, marginBottom:20}}>
                <Text style={styles.fonttext}>Full name</Text>  
                <Text style={styles.fonttextinfor}>Lê Thị Thanh Ngân</Text>  
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Email</Text>  
                <Text style={styles.fonttextinfor}>letthanhngan@dtu.edu.vn</Text>  
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Phone Number</Text>  
                <Text style={styles.fonttextinfor}>090909090</Text> 
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Skill</Text>  
                <Text style={styles.fonttextinfor}>Teamwork,...</Text> 
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Language</Text>  
                <Text style={styles.fonttextinfor}>English,...</Text> 
            </View>
            <View style={{flexDirection:'row',marginBottom:20}}>
                <Text style={styles.fonttext}>Education</Text>  
                <Text style={styles.fonttextinfor}>Duy Tan University</Text> 
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttontext}>Update</Text>  
            </TouchableOpacity>
          </Animated.View>
          {/*<Animated.View
              style={{
                justifyContent: "center",
                alignItems: "center",
                transform: [
                {
                  translateX: translateXTabTwo
                },
                {
                  translateY: -translateY
                }
                ]
              }}
            >*/}
            <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: [
              {
                translateX: translateXTabTwo
              },
              {
                translateY: -translateY
              }
              ]
            }}

          >
            <Text>Write Status</Text>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
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
  header:{
    ...Platform.select({
      ios: {
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        height: 36,
        position: "relative"
      },
      android: {
        flexDirection:'row',
        marginTop:40,
        marginBottom:20,
        marginLeft:20,
        marginRight:30,
        height: 36,
        position: "relative"
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  touchable1:{
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
  touchable2:{
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
  touchable3:{
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
  fonttext:{
    ...Platform.select({
      ios: {
        left:30,
        fontWeight:'bold',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      android: {
        left:30,
        fontWeight:'bold',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  fonttextinfor:{
    ...Platform.select({
      ios: {
        left:50,
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      android: {
        left:50,
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        fontSize:17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  button:{
    ...Platform.select({
      ios: {
        borderRadius:4,
        backgroundColor:"#009387",
        width:55,
        height:25

      },
      android: {
        borderRadius:4,
        backgroundColor:"#009387",
        width:55,
        height:25
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  buttontext:{
    textAlign:'center',
    ...Platform.select({
      ios: {
        fontSize:15,
        color:"white",
      },
      android: {
        fontSize:15,
        color:"white",
      },
      default: {
        // other platforms, web for example
      }
    })
  }
})