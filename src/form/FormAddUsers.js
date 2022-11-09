import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './form.css';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function FormAddUsers({ nameBtn = 'add', valueAcc, valuePass, onChangePass, onChangeAcc, onClick }) {
    const [valueAccount, setValueAccount] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    let data = {};
    const handleAccount = useCallback((e) => {
        setValueAccount(e.target.value);
        if (e.target.value) {
            data.account = e.target.value;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handlePassword = useCallback((e) => {
        setValuePassword(e.target.value);
        if (e.target.value) {
            data.password = e.target.value;
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
                        url: 'http://localhost:3300/api/add',
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
        <div>
            <form className={cx('form')}>
                <div className={cx('form-group')}>
                    <label className={cx('title')}>account</label>
                    <input
                        onChange={onChangeAcc ? onChangeAcc : (e) => handleAccount(e)}
                        className={cx('input')}
                        type="text"
                        value={valueAcc ? valueAcc : valueAccount}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('title')}>password</label>
                    <input
                        onChange={
                            onChangePass
                                ? onChangePass
                                : (e) => {
                                      handlePassword(e);
                                  }
                        }
                        className={cx('input')}
                        type="text"
                        value={valuePass ? valuePass : valuePassword}
                    />
                </div>
                <button
                    onClick={
                        onClick
                            ? onClick
                            : (e) => {
                                  handleSubmit(e);
                              }
                    }
                    className={cx('btn')}
                >
                    {nameBtn}
                </button>
            </form>
        </div>
    );
}

export default FormAddUsers;
