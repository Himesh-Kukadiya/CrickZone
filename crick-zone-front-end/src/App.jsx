
// import { NavBar } from './Component/HomeComponent/NavBar'
import BookingDetails from './Pages/Booking/BookingDetails'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          <>
            <HomePage />
          </>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={ <h1> main Home Page</h1> } />
          <Route path="/booking" element={ <BookingDetails /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
