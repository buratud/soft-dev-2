import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'

const AppText = (props) => (
  <Text {...props} style={{fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18}}>{props.children}</Text>
)

const Splash = ({navigation}) => {
  const onPressLogin = () => {
    navigation.navigate('Login')
  }
    return (
    <TouchableOpacity onPress = {onPressLogin}>
      <View style={styles.container} >
        <View style={styles.imgDiv}>
          <Image style={{width: '100%', height: '100%', objectFit: 'scale-down'}} source = {require('../assets/logo8.png')} />
        </View>
        <AppText
        style={styles.textdeco}>Tap anywhere to start</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: '#F6A158',
        backgroundColor: '#f2a676',
        paddingBottom: 70
    },
    imgDiv: {
      width: 350,
      height: 350
    },
    textdeco: {
      top: -80,
      color: '#63330D'
    }
    
})

export default Splash