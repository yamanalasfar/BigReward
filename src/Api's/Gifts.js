import axios from "axios";
import Endpoints from "../Const/Api's_Endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetGifts = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(
            Endpoints.GiftsPage,
            {},
            {
                headers: {
                    'Authorization': token,
                },
            }
        );
        console.log("API Response:", response.data);
        return response.data; 
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error; 
    }
};
export default GetGifts;
