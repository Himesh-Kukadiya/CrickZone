import '../../assets/css/MainSection.css'
import BookingDetailsTable from './BookingDetailsTable'
import PropTypes from 'prop-types';

const BoxBookingDetail = (props) => {
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold"><strong>Bookings List</strong></p>
            </div>
            <BookingDetailsTable maxHeight={500} BK_id={props.BK_id} />
        </main>
    )
}

BoxBookingDetail.propTypes = {
    BK_id: PropTypes.string
};
export default BoxBookingDetail