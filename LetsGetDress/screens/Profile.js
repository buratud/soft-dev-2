import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity, Modal } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from './StackNavigation'
import Icon from 'react-native-vector-icons/Feather'
import EditProfile from './EditProfile'
import axios from 'axios'
// require('dotenv').config();

const AppText = (props) => (
    <Text {...props} style={{fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black'}}>{props.children}</Text>
)

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

const Profile = ({navigation}) => {
  const { user } = useContext(AuthContext);
  const { updateUser } = useContext(AuthContext);
  // const url = "http://192.168.167.90:3360/payment_detail";
  const [Data, setData] = useState({});
  // useEffect(()=>{
  //   axios.post(url, {
  //     id : user?.id
  //   })
  //   .then(({data}) => {
  //     console.log('payment detail',data.results.CARD_NUM,data.results.NEXT_BILL_DATE,data.results.STATUS)
  //     if (data.status === 'success') {
  //       updateUser({
  //         card_num: data.results.CARD_NUM,
  //         next_bill_date: data.results.NEXT_BILL_DATE,
  //         premium_status: data.results.STATUS
  //       });
  //       // setData1(data.results[0]);
  //     }
  //   })
  //   .catch(error => {
  //     console.error("AXIOS ERROR:");
  //     console.error(error);
  //   });
  // },[])

  useFocusEffect(
    React.useCallback(() => {
      if (user?.is_premium) {
        navigation.navigate("ProfilePremium")
      }
    }, [user])
  );

  // useEffect(() => {
  //   axios.post(url)
  //     .then(({ data }) => {
  //       console.log(data.status)
  //       if (data.status === 'success') {
  //         const userData = setData(data.results[0]);
  //         setData(userData);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("AXIOS ERROR:");
  //       console.error(error);
  //     });
  //   // navigation.navigate('VerifyEmail')
  // },[])

  const onPressEditProfile = () => {
    navigation.navigate('EditProfile')
  }
  const onPressCardInfo = () => {
    navigation.navigate('CardInfo')
  }
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{...styles.innerCon, paddingTop:360}}>
          <AppText style={{...styles.normalText1, ...styles.innerPos}}>Personal <Text style={styles.iconPos}> <Icon name='settings' size={25} onPress={onPressEditProfile}/> </Text> </AppText>
           
          <AppText style={styles.normalText2}>Email : </AppText>
          <AppText style={styles.normalText2}>Password : </AppText>
          <AppText style={styles.normalText2}>Weight : </AppText>
          <AppText style={styles.normalText2}>Height : </AppText>
          <AppText style={styles.normalText2}>Shoulder: </AppText>
          <AppText style={styles.normalText2}>Bust : </AppText>
          <AppText style={styles.normalText2}>Waist : </AppText>
          <AppText style={styles.normalText2}>Hip : </AppText>
          <View style={{ top:-345, width:Dimensions.get('window').width*0.8}}>
            <AppText style={styles.normalText3}>{user?.email ?? "-"} </AppText>
            <AppText style={styles.normalText3}>●●●●●●●● </AppText>
            <AppText style={styles.normalText3}>{user?.weight ?? "-"} </AppText>
            <AppText style={styles.normalText3}>{user?.height ?? "-"} </AppText>
            <AppText style={styles.normalText3}>{user?.shoulder ?? "-"} </AppText>
            <AppText style={styles.normalText3}>{user?.bust ?? "-"} </AppText>
            <AppText style={styles.normalText3}>{user?.waist ?? "-"} </AppText>
            <AppText style={styles.normalText3}>{user?.hip ?? "-"} </AppText>
          </View>
          <View>
          <AppButton 
          title = {'Upgrade to premium'}
          onPress={onPressCardInfo}
          />
          <AppText style={{top:-345, left: 60}}>35 Baht per month</AppText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  squareTop: {
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: "#FF9176",
    alignItems: 'center',
    paddingTop:5,
    fontFamily: "Cuprum-VariableFont_wght",
    justifyContent: "center",
    elevation: 5
},
container: {
  backgroundColor: "#FAEBDC",
  alignItems: "center",
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
},
headerText: {
  color:'black', 
  fontSize:40, 
  fontFamily: "Cuprum-Bold", 
  marginBottom: 10
},
innerCon: {
  backgroundColor: 'white',
  width: Dimensions.get('window').width*0.8,
  height: Dimensions.get('window').height*0.6,
  borderRadius: 15,
  marginTop: 20,
  alignItems: 'center',
  justifyContent: 'center'
},
appButtonContainer: {
  elevation: 0,
  backgroundColor: "#E67738",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginTop: 20,
  width: 240,
  height: 50,
  alignItems: 'center',
  top: -350
},
appButtonText: {
  fontSize: 22,
  color: "white",
  alignSelf: "center",
  fontFamily: "Cuprum-Bold"
},
normalText1: {
  paddingLeft: 15,
  // paddingTop: -10,
  marginRight: 'auto'
},
normalText2: {
  paddingVertical: 10,
  paddingLeft: 30,
  marginRight: 'auto'
},
normalText3: {
  paddingVertical: 10,
  paddingRight: 10,
  // marginRight: 'auto',
  marginLeft:'auto'
},
iconPos: {
  left: 10,
  marginRight: 'auto',
  top: -45,
  color: 'black'
}
  
}
)

export default Profile