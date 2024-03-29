import React from 'react'

// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {socket} from "../../Socket.io/socket.io";
// Import react-native-vector-icons
// from "https://github.com/oblador/react-native-vector-icons"

import { AntDesign } from '@expo/vector-icons';
// Import react-native-reanimated
// from "https://github.com/software-mansion/react-native-reanimated"
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated
import { Ionicons } from '@expo/vector-icons';
// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// Declare component 
class SearchMessage extends React.Component {

  constructor(props) {
    super(props)

    // state
    this.state = {
      isFocused: true,
      keyword: ''
    }

    // animation values
    this._input_box_translate_x = new Value(width)
    this._back_button_opacity = new Value(0)
    this._content_translate_y = new Value(height)
    this._content_opacity = new Value(0)
  }

  _onFocus = () => {
    // update state
    this.setState({ isFocused: false })
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force focus
    this.refs.input.focus()

  }

  _onBlur = () => {
    // update state
    this.setState({ isFocused: false })
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force blur
    this.refs.input.blur();

  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.header_safe_area}>
          <View style={styles.header}>
            <View style={styles.header_inner}>
              <View>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.navigate("SearchMessage")}>
                  <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#71B7B7" />
                  <Text style={{ width: 152, height: 30, fontSize: 20, fontWeight: 'bold', color: '#2d7474' }}>History job</Text>
                </TouchableOpacity>
              </View>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={"#ccd0d5"}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <AntDesign name="search1" size={22} color="#000000" />
              </TouchableHighlight>
              <Animated.View
                style={[styles.input_box, { transform: [{ translateX: this._input_box_translate_x }] }]}
              >
                <Animated.View style={{ opacity: this._back_button_opacity }}>
                  <TouchableOpacity
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <Ionicons name="ios-arrow-back" size={22} color="#000000" />
                  </TouchableOpacity>
                </Animated.View>
                <TextInput
                  ref="input"
                  placeholder="Search Google Map"
                  clearButtonMode="always"
                  value={this.state.keyword}
                  onChangeText={(value) => this.setState({ keyword: value })}
                  style={styles.input}
                />
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
        <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{ translateY: this._content_translate_y }] }]}>
          <SafeAreaView style={styles.content_safe_area}>
            <View style={styles.content_inner}>
              <View style={styles.separator} />
              {
                this.state.keyword === ''
                  ?
                  <View style={styles.image_placeholder_container}>
                    <Image
                      source={require('../../images/map.png')}
                      style={styles.image_placeholder}
                    />
                    <Text style={styles.image_placeholder_text}>
                      Enter a few words{"\n"}
                      to search on Google Map
                    </Text>
                  </View>
                  :
                  <ScrollView >
                    <View style={styles.search_item}>
                      <AntDesign style={styles.item_icon} name="search1" size={16} color="#000000" />
                      <Text>40 nguyên huy tưởng</Text>
                    </View>
                    <View style={styles.search_item}>
                      <AntDesign style={styles.item_icon} name="search1" size={16} color="#000000" />
                      <Text>33 trần hưng đạo</Text>
                    </View>
                    <View style={styles.search_item}>
                      <AntDesign style={styles.item_icon} name="search1" size={16} color="#000000" />
                      <Text>01 trần phú</Text>
                    </View>
                    <View style={styles.search_item}>
                      <AntDesign style={styles.item_icon} name="search1" size={16} color="#000000" />
                      <Text>254 nguyễn văn linh</Text>
                    </View>
                    <View style={styles.search_item}>
                      <AntDesign style={styles.item_icon} name="search1" size={16} color="#000000" />
                      <Text>15 tôn đức thắng</Text>
                    </View>
                  </ScrollView>
              }
            </View>
          </SafeAreaView>
        </Animated.View>
      </>
    )
  }
}

export default SearchMessage

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    marginTop: 35,
  },
  header: {
    height: 50,
    paddingHorizontal: 16
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#2d7474',
        textAlign: 'center',
        top: 20,
      },
      android: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#2d7474',
        textAlign: 'center',
        top: 20
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#faf9f9',
    width: width - 34,
    borderRadius: 10

  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginLeft: -20,
    fontSize: 15
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  content_inner: {
    flex: 1,
    paddingTop: 10
  },
  separator: {
    marginTop: 50,
    backgroundColor: '#e6e4eb'
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-10%',

  },
  image_placeholder: {
    width: 190,
    height: 170,
    alignSelf: 'center'
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16
  },
  item_icon: {
    marginRight: 15
  }
})