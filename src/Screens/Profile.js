import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ProfileStyles from '../Styles/ProfileStyles';
import CustomTextInput from '../Component/CustomTextInput';
import colors from '../Const/Colors';
import { fetchProfile } from '../Redux/Slices/ProfileSlice';
import CustomButton from '../Component/CustomButton';
import UpdateName from '../Api\'s/Profile/UpdateName';
import UpdateAvatar from '../Api\'s/Profile/UpdateAvatar';
import DeleteProfile from '../Api\'s/Profile/DeleteProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { data: profile, status, error } = useSelector((state) => state.profile);

    const [apiAvatar, setApiAvatar] = useState(null); // Avatar from API
    const [pickedAvatar, setPickedAvatar] = useState(null); // New picked image
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Fetch profile data on component mount
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    // Populate fields when the profile data is fetched
    useEffect(() => {
        if (status === 'succeeded' && profile) {
            setName(profile.name);
            setEmail(profile.email);
            setApiAvatar(profile.avatar || null); // Use API avatar or set null if not provided
        }
    }, [profile, status]);

    // Avatar picker logic
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setPickedAvatar(result.assets[0].uri);
        }
    };

    const handleUpdateName = async () => {
        if (!name.trim()) {
            alert('Please enter a valid name.');
            return;
        }
        try {
            await UpdateName(name);
        } catch (error) {
            console.error('Failed to update name:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await DeleteProfile();
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };

    const handleSaveAvatar = async () => {
        if (pickedAvatar) {
            try {
                const response = await UpdateAvatar(pickedAvatar);
                console.log("Avatar updated successfully:", response);
    
                // Optionally update the UI after successful update
                setApiAvatar(pickedAvatar); // Update the state to reflect the new avatar
                setPickedAvatar(null); // Clear pickedAvatar after saving
            } catch (error) {
                console.error("Failed to update avatar:", error);
            }
        } else {
            alert('Please select an avatar first.');
        }
    };

    if (status === 'loading') {
        return (
            <View style={ProfileStyles.centered}>
                <ActivityIndicator size="large" color={colors.Cerulean} />
            </View>
        );
    }

    if (status === 'failed') {
        return (
            <View style={ProfileStyles.centered}>
                <Text style={ProfileStyles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={ProfileStyles.BackGround}>
            <ScrollView>
                <View style={ProfileStyles.ScreenContainer}>
                    {/* Avatar Logic */}
                    <TouchableOpacity onPress={pickImage} style={ProfileStyles.AvatarCircle}>
                        {pickedAvatar ? (
                            <Image source={{ uri: pickedAvatar }} style={ProfileStyles.imageStyle} />
                        ) : apiAvatar ? (
                            <Image source={{ uri: apiAvatar }} style={ProfileStyles.imageStyle} />
                        ) : (
                            <Ionicons name='person-circle' size={150} color={colors.Darkblue} />
                        )}
                    </TouchableOpacity>

                    {/* Show button if there's a picked image */}
                    {pickedAvatar && (
                        <CustomButton
                            color={colors.Cerulean}
                            text='Save Avatar'
                            TextColor={colors.White}
                            underlayColor={colors.CeruleanUnderlay}
                            onPress={handleSaveAvatar} // Handle save logic here
                            style={ProfileStyles.avatarButton}
                        />
                    )}

                    {/* Name */}
                    <CustomTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder='Name'
                    />

                    {/* Email (read-only) */}
                    <CustomTextInput
                        value={email}
                        placeholder='Email'
                        editable={false} // Make email read-only
                    />

                    {/* Buttons */}
                    <CustomButton
                        color={colors.Cerulean}
                        text='Update Profile'
                        TextColor={colors.White}
                        underlayColor={colors.CeruleanUnderlay}
                        onPress={handleUpdateName}
                    />
                    <CustomButton
                        color={colors.Red}
                        text='Delete Profile'
                        TextColor={colors.White}
                        underlayColor={colors.RedUnderlay}
                        onPress={handleDeleteProfile}
                    />
                    <CustomButton
                        color={colors.Red}
                        text='Logout'
                        TextColor={colors.White}
                        underlayColor={colors.RedUnderlay}
                        onPress={handleLogout}
                        icon='sign-out'
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;
