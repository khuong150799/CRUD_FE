import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Routers, RouterPublic } from './routes/routes';
import classNames from 'classnames/bind';
import styles from './App.css';
import ProtectionRouter from './ProtectionRouter';
const cx = classNames.bind(styles);
function App() {
    const Component = RouterPublic[0].component;
    return (
        <BrowserRouter>
            <div className={cx('App')}>
                <Routes>
                    <Route path={RouterPublic[0].path} element={<Component />} />
                    <Route element={<ProtectionRouter />}>
                        {Routers.map((router, index) => {
                            return <Route key={index} path={router.path} element={<router.component />} />;
                        })}
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
