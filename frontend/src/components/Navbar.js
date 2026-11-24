import { apiUrl } from "../utils/api";
import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import dopiIcon from "../images/dopi-icon.png";
import homeIcon from "../images/homeIcon.png";
import competitionIcon from "../images/competitionIcon.png";
import dopamioboxesIcon from "../images/dopamioboxesIcon.png";
import listIcon from "../images/listIcon.svg";
import weeklyScheduleIcon from "../images/WeeklyscheduleIcon.png";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user, logoutUser, authFetch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchScore();
    }
  }, [user]);

  const fetchScore = async () => {
    try {
      const response = await authFetch(apiUrl("/"));
      if (response.status === 200) {
        const data = await response.json();
        setScore(data.user.total_score || 0);
      } else if (response.status === 401) {
        logoutUser();
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const iconClassNames =
    "w-5 h-5 transition duration-300 transform hover:scale-110";

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white bg-opacity-50">
        <nav className="container mx-auto flex justify-between items-center py-3">
          {/* لوگو */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src={dopiIcon} alt="Dopamio Logo" className="w-10 h-10" />
              <span
                className="ml-2 font-bold text-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, #07B1FF 0%, #000000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Dopamio
              </span>
            </Link>
          </div>

          {/* لینک‌های وسط نوبار */}
          <ul className="flex space-x-8 font-vazirmatn justify-center">
            <li className="flex items-center space-x-2">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                  location.pathname === "/"
                    ? "text-black"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                <img
                  src={homeIcon}
                  alt="Home Icon"
                  className={`${iconClassNames} ${
                    location.pathname === "/"
                      ? "animate-bounce"
                      : "hover:animate-spin"
                  }`}
                />
                <span>صفحه اصلی</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Link
                to="/competition-table"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                  location.pathname === "/competition-table"
                    ? "text-black"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                <img
                  src={competitionIcon}
                  alt="Competition Icon"
                  className={`${iconClassNames} ${
                    location.pathname === "/competition-table"
                      ? "animate-bounce"
                      : "hover:animate-spin"
                  }`}
                />
                <span>جدول رقابت</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Link
                to="/dopamio-boxes"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                  location.pathname === "/dopamio-boxes"
                    ? "text-black"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                <img
                  src={dopamioboxesIcon}
                  alt="Dopamio Boxes Icon"
                  className={`${iconClassNames} ${
                    location.pathname === "/dopamio-boxes"
                      ? "animate-bounce"
                      : "hover:animate-spin"
                  }`}
                />
                <span>زنگ‌های دوپامیو</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Link
                to="/weekly-schedule"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                  location.pathname === "/weekly-schedule"
                    ? "text-black"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                <img
                  src={weeklyScheduleIcon}
                  alt="Weekly Schedule Icon"
                  className={`${iconClassNames} ${
                    location.pathname === "/weekly-schedule"
                      ? "animate-bounce"
                      : "hover:animate-spin"
                  }`}
                />
                <span>برنامه هفتگی</span>
              </Link>
            </li>
          </ul>

          {/* آیکون ورود و خروج در چپ */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/"
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-gradient-to-r text-black font-vazirmatn font-bold rounded-full"
              >
                خروج
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-6 py-2 border border-orange-500 rounded-full"
              >
                <span>ورود</span>
              </Link>
            )}
            {/* امتیاز کاربر */}
            {user && (
              <div className="text-gray-700 font-vazirmatn">
                <span>امتیاز شما: {score}</span>
              </div>
            )}
          </div>

          {/* آیکون منو در راست */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 px-4 py-2"
            >
              <img
                src={listIcon}
                alt="Menu Icon"
                className={`${iconClassNames} ml-2`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* استفاده از Sidebar و ارسال props */}
      <Sidebar
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        user={user}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
