import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from './StackNavigation'
import axios from 'axios'

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

const AppText = (props) => (
  <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const EditProfile = ({ navigation }) => {
  const { user, updateUser } = useContext(AuthContext);
  console.log(user?.waist)
  
  const submitProfile = () => {
    const url = "http://192.168.167.90:3360/edit_profile";

    console.log("Sending request to", url);
    axios.post(url, {
      weight,
      height,
      shoulder,
      bust,
      waist,
      hip,
      id : user?.id
    })
      .then(({ data }) => {
        console.log(data);
        if (data.status === 'success') {
          if (user?.is_premium) {
            navigation.navigate('ProfilePremium');
          } else {
            navigation.navigate('Profile');
          }
        }
      })
      .catch(async error => {
        console.error("AXIOS ERROR:");
        console.error(await error);
      });
    updateUser({
      weight,
      height,
      shoulder,
      bust,
      waist,
      hip
    });
  }

  const [weight, onChangeWeight] = React.useState(user?.weight ? user.weight.toString() : "");
  const [height, onChangeHeight] = React.useState(user?.height ? user.height.toString() : "");
  const [shoulder, onChangeShoulder] = React.useState(user?.shoulder ? user.shoulder.toString() : "");
  const [bust, onChangeBust] = React.useState(user?.bust ? user.bust.toString() : "");
  const [waist, onChangeWaist] = React.useState(user?.waist ? user.waist.toString() : "");
  const [hip, onChangeHip] = React.useState(user?.hip ? user.hip.toString() : "");

  const onPressProfile = () => {
    const url = "http://192.168.167.90:3360/edit_profile";
    // navigation.navigate('Profile')
    submitProfile();

    console.log("Sending request to", url);
   
  }

  useEffect(() => {
    onScreenFocus();
  }, [user])


  const onScreenFocus = () => {
    if (user?.premium) {
      navigation.navigate("ProfilePremium");
    } else {
      navigation.navigate('Profile');
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.squareTop}>
        <Text style={styles.headerText}>Profile</Text>
        <AppText>Edit personal Information</AppText>
      </View>
      <View style={styles.contentCon}>
        <AppText style={styles.inputTitle}>Weight</AppText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeWeight}
          value={weight}
          // placeholder={user?.weight ? user.weight.toString() : "Enter your weight"}
          defaultValue={user?.weight ? user.weight.toString() : ""}
          keyboardType="numeric"
        />
        <AppText style={styles.inputTitle}>Height</AppText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeHeight}
          value={height}
          // placeholder="160 (centimeters)"
          defaultValue={user?.height ? user.height.toString() : ""}
          keyboardType="numeric"
        />
        <AppText style={styles.inputTitle}>Shoulder</AppText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeShoulder}
          value={shoulder}
          placeholder="35 (inches)"
          // defaultValue={number3}
          keyboardType="numeric"
        />
        <AppText style={styles.inputTitle}>Bust</AppText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeBust}
          value={bust}
          placeholder="33 (inches)"
          keyboardType="numeric"
        />
        <AppText style={styles.inputTitle}>Waist</AppText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeWaist}
          value={waist}
          // placeholder="26 (inches)"
          defaultValue={user?.waist ? user.waist.toString() : ""}
          keyboardType="numeric"
        />
        <AppText style={styles.inputTitle}>Hip</AppText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeHip}
          value={hip}
          placeholder="35 (inches)"
          keyboardType="numeric"
        />
        <AppButton
          onPress={onPressProfile}
          title={"Submit"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  squareTop: {
    height: 90,
    width: Dimensions.get('window').width,
    backgroundColor: "#f2a676",
    alignItems: 'center',
    paddingTop: 5,
    fontFamily: "Cuprum-VariableFont_wght",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#FAEBDC",
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
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 7,
    fontFamily: "Cuprum-VariableFont_wght"
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    color: "black",
    fontFamily: "Cuprum-Bold",
  },
  appButtonContainer: {
    elevation: 0,
    backgroundColor: "#E67738",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    width: Dimensions.get('window').width / 3,
    justifyContent: 'center'
  },
  appButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    fontFamily: "Cuprum-VariableFont_wght"
  },
  headerText: {
    color: 'black',
    fontSize: 40,
    fontFamily: "Cuprum-Bold",
    top: 0
  },
  inputTitle: {
    color: 'black',
    textAlign: 'left',
    width: 300
  },
  contentCon: {
    backgroundColor: "white",
    alignItems: "center",
    width: Dimensions.get('window').width * 0.8,
    padding: 30,
    margin: 20,
    borderRadius: 10
  }
}
)

export default EditProfile