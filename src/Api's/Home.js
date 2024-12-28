import axios from "axios";
import Endpoints from "../Const/Api's_Endpoints";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetOffers = async (countryCode) => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
        Endpoints.HomePage,
        { cc: countryCode },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = JSON.parse(response.data.data);
    console.log(token);
    console.log(data.offers.offerwall_web);
    return {
        sdkOffers: data.offers.offerwall_sdk,
        webOffers: data.offers.offerwall_web,
        cpaOffers: data.offers.offerwall_cpa,
        cpvOffers: data.offers.offerwall_cpv,
    };
};

export default GetOffers;
