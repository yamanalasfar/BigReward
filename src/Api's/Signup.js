import axios from 'axios';
import Endpoints from '../Const/Api\'s_Endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const signup = async (name, email, password, cc, navigation, did, setLoading) => {
  if (!name || !email || !password) {
    Alert.alert('Validation Error', 'Please fill all fields');
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(Endpoints.Register, {
            name,
            email,
            password,
            cc,
            did,
            rb : 'none'
        });
    const parsedResponse = JSON.parse(response.data.data);
    await AsyncStorage.setItem('token', parsedResponse.message);
    if (parsedResponse.status == 1) {
      await AsyncStorage.setItem('token', parsedResponse.message);
      Alert.alert('Signup Successful', 'Welcome to Big Reward!');
      navigation.replace('Home');
      return response.data;
    } else {
      Alert.alert('Signup Failed', parsedResponse.message);   
    }
  }
  catch (error)
  {
    throw new Error(error.response?.data?.message || 'Signup failed'); 
  }  
    finally {
      setLoading(false);
  }
};
export default signup; 
