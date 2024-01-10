import React from 'react'
import { StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './components/CustomDrawerContent';
import AdminNewContent from './AdminNewContent';
import AdminNewFashion from './AdminNewFashion';
import AdminOutfitsRec from './AdminOutfitsRec';
import EditNewFashion from './EditNewFashion';
import AdminQuestion from './AdminQuestion';
import AdminChatScreen from './AdminChatScreen';
import UserChatScreen from './UserChatScreen';
import Login from './Login';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/Feather'
import IconI from 'react-native-vector-icons/Ionicons'
import IconO from 'react-native-vector-icons/Octicons'
import IconA from 'react-native-vector-icons/AntDesign'

const Drawer = createDrawerNavigator();
const nonDrawerOptions = {
  headerShown: false,
  drawerItemStyle: {
    display: 'none'
  }
};
const drawerOptions = {
  drawerItemStyle: {
    backgroundColor: 'white',
    width: 300,
    fontFamily: "Cuprum-VariableFont_wght",
  },
  headerStyle: {
    backgroundColor: '#f2a676',
    height: 70,
    elevation: 10
  },
  headerTitleAlign: 'center',
  headerTintColor: 'black',
  drawerActiveTintColor: '#f2a676',
  draweractiveBackgroundColor: '#FAEBDC',
  drawerLabelStyle: {
    color: 'black',
    fontFamily: "Cuprum-VariableFont_wght",
    fontSize: 19,
    left: -20
  }
}

const StackNavigator2 = () => {
  return (
    <Drawer.Navigator
    initialRouteName="Admin New Content"
    drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name = "EditNewFashion"
        component = {EditNewFashion}
        options = {nonDrawerOptions}
      />
      <Drawer.Screen
        name = "AdminChatScreen"
        component = {AdminChatScreen}
        options = {nonDrawerOptions}
      />
      <Drawer.Screen
        name = "UserChatScreen"
        component = {UserChatScreen}
        options = {nonDrawerOptions}
      />
      <Drawer.Screen
        name = "Login"
        component = {Login}
        options = {nonDrawerOptions}
      />
        <Drawer.Screen
          name="New Content"
          component={AdminNewContent}
          options={{
            ...drawerOptions,
            drawerIcon: () => (
              <IconA name="staro" size={22} color="black" style={{left:-8}}/>
            ),
            headerTitleStyle:{fontSize: 30, fontFamily: "Cuprum-Bold"}
          }}
        />
      <Drawer.Screen
        name="New Fashion"
        component={AdminNewFashion}
        options={{
          ...drawerOptions,
          drawerIcon: () => (
            <IconM name="hanger" size={22} color="black" style={{left:-8}}/>
          ),
          headerTitleStyle:{fontSize: 30, fontFamily: "Cuprum-Bold"}
        }}
      />
      <Drawer.Screen
        name="Outfit recommendation"
        component={AdminOutfitsRec}
        options={{
          ...drawerOptions,
          drawerIcon: () => (
            <IconI name="shirt-outline" size={22} color="black" style={{left:-8}}/>
          ),
          headerTitleStyle:{fontSize: 26.8, fontFamily: "Cuprum-Bold"}
        }}
      />
      <Drawer.Screen
        name="Questions and Concerns"
        component={AdminQuestion}
        options={{
          ...drawerOptions,
          drawerIcon: () => (
            <IconM name="message-question-outline" size={22} color="black" style={{left:-8}}/>
          ),
          headerTitleStyle:{fontSize: 26.2, fontFamily: "Cuprum-Bold"}
        }}
      />
      
    </Drawer.Navigator>
);
};

export default StackNavigator2;
