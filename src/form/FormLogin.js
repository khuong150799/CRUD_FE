import FormAddUsers from './FormAddUsers';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { httpRefreshToken } from '../utils/httpRequest';

function FormLogin() {
    const [valueAcc, setValueAcc] = useState('');
    const [valuePass, setValuePass] = useState('');
    let data = {};
    const handleAcc = useCallback((e) => {
        setValueAcc(e.target.value);
        if (e.target.value) {
            data.account = e.target.value;
            console.log(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handlePass = useCallback((e) => {
        setValuePass(e.target.value);
        if (e.target.value) {
            data.password = e.target.value;
            console.log(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(data);
        if (data.account && data.password) {
            const fetchData = async () => {
                try {
                    const res = await axios({
                        method: 'POST',
                        url: `http://localhost:3300/api/login`,
                        withCredentials: true,
                        data: data,
                    });
                    console.log(res);
                    if (res.data.result) {
                        const token = res.data.data.accessToken;
                        // axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
                        // httpRefreshToken.defaults.headers.common['authortization'] = `Bearer ${token}`;
                        localStorage.setItem('token', token);
                    }
                    if (res.data.result) {
                        navigate('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    localStorage.removeItem('token');
    return (
        <FormAddUsers
            onClick={(e) => handleSubmit(e)}
            valueAcc={valueAcc}
            valuePass={valuePass}
            onChangeAcc={(e) => handleAcc(e)}
            onChangePass={(e) => handlePass(e)}
            nameBtn="login"
        />
    );
}
export default FormLogin;
