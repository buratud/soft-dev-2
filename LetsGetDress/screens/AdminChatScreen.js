// screens/AdminChatScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import UserChatScreen from './UserChatScreen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'


const AdminChatScreen = ({ route }) => {
  const { messages } = route.params || { messages: [] };
  const [chatMessages, setChatMessages] = useState(messages);
  const navigation = useNavigation();

  const onSend = (newMessages = []) => {
    setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };
  const onPressAdminQuestion = () => {
    navigation.navigate('Questions and Concerns')
  }
  const renderMessage = (message) => {
    return (
      <>
        <View style={{ height: 10 }} />
        <Bubble
          {...message}
          wrapperStyle={{
            left: {
              backgroundColor: 'white',
            },
            right: {
              backgroundColor: '#B45A23',
            },
          }}
          textStyle={{
            left: {
              color: '#873C0D',
            },
            right: {
              color: 'white',
            },
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAEBDC' }}>
      <View style={styles.squareTop}>
        <Icon style={{ left: -45, top: 15, color: 'black' }} name='chevron-left' size={35} onPress={onPressAdminQuestion} />
        <Text style={styles.headerText}>A@email.com</Text>
      </View>
      <GiftedChat
        messages={chatMessages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 2, name: 'Admin' }}
        renderMessage={renderMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  squareTop: {
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: "#f2a676",
    paddingTop: 5,
    fontFamily: "Cuprum-VariableFont_wght",
    justifyContent: "center",
    paddingLeft: 50
  },
  headerText: {
    color: 'black',
    fontSize: 30,
    fontFamily: "Cuprum-Bold",
    top: -20
  },
})

export default AdminChatScreen;
