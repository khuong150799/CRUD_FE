import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormAddUsers from './FormAddUsers';

function FormUpdateUser() {
    const params = useParams();
    const [valueAcc, setValueAcc] = useState('');
    const [valuePass, setValuePass] = useState('');
    useEffect(() => {
        console.log(params);
        const fetchApi = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `http://localhost:3300/api/edit/${params.id}`,
                });
                console.log(res.data);
                setValueAcc(res.data[0].account);
                setValuePass(res.data[0].password);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [params]);
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
        if (data.account || data.password) {
            const fetchData = async () => {
                try {
                    const res = await axios({
                        method: 'PUT',
                        url: `http://localhost:3300/api/update/${params.id}`,
                        data: data,
                    });
                    console.log(res);
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <FormAddUsers
            onClick={(e) => handleSubmit(e)}
            valueAcc={valueAcc}
            valuePass={valuePass}
            onChangeAcc={(e) => handleAcc(e)}
            onChangePass={(e) => handlePass(e)}
            nameBtn="update"
        />
    );
}

export default FormUpdateUser;
