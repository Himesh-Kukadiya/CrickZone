
import ForgetPassword from './Component/ForgetPassword'
import BookingDetails from './Pages/Booking/BookingDetails'
import BoxDetails from './Pages/BoxDetails'
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
          <Route path="/booking" element={ <BookingDetails /> } />
          <Route path="/boxDetails" element={ <BoxDetails /> } />
          <Route path="/forgetPassword" element={ <ForgetPassword /> } />
          {/* <Route path="/boxList" element={  } /> */}
          {/* <Route path="http://localhost:2020/paymentVarification" element={ <BookingDetails /> } /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
