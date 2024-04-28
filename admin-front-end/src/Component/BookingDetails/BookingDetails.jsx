import '../../assets/css/MainSection.css'
import BookingDetailsTable from './BookingDetailsTable'

const BoxBookingDetail = () => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold">Bookings List</p>
            </div>
            <BookingDetailsTable maxHeight={500} />
        </main>
    )
}

export default BoxBookingDetail