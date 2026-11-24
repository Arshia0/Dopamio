import { apiUrl } from "../utils/api";
import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie-player';
import AnimationGradient from '../lottie/AnimationGradient01.json';
import { useNavigate } from 'react-router-dom';

const SendSMSResetPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [resendAvailable, setResendAvailable] = useState(false);
    const [timer, setTimer] = useState(120);
    const intervalId = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isCodeSent && timer > 0) {
            intervalId.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId.current);
        } else if (timer <= 0) {
            clearInterval(intervalId.current);
            setResendAvailable(true);
        }
    }, [isCodeSent, timer]);

    const handleSendSMS = async () => {
        const convertedPhoneNumber = convertToEnglishDigits(phoneNumber);

        const response = await fetch(apiUrl('/api/users/sms-reset/'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone_number: convertedPhoneNumber, code: '' })
        });

        const data = await response.json();

        if (response.status === 200) {
            setMessage('کد تأیید برای شما ارسال شد.');
            setIsCodeSent(true);
            setTimer(120);
            setResendAvailable(false);
        } else if (data.data === "code is already sent for you") {
            setMessage('کد قبلاً ارسال شده است. لطفاً آن را وارد کنید.');
            setIsCodeSent(true);
            if (timer <= 0) {
                setTimer(120);
            }
            setResendAvailable(false);
        } else {
            setMessage('خطا در ارسال کد. لطفاً دوباره تلاش کنید.');
        }
    };

    const handleVerifyCode = async () => {
        const convertedPhoneNumber = convertToEnglishDigits(phoneNumber);
        const convertedCode = convertToEnglishDigits(code);

        const response = await fetch(apiUrl('/api/users/sms-reset/'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone_number: convertedPhoneNumber, code: convertedCode })
        });

        const data = await response.json();

        if (response.status === 200) {
            setMessage('کد تأیید با موفقیت تایید شد.');
            navigate('/reset-password', { state: { phoneNumber: convertedPhoneNumber, code: convertedCode } });
        } else {
            setMessage('کد وارد شده اشتباه است.');
        }
    };

    const handleChangePhoneNumber = () => {
        setIsCodeSent(false);
        setPhoneNumber('');
        setCode('');
        setMessage('');
        clearInterval(intervalId.current);
    };

    const handleResendCode = async () => {
        const convertedPhoneNumber = convertToEnglishDigits(phoneNumber);

        const response = await fetch(apiUrl('/api/users/sms-reset/'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone_number: convertedPhoneNumber, code: '' })
        });

        const data = await response.json();

        if (response.status === 200) {
            setMessage('کد تأیید مجدداً ارسال شد.');
            setTimer(120);
            setResendAvailable(false);
        } else {
            setMessage('خطا در ارسال مجدد کد.');
        }
    };

    const convertToEnglishDigits = (str) => {
        return str.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    };

    const renderTimer = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                                <h2 className="text-2xl font-semibold text-center">ارسال کد تایید</h2>
                                {!isCodeSent ? (
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="شماره تلفن"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                                            />
                                            <label
                                                className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                                            >
                                                شماره تلفن
                                            </label>
                                        </div>
                                        <button
                                            onClick={handleSendSMS}
                                            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                                        >
                                            ارسال کد تایید
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <p className="text-right">کد به شماره {phoneNumber} ارسال شد.</p>
                                        <div className="flex items-center justify-between">
                                            <input
                                                type="text"
                                                placeholder="کد تایید"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="w-2/3 p-3 border-b-2 border-gray-300 text-gray-900 rounded-lg"
                                            />
                                            <span className="text-gray-500">{renderTimer()}</span>
                                        </div>
                                        <button
                                            onClick={handleVerifyCode}
                                            className="w-full py-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600 transition-all mt-4"
                                        >
                                            تایید کد
                                        </button>
                                        {resendAvailable && (
                                            <button
                                                onClick={handleResendCode}
                                                className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md mt-4 hover:bg-orange-600 transition-all"
                                            >
                                                ارسال مجدد
                                            </button>
                                        )}
                                        <button
                                            onClick={handleChangePhoneNumber}
                                            className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md mt-4 hover:bg-red-600 transition-all"
                                        >
                                            تغییر شماره تلفن
                                        </button>
                                    </div>
                                )}
                                <p className="mt-4 text-center text-red-500">{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendSMSResetPassword;
