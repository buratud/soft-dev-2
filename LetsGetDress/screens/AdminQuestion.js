import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Feather'
import { DataTable } from 'react-native-paper';
import { AuthContext } from './StackNavigation'
import { useFocusEffect } from '@react-navigation/native'

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={{ fontSize: 18, color: "black", fontFamily: "Cuprum-VariableFont_wght", textDecorationLine: 'underline'}}>{title}</Text>
    </TouchableOpacity>
)

const AppText = (props) => (
    <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const AdminQuestion = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { updateUser } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
            const url = "http://192.168.167.90:3360/admins_question";
            console.log("sending request to: ", url)
            axios.get(url)
                .then(({ data }) => {
                    if (data.status === 'success') {
                        // console.log(data.results)
                        setData(data.results);
                    }
                })
                .catch(error => {
                    console.error("AXIOS ERROR:");
                    console.error(error);
                });
        }, [])
    );

    const onPressAdminQDetail = (info) => {
        navigation.navigate('AdminQDetail', {
            data: info
        })
    }
    return (
        <DataTable style={styles.container}>
            
            <DataTable.Header>
                <DataTable.Title textStyle={styles.headText}>Ticket No.</DataTable.Title>
                <DataTable.Title textStyle={styles.headText}>Subject</DataTable.Title>
                <DataTable.Title textStyle={styles.headText}>Status</DataTable.Title>
                <DataTable.Title textStyle={styles.headText}>Detail</DataTable.Title>
            </DataTable.Header>

            {
                data.map((e, index) => {
                    return (
                        <DataTable.Row key={index}>
                            <DataTable.Cell textStyle={styles.headText}>{e.QUESTION_ID}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.headText}>{e.TITLE}</DataTable.Cell>
                            <DataTable.Cell textStyle={styles.headText}>{e.STATUS}</DataTable.Cell>
                            <DataTable.Cell>
                                <AppButton
                                    title={'view'}
                                    onPress={() => onPressAdminQDetail(e)}
                                />
                            </DataTable.Cell>
                        </DataTable.Row>
                    );
                })
            }
            
        </DataTable>

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
        backgroundColor: "#FFFFFF",
        flex: 1,
        justifyContent: 'space-between',
        // fontFamily: 'Cuprum-VariableFont_wght',
    },
    // appButtonContainer: {
    //     elevation: 0,
    //     paddingVertical: 0,
    //     justifyContent: 'center',
    //     height: 1,
    // },
    appButtonText: {
        fontSize: 18,
        color: "black",
        // alignSelf: "center",
        fontFamily: "Cuprum-VariableFont_wght",
        textDecorationLine: 'underline'
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
        fontSize: 18,

    },
    detailText: {
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
        fontSize: 18,
        paddingVertical: 10,
        // height: '100%',
        // width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 0

    },
    detailText1: {
        fontFamily: "Cuprum-VariableFont_wght",
        color: 'black',
        fontSize: 18,
        paddingVertical: 10,
        // height: '100%',
        // width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 0

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
        width: Dimensions.get('window').width * 0.96,
        height: 650,
        padding: 0,
        margin: 20,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 5,
        top: 0,
        flexDirection: 'row',
        left: -15
    },
    detailCon1: {
        // backgroundColor: "red",
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.2,
        height: 650,
        padding: 0,
        marginLeft: 3,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 5,
        top: 0,
        flexDirection: 'column'

    },
    detailCon2: {
        // backgroundColor: "blue",
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.35,
        height: 650,
        padding: 0,
        marginLeft: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 5,
        top: 0
    },
    detailCon3: {
        // backgroundColor: "green",
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.2,
        height: 650,
        padding: 0,
        margin: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 5,
        top: 0
    },
    detailCon4: {
        // backgroundColor: "yellow",
        // alignItems: "center",
        width: Dimensions.get('window').width * 0.2,
        height: 650,
        padding: 0,
        margin: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderRadius: 5,
        top: 0
    },
    scrollView: {
        backgroundColor: "white",
        width: Dimensions.get('window').width * 0.96,
        flex: 1,
        top: -20,

    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
})

export default AdminQuestion