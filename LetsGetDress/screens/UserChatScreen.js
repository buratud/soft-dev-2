// screens/CustomerChatScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Feather'

const UserChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const goToAdminChatScreen = () => {
    navigation.navigate('AdminChatScreen', { messages });
  };
  const onPressQuestions = () => {
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
        <Icon style={{ left: -45, top: 18, color: 'black' }} name='chevron-left' size={35} onPress={onPressQuestions} />
        <Text style={styles.headerText}>Admin</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1, name: 'Customer' }}
        renderMessage={renderMessage}
      />
      <Button title="" onPress={goToAdminChatScreen} />
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
    fontSize: 35,
    fontFamily: "Cuprum-Bold",
    top: -20
},
})

export default UserChatScreen;
