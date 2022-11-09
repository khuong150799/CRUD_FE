import { Navigate, Outlet } from 'react-router-dom';

const user = () => {
    const user = localStorage.getItem('token');
    return user;
};

function ProtectionRouter() {
    const isAut = user();
    return !!isAut ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectionRouter;
