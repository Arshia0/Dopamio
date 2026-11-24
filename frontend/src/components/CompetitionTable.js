import { apiUrl } from "../utils/api";
import React, { useState, useEffect } from "react";
import dopiIcon from "../images/dopi-icon.png";
import accountIcon from "../images/accountIcon.png";

const CompetitionTable = () => {
  const [users, setUsers] = useState([]);
  const [rankFilter, setRankFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserScores();
  }, []);

  const fetchUserScores = async () => {
    try {
      const response = await fetch(apiUrl("/api/users/competition_table/"));
      const data = await response.json();
      console.log("Fetched data:", data);
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching user scores:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedUsers = [...users].sort((a, b) => b.total_score - a.total_score);
  const filteredUsers = rankFilter ? sortedUsers.slice(0, parseInt(rankFilter)) : sortedUsers;

  return (
    <div className="competition-container bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg p-8 text-center font-vazirmatn mt-20 pb-20" dir="rtl">
      <h2 className="text-3xl font-bold mb-6 text-white">جدول رقابت</h2>
      <div className="flex justify-start mb-6">
        <label htmlFor="rankFilter" className="mr-4 text-lg text-gray-300">
          تعداد رتبه‌ها:
        </label>
        <select
          id="rankFilter"
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
          className="p-2 border rounded-md text-gray-900 w-28"
        >
          <option value="">همه</option>
          <option value="5">۵ رتبه برتر</option>
          <option value="10">۱۰ رتبه برتر</option>
          <option value="15">۱۵ رتبه برتر</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-white">در حال بارگذاری...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-white">هیچ کاربری برای نمایش وجود ندارد.</div>
        ) : (
          <table className="competition-table w-full border-collapse text-gray-300">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4 border-b border-gray-700 text-center">رتبه</th>
                <th className="p-4 border-b border-gray-700 text-center">نام کاربر</th>
                <th className="p-4 border-b border-gray-700 text-center">تعداد دوپی</th>
                <th className="p-4 border-b border-gray-700 text-center">تعداد روزها در برنامه</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`group ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  } hover:bg-orange-500 transition-colors`}
                >
                  <td className="p-4 border-b border-gray-700 text-center text-sm">
                    {index + 1}
                  </td>
                  <td className="p-4 border-b border-gray-700 text-center flex items-center justify-center">
                    <img
                      src={accountIcon}
                      alt="Account Icon"
                      className="w-5 h-5 ml-2 inline-block group-hover:animate-bounce transition-transform"
                    />
                    <span>{user.first_name} {user.last_name}</span>
                  </td>
                  <td className="p-4 border-b border-gray-700 text-center">
                    <div className="flex items-center justify-center">
                      <span>{user.total_score}</span>
                      <img src={dopiIcon} alt="Dopi Icon" className="w-5 h-5 ml-2 inline-block" />
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-700 text-center">
                    {user.days_in_program} روز در دوپامیو
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CompetitionTable;
