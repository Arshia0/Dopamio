import { apiUrl } from "../utils/api";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import AnimationLottieBG from "../lottie/Animationlottiebg01.json";
import AnimationLottieBG02 from "../lottie/Animationlottiebg02.json";
import Animationgradientbox02 from "../lottie/Animationgradientbox02.json";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [bells, setBells] = useState([]);

  useEffect(() => {
    const fetchBells = async () => {
      try {
        const response = await axios.get(apiUrl("/api/users/bells/"));
        setBells(response.data);
      } catch (error) {
        console.error("Error fetching bells:", error);
      }
    };

    fetchBells();
  }, []);

  const handleButtonClick = (bellId) => {
    navigate(`/bell/${bellId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    rtl: true,
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 min-h-screen space-y-16">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <div className="w-full lg:w-1/2 p-8 text-right font-vazirmatn">
          <h2 className="text-blue-700 font-semibold text-lg" dir="rtl">
            افزایش حالت روحی
          </h2>
          <h1 className="text-4xl font-bold mt-4" dir="rtl">
            سطح دوپامین خود را به طور مؤثر پیگیری کنید
          </h1>
          <p className="text-gray-700 mt-4" dir="rtl">
            با استفاده از دوپامیو، به راحتی می‌توانید میزان دوپامین خود را در
            طول روز پیگیری کنید و به سلامت روانی بهتر دست یابید.
          </p>
          <button className="mt-6 py-3 px-6 bg-blue-700 text-white rounded-lg shadow-md font-vazirmatn" dir="rtl">
            مشاهده خدمات
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <Lottie
            loop
            animationData={AnimationLottieBG}
            play
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl p-6 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row items-center text-right">
        <div className="w-full md:w-1/2 rounded-lg shadow-md">
          <Lottie
            loop
            animationData={AnimationLottieBG02}
            play
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:mr-6 mt-6 md:mt-0">
          <h2 className="text-blue-700 font-semibold text-lg font-vazirmatn" dir="rtl">
            درباره دوپامیو
          </h2>
          <h3 className="text-2xl font-bold mt-2 font-vazirmatn" dir="rtl">
            افزایش رشد شخصی
          </h3>
          <p className="text-gray-700 mt-4 font-vazirmatn" dir="rtl">
            دوپامیو یک نرم‌افزار خودیاری پیشرفته است که به منظور ارتقاء سلامتی
            روانی شما طراحی شده است. با ارائه تسک‌های مختلف، کاربران می‌توانند
            سطح دوپامین بدن خود را از طریق نمودارهای گرافیکی نظارت کنند و ببینند
            آیا به تعادل سالم دست یافته‌اند یا خیر. با دوپامیو سفری جدید به سمت
            سلامتی روانی خود آغاز کنید!
          </p>
          <button className="mt-4 py-2 px-4 bg-blue-700 text-white rounded-lg font-vazirmatn" dir="rtl">
            تماس با ما
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="text-blue-700 font-semibold text-lg text-right font-vazirmatn" dir="rtl">
          خدمات ما
        </h2>
        <h3 className="text-2xl font-bold mt-2 text-right font-vazirmatn" dir="rtl">
          مدیریت تسک‌های شخصی‌سازی شده
        </h3>
        <div className="mt-6">
          <Slider {...settings}>
            {bells.map((bell) => (
              <div key={bell.id} className="px-2">
                <button
                  className="bg-white text-blue-700 py-4 px-6 rounded-lg shadow-lg font-vazirmatn transition-transform transform hover:scale-105"
                  onClick={() => handleButtonClick(bell.id)}
                >
                  <div className="w-full rounded-lg mb-4">
                    <Lottie
                      loop
                      animationData={Animationgradientbox02}
                      play
                      className="w-full h-auto max-h-64 rounded-lg"
                    />
                  </div>
                  <h4 className="text-xl font-bold" dir="rtl">{bell.name}</h4>
                  <p className="text-gray-600 mt-2" dir="rtl">{bell.description}</p>
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <div className="w-full lg:w-1/2 p-8 text-right font-vazirmatn">
          <h2 className="text-blue-700 font-semibold text-lg" dir="rtl">
            افزایش حالت روحی
          </h2>
          <h1 className="text-4xl font-bold mt-4" dir="rtl">
            سطح دوپامین خود را به طور مؤثر پیگیری کنید
          </h1>
          <p className="text-gray-700 mt-4" dir="rtl">
            با استفاده از دوپامیو، به راحتی می‌توانید میزان دوپامین خود را در
            طول روز پیگیری کنید و به سلامت روانی بهتر دست یابید.
          </p>
          <button className="mt-6 py-3 px-6 bg-blue-700 text-white rounded-lg shadow-md font-vazirmatn" dir="rtl">
            مشاهده خدمات
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <Lottie
            loop
            animationData={AnimationLottieBG}
            play
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full max-w-5xl p-6 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row items-center text-right">
        <div className="w-full md:w-1/2 rounded-lg shadow-md">
          <Lottie
            loop
            animationData={AnimationLottieBG02}
            play
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:mr-6 mt-6 md:mt-0">
          <h2 className="text-blue-700 font-semibold text-lg font-vazirmatn" dir="rtl">
            درباره دوپامیو
          </h2>
          <h3 className="text-2xl font-bold mt-2 font-vazirmatn" dir="rtl">
            افزایش رشد شخصی
          </h3>
          <p className="text-gray-700 mt-4 font-vazirmatn" dir="rtl">
            دوپامیو یک نرم‌افزار خودیاری پیشرفته است که به منظور ارتقاء سلامتی
            روانی شما طراحی شده است. با ارائه تسک‌های مختلف، کاربران می‌توانند
            سطح دوپامین بدن خود را از طریق نمودارهای گرافیکی نظارت کنند و ببینند
            آیا به تعادل سالم دست یافته‌اند یا خیر. با دوپامیو سفری جدید به سمت
            سلامتی روانی خود آغاز کنید!
          </p>
          <button className="mt-4 py-2 px-4 bg-blue-700 text-white rounded-lg font-vazirmatn" dir="rtl">
            تماس با ما
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
