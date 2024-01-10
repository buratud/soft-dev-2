import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from './StackNavigation'
import axios from 'axios'
import { Dropdown } from 'react-native-element-dropdown'

const AppText = (props) => (
    <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)
const dataChoice = [
    { label: 'on hold', value: '1' },
    { label: 'in process', value: '2' },
    { label: 'complete', value: '3' },
    ,
]

const AdminQDetail = ({ route, navigation }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const questionData = route.params?.data;
    const onPressQuestion = () => {
        const url = "http://192.168.167.90:3360/update_question";
        axios.post(url, {
            status: value?.label ?? questionData?.STATUS,
            id: questionData.QUESTION_ID
        })
            .then(({ data }) => {
                if (data.status === 'success') navigation.navigate('Questions and Concerns');
            })
            .catch(error => {
                console.error("AXIOS ERROR:");
                console.error(error);
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.squareTop}>
                <Text style={styles.headerText}>Detail</Text>
            </View>
            <View style={styles.contentCon}>
                <AppText style={styles.inputTitle}>Ticket No. : {questionData?.QUESTION_ID}</AppText>
                <AppText style={styles.inputTitle}>Subject : {questionData?.TITLE}</AppText>
                <AppText style={styles.inputTitle}>Detail : {questionData?.BODY} </AppText>
                {/* <AppText style={styles.inputTitle}>Ticket No. : 004</AppText>
                <AppText style={styles.inputTitle}>Subject : Payment issue</AppText>
                <AppText style={styles.inputTitle}>Detail : I have entered my card number but the money does not cut from my card </AppText> */}
                <AppText style={styles.inputTitle}>Status :
                    <View style={{ paddingLeft: 65, marginBottom: 20 }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: '#C06D58', borderWidth: 0.8 }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataChoice}
                            //   search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            //   placeholder={!isFocus ? 'Select item' : '...'}
                            //   searchPlaceholder="Search..."
                            value={value?.value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item);
                                setIsFocus(false);
                            }} />
                    </View>
                </AppText>
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
        marginBottom: 10,
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
        alignItems: "flex-start",
        width: Dimensions.get('window').width * 0.9,
        padding: 10,
        marginVertical: 20,
        borderRadius: 10
    },
    dropdown: {
        height: 30,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 0,
        width: 250,
        borderWidth: 0.8,
        top: -23
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 18,
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
    },
    placeholderStyle: {
        fontSize: 18,
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
        padding: 5
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
        padding: 5
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 18,
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
    },
}
)


export default AdminQDetail