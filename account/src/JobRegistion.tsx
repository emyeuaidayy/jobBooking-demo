import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode } from 'jwt-decode';
import "core-js/stable/atob"


const JobRegistration = () => {
  const [stateVariables, setStateVariables] = useState({
    JobDecription: '',
    price: '',
    selectedJob: '',
    showJobs: false,
    selectedJobType: '',
    showJobTypes: false,
  });

  const jobs = [
    { name: 'Job 1', jobTypes: ['JobType 1', 'JobType 2', 'JobType 3', 'JobType 4', 'JobType 5', 'JobType 6'] },
    { name: 'Job 2', jobTypes: ['JobType 7', 'JobType 8', 'JobType 9', 'JobType 10', 'JobType 11', 'JobType 12'] },
    { name: 'Job 3', jobTypes: ['JobType 13', 'JobType 14', 'JobType 15', 'JobType 16', 'JobType 17', 'JobType 18'] },
    { name: 'Job 4', jobTypes: ['JobType 19', 'JobType 20', 'JobType 21', 'JobType 22', 'JobType 23', 'JobType 24'] },
    { name: 'Job 5', jobTypes: ['JobType 25', 'JobType 26', 'JobType 27', 'JobType 28', 'JobType 29', 'JobType 30'] },
    { name: 'Job 6', jobTypes: ['JobType 31', 'JobType 32', 'JobType 33', 'JobType 34', 'JobType 35', 'JobType 36'] },
    { name: 'Job 7', jobTypes: ['JobType 37', 'JobType 38', 'JobType 39', 'JobType 40', 'JobType 41', 'JobType 42'] },
    { name: 'Job 8', jobTypes: ['JobType 43', 'JobType 44', 'JobType 45', 'JobType 46', 'JobType 47', 'JobType 48'] },
    { name: 'Job 9', jobTypes: ['JobType 49', 'JobType 50', 'JobType 51', 'JobType 52', 'JobType 53', 'JobType 54'] },
  ];



// Lấy token từ Local Storage khi cần sử dụng


  const handleLogin = async () => {

    interface JwtPayload {
        accountId: string;
    }

    const token = await AsyncStorage.getItem('token')
    const decoded : JwtPayload= jwtDecode(token);
    console.log(decoded);
    const accountId = decoded.accountId
    const query = `
    mutation {
        jobRegistion(input: {
            jobDecription: "${stateVariables.JobDecription}",
            price : "${stateVariables.price}",
            JobName :"${stateVariables.selectedJob}",
            JobType: "${stateVariables.selectedJobType}",
            userId : "${accountId}"
           
      }) {
        jobDecription
        price
        JobName
        JobType
        userId
        
        
      }
    }
  `;

  const variables = {};

  try {
    const res = await fetch('http://10.10.2.117:3000/graphql', {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
   
  

    Alert.alert(
      'Success',
      'Login successful!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );

    const json = await res.json();
    console.log(json.data.jobRegistion);

    
  } catch (error) {
    console.log(error);
  }
  


};

  return (
    <View style={styles.container}>
      <View style={styles.headers} />
      <Text style={styles.title}>Job Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Job Decription"
        value={stateVariables.JobDecription}
        onChangeText={text => setStateVariables({ ...stateVariables, JobDecription: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="price"
        value={stateVariables.price}
        onChangeText={text => setStateVariables({ ...stateVariables, price: text })}
      />

      <TouchableOpacity style={styles.jobButton} onPress={() => setStateVariables({ ...stateVariables, showJobs: !stateVariables.showJobs })}>
        <Text style={styles.jobButtonText}>Select Job</Text>
      </TouchableOpacity>

      {stateVariables.showJobs && (
        <View style={styles.jobsContainer}>
          {jobs.map((job, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.jobOption, stateVariables.selectedJob === job.name && styles.selectedJobOption]}
              onPress={() => setStateVariables({ ...stateVariables, selectedJob: job.name })}
            >
              <Text style={styles.jobText}>{job.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {stateVariables.selectedJob && (
        <TouchableOpacity style={styles.jobButton} onPress={() => setStateVariables({ ...stateVariables, showJobTypes: !stateVariables.showJobTypes })}>
          <Text style={styles.jobButtonText}>Select Job Type</Text>
        </TouchableOpacity>
      )}

      {stateVariables.showJobTypes && (
        <View style={styles.jobsContainer}>
          {jobs.find((job) => job.name === stateVariables.selectedJob)?.jobTypes.map((jobType, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.jobOption, stateVariables.selectedJobType === jobType && styles.selectedJobOption]}
              onPress={() => setStateVariables({ ...stateVariables, selectedJobType: jobType })}
            >
              <Text style={styles.jobText}>{jobType}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headers: {
    height: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  jobButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  jobButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  jobOption: {
    backgroundColor: '#c0c0c0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  selectedJobOption: {
    backgroundColor: '#808080',
  },
  jobText: {
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default JobRegistration;