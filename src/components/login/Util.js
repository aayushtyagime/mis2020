import axios from "axios";

export const auth = async (user_name, pwd, setError) => {
    let postData = JSON.stringify({
        username: user_name,
        password: pwd,
    });

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    await axios
        .post(
            'https://mis2020.herokuapp.com/rest-auth/login/',
            postData,
            axiosConfig
        )
        .then((res) => {
            console.log('RESPONSE RECEIVED: ', res);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('designation', res.data.designation);
            localStorage.setItem('full_name', res.data.full_name);
            localStorage.setItem('cookies', 'no');
        })
        .catch((err) => {
            console.log("error",err)
            setError({
                userError: {error: true},
                errorMessage: "Username/email incorrect"
            })
        });
}

export const checkIfAuthenticated = () => {
    return (localStorage.getItem("token") != null && localStorage.getItem("token") !== "")
}

export const getUserToken = () => {
    return localStorage.getItem("token")
}