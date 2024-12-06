import axios from "axios";
import Endpoints from "../Const/Api's_Endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetActivity = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(
            Endpoints.ActivityPage,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Use "Bearer" if required by API
                },
            }
        );
        console.log("API Response:", response.data); // Log only the data part of the response
        return response.data; // Return the actual data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message); // Log error details
        throw error; // Throw the error so it can be caught by createAsyncThunk
    }
};
export default GetActivity;
