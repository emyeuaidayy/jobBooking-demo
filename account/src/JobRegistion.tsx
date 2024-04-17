import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import path from './setUp';

interface StateVariables {
  JobDecription: string;
  price: string;
  selectedJob: string;
  jobType: string;
  showJobs: boolean; // Add showJobs
}

const JobRegistration = () => {
  const [stateVariables, setStateVariables] = useState<StateVariables>({
    JobDecription: '',
    price: '',
    selectedJob: '',
    jobType: '',
    showJobs: false,
  });

  const jobs = [
    { name: 'Job 1', jobTypes: ['JobType 1.1', 'JobType 2.1', 'JobType 3.1', 'JobType 4.1', 'JobType 5.1', 'JobType 6.1'] },
    { name: 'Job 2', jobTypes: ['JobType 1.2', 'JobType 2.2', 'JobType 3.2', 'JobType 4.2', 'JobType 5.2', 'JobType 6.2'] },
    { name: 'Job 3', jobTypes: ['JobType 1.3', 'JobType 2.3', 'JobType 3.3', 'JobType 4.3', 'JobType 5.3', 'JobType 6.3'] },
    { name: 'Job 4', jobTypes: ['JobType 1.4', 'JobType 2.4', 'JobType 3.4', 'JobType 4.4', 'JobType 5.4', 'JobType 6.4'] },
    { name: 'Job 5', jobTypes: ['JobType 1.5', 'JobType 2.5', 'JobType 3.5', 'JobType 4.5', 'JobType 5.5', 'JobType 6.5'] },
    { name: 'Job 6', jobTypes: ['JobType 1.6', 'JobType 2.6', 'JobType 3.6', 'JobType 4.6', 'JobType 5.6', 'JobType 6.6'] },
    { name: 'Job 7', jobTypes: ['JobType 1.7', 'JobType 2.7', 'JobType 3.7', 'JobType 4.7', 'JobType 5.7', 'JobType 6.7'] },
    { name: 'Job 8', jobTypes: ['JobType 1.8', 'JobType 2.8', 'JobType 3.8', 'JobType 4.8', 'JobType 5.8', 'JobType 6.8'] },
    { name: 'Job 9', jobTypes: ['JobType 1.9', 'JobType 2.9', 'JobType 3.9', 'JobType 4.9', 'JobType 5.9', 'JobType 6.9'] },
  ];

  const handleLogin = async () => {
    interface JwtPayload {
      accountId: string;
    }

    const status = 'available';
    const customerId  = 'null'


    const token = await AsyncStorage.getItem('token');
    const decoded: JwtPayload = jwtDecode(token);
    console.log(decoded);
    const accountId = decoded.accountId;
    const query = `
    mutation {
        jobRegistion(input: {
            jobDecription: "${stateVariables.JobDecription}",
            price : "${stateVariables.price}",
            JobName :"${stateVariables.selectedJob}",
            JobType: "${stateVariables.jobType}",
            userId : "${accountId}",
            status : "${status}"
            customerId : "${customerId}"
      }) {
        jobDecription
        price
        JobName
        JobType
        userId
        status
        customerId
      }
    }
  `;

    const variables = {};

    try {
      const res = await fetch(path, {
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

      <TextInput
        style={styles.input}
        placeholder="Job Type"
        value={stateVariables.jobType}
        onChangeText={text => setStateVariables({ ...stateVariables, jobType: text })}
      />

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
