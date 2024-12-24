import axios from "axios";
import Endpoints from "../Const/Api's_Endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetHistory = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(
            Endpoints.ActivityPage,
            {},
            {
                headers: {
                    Authorization: `${token}`, // Use "Bearer" if required by API
                },
            }
        );
        console.log("API Response (Hist):", response.data.hist); // Log only the 'hist' part
        return response.data.hist; // Return only the 'hist' data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message); // Log error details
        throw error; // Rethrow for handling in the slice
    }
};
export default GetHistory;
