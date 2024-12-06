import axios from "axios";
import Endpoints from "../Const/Api's_Endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetReward = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(
            Endpoints.RewardPage,
            {},
            {
                headers: {
                    Authorization: `${token}`, // Use "Bearer" if required by API
                },
            }
        );
        console.log("API Response:", response); // Log only the data part of the response
        return response.data; // Return the actual data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message); // Log error details
        throw error; // Throw the error so it can be caught by createAsyncThunk
    }
};
export default GetReward;
