import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Feather'

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)

const AppText = (props) => (
    <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

//history หน้า Questions and concern
const QHistory = ({navigation}) => {
    const onPressQuestions = () => {
        navigation.navigate('Questions and Concerns')
      }
    return (
        <View style={styles.container}>
            <View style={styles.squareTop}>
                <Icon style={{left:-180, top: 20}}name='chevron-left' size={35} onPress={onPressQuestions}/>
                <Text style={styles.headerText}>Question history</Text>
            </View>
            <View style={styles.headerCon}>
                <Text style={styles.headText}>   Date                  Subject                  Status</Text>
            </View>
            <View style={styles.detailCon}>
                <Text style={styles.detailText}>25/09/23            Payment Issue                On process</Text>
                <Text style={styles.detailText}>12/05/23             Payment Issue                 Complete</Text>
                <Text style={styles.detailText}>18/03/23             Payment Issue                 Complete</Text>
                <Text style={styles.detailText}>24/10/22             Payment Issue                 Complete</Text>
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
        top: -20
    },
    headText: {
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
        fontSize: 22,
        
    },
    detailText: {
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
        fontSize: 18,
        padding: 10,
        paddingLeft: 15

    },
    headerCon: {
        backgroundColor: "white",
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.95,
        height: 50,
        padding: 0,
        margin: 20,
        borderRadius: 5,
        borderWidth: 3,
        borderLeftColor: 'white',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#f2a676',
        justifyContent: 'center',
        // flex: 1
    },
    detailCon: {
        backgroundColor: "white",
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.95,
        height: 650,
        padding: 0,
        margin: 20,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 5,
        top: -40
    },
})

export default QHistory