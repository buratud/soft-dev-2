import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Feather'

const MyModal = (props) => {
  const [link, onChangelink] = React.useState('');
  const [name, onChangename] = React.useState('');
  const [des, onChangedes] = React.useState('');
  const [date, onChangedate] = React.useState('');
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  // if (isModalVisible2 === true) {
  const confirmHandler = () => {
    const url = "http://192.168.167.90:3360/update_content";
    // useEffect(() => {
      console.log('Sending request to', url)
      axios.post(url, {
        title: name, 
        pic: link, 
        body: des,
        date: date
      })
      .then(({ data }) => {
        if (data.status === 'success') {
          setIsModalVisible2(false); 
          props.setIsModalVisible(false)
        }
      })
      .catch(error => {
        console.error("AXIOS ERROR:");
        console.error(error);
      });
    }

    const confirmDeleteHandler = () => {
      console.log('confirmHandler called');
      console.log('link:', link);
      console.log('des:', des);
      console.log('date:', date);
      console.log('newwwwwwwwwwwww',link,des,date)
      const url = "http://192.168.167.90:3360/delete_content";
      // useEffect(() => {
        console.log('Sending request to', url)
        axios.post(url, {
          title: name
        })
        .then(({ data }) => {
          if (data.status === 'success') {
            setIsModalVisible2(false); 
            props.setIsModalVisible(false)
          }
        })
        .catch(error => {
          console.error("AXIOS ERROR:");
          console.error(error);
        });
      }


  return (
    <Modal
      visible={props.isModalVisible}
      backdropColor='white'
      backdropOpacity={50}
      onRequestClose={() => props.setIsModalVisible(false)}
      animationType='slide'
      presentationStyle='overFullScreen'
      transparent={true}
      style={{ margin: 0 }}
      statusBarTranslucent={true}

    >
      <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1}></TouchableOpacity>
      <View style={styles.centerStyle}>
        <Text style={styles.modalheadtext}>Edit information</Text>
        <View>
          <Text style={styles.modalsmalltext}> Url : </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangelink}
            value={link}
            placeholder="place url here"
          />
          <Text style={styles.modalsmalltext}> Name : </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangename}
            value={name}
            placeholder="place url here"
          />
          <Text style={styles.modalsmalltext}> Description : </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangedes}
            value={des}
            placeholder="e.g. World tour 2023"
          />
          <Text style={styles.modalsmalltext}> Date : </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangedate}
            value={date}
            placeholder="e.g. 30.10.23"
          />
          <View>
            <AppButtonDelete
              style={styles.buttonstyle2}
              title='Delete'
              onPress={() => setIsModalVisible2(true)}
            />
            <Modal
              visible={isModalVisible2}
              backdropColor='white'
              backdropOpacity={50}
              onRequestClose={() => setIsModalVisible2(false)}
              animationType='slide'
              presentationStyle='overFullScreen'
              transparent={true}
              style={{ margin: 0 }}

            >
              <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1}></TouchableOpacity>
              <View style={styles.centerStyle3}>
                <Text style={styles.modalheadtext3}>Are you sure to delete?</Text>
                <View>
                  <AppButtonCancel
                    title='Cancel'
                    onPress={() => {setIsModalVisible2(false), props.setIsModalVisible(false); }}
                  />
                  <AppButtonConfirm
                    title='Confirm'
                    onPress={() => { confirmDeleteHandler(); setIsModalVisible2(false); props.setIsModalVisible(false); }}
                  />
                </View>

              </View>
            </Modal>
          </View>
          <AppButton
            style={styles.buttonstyle}
            title='Confirm'
            onPress={() => {confirmHandler(), props.setIsModalVisible(false)}}
          />
        </View>

      </View>
    </Modal>
  )
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

const AppButtonDelete = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer2}>
    <Text style={styles.appButtonText2}>{title}</Text>
  </TouchableOpacity>
)

const AppButtonConfirm = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer4}>
    <Text style={styles.appButtonText2}>{title}</Text>
  </TouchableOpacity>
)

const AppButtonCancel = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer3}>
    <Text style={styles.appButtonText3}>{title}</Text>
  </TouchableOpacity>
)

const EventCard = (props) => {
  const { link, eventName, detailName, date, setIsModalVisible } = props;
  return (
    <View>
      <View style={styles.ImgCon1}>
        <Image style={styles.ImgCon} source={{ uri: link }} />
      </View>
      <Text style={styles.eventName}>{eventName}<Icon style={styles.iconPos} name='settings' size={35} onPress={() => setIsModalVisible(true)} /> </Text>
      <Text style={styles.detailName}>{detailName}</Text>
      <Text style={styles.dateName}>{date}</Text>
    </View>
  )
}

const AdminNewContent = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const url = "http://192.168.167.90:3360/new_content";
  const [EventData, setEventData] = useState([]);
  useEffect(() => {
    axios.get(url)
      .then(response => {
        const data = response.data;
        // console.log("API response:", data);
        if (data.status === 'success' && Array.isArray(data.message)) {
          const newEventData = data.message.map(event => ({
            key: event.CONTENT_ID,
            link: event.PIC,
            eventName: event.TITLE,
            detailName: event.DETAIL,
            date: event.DATE
          }));
          // console.log("New EventData:", newEventData);
          setEventData(newEventData);
        } else {
          console.error("Unexpected data structure");
        }
      })
      .catch(error => {
        console.error("AXIOS ERROR:", error);
      });
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.insideCon}>
          {/* <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{ uri: 'https://i.pinimg.com/736x/5c/33/c1/5c33c10bf16cbb56aeef599352830f01.jpg' }} />
          </View>
          <Text style={styles.eventName}>Black Pink <Icon style={styles.iconPos} name='settings' size={35} onPress={() => setIsModalVisible(true)} /> </Text>
          <Text style={styles.detailName}>World tour Born Pink</Text>
          <Text style={styles.dateName}>14.11.23</Text>
          <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{ uri: 'https://cdn.kpopconcerts.com/wp-content/uploads/2022/08/04114609/2022-TOUR-SEVENTEEN-BE-THE-SUN-NORTH-AMERICA-tour-poster-1350x1909.jpg' }} />
          </View>
          <Text style={styles.eventName}>Seventeen <Icon style={styles.iconPos} name='settings' size={35} onPress={() => setIsModalVisible(true)} /> </Text>
          <Text style={styles.detailName}>World tour Be the Sun</Text>
          <Text style={styles.dateName}>09.12.23</Text>
          <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{ uri: 'http://cdn.designbump.com/wp-content/uploads/2015/12/colorful-christmas-trees-inspiration-5.jpg' }} />
          </View>
          <Text style={styles.eventName}>Christmas <Icon style={styles.iconPos} name='settings' size={35} onPress={() => setIsModalVisible(true)} /> </Text>
          <Text style={styles.dateName}>25.12.23</Text>
          <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{ uri: 'https://image.freepik.com/free-vector/minimal-valentine-heart-background_76243-44.jpg' }} />
          </View>
          <Text style={styles.eventName}>Valentine <Icon style={styles.iconPos} name='settings' size={35} onPress={() => setIsModalVisible(true)} /> </Text>
          <Text style={styles.dateName}>14.02.23</Text> */}
          {EventData.map((event, index) => {
            return <EventCard key={index} link={event.link} eventName={event.eventName} detailName={event.detailName} date={event.date} setIsModalVisible={setIsModalVisible}/>
          })}
        </View>
        <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FAEBDC'
  },
  scrollView: {
    backgroundColor: "black",
    width: Dimensions.get('window').width,
    flex: 1,
  },
  ImgCon: {
    width: 300,
    height: 410,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    // elevation: 10
  },
  ImgCon1: {
    width: 300,
    height: 410,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    elevation: 10
  },
  insideCon: {
    width: '90%',
    backgroundColor: '#FAEBDC',
    alignItems: 'center',
    padding: 20
  },
  eventName: {
    fontFamily: 'Cuprum-Bold',
    fontSize: 50,
    color: 'black',
    paddingTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  dateName: {
    fontFamily: "Cuprum-VariableFont_wght",
    fontSize: 25,
    color: 'black',
    paddingBottom: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  detailName: {
    fontFamily: "Cuprum-Bold",
    fontSize: 30,
    color: 'black',
    marginRight: 'auto',
    marginLeft: 'auto',
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
    fontSize: 16,
    fontFamily: "Cuprum-VariableFont_wght",
    color: 'black'
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
    marginBottom: 0,
    paddingTop: 20,
    paddingBottom: 10
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
    left: 170
  },
  appButtonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
  appButtonContainer2: {
    elevation: 0,
    backgroundColor: "#9D0208",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 25,
    width: 130,
    alignItems: 'center',
    left: 20
  },
  appButtonContainer3: {
    elevation: 0,
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 25,
    width: 130,
    alignItems: 'center',
    top: 0,
    left: -80
  },
  appButtonContainer4: {
    elevation: 0,
    backgroundColor: "#9D0208",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginTop: 25,
    width: 130,
    alignItems: 'center',
    top: -77,
    left: 80
  },
  appButtonText2: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
  appButtonText3: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
  buttonstyle: {
    color: '#FF9176',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    top: -50,
    left: 100
  },
  buttonstyle2: {
    color: '#FF9176',
    alignItems: 'center',
    margin: 20,
    padding: 20
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
    elevation: 8
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

}
)

export default AdminNewContent