import React from "react";
import Lottie from "react-lottie-player";
import AnimationGradient01 from "../lottie/AnimationGradient01.json";
import MaleAdminProfilePlaceholder from "../images/maleadminsprofileplaceholder.png";

const AboutUs = () => {
  return (
    <div className="p-6 font-vazirmatn text-right min-h-screen bg-gray-100 space-y-12">
      <div className="w-full bg-gray-300 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 w-full mb-6 md:mb-0">
          <Lottie
            loop
            animationData={AnimationGradient01}
            play
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full text-right">
          <h2 className="text-lg font-semibold mb-2" dir="rtl">
            توضیحات راجع به دوپامیو
          </h2>
          <p className="text-gray-700 text-sm" dir="rtl">
            دوپامیو یک نرم‌افزار پیشرفته خودیاری است که به منظور بهبود سلامت
            روانی و پیگیری سطح دوپامین طراحی شده است. با استفاده از این
            نرم‌افزار، کاربران می‌توانند تسک‌های مختلف را مدیریت کنند و به تحلیل
            و نظارت بر سطح دوپامین خود بپردازند.
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-300 rounded-lg p-6 flex flex-col space-y-8">
        <h2 className="text-xl font-bold mb-4" dir="rtl">افراد</h2>
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="text-right">
            <p className="text-lg font-bold" dir="rtl">عرشیا افشار</p>
            <p className="text-gray-700 text-sm" dir="rtl">
              دانشجوی دانشگاه صنعتی اصفهان - رشته مهندسی برق (گرایش بیوالکتریک)
              - مسئول فرانت اند
            </p>
          </div>
          <div className="flex-shrink-0 w-24 h-24 rounded-full text-center flex items-center justify-center">
            <img
              src={MaleAdminProfilePlaceholder}
              alt="جای عکس"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="text-right">
            <p className="text-lg font-bold" dir="rtl">متین رضایی</p>
            <p className="text-gray-700 text-sm" dir="rtl">
              دانشجوی دانشگاه صنعتی اصفهان - رشته مهندسی کامپیوتر (گرایش نرم
              افزار) - مسئول بک اند
            </p>
          </div>
          <div className="flex-shrink-0 w-24 h-24 rounded-full text-center flex items-center justify-center">
            <img
              src={MaleAdminProfilePlaceholder}
              alt="جای عکس"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
