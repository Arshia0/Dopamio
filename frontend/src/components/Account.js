import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import accountIcon from "../images/accountIcon.png";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Account = () => {
  // داده‌های تستی برای نمودار
  const defaultDopamineData = [
    { date: '2024-09-06', score: 10 },
    { date: '2024-09-07', score: 15 },
    { date: '2024-09-08', score: 12 },
    { date: '2024-09-09', score: 18 },
    { date: '2024-09-10', score: 20 },
    { date: '2024-09-11', score: 22 },
    { date: '2024-09-12', score: 34 },
  ];

  const [dopamineData, setDopamineData] = useState(defaultDopamineData);

  // تنظیمات داده‌های نمودار
  const chartData = {
    labels: dopamineData.map(data => data.date), // تاریخ‌ها
    datasets: [
      {
        label: 'سطح دوپامین',
        data: dopamineData.map(data => data.score), // سطح دوپامین
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  // تنظیمات ظاهر نمودار
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'تاریخ',
        },
      },
      y: {
        title: {
          display: true,
          text: 'سطح دوپامین',
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-10 px-4 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <img
              src={accountIcon}
              alt="User Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h2 className="text-2xl font-bold mt-4 font-vazirmatn" dir="rtl">
              پروفایل من
            </h2>
            <p className="text-gray-600 mt-2" dir="rtl">کاربر عزیز، خوش آمدید!</p>
            <Link
              to="/edit-profile"
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-vazirmatn"
              dir="rtl"
            >
              ویرایش پروفایل
            </Link>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold font-vazirmatn" dir="rtl">
              زنگ‌های مورد علاقه
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                <span className="font-vazirmatn" dir="rtl">ورزش</span>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </li>
              <li className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                <span className="font-vazirmatn" dir="rtl">کتاب</span>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </li>
              <li className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                <span className="font-vazirmatn" dir="rtl">جدید</span>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 font-vazirmatn" dir="rtl">
            جایگاه در جدول رقابت
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <span className="text-xl font-bold font-vazirmatn ml-2">۱</span>
              </div>
              <span className="font-vazirmatn" dir="rtl">رتبه فعلی:</span>
            </li>
            <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <span className="text-xl font-bold font-vazirmatn ml-2">۳۴</span>
              </div>
              <span className="font-vazirmatn" dir="rtl">امتیازات فعلی:</span>
            </li>
          </ul>

          {/* نمودار سطح دوپامین */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 font-vazirmatn" dir="rtl">
              روند سطح دوپامین در طول هفته
            </h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
