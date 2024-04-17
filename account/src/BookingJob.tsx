import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import path from './setUp'

const JobSelectionScreen = ({ navigation }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobs, setShowJobs] = useState(true); // State variable để kiểm soát việc hiển thị danh sách công việc

  const jobs = [
    { name: 'Job 1' },
    { name: 'Job 2' },
    { name: 'Job 3' },
    { name: 'Job 4' },
    { name: 'Job 5' },
    { name: 'Job 6' },
    { name: 'Job 7' },
    { name: 'Job 8' },
    { name: 'Job 9' },
  ];

  const HandlePress = async () => {
    const query = `
      mutation {
        chooseJob(input: {
          name: "${selectedJob}"
        }) {
          token
        }
      }
    `;

    const variables = {};
    try {
      const res = await fetch( path, {
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
      console.log(json.data.chooseJob);

      if (!json.errors) {
        // Phản hồi thành công
        console.log('Success:', json.data.chooseJob);
        const token = json.data.chooseJob.token;

        const decoded = jwtDecode(token);
        console.log(decoded);

        // Lưu trữ token vào AsyncStorage
        await AsyncStorage.setItem('job', token);

        navigation.navigate('BookingJob2')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Booking Job</Text>
      </View>
      {showJobs && (
        <View style={styles.jobsContainer}>
          {jobs.map((job, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.jobOption, selectedJob === job.name && styles.selectedJobOption]}
              onPress={() => setSelectedJob(job.name)}
            >
              <Text style={styles.jobText}>{job.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.registerButton} onPress={HandlePress}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  jobOption: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: 100,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedJobOption: {
    backgroundColor: '#3F51B5',
  },
  jobText: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  registerButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  ViewBooking: {
    height: '20%',
    bottom: 200
  },
  TextBooking: {

  }
});


export default JobSelectionScreen;
