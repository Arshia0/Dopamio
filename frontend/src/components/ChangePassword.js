import { apiUrl } from "../utils/api";
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ChangePassword = () => {
    const { authTokens } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async () => {
        const response = await fetch(apiUrl('/api/users/change-password/'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            setMessage(data.message);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4" dir="rtl">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center font-vazirmatn">تغییر رمز عبور</h2>
                <input
                    type="password"
                    placeholder="رمز عبور قدیمی"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded font-vazirmatn text-right"
                />
                <input
                    type="password"
                    placeholder="رمز عبور جدید"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded font-vazirmatn text-right"
                />
                <button
                    onClick={handleChangePassword}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded font-vazirmatn"
                >
                    تغییر رمز عبور
                </button>
                <p className="text-center mt-4 font-vazirmatn">{message}</p>
            </div>
        </div>
    );
};

export default ChangePassword;
