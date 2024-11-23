import axios from "axios";
import Endpoints from "../Const/Api's_Endpoints";

const GetCountryCode = async () => {
        const response = await axios.get(Endpoints.Ip);
        return response.data;
};
export default GetCountryCode;