import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from "../../Const/Api's_Endpoints";

const GetProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(
            Endpoints.ProfileDetails,
            {},
            {
                headers: {
                    Authorization: `${token}`, // Use "Bearer" if required by API
                },
            }
        );
        console.log("API Response:", response); // Log only the 'hist' part
        return response.data; // Return only the 'hist' data
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message); // Log error details
        throw error; // Rethrow for handling in the slice
    }
};
export default GetProfile;
