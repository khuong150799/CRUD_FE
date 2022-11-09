import axios from 'axios';
import jwt_decode from 'jwt-decode';

let token = localStorage.getItem('token');
console.log(token);

export const httpRefreshToken = axios.create({
    headers: { authorization: `Bearer ${token}` },
});
httpRefreshToken.interceptors.request.use(
    async (config) => {
        try {
            let date = new Date();
            const accessToken = localStorage.getItem('token');
            console.log(accessToken);
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            // console.log(date.getTime() / 1000);
            if (decodedToken.exp < date.getTime() / 1000) {
                console.log('bsjdadsjfgj');
                try {
                    const res = await axios({
                        method: 'POST',
                        url: 'http://localhost:3300/api/refresh-token',
                        withCredentials: true,
                    });
                    // const data = await refeshToken();
                    console.log(res.data.accessToken);
                    const token = res.data.accessToken;
                    if (token) {
                        localStorage.setItem('token', token);
                    }
                    config.headers['authorization'] = `Bearer ${token}`;
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
        console.log(config);
        return config;
    },
    function (err) {
        return Promise.reject(err);
    },
);
