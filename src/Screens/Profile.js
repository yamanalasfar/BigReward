import React ,{useState , useEffect} from 'react';
import { Text, View, ImageBackground, TouchableOpacity ,Image } from 'react-native';
import images from '../Const/Images';
import RewardStyles from '../Styles/RewardStyles';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import ProfileStyles from '../Styles/ProfileStyles';
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from '../Component/CustomTextInput';
import CustomButton from '../Component/CustomButton';
import colors from '../Const/Colors';

const ProfileScreen = ({ navigation }) => {

    const [newAvatar, setNewAvatar] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            console.log(result.assets[0].uri);
          setNewAvatar(result.assets[0].uri);
        }
      };

    return (
        <View
        style={ProfileStyles.BackGround}
        >
            <ScrollView>
                <View style = {ProfileStyles.ScreenContainer}>
                    {newAvatar ? (    
                        <TouchableOpacity onPress={pickImage} style = {ProfileStyles.AvatarCircle}>
                            <Image source={{ uri: newAvatar }} style={ProfileStyles.imageStyle}/>
                        </TouchableOpacity>) :
                        <TouchableOpacity onPress={pickImage}>
                            <Ionicons name='person-circle' size={150} color={colors.Darkblue}/>
                        </TouchableOpacity>
                    }
                    <CustomTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder='Name'
                    />
                    <CustomTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                    />
                    <CustomButton
                        color={colors.Cerulean}
                        text='Update Profile'
                        TextColor={colors.White}
                        underlayColor={colors.CeruleanUnderlay}
                        onPress={()=>console.log('Update Profile Pressed')}
                    />
                    <CustomButton
                        color={colors.Red}
                        text='Delete Profile'
                        TextColor={colors.White}
                        underlayColor={colors.RedUnderlay}
                        onPress={()=>console.log('Delete Profile Pressed')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
export default ProfileScreen;