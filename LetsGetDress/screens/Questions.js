import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import UserChatScreen from './UserChatScreen'
import QuestionDetail from './QuestionDetail'
import { AuthContext } from './StackNavigation'
import axios from 'axios'

const AppText = (props) => (
  <Text {...props} style={{ fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18, color: 'black' }}>{props.children}</Text>
)

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

const AppButton2 = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer2}>
    <Text style={styles.appButtonText2}>{title}</Text>
  </TouchableOpacity>
)

const ModalButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.modalButtonContainer}>
    <Text style={styles.modalButtonText}>{title}</Text>
  </TouchableOpacity>
)

const QHistoryButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)

const Questions = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user, login } = useContext(AuthContext)
  const { updateUser } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  useEffect(()=>{
      const url = "http://192.168.167.90:3360/show_question";
      axios.post(url, {
        id : user?.id
      })
      .then(({data}) => {
        if (data.status === 'success') {
          setResults(data.results.reverse());
        }
      })
      .catch(error => {
        console.error("AXIOS ERROR:");
        console.error(error);
      });
    },[])

  const onPressQHistory = () => {
    navigation.navigate('QHistory')
  }
  const onPressUserChatScreen = () => {
    navigation.navigate('UserChatScreen')
  }
  // const onPressView = () => {
  //   setData1(Data1);
  // }
  const onPressQuestionHistory = (info) => {
    updateUser({
      title: info.TITLE,
      body: info.BODY,
      status: info.STATUS,
      date: info.DATE,
    });
    navigation.navigate('QuestionHistory')
  }
  const OnPressSend = () => {
    const url = "http://192.168.167.90:3360/new_question";
    axios.post(url, {
      title: text2, 
      body: text, 
      id: user?.id
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
    <ScrollView>
      <View style={styles.container}>

        {/* <Text style={styles.textheader}>Send new questions and concerns</Text> */}
        <Text style={styles.headtext}>Subject : </Text>
        <View style={styles.inputContainer2}>
          <TextInput
            onChangeText={text2 => onChangeText2(text2)}
            style={styles.input}
            placeholder='Type subject here...'
          />
        </View>
        <Text style={styles.headtext}>Detail : </Text>
        <View style={styles.inputContainer}>
          <TextInput
            editable
            multiline
            numberOfLines={2}
            onChangeText={text => onChangeText(text)}
            style={styles.input}
            placeholder='Type questions or concerns here...'
          />
        </View>

        <AppButton
          title={'Send'}
          onPress={OnPressSend}
        />
        <Text style={styles.textheader}>History</Text>
        <View style={styles.headerCon}>
          <Text style={styles.headText}>       Date             Subject      Status      Detail</Text>
        </View>
        <View style={styles.detailCon}>
          <View style={styles.detailCon1}>
            {results.map((result, index) => (
              <Text key={index} style={styles.detailText}>
                {result.DATE}
              </Text>
            ))}
            {/* <Text style={styles.detailText}>29/09/23</Text>
            <Text style={styles.detailText}>14/09/23</Text>
            <Text style={styles.detailText}>19/08/23</Text>
            <Text style={styles.detailText}>17/09/23</Text> */}
          </View>
          <View style={styles.detailCon2}>
            {results.map((result, index) => (
              <Text key={index} style={styles.detailText}>
                {result.TITLE}
              </Text>
            ))}
            {/* <Text style={styles.detailText}>Payment issue</Text>
            <Text style={styles.detailText}>Problem 3</Text>
            <Text style={styles.detailText}>Problem 2</Text>
            <Text style={styles.detailText}>Problem 1</Text> */}
          </View>
          <View style={styles.detailCon3}>
            {results.map((result, index) => (
              <Text key={index} style={styles.detailText}>
                {result.STATUS}
              </Text>
            ))}
            {/* <Text style={styles.detailText}>on hold</Text>
            <Text style={styles.detailText}>in process</Text>
            <Text style={styles.detailText}>complete</Text>
            <Text style={styles.detailText}>complete</Text> */}
          </View>
          <View style={styles.detailCon4}>
            {results.map((result, index) => (
              <Text key={index} style={styles.detailText}>
                <AppButton2
                  title={'view'}
                  onPress={() => onPressQuestionHistory(result)}
                />
              </Text>
            ))}
            {/* <AppButton2
              title={'view'}
              onPress={onPressQuestionHistory}
            />
            <AppButton2
              title={'view'}
              onPress={onPressQuestionHistory}
            />
            <AppButton2
              title={'view'}
              onPress={onPressQuestionHistory}
            />
            <AppButton2
              title={'view'}
              onPress={onPressQuestionHistory}
            /> */}
          </View>
        </View>
      </View>
      <View>

        {/* <QHistoryButton
            title={'View history'}
            onPress={onPressQHistory}
          /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  squareTop: {
    height: 90,
    width: Dimensions.get('window').width,
    backgroundColor: "#FF9176",
    alignItems: 'center',
    paddingTop: 5,
    fontFamily: "Cuprum-VariableFont_wght",
    justifyContent: "center",
    elevation: 5,
  },
  container: {
    backgroundColor: "#FAEBDC",
    alignItems: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  headerText: {
    color: 'black',
    fontSize: 40,
    fontFamily: "Cuprum-Bold",
    top: 0
  },
  innerCon: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 15,
    marginVertical: 30,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  appButtonContainer: {
    elevation: 0,
    backgroundColor: "#E67738",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 15,
    width: 240,
    alignItems: 'center',
    top: 0
  },
  appButtonText: {
    fontSize: 22,
    color: "white",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
  appButtonContainer2: {
    elevation: 0,
    paddingTop: 10,
    justifyContent: 'center',

  },
  appButtonText2: {
    fontSize: 18,
    color: "black",
    alignSelf: "center",
    fontFamily: "Cuprum-VariableFont_wght",
    textDecorationLine: 'underline'
  },
  normalText1: {
    paddingLeft: 15,
    paddingTop: 20,
    marginRight: 'auto'
  },
  normalText2: {
    paddingVertical: 10,
    paddingLeft: 30,
    marginRight: 'auto'
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    marginTop: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
    top: 0
    // justifyContent: 'flex-start'
  },
  inputContainer2: {
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
    top: 0,
    paddingTop: 10
  },
  input: {
    paddingLeft: 15,
    paddingTop: 0,
    fontSize: 18,
    fontFamily: "Cuprum-VariableFont_wght",
    justifyContent: 'flex-start',
  },
  buttonstyle: {
    color: '#FF9176',
    alignItems: 'center',
    margin: 20,
    padding: 20
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
  headtext: {
    fontSize: 22,
    color: "black",
    fontFamily: "Cuprum-VariableFont_wght",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 20
  },
  centerStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#FAEBDC',
    padding: 0,
    width: '85%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 5
  },
  modalButtonContainer: {
    elevation: 0,
    backgroundColor: "#E67738",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 10,
    width: 180,
    alignItems: 'center'
  },
  modalButtonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold"
  },
  iconPos: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    top: -45,
    padding: 10
  },
  modalheadtext: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    fontFamily: "Cuprum-Bold",
    marginBottom: 20
  },
  headerCon: {
    backgroundColor: "white",
    // alignItems: "center",
    width: Dimensions.get('window').width * 0.96,
    height: 50,
    padding: 0,
    margin: 10,
    borderRadius: 5,
    borderWidth: 3,
    borderLeftColor: 'white',
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#f2a676',
    justifyContent: 'center',
  },
  detailCon: {
    backgroundColor: "white",
    // alignItems: "center",
    width: Dimensions.get('window').width * 0.96,
    height: 300,
    padding: 0,
    margin: 20,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 5,
    top: -30,
    flexDirection: 'row'
  },
  detailCon1: {
    // backgroundColor: "red",
    // alignItems: "center",
    width: Dimensions.get('window').width * 0.3,
    height: 650,
    padding: 0,
    marginLeft: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 5,
    top: 0,
    flexDirection: 'column'

  },
  detailCon2: {
    // backgroundColor: "blue",
    // alignItems: "center",
    width: Dimensions.get('window').width * 0.28,
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
    width: Dimensions.get('window').width * 0.17,
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
    top: -10
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
    paddingVertical: 10,
    // height: '100%',
    // width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto'

  },
  textheader: {
    fontFamily: 'Cuprum-Bold',
    fontSize: 25,
    color: 'black',
    marginRight: 'auto',
    marginLeft: 10,
    marginTop: 10
  }
}
)

export default Questions