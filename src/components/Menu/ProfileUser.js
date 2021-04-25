import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar } from 'react-native-paper';
import AppText from '../app-text';

class ProfileUser extends Component {
  state = {
    user: {
      name: 'Lê Ngân',
      job: 'Business Analyst',
      fullname: 'Lê Thị Thanh Ngân',
      email: 'letthanhngan@dtu.edu.vn',
      phonenumber: '090909090',
      skill: 'Teamwork,...',
      language: 'English,...',
      education: 'Duy Tan University'
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <Avatar.Image
          source={{
            uri: 'https://api.adorable.io/avatars/80/'
          }}
          size={100}
          style={{ marginTop: -5 }}
        />
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{this.state.user.name}</Text>
        <Text style={{ fontSize: 20 }}>{this.state.user.job}</Text>
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
          <AppText i18nKey={'home_profile.fullname'} style={styles.fonttext}>Full name</AppText>
          <Text style={styles.fonttextinfor}>{this.state.user.fullname}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <AppText i18nKey={'home_profile.email'} style={styles.fonttext}>Email</AppText>
          <Text style={styles.fonttextinfor}>{this.state.user.email}</Text>
        </View>
        <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', marginBottom: 20, borderBottomColor: '#71B7B7', borderBottomWidth: 1 }}>
          <AppText i18nKey={'home_profile.phone'} style={{ left: 10, fontWeight: 'bold', fontSize: 17 }}>Phone Number</AppText>
          <Text style={styles.fonttextinfor}>{this.state.user.phonenumber}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <AppText i18nKey={'home_profile.skill'} style={styles.fonttext}>Skill</AppText>
          <Text style={styles.fonttextinfor}>{this.state.user.skill}</Text>
        </View>
        <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', marginBottom: 20, borderBottomColor: '#71B7B7', borderBottomWidth: 1 }}>
          <AppText i18nKey={'home_profile.language'} style={{ left: 10, fontWeight: 'bold', fontSize: 17 }}>Language</AppText>
          <Text style={styles.fonttextinfor}>{this.state.user.language}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <AppText i18nKey={'home_profile.education'} style={styles.fonttext}>Education</AppText>
          <Text style={styles.fonttextinfor}>{this.state.user.education}</Text>
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate("update")}>
          <AppText i18nKey={'home_profile.update'} style={{ fontSize: 20, color: '#ffff' }}>Update</AppText>
        </TouchableOpacity>
      </View>

    );
  }
}
export default ProfileUser;
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf9f9'
  },
  button: {
    ...Platform.select({
      ios: {
        borderRadius: 4,
        backgroundColor: "#009387",
        width: 55,
        height: 25

      },
      android: {
        borderRadius: 4,
        backgroundColor: "#009387",
        width: 55,
        height: 25
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  btnLogin: {
    width: 300,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#009387',
    marginTop: -15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowOpacity: 0.2,
    elevation: 3,
    borderColor: '#71B7B7',
    borderWidth: 1
  },
  fonttext: {
    ...Platform.select({
      ios: {
        left: 30,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      android: {
        left: 30,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  fonttextinfor: {
    ...Platform.select({
      ios: {
        left: 50,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      android: {
        left: 50,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 17,
      },
      default: {
        // other platforms, web for example
      }
    })
  },

})