import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './page.css';
import { httpRefreshToken } from '../utils/httpRequest';

const cx = classNames.bind(styles);

function Home() {
    const [datas, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await httpRefreshToken({
                    method: 'GET',
                    // baseURL: process.env.REACT_APP_BASE_URL,
                    url: 'http://localhost:3300/',
                    // headers: { authorization: `Bearer ${token}` },
                });
                console.log(res);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = useCallback((e, id) => {
        e.preventDefault();
        const fetchApi = async () => {
            try {
                const res = await axios({
                    method: 'DELETE',
                    url: `http://localhost:3300/api/delete/${id}`,
                });
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);
    return (
        <table>
            <thead>
                <tr>
                    <th className={cx('title-table')}>accout</th>
                    <th className={cx('title-table')}></th>
                    <th className={cx('title-table')}></th>
                </tr>
            </thead>
            <tbody>
                {datas.length > 0 &&
                    datas.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>{data.account}</td>
                                <td>
                                    <Link to={`/update/${data.id}`}>sửa</Link>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(e, data.id)}>xóa</button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}

export default Home;
