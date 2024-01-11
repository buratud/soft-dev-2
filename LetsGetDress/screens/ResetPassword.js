import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from './StackNavigation'
import axios from 'axios'

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const AppText = (props) => (
  <Text {...props} style={{fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18}}>{props.children}</Text>
)

const ResetPassword = ({navigation}) => {
  const { user, login } = useContext(AuthContext)
  const [text, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const onPressLogin2 = () => {
    // navigation.navigate('Login')
    const url = "http://192.168.167.90:3360/reset_password";
    console.log("Sending request to", url);
    axios.post(url, {
      password: text, 
      confirm: password,
      id: user?.id
    })
    .then(({data}) => { 
      console.log(data)
      if(data.status == 'success') {
        navigation.navigate('Login')
      }
    })
    .catch(async error => {
      console.error("AXIOS ERROR:");
      console.error(await error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={{...styles.ellipse, transform: [{scaleX: 1.4}],}}/>
      <View style={styles.circle}>
        <Text style={{color:'black', fontSize:55, fontFamily: "Cuprum-Bold", marginBottom:10}}>Reset Password</Text>
        <AppText style={{color:'black', textAlign:'left', width:300}}>New Password</AppText>
        <SafeAreaView>
          <TextInput
          style={{...styles.input, height: 40, width: 300, backgroundColor:'white', fontFamily: "Cuprum-VariableFont_wght"}}
          value={text}
          onChangeText={onChangeText}
          placeholder='example'
          secureTextEntry={true}
         />
        </SafeAreaView>
        <AppText style={{color:'black', textAlign:'left', width:300}}>Confirm Password</AppText>
        <SafeAreaView>
          <TextInput
          style={{...styles.input, height: 40, width: 300,  backgroundColor:'white', fontFamily: "Cuprum-VariableFont_wght"}}
          value={password}
          onChangeText={onChangePassword}
          placeholder='example'
          secureTextEntry={true}
         />
        </SafeAreaView>
          <AppButton 
          onPress={onPressLogin2}
          title={"   Submit   "}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    height: 580,
    width: 580,
    borderRadius: 290,
    backgroundColor: "#FAEBDC",
    top:-500,
    alignItems: 'center',
    paddingTop:150
    
  },
  ellipse: {
    height: 600,
    width: 600,
    borderRadius: 300,
    backgroundColor: "#FAEBDC",
    top: 100,
    alignItems: 'center',
    paddingTop:90
  
},
  container: {
    backgroundColor: "#f2a676",
    alignItems: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "Cuprum-VariableFont_wght",
    borderRadius: 7,
    fontSize: 18,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    color:"black",
    fontFamily: "Cuprum-Bold"
  },
  appButtonContainer: {
    elevation: 0,
    backgroundColor: "#E67738",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10
  },
  appButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Cuprum-VariableFont_wght",
  },
  logoContainer: {
    paddingTop: 10,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  logo: {
    width: 10,
    height: 10,
  },
}
)


export default ResetPassword


