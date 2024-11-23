import axios from 'axios';
import Endpoints from '../Const/Api\'s_Endpoints';
import { Alert } from 'react-native';


const resetPassword = async (email , setLoading) => {
    if (!email) {
        Alert.alert('Validation Error', 'Please fill all fields');
        return;
    }
    setLoading(true);
    try {
        const response = await axios.post(Endpoints.ResetPassword,
            {
                email
            }
        );
    console.log(response.data);
    const parsedResponse = JSON.parse(response.data.data);
    console.log(parsedResponse.message);
    console.log(parsedResponse.status);
    if (parsedResponse.status == 1) {
      Alert.alert('Password Recovery', 'Recovery email sent successfully.');
      return response.data;
    } else {
      Alert.alert('Error', 'Failed to send recovery email. Please try again later.');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to send recovery email. Please try again later.');
    throw new Error(error.response?.data?.message);
  } finally {
    setLoading(false);
    }
};
export default resetPassword;