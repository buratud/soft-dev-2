import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DropdownComponent from './Dropdown'
import DropdownComponent2 from './Dropdown2'
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'

const AppText = (props) => (
  <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const AdminOutfitsRec = () => {


  let placeLoop = []
  for (let a = 0; a <= 5; a++) {
    placeLoop.push(
      <TextInput placeholder='enter place here'>{a}</TextInput>
    )
  }
  const AppButtonConfirm = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  )

  const AppButtonCancel = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer2}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  const [place, setPlace] = useState([]);

  useEffect(()=>{
    if(onChangev1) {
      setPlace() 
    }
  },[])
  // useEffect(()=>{
  //   if(onChangev2) {
  //     setPlace(3) 
  //   }
  // },[])
  // useEffect(()=>{
  //   if(onChangev3) {
  //     setPlace(4) 
  //   }
  // },[])
  // useEffect(()=>{
  //   if(onChangev4) {
  //     setPlace(5) 
  //   }
  // },[])

  const [v1, onChangev1] = React.useState('');
  const [v2, onChangev2] = React.useState('');
  const [v3, onChangev3] = React.useState('');
  const [v4, onChangev4] = React.useState('');
  const [v5, onChangev5] = React.useState('');
  const [v01, onChangev01] = React.useState('');
  const [v02, onChangev02] = React.useState('');
  const [v03, onChangev03] = React.useState('');
  const [v04, onChangev04] = React.useState('');
  const [v05, onChangev05] = React.useState('');

  const placeHandler = () => {
    // const url1 = "http://192.168.167.90:3360/place";
    // const [dataPlace, setDataPlace] = useState([]);
    // axios.get(url1)
    //   .then(response => {
    //     const data = response.data;
    //     console.log("API response:", data);
        
    //     if (data.status === 'success') {
    //       if (Array.isArray(data.results)) {
    //         const newDataPlace = data.results.map(item => ({
    //           label: item.CHOICE,
    //           value: item.PLACE_ID,
    //         }));
    //         console.log("New dataPlace:", newDataPlace);
    //         setDataPlace(newDataPlace);
    //       } else if (data.results && typeof data.results.CHOICE === 'string' && typeof data.results.PLACE_ID === 'string') {
    //         setDataPlace([{ label: data.results.CHOICE, value: data.results.PLACE_ID }]);
    //       } else {
    //         console.error("Unexpected data structure");
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.error("AXIOS ERROR:", error);
    //   });

    const url = "http://192.168.167.90:3360/update_place";
      console.log('Sending request to', url)
      console.log('new_place', v1)
      axios.post(url, {
        // old_place: '123',
        new_place: v1,
        id: 1
      })
      .then(({ data }) => {
        if (data.status === 'success') {

        }
      })
      .catch(error => {
        console.error("AXIOS ERROR:");
        console.error(error);
      });
    }

    const themeHandler = () => {
      const url = "http://192.168.167.90:3360/update_theme";
        console.log('Sending request to', url)
        axios.post(url, {
          id: 1,
          new_theme: 'white'
        })
        .then(({ data }) => {
          if (data.status === 'success') {
  
          }
        })
        .catch(error => {
          console.error("AXIOS ERROR:");
          console.error(error);
        });
      }

  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={styles.innerCon}>
        <View style={styles.insideCon}>
          {/* <View> */}
          <AppText style={styles.normalText}>Place <Icon style={styles.iconPos} name='settings' size={25} onPress={() => setIsModalVisible(true)} /></AppText>
          <DropdownComponent />
          {/* <KeyboardAvoidingView
            behavior='position'
            // keyboardVerticalOffset={200} // You may need to adjust this value based on your layout
            style={styles.keyboardAvoidingContainer}
            enabled
          > */}
            <Modal
              visible={isModalVisible}
              backdropColor='white'
              backdropOpacity={50}
              onRequestClose={() => setIsModalVisible(false)}
              animationType='slide'
              presentationStyle='overFullScreen'
              transparent={true}
              style={{ margin: 0 }}
              statusBarTranslucent={true}
            >

              <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1}></TouchableOpacity>
              <View style={styles.centerStyle1}>
                <Text style={styles.modalheadtext}>Edit Place</Text>
                <Text style={styles.modalsmalltext}>value 1: </Text>
                <TextInput
                  style={styles.input}
                  value={v1}
                  onChangeText={onChangev1}
                  // placeholder='cafe'
                />
                <Text style={styles.modalsmalltext}>value 2: </Text>
                <TextInput
                  style={styles.input}
                  value={v2}
                  onChangeText={onChangev2}
                  // placeholder='work'
                />
                <Text style={styles.modalsmalltext}>value 3: </Text>
                <TextInput
                  style={styles.input}
                  value={v3}
                  onChangeText={onChangev3}
                  // placeholder='date night'
                />
                <Text style={styles.modalsmalltext}>value 4: </Text>
                <TextInput
                  style={styles.input}
                  value={v4}
                  onChangeText={onChangev4}
                  // placeholder='beach'
                />
                {/* <Text style={styles.modalsmalltext}>value 5: </Text>
                <TextInput
                  style={styles.input}
                  value={v5}
                  onChangeText={onChangev5}
                  placeholder='Picnic'
                /> */}
                <View>
                  <AppButtonCancel
                    title='Cancel'
                    onPress={() => setIsModalVisible(false)}
                  />
                  <AppButtonConfirm
                    title='Confirm'
                    onPress={() => {setIsModalVisible(false), placeHandler()}}
                  />
                </View>
              </View>
            </Modal>

          <AppText style={styles.normalText}>Theme <Icon style={styles.iconPos} name='settings' size={25} onPress={() => setIsModalVisible2(true)} /></AppText>
          <DropdownComponent2 />

            <Modal
              visible={isModalVisible2}
              backdropColor='white'
              backdropOpacity={50}
              onRequestClose={() => setIsModalVisible2(false)}
              animationType='slide'
              presentationStyle='overFullScreen'
              transparent={true}
              style={{ margin: 0 }}
              statusBarTranslucent={true}
            >
              <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1}></TouchableOpacity>
              <View style={styles.centerStyle}>
                <Text style={styles.modalheadtext}>Edit Theme</Text>
                <Text style={styles.modalsmalltext}>value 1: </Text>
                <TextInput
                  style={styles.input}
                  value={v01}
                  onChangeText={onChangev01}
                  placeholder='White'
                />
                <Text style={styles.modalsmalltext}>value 2: </Text>
                <TextInput
                  style={styles.input}
                  value={v02}
                  onChangeText={onChangev02}
                  placeholder='Black'
                />
                <Text style={styles.modalsmalltext}>value 3: </Text>
                <TextInput
                  style={styles.input}
                  value={v03}
                  onChangeText={onChangev03}
                  placeholder='Dark'
                />
                <Text style={styles.modalsmalltext}>value 4: </Text>
                <TextInput
                  style={styles.input}
                  value={v04}
                  onChangeText={onChangev04}
                  placeholder='Vivid'
                />
                <Text style={styles.modalsmalltext}>value 5: </Text>
                <TextInput
                  style={styles.input}
                  value={v05}
                  onChangeText={onChangev05}
                  placeholder='Earth tone'
                />

                <View>
                  <AppButtonCancel
                    title='Cancel'
                    onPress={() => setIsModalVisible2(false)}
                  />
                  <AppButtonConfirm
                    title='Confirm'
                    onPress={() => {setIsModalVisible2(false), themeHandler()}}
                  />
                </View>
              </View>
            </Modal>

          {/* {placeLoop} connect backend */}
        </View>
      </View>

    </View>

    // </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FAEBDC',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scrollView: {
    backgroundColor: "black",
    width: Dimensions.get('window').width,
    flex: 1,
  },
  insideCon: {
    width: '90%',
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.45,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    elevation: 10,
  },
  header: {
    fontFamily: "Cuprum-VariableFont_wght",
    fontSize: 25,
    color: 'black',
    padding: 10
  },
  normalText: {
    marginRight: 'auto',
    paddingTop: 15,
    paddingLeft: 20
  },
  modalheadCon: {
    backgroundColor: "#FF9176",
    height: '10%',
    width: '100%',
    top: -10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  modalHeaderText: {
    fontSize: 35,
    fontFamily: "Cuprum-Bold",
    padding: 10,
    color: 'black',
  },
  modalhistory: {
    fontSize: 23,
    fontFamily: "Cuprum-Bold",
    paddingVertical: 12,
    color: 'black',
  },
  modalheadtext3: {
    fontSize: 25,
    color: "black",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold",
    marginBottom: 0,
    paddingTop: 20,
    paddingBottom: 10
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modaltextcon: {
    alignItems: 'flex-start',
    width: '95%',
    height: '50%',
    borderRightColor: 'white',
    borderBottomColor: 'black',
    borderLeftColor: 'white',
    borderTopColor: 'white',
    borderWidth: 1,
  },
  modalsmalltext: {
    fontSize: 18,
    fontFamily: "Cuprum-VariableFont_wght",
    color: 'black',
    marginRight: 'auto',
    paddingLeft: 15
  },
  modaliconPos: {
    alignItems: 'flex-start',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'white',
  },
  scrollView: {
    backgroundColor: "blue",
    width: Dimensions.get('window').width,
    flex: 1,

  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalheadtext: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold",
    marginBottom: 15,
    paddingTop: 20,
    paddingBottom: 10
  },
  appButtonContainer: {
    elevation: 0,
    backgroundColor: "#E67738",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 25,
    width: 130,
    alignItems: 'center',
    top: -77.5,
    left: 80
  },
  appButtonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
  appButtonContainer2: {
    elevation: 0,
    backgroundColor: "#E67738",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 25,
    width: 130,
    alignItems: 'center',
    left: -80
  },
  buttonstyle: {
    color: '#FF9176',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    top: -50,
    left: 100
  },
  centerStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#FAEBDC',
    padding: 0,
    width: '85%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    elevation: 8,
  },
  centerStyle1: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#FAEBDC',
    padding: 0,
    width: '85%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    elevation: 8,
  },
  centerStyle3: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#FAEBDC',
    padding: 0,
    width: '85%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    elevation: 8
  },
  input: {
    width: 250,
    height: 35,
    margin: 0,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 7,
    fontFamily: "Cuprum-VariableFont_wght",
    left: 25,
    top: -25
  },
  iconPos: {
    marginLeft: 'auto',
    left: 140,
    top: -490,
    padding: 19.5
  }

})

export default AdminOutfitsRec

