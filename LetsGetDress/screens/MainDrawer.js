import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NewContent from './NewContent';
import Profile from './Profile';
import ProfilePremium from './ProfilePremium';
import OutfitsRec from './OutfitsRec';
import Questions from './Questions';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function MainDrawer() { 
    return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{headerShown: false}}>
             <Stack.Screen name='MainDashboard'>
                 {() => (
                <Drawer.Navigator
                    initialRouteName="Outfit Recommendation"
                    screenOptions={{
                        headerShown: true,
                        drawerStyle: {
                            backgroundColor: 'white',
                            width: 250,
                            fontFamily: "Cuprum-VariableFont_wght",
                        },
                        headerStyle: {
                            backgroundColor: '#FF9176'
                        },
                        headerTintColor: 'black',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontFamily: "Cuprum-Bold",
                            fontSize: 25
                        },
                        drawerActiveTintColor: '#FAC3B5',
                        drawerLabelStyle: {
                            color: 'black',
                            fontFamily: "Cuprum-VariableFont_wght",
                            fontSize: 18
                        }
                    }}
                  >
                    <Drawer.Screen 
                        name="New Content" 
                        component={NewContent}
                        options={{
                            drawerLabel: 'New Content',
                            title: 'New Content',

                            // drawerIcon: () => (

                            // )
                        }}
                    />
                    <Drawer.Screen
                        name="Profile" 
                        component={Profile}
                        options={{
                            drawerLabel: 'Profile',
                            title: 'Profile',
                            // drawerIcon: () => (

                            // )
                        }}
                    />
                    <Drawer.Screen
                        name="Outfit Recommendation" 
                        component={OutfitsRec}
                        options={{
                            drawerLabel: 'Outfit Recommendation',
                            title: 'Outfit Recommendation',
                            // drawerIcon: () => (

                            // )
                        }}
                    />
                    <Drawer.Screen
                        name="Questions and Concerns" 
                        component={Questions}
                        options={{
                            drawerLabel: 'Questions and Concerns',
                            title: 'Questions and Concerns',
                            // drawerIcon: () => (

                            // )
                        }}
                    />
                </Drawer.Navigator>
                )}
             </Stack.Screen>
         </Stack.Navigator>
      </NavigationContainer>
    );
  }

// export default function MainDrawer() { 
//     return (
      
//         <Stack.Navigator screenOptions={{ headerShown: true }}>
//           <Stack.Screen name='MainDashboard'>
//             {() => (
//               <Drawer.Navigator
//                 initialRouteName="New Content"
//                 screenOptions={{
//                   drawerStyle: {
//                     backgroundColor: 'white',
//                     width: 250
//                   },
//                   headerStyle: {
//                     backgroundColor: '#FF9176'
//                   },
//                   headerTintColor: 'white',
//                   headerTitleAlign: 'center',
//                   headerTitleStyle: {
//                     fontFamily: "Cuprum-Bold"
//                   },
//                   drawerActiveTintColor: '#FAC3B5',
//                   drawerLabelStyle: {
//                     color: 'black',
//                     fontFamily: "Cuprum-VariableFont_wght"
//                   }
//                 }}
//               >
//                 <Drawer.Screen 
//                   name="New Content" 
//                   component={NewContent}
//                   options={{
//                     drawerLabel: 'New Content',
//                     title: 'New Content',
//                   }}
//                 />
//                 <Drawer.Screen
//                   name="Profile" 
//                   component={Profile}
//                   options={{
//                     drawerLabel: 'Profile',
//                     title: 'Profile',
//                   }}
//                 />
//                 {/* Add other Drawer.Screen components here */}
//               </Drawer.Navigator>
//             )}
//           </Stack.Screen>
//         </Stack.Navigator>
     
//     );
//   }
  
