import React, { useState } from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For back arrow
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../Component/CustomButton';
import colors from '../Const/Colors';

const GiftsItems = ({ route }) => {
    const { items, categoryImage, userPoints } = route.params; // Accept category image and user points from navigation params
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [email, setEmail] = useState("");

    // Redeem handler
    const handleRedeem = (item) => {
        setSelectedItem(item);
        if (userPoints >= item.points) {
            setModalVisible(true); // Show email input modal
        } else {
            Alert.alert("Insufficient Points", "You do not have enough points to redeem this item.");
        }
    };

    // Handle Send Email
    const handleSendEmail = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(
                "https://cashgames.website/api/gift/post",
                {
                    wid: selectedItem.id, // Selected item ID
                    acc: email, // User's email
                },
                {
                    headers: { Authorization: token },
                }
            );
            if (response.data.status === 1) {
                Alert.alert("Success", "The gift has been sent to your email.");
            } else {
                Alert.alert("Error", response.data.message || "Failed to redeem the gift.");
            }
        } catch (error) {
            console.error("Error redeeming gift:", error);
            Alert.alert("Error", "An error occurred while redeeming the gift. Please try again.");
        }
        setModalVisible(false);
        setEmail("");
    };

    const renderGiftItem = ({ item }) => (
        <View style={styles.listItem}>
            <Image
                source={{ uri: item.image || categoryImage }} // Use categoryImage as fallback
                style={styles.itemImage}
                resizeMode="stretch" // Cover for full-width images
            />
            <View style={styles.textContainer}>
                <Text style={styles.amountText}>{item.amount}</Text>
                <Text style={styles.pointsText}>Points: {item.points}</Text>
                <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
            </View>
            <CustomButton
                TextColor={colors.White}
                color={colors.Red}
                onPress={() => handleRedeem(item)}
                text="Redeem"
                underlayColor={colors.RedUnderlay}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>

            {/* List of Items */}
            <FlatList
                data={items}
                renderItem={renderGiftItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />

            {/* Redeem Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Please enter your email to redeem "{selectedItem?.amount}".
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#aaa"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleSendEmail}>
                            <Text style={styles.modalButtonText}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: "red" }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 40, // Increase padding from the top
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 10,
        padding: 10,
    },
    listContainer: {
        paddingTop: 70, // Space between the back icon and the list
        paddingBottom: 20,
    },
    listItem: {
        flexDirection: 'column', // Ensures full-width alignment
        marginBottom: 15,
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden', // Ensure the image doesn't overflow the container
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemImage: {
        width: '100%', // Full width of the container
        height: 200, // Increased height for better visuals
    },
    textContainer: {
        padding: 15,
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pointsText: {
        fontSize: 16,
        color: '#555',
    },
    quantityText: {
        fontSize: 16,
        color: '#555',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default GiftsItems;
