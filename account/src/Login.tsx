import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import jwt from 'jsonwebtoken';

import "core-js/stable/atob"

const AccountRegister = ({navigation} ) => {
  const [stateVariables, setStateVariables] = useState({
    username: '',
    password: '',
  });

  const handleRegister = async () => {
    const query = `
      mutation {
        login(input: {
          username :"${stateVariables.username}",
          password :"${stateVariables.password}"
        }) {
          token
         
       
         
          
        }
      }
    `;

    const variables = {};

    try {
      const res = await fetch('http://10.10.2.117:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
      

      const json = await res.json();
      console.log(json.data.login);

      
      
      if (!json.errors) {
        // Phản hồi thành công
        console.log('Success:', json.data.login);
        const token = json.data.login.token;

        
        const decoded = jwtDecode(token);
        console.log(decoded);

        navigation.navigate('HomeScreen')

        // Lưu trữ token vào AsyncStorage
        await AsyncStorage.setItem('token', token);

        Alert.alert(
          'Success',
          'Login successful!',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
       
      }
      
      
    } catch (error) {
      console.log(error);
    }
    
  };
const handleSignUp = () => {
    navigation.navigate ('AccountRegister')
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={text => setStateVariables({...stateVariables, username: text})}
        value={stateVariables.username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        onChangeText={text => setStateVariables({...stateVariables, password: text})}
        value={stateVariables.password}
        secureTextEntry
      />
      <Button title="Đăng Nhập" onPress={handleRegister} />
      <View style = {styles.signUp }>

      </View>
      <Button title='Sign Up' onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signUp : {
    top : 300,
    height : "5%"
  }
});

export default AccountRegister;
