import axios from 'axios';
import Endpoints from '../Const/Api\'s_Endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const login = async (email, password, cc, did, navigation, setLoading) => {
  if (!email || !password) {
    Alert.alert('Validation Error', 'Please fill all fields');
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(Endpoints.Login, {
      email,
      password,
      cc,
      did,
    });
    console.log(response.data);
    const parsedResponse = JSON.parse(response.data.data);
    console.log(parsedResponse.message);
    console.log(parsedResponse.status);
    if (parsedResponse.status == 1) {
      await AsyncStorage.setItem('token', parsedResponse.message);
      Alert.alert('Signin Successful', 'Welcome to Big Reward!');
      return response.data;
    } else {
      Alert.alert('Signin Failed', parsedResponse.message);
    }
  } catch (error) {
    Alert.alert('Signup Failed', error.response?.data?.message || 'Login failed');
    throw new Error(error.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};
export default login;
