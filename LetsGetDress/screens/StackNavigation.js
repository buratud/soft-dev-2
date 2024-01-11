import React, { createContext, useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Login';
import Sign_up from './Sign_up';
import ResetPassword from './ResetPassword';
import FillInformation from './FillInformation';
import VerifyEmail from './VerifyEmail';
import NewContent from './NewContent';
import Profile from './Profile';
import ProfilePremium from './ProfilePremium';
import Questions from './Questions';
import OutfitsRec from './OutfitsRec';
import Splash from './Splash';
import CustomDrawerContent from './components/CustomDrawerContent';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/Feather'
import IconI from 'react-native-vector-icons/Ionicons'
import IconO from 'react-native-vector-icons/Octicons'
import IconA from 'react-native-vector-icons/AntDesign'
import IconFA from 'react-native-vector-icons/FontAwesome'
import AdminNewContent from './AdminNewContent';
import AdminNewFashion from './AdminNewFashion';
import AdminOutfitsRec from './AdminOutfitsRec';
import EditNewFashion from './EditNewFashion';
import AdminQuestion from './AdminQuestion';
import AdminChatScreen from './AdminChatScreen';
import UserChatScreen from './UserChatScreen';
import EditProfile from './EditProfile';
import Ads from './Ads';
import CardInfo from './CardInfo';
import NewFashion from './NewFashion';
import QHistory from './QHistory';
import QuestionDetail from './QuestionDetail';
import AdminQDetail from './AdminQDetail';

// const Stack = createNativeStackNavigator();
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
    height: 70
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

export const AuthContext = createContext();

const StackNavigator = () => {
  const [user, setUser] = useState()

  const login = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data));
    setUser({
      ...data,
      verified: false
    })
  }

  const signup = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data));
    setUser({
      ...data
    })
  }

  const verify = async (data) => {
    await AsyncStorage.mergeItem("user", JSON.stringify({ verified: true }));
    setUser({
      ...user,
      ...data,
      // admin: false
    })
  }

  const updateUser = async (data) => {
    await AsyncStorage.mergeItem("user", JSON.stringify(data));
    setUser({
      ...user,
      ...data
    })
  }

  const signout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(undefined)
  }

  useEffect(() => {
    console.log("User:", user);
  }, [user])

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const sessionUser = await AsyncStorage.getItem("user");
        if (sessionUser != null) setUser(sessionUser);
      })()
    }, [])
  );

  const contextValue = {
    user,
    login,
    verify,
    signout,
    updateUser,
    signup
  }

  if (user?.admin) {
    return (
      <AuthContext.Provider value={contextValue}>
        <Drawer.Navigator
          initialRouteName="New Content"
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="EditNewFashion"
            component={EditNewFashion}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="AdminChatScreen"
            component={AdminChatScreen}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="UserChatScreen"
            component={UserChatScreen}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="Splash"
            component={Splash}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="AdminQDetail"
            component={AdminQDetail}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="Sign_up"
            component={Sign_up}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="FillInformation"
            component={FillInformation}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="VerifyEmail"
            component={VerifyEmail}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={nonDrawerOptions}
          />
          <Drawer.Screen
            name="New Content"
            component={AdminNewContent}
            options={{
              ...drawerOptions,
              drawerIcon: () => (
                <IconA name="staro" size={22} color="black" style={{ left: -8 }} />
              ),
              headerTitleStyle: { fontSize: 30, fontFamily: "Cuprum-Bold" }
            }}
          />
          <Drawer.Screen
            name="New Fashion"
            component={AdminNewFashion}
            options={{
              ...drawerOptions,
              drawerIcon: () => (
                <IconM name="hanger" size={22} color="black" style={{ left: -8 }} />
              ),
              headerTitleStyle: { fontSize: 30, fontFamily: "Cuprum-Bold" }
            }}
          />
          <Drawer.Screen
            name="Outfit recommendation"
            component={AdminOutfitsRec}
            options={{
              ...drawerOptions,
              drawerIcon: () => (
                <IconI name="shirt-outline" size={22} color="black" style={{ left: -8 }} />
              ),
              headerTitleStyle: { fontSize: 26.8, fontFamily: "Cuprum-Bold" }
            }}
          />
          <Drawer.Screen
            name="Questions and Concerns"
            component={AdminQuestion}
            options={{
              ...drawerOptions,
              drawerIcon: () => (
                <IconM name="message-question-outline" size={22} color="black" style={{ left: -8 }} />
              ),
              headerTitleStyle: { fontSize: 26.2, fontFamily: "Cuprum-Bold" }
            }}
          />

        </Drawer.Navigator>
      </AuthContext.Provider>
    );
  }
  else return (
    <AuthContext.Provider value={contextValue}>
      <Drawer.Navigator
        initialRouteName="Splash"
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Splash"
          component={Splash}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="Sign_up"
          component={Sign_up}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="FillInformation"
          component={FillInformation}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfile}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="QHistory"
          component={QHistory}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="New Content"
          component={NewContent}
          options={{
            ...drawerOptions,
            drawerIcon: () => (
              <IconA name="staro" size={22} color="black" style={{ left: -8 }} />
            ),
            headerTitleStyle: { fontSize: 30, fontFamily: "Cuprum-Bold" }
          }}
        />
        <Drawer.Screen
          name="New Fashion"
          component={NewFashion}
          options={{
            ...drawerOptions,
            drawerIcon: () => (
              <IconM name="hanger" size={22} color="black" style={{ left: -8 }} />
            ),
            headerTitleStyle: { fontSize: 30, fontFamily: "Cuprum-Bold" }
          }}
        />
        <Drawer.Screen
          name="ProfilePremium"
          component={ProfilePremium}
          options={{
            ...nonDrawerOptions, headerShown: true, headerStyle: {
              backgroundColor: '#f2a676',
              height: 70
            }, headerTitleStyle: { fontSize: 30, fontFamily: "Cuprum-Bold" },
            headerTitleAlign: 'center',
            headerTintColor: 'black',
          }}
        />
        <Drawer.Screen
          name="Ads"
          component={Ads}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="QuestionHistory"
          component={QuestionDetail}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="Outfit recommendation"
          component={OutfitsRec}
          options={{
            ...drawerOptions,
            drawerIcon: () => (
              <IconI name="shirt-outline" size={22} color="black" style={{ left: -8 }} />
            ),
            headerTitleStyle: { fontSize: 26.8, fontFamily: "Cuprum-Bold" }
          }}
        />
        <Drawer.Screen
          name="Questions and Concerns"
          component={Questions}
          options={{
            ...drawerOptions,
            drawerIcon: () => (
              <IconM name="message-question-outline" size={22} color="black" style={{ left: -8 }} />
            ),
            headerTitleStyle: { fontSize: 26.2, fontFamily: "Cuprum-Bold" }
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            ...drawerOptions,
            drawerIcon: () => (
              <IconF name="user" size={22} color="black" style={{ left: -8 }} />
            ),
            headerTitleStyle: { fontSize: 30, fontFamily: "Cuprum-Bold" },
            drawerItemStyle: {
              marginTop: 470,
              borderTopColor: 'black',
              borderWidth: 1,
              borderRightColor: 'white',
              borderLeftColor: 'white',
              borderBottomColor: 'white',

            }
          }}

        />
        <Drawer.Screen
          name="CardInfo"
          component={CardInfo}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="UserChatScreen"
          component={UserChatScreen}
          options={nonDrawerOptions}
        />
        <Drawer.Screen
          name="AdminChatScreen"
          component={AdminChatScreen}
          options={nonDrawerOptions}
        />

        {/* <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{headerShown: true}}
      /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Drawer.Navigator>
    </AuthContext.Provider>
  );
};

export default StackNavigator;