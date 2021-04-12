import React from "react";
import { TextInput, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabScreen from "./src/components/Main/MainTabScreen";
import LandingPage from "./src/components/Authentication/LandingPage";
import Login from "./src/components/Authentication/Login";
import Register from "./src/components/Authentication/Register";
import LoadingScrene from "./src/components/Authentication/LoadingScrene";
import io from "socket.io-client/dist/socket.io";
import { View } from "react-native-animatable";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import myReducer from "./src/reducers/index";
var e;
const Stack = createStackNavigator();
const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    e = this;
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoadingScrene"
              component={LoadingScrene}
              hideNavBar={true}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              hideNavBar={true}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              hideNavBar={false}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              hideNavBar={true}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Taskeeper"
              component={MainTabScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  searching: {
    backgroundColor: "white",
    borderRadius: 4,

    borderWidth: 1,
    color: "black",
    ...Platform.select({
      ios: {
        width: 250,
        height: 35,
      },
      android: {
        width: 300,
        height: 35,
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
});
