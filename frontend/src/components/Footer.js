import React, { useState } from "react";
import dopiIcon from "../images/dopi-icon.png";
import instagramIcon from "../images/instagramIcon.webp";
import callIcon from "../images/callIcon.png";
import telegramIcon from "../images/telegramIcon.png";

const Footer = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

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

  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

  return (
    <div className="relative mt-16 bg-gray-800 text-white font-vazirmatn">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-gray-800"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          {/* بخش لوگو و توضیحات */}
          <div className="md:max-w-md lg:col-span-2 text-right" dir="rtl">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img src={dopiIcon} alt="Logo" className="w-12 h-12" />
              <span className="mr-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                سایت خودیاری روان
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-gray-400 text-justify"> {/* تغییر به حالت justify */}
                سایت خودیاری روان به شما کمک می‌کند تا با انجام تسک‌های ساده
                روزانه مانند ورزش، کتاب خواندن و وقت گذراندن با دوستان، میزان
                دوپامین بدن خود را سنجش کنید. با توجه به این تسک‌ها، امتیازاتی
                به شما داده می‌شود که میزان دوپامین تولید شده را نمایش می‌دهد و
                شما می‌توانید وضعیت روانی و فیزیکی خود را بهتر بسنجید.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-2 text-right" dir="rtl">
            <div>
              <p className="font-semibold tracking-wide text-teal-400">
                رفرنس‌های سایت
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <button
                    onClick={openPrivacyModal}
                    className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
                  >
                    سیاست حفظ حریم خصوصی
                  </button>
                </li>
                <li>
                </li>
                <li>
                  <a
                    href="/about-us"
                    className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
                  >
                    درباره ما
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-teal-400">
                دوپامیو چیست
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/what-is-dopamio"
                    className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
                  >
                    اطلاعات بیشتر
                  </a>
                </li>
                <li>
                  <a
                    href="/dopamio-features"
                    className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
                  >
                    ویژگی‌ها
                  </a>
                </li>
                <li>
                </li>
              </ul>
            </div>


          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-700 sm:flex-row" dir="rtl">
          <p className="text-sm text-gray-400">© تمامی حقوق محفوظ است - ۲۰۲۴</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="/"
              className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
            >
              <img
                src={instagramIcon}
                alt="Instagram Icon"
                className="w-5 h-5"
              />
            </a>
            <a
              href="/"
              className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
            >
              <img src={callIcon} alt="Call Icon" className="w-5 h-5" />
            </a>
            <a
              href="/"
              className="transition-colors duration-300 text-gray-400 hover:text-teal-400"
            >
              <img src={telegramIcon} alt="Telegram Icon" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="relative p-4 w-full max-w-2xl mx-auto mt-20">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  سیاست حفظ حریم خصوصی
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closePrivacyModal}
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
                  onClick={closePrivacyModal}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
