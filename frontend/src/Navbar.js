import { apiUrl } from "./utils/api";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import dopiIcon from "../images/dopi-icon.png";
import homeIcon from "../images/homeIcon.png";
import competitionIcon from "../images/competitionIcon.png";
import dopamioboxesIcon from "../images/dopamioboxesIcon.png";
import accountIcon from "../images/accountIcon.png";
import loginIcon from "../images/loginIcon.png";
import listIcon from "../images/listIcon.svg";
import testIcon from "../images/testIcon.png";
import weeklyScheduleIcon from "../images/WeeklyscheduleIcon.png";
import medicineIcon from "../images/MedicineIcon.png";
import playlistIcon from "../images/MedicineIcon.png";

const Navbar = () => {
  const { user, logoutUser, authFetch } = useContext(AuthContext); // استفاده از authFetch به جای مستقیم استفاده از fetch
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);

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

  const togglePlaylistMenu = () => {
    setPlaylistMenuOpen(!playlistMenuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const iconClassNames = "w-5 h-5 transition duration-300 transform hover:scale-110";

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-3">
        <div className="flex items-center space-x-4">
          {user ? (
            <Link
              to="/"
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-vazirmatn font-bold rounded-full"
            >
              خروج
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-vazirmatn font-bold rounded-full"
            >
              <img src={loginIcon} alt="Login Icon" className={`${iconClassNames} mr-2`} />
              ورود
            </Link>
          )}
        </div>
        <ul className="flex space-x-8 font-vazirmatn">
          <li className="flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              }`}
            >
              <img
                src={homeIcon}
                alt="Home Icon"
                className={`${iconClassNames} ${
                  location.pathname === "/" ? "animate-bounce" : "hover:animate-spin"
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
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              }`}
            >
              <img
                src={competitionIcon}
                alt="Competition Icon"
                className={`${iconClassNames} ${
                  location.pathname === "/competition-table" ? "animate-bounce" : "hover:animate-spin"
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
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              }`}
            >
              <img
                src={dopamioboxesIcon}
                alt="Dopamio Boxes Icon"
                className={`${iconClassNames} ${
                  location.pathname === "/dopamio-boxes" ? "animate-bounce" : "hover:animate-spin"
                }`}
              />
              <span>زنگ‌های دوپامیو</span>
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleMenu}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                menuOpen
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              }`}
            >
              <span>لیست دوپامیو</span>
              <img src={listIcon} alt="Menu Icon" className={`${iconClassNames} ml-2`} />
            </button>
            {menuOpen && (
              <ul className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 mt-2 w-48 text-right z-40">
                <li>
                  <Link
                    to="/dopamio-boxes"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/dopamio-boxes"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>زنگ‌های دوپامیو</span>
                    <img
                      src={dopamioboxesIcon}
                      alt="Dopamio Boxes Icon"
                      className={iconClassNames}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/competition-table"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/competition-table"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>جدول رقابت</span>
                    <img
                      src={competitionIcon}
                      alt="Competition Icon"
                      className={iconClassNames}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/psychology-test"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/psychology-test"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>تست روانشناسی</span>
                    <img
                      src={testIcon}
                      alt="Test Icon"
                      className={iconClassNames}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/weekly-schedule"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/weekly-schedule"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>برنامه هفتگی</span>
                    <img
                      src={weeklyScheduleIcon}
                      alt="Weekly Schedule Icon"
                      className={iconClassNames}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/medicines"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/medicines"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>داروها</span>
                    <img
                      src={medicineIcon}
                      alt="Medicine Icon"
                      className={iconClassNames}
                    />
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button
              onClick={togglePlaylistMenu}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                playlistMenuOpen
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white"
              }`}
            >
              <span>پلی‌لیست</span>
              <img src={playlistIcon} alt="Playlist Icon" className={`${iconClassNames} ml-2`} />
            </button>
            {playlistMenuOpen && (
              <ul className="absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 mt-2 w-48 text-right z-40">
                <li>
                <Link
                    to="/playlist-music"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/playlist-1"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>پلی‌لیست موسیقی</span>
                  </Link>
                  <Link
                    to="/playlist-movies"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/playlist-1"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>پلی‌لیست فیلم</span>
                  </Link>
                  <Link
                    to="/playlist-books"
                    className={`flex items-center justify-between px-4 py-2 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ${
                      location.pathname === "/playlist-1"
                        ? "bg-gray-100 text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    <span>پلی‌لیست کتاب</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        {user && (
          <div className="text-gray-700">
            <span className="font-bold">امتیاز شما: {score}</span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
