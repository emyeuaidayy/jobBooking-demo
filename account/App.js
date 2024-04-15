import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountRegister from './src/AccountRegister'
import Login from './src/Login'
import JobRegistion from './src/JobRegistion'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
// import JobRegistion from './src/JobRegistion'


const Stack = createStackNavigator()

export default function App() {
  return (
    // <AccountRegister></AccountRegister>
    // <Login></Login>
    // <JobRegistion></JobRegistion>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name = 'JobRegistion' component={JobRegistion}/>
      <Stack.Screen name  = 'AccountRegister' component={AccountRegister} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
