import "./index.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import DopamioBoxes from "./components/DopamioBoxes";
import ScheduleTask from "./components/ScheduleTask";
import Account from "./components/Account";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import SendSMSResetPassword from './components/SendSMSResetPassword';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import CompetitionTable from "./components/CompetitionTable";
import BellDetail from "./components/BellDetail";
import StopWatch from "./components/StopWatch";
import PsychologyTest from "./components/PsychologyTest";
import Medicines from "./components/Medicines";
import WeeklySchedule from "./components/WeeklySchedule";
import SidebarBoxes from "./components/SidebarBoxes";
import Test from "./components/Test";
import AboutUs from "./components/AboutUs";
import PlaylistMusic from "./components/PlaylistMusic";
import CategoryView from "./components/CategoryView";
import PlaylistMovies from "./components/PlaylistMovies";
import PlaylistBooks from "./components/PlaylistBooks";

function App() {
  return (
    <div id="app-root">
      <Router>
        <AuthProvider>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/sms-reset" element={<SendSMSResetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>}/>
              <Route path="/dopamio-boxes" element={<DopamioBoxes />} />
              <Route path="/competition-table" element={<CompetitionTable />} />
              <Route path="/schedule-task" element={<ScheduleTask />} />
              <Route path="/stopwatch" element={<StopWatch />} />
              <Route path="/bell/:id" element={<BellDetail />} />
              <Route path="/psychology-test" element={<PsychologyTest />} />
              <Route path="/weekly-schedule" element={<WeeklySchedule />} />
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/select-box" element={<SidebarBoxes />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/playlist-music" element={<PlaylistMusic />} />
              <Route path="/category/:categoryName" element={<CategoryView />} />
              <Route path="/playlist-movies" element={<PlaylistMovies />} />
              <Route path="/playlist-books" element={<PlaylistBooks />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
