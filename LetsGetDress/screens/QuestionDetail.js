import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from './StackNavigation'
import axios from 'axios'

//detail หลังกด view ใน question and concern
const AppText = (props) => (
    <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)
const QuestionDetail = ({navigation}) => {
    const { user, login } = useContext(AuthContext)
    const [Data1, setData1] = useState({});

    useEffect(()=>{
        const url = "http://192.168.167.90:3360/question_detail";
        axios.post(url, {
          id : user?.questionId
        })
        .then(({data}) => {
          if (data.status === 'success') {
            setData1(data.results)
            console.log(Data1[0]?.BODY)
          }
        })
        .catch(error => {
          console.error("AXIOS ERROR:");
          console.error(error);
        });
      },[])

    const onPressQuestion = () => {
        navigation.navigate('Questions and Concerns')
    }
    return (
        <View style={styles.container}>
            <View style={styles.squareTop}>
                <Text style={styles.headerText}>Detail</Text>
            </View>
            <View style={styles.contentCon}>
            <AppText style={styles.inputTitle}>Date : {user?.date}</AppText>
                <AppText style={styles.inputTitle}>Subject : {user?.title}</AppText>
                <AppText style={styles.inputTitle}>Detail : {user?.body} </AppText>
                <AppText style={styles.inputTitle}>Status : {user?.status}</AppText>
                {/* <AppText style={styles.inputTitle}>Date : 29/09/23</AppText>
                <AppText style={styles.inputTitle}>Subject : Payment issue</AppText>
                <AppText style={styles.inputTitle}>Detail : I have entered my card number but the money does not cut from my card </AppText>
                <AppText style={styles.inputTitle}>Status : on hold</AppText> */}
                <AppButton
                    onPress={onPressQuestion}
                    title={"Close"} />
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
        marginRight: 'auto',
        marginLeft: 'auto',
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
        width: 350,
        padding: 10
    },
    contentCon: {
        backgroundColor: "white",
        alignItems: "fles-start",
        width: Dimensions.get('window').width * 0.9,
        padding: 10,
        marginVertical: 20,
        borderRadius: 10
    }
}
)


export default QuestionDetail