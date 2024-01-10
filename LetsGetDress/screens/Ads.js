import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Image, TouchableOpacity,} from 'react-native'
import React from 'react'

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

const Ads = ({navigation}) => {
  const onPressOutfitsRec = () => {
    navigation.navigate('Outfit recommendation')
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgCon}>
       <Image 
       source={{uri: "https://i.pinimg.com/originals/9f/51/8a/9f518abeb079d4f3583c4342d8e3778a.jpg"}} 
       style={{width: 280, height: 350, padding: 20}}
       />
       <Text style={{fontFamily: "Cuprum-VariableFont_wght", fontSize: 25, color: 'black'}}>H&m Conscious Collection</Text>
       </View>
       <View style={styles.imgCon}>
       <Image 
       source={{uri: "https://i.pinimg.com/originals/9f/51/8a/9f518abeb079d4f3583c4342d8e3778a.jpg"}} 
       style={{width: 280, height: 350, padding: 20}}
       />
       <Text style={{fontFamily: "Cuprum-VariableFont_wght", fontSize: 25, color: 'black'}}>H&m Conscious Collection</Text>
       </View>
       <View style={styles.imgCon}>
       <Image 
       source={{uri: "https://i.pinimg.com/originals/9f/51/8a/9f518abeb079d4f3583c4342d8e3778a.jpg"}} 
       style={{width: 280, height: 350, padding: 20}}
       />
       <Text style={{fontFamily: "Cuprum-VariableFont_wght", fontSize: 25, color: 'black'}}>H&m Conscious Collection</Text>
       </View>
       <AppButton
           onPress={onPressOutfitsRec}
           title={"Skip Ads"}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#f2a676',
  },

  imgCon: {
    width: 330,
    height: 400,
    top: -80,
    alignItems: 'center',
    top: 0,
    backgroundColor: 'white',
    margin: 20,
    elevation: 10,
    // borderWidth: 2,
    // borderColor: '#894A26',
    borderRadius: 10
  },
  adstext: {
    fontFamily: "Cuprum-Bold",
    fontSize: 75,
    color: '#FFC282'
  },
  appButtonContainer: {
    backgroundColor: "#E67738",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 'auto',
    top: -400,
    elevation: 10
  },
  appButtonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
})

export default Ads