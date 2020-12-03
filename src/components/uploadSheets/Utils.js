import axios from "axios"
import {getUserToken} from "../login/Util";

export const misUpload = async (excel_file) => {
    const token = getUserToken()
    const data = new FormData();
    data.append('file', excel_file);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Token ' + token,
        },
    };

    return await axios
        .post('https://mis2020.herokuapp.com/api/mis/excel/', data, axiosConfig)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log('Error occurred: ', err);
            return err
        });
}

export const misErrors = async (id) => {
    const token = getUserToken()
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Token ' + token,
        },
    };

    return await axios
        .get(`https://mis2020.herokuapp.com/api/mis/excel_errors/?excel=${id}`, axiosConfig)
        .then((res) => {
            console.log('Success: ', res.data);
            return res.data
        })
        .catch((err) => {
            console.log('Error occurred: ', err);
            throw err;
        });

}

export const misCentres = async () => {
    const token = getUserToken()
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Token ' + token,
        },
    };

    return await axios
        .get(`https://mis2020.herokuapp.com/api/centre/centres/`, axiosConfig)
        .then((res) => {
            console.log('Success: ', res.data);
            return res.data
        })
        .catch((err) => {
            console.log('Error occurred: ', err);
            throw err;
        });

}

export const misDelete = async (id) => {
    const token = getUserToken()
    let data = JSON.stringify({
        removed: true,
    });

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'Token ' + token,
        },
    };

    return await axios
        .patch(
            'https://mis2020.herokuapp.com/api/centre/all-centres/' + id + '/',
            data,
            axiosConfig
        )
        .then((res) => {
            console.log('RESPONSE RECEIVED: ', res);
            return res.data
        })
        .catch((err) => {
            throw err;
        });
}
