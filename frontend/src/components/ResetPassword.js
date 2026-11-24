import { apiUrl } from "../utils/api";
import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import AnimationGradient from '../lottie/AnimationGradient01.json';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const { phoneNumber, code } = location.state;
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        const response = await fetch(apiUrl('/api/users/reset-password/'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number: phoneNumber,
                code: code,
                new_password: newPassword,
                new_password_confirm: newPasswordConfirm
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            setMessage(data.message);
            navigate('/login');
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center font-vazirmatn">
            <div className="flex justify-center items-center w-full max-w-7xl">
                <div className="w-1/2 hidden lg:flex justify-center items-center">
                    <Lottie
                        loop
                        animationData={AnimationGradient}
                        play
                        className="w-full h-auto max-h-screen"
                    />
                </div>
                <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 w-full">
                    <div className="relative py-3 sm:max-w-md sm:mx-auto w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10 text-right">
                            <div className="max-w-sm mx-auto">
                                <h2 className="text-2xl font-semibold text-center">ریست کردن رمز عبور</h2>
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="رمز عبور جدید"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                                        />
                                        <label
                                            className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                                        >
                                            رمز عبور جدید
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="تایید رمز عبور جدید"
                                            value={newPasswordConfirm}
                                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                                        />
                                        <label
                                            className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                                        >
                                            تایید رمز عبور جدید
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleResetPassword}
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all mt-6"
                                    >
                                        ریست کردن رمز عبور
                                    </button>
                                    <p className="mt-4 text-center text-red-500">{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
