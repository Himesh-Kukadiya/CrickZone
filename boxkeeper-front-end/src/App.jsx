
import ApplicationList from "./Component/Applications/ApplicationList"
import BoxBookingDetail from "./Component/BookingDetails/BookingDetails"
import BoxDetail from "./Component/BoxDetails/BoxDetail"
import ChartSection from "./Component/Charts/ChartSection"
import MainSection from "./Component/Dashboard/MainSection"
import NavBar from "./Component/NavBar"
import UsersDetails from "./Component/UserDetails/UsersDetails"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/MainSection.css'
import Profile from "./Component/Login/Profile"
import LoginPage from "./Component/Login/LoginPage"
import SignupPage from "./Component/Login/SignupPage"

const bk = JSON.parse(localStorage.getItem('boxKeeperData'))
const BK_id = bk != null && bk != undefined && bk != "" ? bk._id : "";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <LoginPage />
            </>
          } />
          <Route path="/signup" element={
            <>
              <SignupPage />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <MainSection BK_id={BK_id} />
              </div>
            </>
          } />
          <Route path="/applications" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <ApplicationList BK_id={BK_id} />
              </div>
            </>
          } />
          <Route path="/users" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <UsersDetails BK_id={BK_id} />
              </div>
            </>
          } />
          <Route path="/boxes" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <BoxDetail BK_id={BK_id} />
              </div>
            </>
          } />
          <Route path="/bookings" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <BoxBookingDetail BK_id={BK_id} />
              </div>
            </>
          } />
          <Route path="/charts" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <ChartSection BK_id={BK_id} />
              </div>
            </>
          } />
          <Route path="/profile" element={
            <>
              <div className="wrapper grid-container">
                <NavBar BK_id={BK_id} />
                <Profile BK_id={BK_id} />
              </div>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
