import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';


export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation_signup: null,
            animation_signin: null,
        }
    }

    onIndexChanged(index) {
        if (index == 2) {
            this.setState({
                animation_signup: 'bounceInLeft',
                animation_signin: 'bounceInRight',
            });
        }
        else {
            this.setState({
                animation_signup: null,
                animation_signin: null,
            });
        }
    }

    render() {
        return (
            <Swiper
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                onIndexChanged={(index) => this.onIndexChanged(index)}
            >
                <View style={styles.silde}>
                    <View style={styles.header}>
                        <Text style={styles.title}>TASKEEPER</Text>
                        <Text style={styles.chapter}>Suitable for everyone</Text>
                        <Text style={styles.detail}>Where you can find your suitable job for yourseft</Text>
                        <Image
                            source={require("../../images/langding1.png")}
                            style={styles.image}
                            resizeMode={"stretch"}
                        />
                    </View>
                    <View style={styles.footer}>

                    </View>
                </View>

                <View style={styles.silde}>
                    <View style={styles.header}>
                        <Text style={styles.title}>TASKEEPER</Text>
                        <Text style={styles.chapter}>Fast & Serious</Text>
                        <Text style={styles.detail}>The best place to find your job quickly</Text>
                        <Image
                            source={require("../../images/langding2.png")}
                            style={styles.image}
                            resizeMode={"stretch"}
                        />
                    </View>
                    <View style={styles.footer}>

                    </View>
                </View>

                <View style={styles.silde}>
                    <View style={styles.header}>
                        <Text style={styles.title}>TASKEEPER</Text>
                        <Text style={styles.chapter}>Simple</Text>
                        <Text style={styles.detail}>All operations are very easy to use</Text>
                        <Image
                            source={require("../../images/langding3.png")}
                            style={styles.image}
                            resizeMode={"stretch"}
                        />
                    </View>
                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Animatable.View
                                animation={this.state.animation_signup}
                                delay={0}
                                duration={1500}
                                useNativeDriver
                            >
                                <TouchableOpacity
                                    style={[styles.button, {
                                        borderColor: '#2d7474',
                                    }]}
                                    onPress={() => this.props.navigation.navigate("Register")}
                                >
                                    <Text style={{ color: '#2d7474', fontWeight: 'bold' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                            <Animatable.View
                                animation={this.state.animation_signin}
                                delay={0}
                                duration={1500}
                                useNativeDriver
                            >
                                <TouchableOpacity
                                    style={[styles.button, {
                                        backgroundColor: '#2d7474',
                                    }]}
                                    onPress={() => this.props.navigation.navigate("Login")}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </View>
                </View>
            </Swiper>
        )
    }
}

const { width, height } = Dimensions.get('screen');
const height_image = height * 0.5 * 0.8;
const width_image = height_image * 1.4;
const width_button = width * 0.3;

var styles = StyleSheet.create({
    silde: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: 2,
        marginTop:40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    footer: {
        flex: 1,
        paddingHorizontal: 2
    },
    image: {
        ...Platform.select({
            ios: {
                height: height_image,
                width: width_image,
                marginTop: 20
            },
            android: {
                height: height_image,
                width: width_image,
                marginTop: 20
            },
            default: {
                // other platforms, web for example
            }
        })
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
    chapter: {
        ...Platform.select({
            ios: {
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#71B7B7',
                textAlign: 'center',
                marginTop: 150,
                marginBottom: 5
            },
            android: {
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#71B7B7',
                textAlign: 'center',
                marginTop: 150,
                marginBottom: 5
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    detail: {
        ...Platform.select({
            ios: {
                fontSize: 15,
                fontStyle: 'italic',
                color: 'black',
            },
            android: {
                fontSize: 15,
                fontStyle: 'italic',
                color: 'black',
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    dot: {
        backgroundColor: "rgba(52,101,217,.4)",
        ...Platform.select({
            ios: {
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 5,
                marginVertical: 3
            },
            android: {
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 5,
                marginVertical: 3
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    activeDot: {
        backgroundColor: '#2d7474',
        ...Platform.select({
            ios: {
                width: 30,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 5,
                marginVertical: 3
            },
            android: {
                width: 30,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 5,
                marginVertical: 3
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    button: {
        ...Platform.select({
            ios: {
                width: width_button,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 50,
                marginTop: 90
            },
            android: {
                width: width_button,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 50,
                marginTop: 90
            },
            default: {
                // other platforms, web for example
            }
        })
    }
})