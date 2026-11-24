import React from "react";
import Lottie from "react-lottie-player";
import Animationgradientbox02 from "../lottie/Animationgradientbox02.json";

const SidebarBoxes = ({
  boxes,
  setSelectedBox,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    sidebarOpen && (
      <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
        <section className="absolute inset-y-0 left-0 pr-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col py-6 bg-white shadow-xl">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-4">
                <h2 className="text-xl font-semibold text-black font-vazirmatn">
                  انتخاب زنگ
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="mt-4 px-4 h-full overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {boxes.map((box) => (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className="bg-gray-50 hover:bg-gray-100 p-4 cursor-pointer rounded-md border border-gray-300 transition-colors duration-300"
                    >
                      <Lottie
                        loop
                        animationData={Animationgradientbox02}
                        play
                        className="w-full h-24 object-cover mb-2"
                      />
                      <h3 className="text-lg font-semibold text-black mb-2 font-vazirmatn">
                        {box.name}
                      </h3>
                      <p className="text-gray-600 font-vazirmatn">{box.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-6 px-4">
                <button className="flex justify-center items-center bg-black text-white rounded-md text-sm p-2 gap-1 font-vazirmatn">
                  <svg
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  فیلترها
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default SidebarBoxes;
