import * as ImageManipulator from 'expo-image-manipulator';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from "../../Const/Api's_Endpoints";

const UpdateAvatar = async (avatarUri) => {
    const token = await AsyncStorage.getItem('token');

    try {
        // Resize the image
        const manipResult = await ImageManipulator.manipulateAsync(
            avatarUri,
            [{ resize: { width: 200, height: 200 } }], // Resize to 200x200
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG } // Adjust compression and format
        );

        // Prepare form data
        const formData = new FormData();
        formData.append('image', {
            uri: manipResult.uri,
            name: 'avatar.jpg',
            type: 'image/jpeg',
        });

        // Upload the image
        const response = await axios.post(
            Endpoints.Avatar,
            formData,
            {
                headers: {
                    "Authorization": token,
                    'Content-Type': 'multipart/form-data'
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

export default UpdateAvatar;
