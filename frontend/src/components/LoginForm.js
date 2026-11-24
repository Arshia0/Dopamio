import React, { useContext } from 'react';
import Lottie from 'react-lottie-player';
import AnimationGradient from '../lottie/AnimationGradient01.json';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const { loginUser, startRegistration } = useContext(AuthContext);

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
                                <div>
                                    <h1 className="text-2xl font-semibold font-vazirmatn">
                                        ورود به سیستم
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-600">
                                        حساب کاربری ندارید؟{' '}
                                        <Link to="/signup" onClick={startRegistration} className="text-blue-500 hover:underline">
                                            ثبت نام کنید
                                        </Link>
                                    </p>
                                </div>
                                <form onSubmit={loginUser} className="divide-y divide-gray-200 mt-4">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input
                                                id="phone_number"
                                                name="phone_number"
                                                type="tel"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                                                placeholder="شماره تلفن"
                                            />
                                            <label
                                                htmlFor="phone_number"
                                                className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                                            >
                                                شماره تلفن
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                                                placeholder="رمز عبور"
                                            />
                                            <label
                                                htmlFor="password"
                                                className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                                            >
                                                رمز عبور
                                            </label>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <div>
                                                <input type="checkbox" id="remember" className="mr-1" />
                                                <label
                                                    htmlFor="remember"
                                                    className="text-gray-600 font-vazirmatn"
                                                >
                                                    مرا به خاطر بسپار
                                                </label>
                                            </div>
                                            <Link to="/sms-reset" className="text-blue-500 hover:underline text-sm font-vazirmatn">
                                                فراموشی رمز عبور؟
                                            </Link>
                                        </div>
                                        <div className="relative mt-6">
                                            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full font-vazirmatn hover:bg-blue-600 transition-all">
                                                ورود
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
