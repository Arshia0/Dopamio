import { apiUrl } from "../utils/api";
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import AnimationGradient from "../lottie/AnimationGradient01.json";
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const TermsAndConditions = `
    شرایط و قوانین:
    1. استفاده از این برنامه به معنی پذیرش کامل شرایط و قوانین زیر است.
    2. تمامی اطلاعات کاربر باید به صورت دقیق و صحیح وارد شود.
    3. این برنامه حق دارد در صورت نقض شرایط و قوانین، دسترسی کاربر را مسدود کند.
    4. اطلاعات شما برای بهبود خدمات ما استفاده خواهد شد و تحت هیچ شرایطی بدون رضایت شما به شخص ثالثی ارائه نخواهد شد.
    5. شما موافقت می‌کنید که مسئولیت تمامی فعالیت‌هایی که با استفاده از حساب کاربری شما انجام می‌شود، بر عهده شماست.
    6. برنامه ممکن است برای بهبود عملکرد، اطلاعاتی را از دستگاه شما جمع‌آوری کند.
    7. هرگونه سوءاستفاده از برنامه و امکانات آن منجر به مسدود شدن حساب کاربری شما خواهد شد.

    لطفاً این شرایط را به دقت مطالعه کنید و در صورت پذیرش آن‌ها، ثبت‌نام خود را ادامه دهید.
  `;

  const handleInputDirection = (e) => {
    const input = e.target;
    const isRtl = /[\u0600-\u06FF]/.test(input.value);
    input.style.direction = isRtl ? 'rtl' : 'ltr';
    input.style.textAlign = isRtl ? 'right' : 'left';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('رمزهای عبور یکسان نیستند.');
      return;
    }

    const response = await fetch(apiUrl('/api/users/register/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password1: password,
        password2: confirmPassword,
        age,
        gender,
      }),
    });

    if (response.ok) {
      navigate('/login');
    } else {
      const errorData = await response.json();
      if (errorData.phone_number) {
        setErrorMessage('این شماره تلفن قبلا در سیستم ثبت شده است لطفا ورود کنید.');
      } else {
        setErrorMessage('ثبت‌نام انجام نشد. لطفا مجددا تلاش کنید.');
      }
    }
  };

  useEffect(() => {
    // تغییر پیام‌های خطای HTML5 به فارسی
    const form = document.querySelector('form');
    if (form) {
      form.noValidate = true;
      form.addEventListener('invalid', (e) => {
        e.preventDefault();
        const element = e.target;
        if (element.validity.valueMissing) {
          setErrorMessage('لطفا این فیلد را پر کنید.');
        }
      }, true);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex items-center justify-center font-vazirmatn">
      <div className="flex justify-center items-center w-full max-w-7xl">
        {/* Animation on the left */}
        <div className="w-1/2 hidden lg:flex justify-center items-center">
          <Lottie
            loop
            animationData={AnimationGradient}
            play
            className="w-full h-auto max-h-screen"
          />
        </div>
        {/* Sign Up Form on the right */}
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 w-full">
          <div className="relative py-3 sm:max-w-md sm:mx-auto w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10 text-right">
              <div className="max-w-sm mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold font-vazirmatn">
                    ایجاد حساب کاربری
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    حساب کاربری دارید؟{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                      وارد شوید
                    </a>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="divide-y divide-gray-200 mt-4">
                  <input type="text" name="fakeemail" style={{ display: 'none' }} />
                  <input type="password" name="fakepassword" style={{ display: 'none' }} />
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onInput={handleInputDirection}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="نام"
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        نام
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onInput={handleInputDirection}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="نام خانوادگی"
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        نام خانوادگی
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="ایمیل (اختیاری)"
                      />
                      <label
                        htmlFor="email"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        ایمیل (اختیاری)
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="سن"
                        required
                      />
                      <label
                        htmlFor="age"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        سن
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        required
                        dir="rtl"
                      >
                        <option value="" disabled>انتخاب کنید</option>
                        <option value="M">مرد</option>
                        <option value="F">زن</option>
                        <option value="O">دیگر</option>
                      </select>
                      <label
                        htmlFor="gender"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        انتخاب جنسیت
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onInput={handleInputDirection}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="شماره موبایل"
                        required
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        شماره موبایل
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="رمز عبور"
                        required
                      />
                      <label
                        htmlFor="password"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        رمز عبور
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-500"
                        placeholder="تکرار رمز عبور"
                        required
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm font-vazirmatn"
                      >
                        تکرار رمز عبور
                      </label>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="relative flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={isTermsAccepted}
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        من شرایط و قوانین را می‌پذیرم
                      </label>
                      <button
                        type="button"
                        onClick={openModal}
                        className="ml-4 text-blue-500 hover:underline text-sm"
                      >
                        بیشتر بخوانید
                      </button>
                    </div>

                    {/* Submit Button */}
                    <div className="relative">
                      <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={!isTermsAccepted}
                      >
                        ثبت نام
                      </button>
                    </div>
                  </div>
                </form>
                {/* Error Popup */}
                {errorMessage && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
                    <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                      <div className="opacity-25 w-full h-full absolute z-10 inset-0"></div>
                      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                        <div className="md:flex items-center">
                          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <i className="bx bx-error text-3xl">
                              &#9888;
                            </i>
                          </div>
                          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-right">
                            <p className="font-bold">خطا</p>
                            <p className="text-sm text-gray-700 mt-1">{errorMessage}</p>
                          </div>
                        </div>
                        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                          <button
                            onClick={() => setErrorMessage('')}
                            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm"
                          >
                            بستن
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {isModalOpen && (
        <div id="default-modal" className="fixed inset-0 z-50 overflow-y-auto">
          <div className="relative p-4 w-full max-w-2xl mx-auto mt-20">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  شرایط و قوانین
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">بستن</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 text-right" dir="rtl">
                {TermsAndConditions.split('\n').map((line, index) => (
                  <p key={index} className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {line}
                  </p>
                ))}
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    closeModal();
                    setIsTermsAccepted(true);
                  }}
                >
                  قبول
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={closeModal}
                >
                  نپذیرفتن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
