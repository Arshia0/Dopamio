// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ menuOpen, toggleMenu, user, handleLogout }) => {
//   return (
//     <div
//       className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ${
//         menuOpen ? "translate-x-0" : "translate-x-full"
//       } z-50`}
//     >
//       <div className="p-4">
//         <button
//           onClick={toggleMenu}
//           className="text-gray-600 hover:text-gray-800"
//         >
//           بستن
//         </button>
//         <ul className="mt-6 space-y-4">
//           <li>
//             <Link
//               to="/dopamio-boxes"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               زنگ‌های دوپامیو
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/competition-table"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               جدول رقابت
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/psychology-test"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               تست روانشناسی
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/medicines"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               داروها
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/playlist-music"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               پلی‌لیست موسیقی
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/playlist-movies"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               پلی‌لیست فیلم
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/playlist-books"
//               className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//             >
//               پلی‌لیست کتاب
//             </Link>
//           </li>
//           {/* گزینه‌های ورود و خروج */}
//           {user ? (
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left block px-4 py-2 hover:bg-gray-200 rounded-md"
//               >
//                 خروج
//               </button>
//             </li>
//           ) : (
//             <li>
//               <Link
//                 to="/login"
//                 className="block px-4 py-2 hover:bg-gray-200 rounded-md"
//               >
//                 ورود
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ menuOpen, toggleMenu, user, handleLogout }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      } z-50 rtl text-right font-vazirmatn`}
    >
      <div className="p-4">
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-800"
        >
          بستن
        </button>
        <ul className="mt-6 space-y-4">
          <li>
            <Link
              to="/dopamio-boxes"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              زنگ‌های دوپامیو
            </Link>
          </li>
          <li>
            <Link
              to="/competition-table"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              جدول رقابت
            </Link>
          </li>
          <li>
            <Link
              to="/weekly-schedule"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              برنامه هفتگی
            </Link>
          </li>
          <li>
            <Link
              to="/medicines"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              داروها
            </Link>
          </li>
          <li>
            <Link
              to="/playlist-music"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              پلی‌لیست موسیقی
            </Link>
          </li>
          <li>
            <Link
              to="/playlist-movies"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              پلی‌لیست فیلم
            </Link>
          </li>
          <li>
            <Link
              to="/playlist-books"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              پلی‌لیست کتاب
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="block px-4 py-2 hover:bg-gray-200 rounded-md"
            >
              اکانت من
            </Link>
          </li>
          {/* گزینه‌های ورود و خروج */}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 hover:bg-gray-200 rounded-md"
              >
                خروج
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-200 rounded-md"
              >
                ورود
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
