import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import Sign_up from './screens/Sign_up';
import ResetPassword from './screens/ResetPassword';
import VerifyEmail from './screens/VerifyEmail';
import FillInformation from './screens/FillInformation';
import NewContent from './screens/NewContent';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import OutfitsRec from './screens/OutfitsRec';
import Questions from './screens/Questions';
import ProfilePremium from './screens/ProfilePremium';
import MainDrawer from './screens/MainDrawer';
import StackNavigator from './screens/StackNavigation';
import Splash from './screens/Splash';
import Ads from './screens/Ads';
import CardInfo from './screens/CardInfo';
import AdminOutfitsRec from './screens/AdminOutfitsRec';
import AdminNewFashion from './screens/AdminNewFashion';
import EditNewFashion from './screens/EditNewFashion';
import StackNavigator2 from './screens/StackNavigate2';
import Helppage from './screens/HelpPage';
import TicketForm from './screens/TicketForm';
import AdminTicketForm from './screens/AdminTicketForm';
import AdminChatScreen from './screens/AdminChatScreen';
import UserChatScreen from './screens/UserChatScreen';
import AdminNewContent from './screens/AdminNewContent';
import QHistory from './screens/QHistory';
import NewFashion from './screens/NewFashion';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
      {/* <StackNavigator2/> */}
    </NavigationContainer>
    // <View>
    //   <Questions/>
    // </View>
  //   <NavigationContainer>
  //   <Stack.Navigator initialRouteName="UserChat">
  //     <Stack.Screen name="UserChat" component={UserChatScreen} />
  //     <Stack.Screen name="AdminChat" component={AdminChatScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>
  )
}



export default App
