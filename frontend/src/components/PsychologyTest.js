import React, { useState } from "react";

const tests = {
  adhd: {
    title: "تست ADHD",
    questions: [
      "آیا به راحتی حواستان پرت می‌شود؟",
      "آیا در انجام کارها عجول هستید؟",
      "آیا احساس بی‌قراری دارید؟",
      "آیا در توجه کردن به جزئیات مشکل دارید؟",
      "آیا به سختی می‌توانید آرام بنشینید؟",
      "آیا در زمانبندی و مدیریت زمان مشکل دارید؟",
      "آیا به راحتی از کارها خسته می‌شوید؟",
      "آیا در تمرکز کردن مشکل دارید؟",
      "آیا فراموشکار هستید؟",
      "آیا تمایل دارید کارها را به تعویق بیاندازید؟",
      "آیا احساس اضطراب دارید؟",
      "آیا در تصمیم‌گیری سریع عمل می‌کنید؟",
      "آیا کارها را نیمه کاره رها می‌کنید؟",
      "آیا در انجام کارهای تکراری مشکل دارید؟",
      "آیا علاقه زیادی به فعالیت‌های مخاطره‌آمیز دارید؟",
    ],
  },
  bipolar: {
    title: "تست دوقطبی",
    questions: [
      "آیا دوره‌هایی از انرژی بیش از حد یا افسردگی دارید؟",
      "آیا در دوره‌های خاصی بدون دلیل خاصی بسیار خوشحال هستید؟",
      // بقیه سوالات...
    ],
  },
  // تست‌های دیگر...
};

const PsychologyTest = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswerChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  const calculateResult = () => {
    if (selectedTest === "adhd") {
      const positiveAnswers = Object.values(answers).filter(
        (answer) => answer === "yes"
      ).length;
      const percentage = Math.round(
        (positiveAnswers / tests.adhd.questions.length) * 100
      );
      setResult(`شما ${percentage}% احتمال ADHD دارید.`);
    }
    // محاسبه نتیجه برای تست‌های دیگر...
  };

  return (
    <div className="min-h-screen py-10 px-4 text-right font-vazirmatn">
      <h1 className="text-4xl font-bold text-purple-600 mb-8">تست روانشناسی</h1>

      {!selectedTest ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(tests).map((key) => (
            <div
              key={key}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => setSelectedTest(key)}
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {tests[key].title}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">
            {tests[selectedTest].title}
          </h2>
          {tests[selectedTest].questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-medium text-gray-700">{question}</p>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="yes"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">بله</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value="no"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">خیر</span>
                </label>
              </div>
            </div>
          ))}

          <button
            onClick={calculateResult}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            محاسبه نتیجه
          </button>

          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
              {result}
            </div>
          )}

          <button
            onClick={() => setSelectedTest(null)}
            className="mt-4 text-blue-500 hover:underline"
          >
            بازگشت به لیست تست‌ها
          </button>
        </div>
      )}
    </div>
  );
};

export default PsychologyTest;
