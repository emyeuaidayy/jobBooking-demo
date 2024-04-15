
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen =  ({navigation} ) => {

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  
  
  
    const showInformation = async ()=>{

      const token = await AsyncStorage.getItem('token')
      const decoded  :JwtPayload=  jwtDecode(token) ;
      console.log(decoded);
      interface JwtPayload {
        accountId: string;
    }
    
    const accountId = decoded.accountId;
    console.log (accountId)
    try {
      const query = `
      query {
        getUserNamebyID(id: "${accountId}") {
          name
          id
        }
      }
    `;
    const response = await fetch('http://10.10.2.117:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const userName = json.data.getUserNamebyID.name;
      const userId = json.data.getUserNamebyID.id ;
      setName(userName);
      setUserId(userId);


    const variables = {};



    }
      
    catch (error) {
      console.error('Error fetching name:', error);
    }
    };
    const goToJobRegistration = () => {
      navigation.navigate('JobRegistion');
    };
    
    // useEffect(() => {
    //   showInformation();
    // }, []);}
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <Text style={styles.infoText}>User ID: {userId}</Text>
      <Text style={styles.infoText}>Name: {name}</Text>
      <Button title="Show information" onPress={showInformation} />
      <View style = {styles.signUp }>

      </View>
      <Button title="Job Register" onPress={goToJobRegistration} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  signUp : {
    top : 300,
    height : "5%"
  },
});

export default HomeScreen;
