import { View, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Image, TouchableOpacity,ScrollView} from 'react-native'
import React, {useContext} from 'react'
import axios from 'axios'
import { AuthContext } from './StackNavigation'

const AppText = (props) => (
    <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)

const EditNewFashion = ({ navigation }) => {
    const onPressAdminNewFashion = () => {
        const url = "http://192.168.167.90:3360/update_fashion";
      console.log("Sending request to", url);
      if (link01 !== "" && des01 !== "") {
      axios.post(url, {
       pic: link01,
       title: des01,
       id: 6
      })
      .then(({data}) => { 
        console.log(data)
        
      })
      .catch(async error => {
        console.error("AXIOS ERROR:");
        console.error(await error);
      });
    }
      const url1 = "http://192.168.167.90:3360/update_clothes";
      console.log("Sending request to", url1);
      if (link1 !== "" && link2 !== "" && link3 !== "" && link4 !== "") {
      axios.post(url1, {
        pic: link1,
        place: link2, 
        theme: link3, 
        type: link4, 
        pair: link5, 
        inverted_tri: link6, 
        apple: link7, 
        pear: link8, 
        hourglass: link9, 
        rectangle: link10
      })
      .then(({data}) => { 
        console.log(data)
        
      })
      .catch(async error => {
        console.error("AXIOS ERROR:");
        console.error(await error);
      });
    }
      // navigation.navigate('ProfilePremium')
      navigation.navigate('New Fashion')
    }
      
    
    
    const [link1, onChangelink1] = React.useState(''); //input edit new arrival
    const [link2, onChangelink2] = React.useState('');
    const [link3, onChangelink3] = React.useState('');
    const [link4, onChangelink4] = React.useState('');
    const [link5, onChangelink5] = React.useState('');
    const [link6, onChangelink6] = React.useState('');
    const [link7, onChangelink7] = React.useState('');
    const [link8, onChangelink8] = React.useState('');
    const [link9, onChangelink9] = React.useState('');
    const [link10, onChangelink10] = React.useState('');
    const [link01, onChangelink01] = React.useState(''); // edit show case picture
    const [link02, onChangelink02] = React.useState('');
    const [link03, onChangelink03] = React.useState('');
    const [link04, onChangelink04] = React.useState('');
    const [link05, onChangelink05] = React.useState('');
    const [link06, onChangelink06] = React.useState('');
    const [des01, onChangedes01] = React.useState(''); //edit show case description
    const [des02, onChangedes02] = React.useState('');
    const [des03, onChangedes03] = React.useState('');
    const [des04, onChangedes04] = React.useState('');
    const [des05, onChangedes05] = React.useState('');
    const [des06, onChangedes06] = React.useState('');
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.insideCon}>
                    <View style={styles.urlCon}>
                        <Text style={styles.header}>Add New Arrival</Text>
                        <AppText style={styles.headtext}>Picture : </AppText>
                        <AppText style={styles.headtext}>Tag : </AppText>
                        <AppText style={styles.headtext}>Color : </AppText>
                        <AppText style={styles.headtext}>Type : </AppText>
                        <AppText style={styles.headtext}>Pair : </AppText>
                        <AppText style={styles.headtext}>Inverted-tri : </AppText>
                        <AppText style={styles.headtext}>Apple : </AppText>
                        <AppText style={styles.headtext}>Pear : </AppText>
                        <AppText style={styles.headtext}>Hourglass : </AppText>
                        <AppText style={styles.headtext}>Rectangle : </AppText>
                        <TextInput
                            style={styles.input}
                            value={link1}
                            onChangeText={onChangelink1}
                            placeholder='place url here'
                        />
                        <TextInput
                            style={styles.input}
                            value={link2}
                            onChangeText={onChangelink2}
                            placeholder='e.g.Beach'
                        />
                        <TextInput
                            style={styles.input}
                            value={link3}
                            onChangeText={onChangelink3}
                            placeholder='e.g.White'
                        />
                        <TextInput
                            style={styles.input}
                            value={link4}
                            onChangeText={onChangelink4}
                            placeholder='e.g.Top'
                        />
                        <TextInput
                            style={styles.input}
                            value={link5}
                            onChangeText={onChangelink5}
                            placeholder='e.g.top-white'
                        />
                        <TextInput
                            style={styles.input}
                            value={link6}
                            onChangeText={onChangelink6}
                            placeholder='1 or 0'
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={link7}
                            onChangeText={onChangelink7}
                            placeholder='1 or 0'
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={link8}
                            onChangeText={onChangelink8}
                            placeholder='1 or 0'
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={link9}
                            onChangeText={onChangelink9}
                            placeholder='1 or 0'
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={link10}
                            onChangeText={onChangelink10}
                            placeholder='1 or 0'
                            keyboardType="numeric"
                        />
                        <View style={{ top: -400 }}>
                            <Text style={{ ...styles.header, top: -200 }}>Edit Show case</Text>
                            <AppText style={styles.headtext2}>Picture 1 Left</AppText>
                            <AppText style={styles.detail}>url : </AppText>
                            <AppText style={styles.detail}>detail : </AppText>
                            <TextInput
                                style={styles.input2}
                                value={link01}
                                onChangeText={onChangelink01}
                                placeholder='place url here'
                            />
                            <TextInput
                                style={styles.input2}
                                value={des01}
                                onChangeText={onChangedes01}
                                placeholder='e.g. Earth tone - Holiday'
                            />
                            <View style={{ top: -100 }}>
                                <AppText style={styles.headtext2}>Picture 2 Left</AppText>
                                <AppText style={styles.detail}>url : </AppText>
                                <AppText style={styles.detail}>detail : </AppText>
                                <TextInput
                                    style={styles.input2}
                                    value={link02}
                                    onChangeText={onChangelink02}
                                    placeholder='place url here'
                                />
                                <TextInput
                                    style={styles.input2}
                                    value={des02}
                                    onChangeText={onChangedes02}
                                    placeholder='e.g. Earth tone - Holiday'
                                />
                            </View>
                            <View style={{ top: -200 }}>
                                <AppText style={styles.headtext2}>Picture 3 Left</AppText>
                                <AppText style={styles.detail}>url : </AppText>
                                <AppText style={styles.detail}>detail : </AppText>
                                <TextInput
                                    style={styles.input2}
                                    value={link03}
                                    onChangeText={onChangelink03}
                                    placeholder='place url here'
                                />
                                <TextInput
                                    style={styles.input2}
                                    value={des03}
                                    onChangeText={onChangedes03}
                                    placeholder='e.g. Earth tone - Holiday'
                                />
                            </View>
                            <View style={{ top: -300 }}>
                                <AppText style={styles.headtext2}>Picture 1 Right</AppText>
                                <AppText style={styles.detail}>url : </AppText>
                                <AppText style={styles.detail}>detail : </AppText>
                                <TextInput
                                    style={styles.input2}
                                    value={link04}
                                    onChangeText={onChangelink04}
                                    placeholder='place url here'
                                />
                                <TextInput
                                    style={styles.input2}
                                    value={des04}
                                    onChangeText={onChangedes04}
                                    placeholder='e.g. Earth tone - Holiday'
                                />
                            </View>
                            <View style={{ top: -400 }}>
                                <AppText style={styles.headtext2}>Picture 2 Right</AppText>
                                <AppText style={styles.detail}>url : </AppText>
                                <AppText style={styles.detail}>detail : </AppText>
                                <TextInput
                                    style={styles.input2}
                                    value={link05}
                                    onChangeText={onChangelink05}
                                    placeholder='place url here'
                                />
                                <TextInput
                                    style={styles.input2}
                                    value={des05}
                                    onChangeText={onChangedes05}
                                    placeholder='e.g. Earth tone - Holiday'
                                />
                            </View>
                            <View style={{ top: -500 }}>
                                <AppText style={styles.headtext2}>Picture 3 Right</AppText>
                                <AppText style={styles.detail}>url : </AppText>
                                <AppText style={styles.detail}>detail : </AppText>
                                <TextInput
                                    style={styles.input2}
                                    value={link06}
                                    onChangeText={onChangelink06}
                                    placeholder='place url here'
                                />
                                <TextInput
                                    style={styles.input2}
                                    value={des06}
                                    onChangeText={onChangedes06}
                                    placeholder='e.g. Earth tone - Holiday'
                                />
                            </View>

                            <AppButton
                                title={'submit'}
                                onPress={onPressAdminNewFashion}
                            />
                        </View>
                    </View>
                   

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2a676",
        alignItems: "center",
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        // flex: 1
    },
    insideCon: {
        backgroundColor: "#f2a676",
        alignItems: "center",
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        // flexGrow: 1
    },
    input: {
        width: 240,
        height: 35,
        margin: 14,
        borderWidth: 1,
        padding: 7,
        fontFamily: "Cuprum-VariableFont_wght",
        borderRadius: 7,
        fontSize: 18,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginLeft: 100,
        top: -630,
    },
    input2: {
        width: 260,
        height: 35,
        margin: 10,
        borderWidth: 1,
        padding: 7,
        fontFamily: "Cuprum-VariableFont_wght",
        borderRadius: 7,
        fontSize: 18,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginLeft: 85,
        top: -305,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: "black",
        fontFamily: "Cuprum-VariableFont_wght"
    },
    appButtonContainer: {
        elevation: 0,
        backgroundColor: "#E67738",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical: 10,
        top: -780,
        width: 100,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    appButtonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: "Cuprum-VariableFont_wght"
    },
    headtext: {
        marginVertical: 10,
        padding: 10
    },
    urlCon: {
        width: Dimensions.get('window').width * 0.9,
        height: 2000,
        padding: 10,
        backgroundColor: '#FAEFE2',
        marginTop: 20,
        borderRadius: 10
    },
    header: {
        fontFamily: 'Cuprum-Bold',
        fontSize: 30,
        color: 'black',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: 10
    },
    scrollView: {
        backgroundColor: "#FAEBDC",
        width: '100%',
        flex: 1,

    },
    headtext2: {
        marginRight: 'auto',
        marginTop: 10,
        marginRight: 0,
        paddingTop: 20,
        top: -200,
        padding: 10
    },
    detail: {
        top: -200,
        paddingLeft: 15,
        padding: 15,
        paddingLeft: 25
    }
}
)

export default EditNewFashion