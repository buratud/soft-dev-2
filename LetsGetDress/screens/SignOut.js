import { View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from './StackNavigation'

const ModalButtonY = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.modalButtonYContainer}>
      <Text style={styles.modalButtonYText}>{title}</Text>
    </TouchableOpacity>
)

const ModalButtonN = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.modalButtonNContainer}>
    <Text style={styles.modalButtonNText}>{title}</Text>
  </TouchableOpacity>
)

const SignOut = ({navigation}) => {
    const { signout } = useContext(AuthContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onPressLogin = async () => {
        await signout()
        navigation.navigate('Login')
      }
  return (
    <View style={styles.container}>
       <Modal
                visible={isModalVisible}
                backdropColor='white'
                backdropOpacity= {50}
                onRequestClose={() => setIsModalVisible(false)}
                animationType='slide'
                presentationStyle= 'overFullScreen'
                transparent={true}
                style={{margin: 0}}
                
              >
                <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1}></TouchableOpacity>
              <View style={styles.centerStyle}>
                  <Text style={styles.modalheadtext}>Are you sure to sign out?</Text>
                  <View>
                    <ModalButtonY  
                    style={styles.buttonstyle}
                    title='Yes'
                    onPress={onPressLogin}
                    />
                    <ModalButtonN 
                    style={styles.buttonstyle}
                    title='No'
                    onPress= {() => setIsModalVisible(false)} />
                  </View>

              </View>
          </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

    },
    modalButtonYContainer: {
        elevation: 0,
        backgroundColor: "#E76F51",
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 5,
        margin: 10,
        width: 180,
        alignItems: 'center'
      },
      modalButtonYText: {
        fontSize: 18,
        color: "white",
        alignSelf: "center",
        fontFamily: "Cuprum-Bold"
      },
      modalButtonNContainer: {
        elevation: 0,
        backgroundColor: "#E76F51",
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 5,
        margin: 10,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center'
      },
      modalButtonNText: {
        fontSize: 18,
        color: "white",
        alignSelf: "center",
        fontFamily: "Cuprum-Bold"
      },
      centerStyle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#FFE6DF', 
        padding: 0, 
        width: '85%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
        borderRadius: 10
    },
    modalheadtext: {
      fontSize: 20,
      color: "black",
      alignSelf: "center",
      fontFamily: "Cuprum-Bold",
      marginBottom: 20
    }
})

export default SignOut