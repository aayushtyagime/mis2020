import axios from "axios";
import {getUserToken} from "../login/Util";

export const callApi = async (url) => {
    const token = getUserToken()

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Token ' + token,
        },
    };

    return await axios.get(url, axiosConfig)
        .then((response) => {
            return response.data
        } )
        .catch((err) => {
            console.error("error ", err)
            throw Error(err)
        })
}