import { apiUrl } from "../utils/api";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ScheduleTask from "./ScheduleTask";
import axios from "axios";
import scheduleBg from "../images/schedule-bg.webp";

moment.locale("fa");
const localizer = momentLocalizer(moment);

const WeeklySchedule = () => {
  const [events, setEvents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchScheduledBells = async (startOfWeek, endOfWeek) => {
    try {
      const response = await axios.get(
        apiUrl(`/api/users/weekly-schedule/?start_date=${startOfWeek}&end_date=${endOfWeek}`)
      );
      const bells = response.data.map((bell) => {
        const eventDate = new Date(bell.date);
        const clock = bell.clock || "00:00:00";
        const [hours, minutes, seconds] = clock.split(":");
        eventDate.setHours(hours, minutes, seconds);
        return {
          id: bell.id,
          title: bell.bell.name,
          start: new Date(eventDate),
          end: new Date(eventDate),
          bell: bell.bell,
          experience: bell.experience,
          time: bell.time,
          reminder: bell.reminder,
          allDay: false,
        };
      });
      setEvents(bells);
    } catch (error) {
      console.error("Error fetching scheduled bells:", error);
    }
  };

  useEffect(() => {
    const startOfWeek = moment(currentDate).startOf("week").format("YYYY-MM-DD");
    const endOfWeek = moment(currentDate).endOf("week").format("YYYY-MM-DD");
    fetchScheduledBells(startOfWeek, endOfWeek);
  }, [currentDate]);

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedEvent({
      title: "یادآور جدید",
      start: slotInfo.start,
      end: slotInfo.end,
      bell: null,
      experience: "",
      time: slotInfo.start.toISOString().split("T")[1].substring(0, 5),
      reminder: false,
    });
    setPopupOpen(true);
  };

  const handleSelectEvent = async (event) => {
    try {
      const response = await axios.get(
        apiUrl(`/api/users/schedule-task/${event.id}/`)
      );
      setSelectedEvent(response.data);
      setPopupOpen(true);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedEvent(null);
  };

  // تابع برای به‌روزرسانی لیست رویدادها
  const updateEventList = () => {
    const startOfWeek = moment(currentDate).startOf("week").format("YYYY-MM-DD");
    const endOfWeek = moment(currentDate).endOf("week").format("YYYY-MM-DD");
    fetchScheduledBells(startOfWeek, endOfWeek);
  };

  return (
    <div className="min-h-screen py-10 px-4 text-right font-vazirmatn" dir="rtl">
      <div className="relative w-full h-80 rounded-xl mb-10 overflow-hidden"> {/* تغییر ارتفاع */}
        <img
          src={scheduleBg} // استفاده از تصویر وارد شده
          alt="تصویر برنامه هفتگی"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onNavigate={handleNavigate}
          style={{ height: 500 }}
          className="calendar-custom"
          messages={{
            week: "هفته",
            day: "روز",
            month: "ماه",
            previous: "قبلی",
            next: "بعدی",
            today: "امروز",
            agenda: "برنامه",
          }}
        />
      </div>

      {popupOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <ScheduleTask bell={selectedEvent} updateEventList={updateEventList} />
            <button
              onClick={closePopup}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-vazirmatn"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;
