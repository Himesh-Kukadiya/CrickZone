import { useEffect, useState } from 'react'
import '../../assets/css/MainSection.css'
import axios from 'axios'
import BookingDetailsTable from '../BookingDetails/BookingDetailsTable'
import PropType from 'prop-types'

const MainSection = (props) => {
    const [counter, setCounter] = useState({})
    
    useEffect(() => {
        axios.post("http://localhost:2020/getBKCounter", { BK_id: props.BK_id })
            .then(response => {
                const totals = response.data;
                setCounter(totals);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold"><strong>DASHBOARD</strong></p>
            </div>

            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL&ensp;BOXES</p>
                        <span className="material-icons-outlined text-blue">check_box_outline_blank </span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.Boxes}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL BOOKINGS</p>
                        <span className="material-icons-outlined text-orange">event_note</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.Bookings}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL REVENUE</p>
                        <span className="material-icons-outlined text-green">local_atm</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.Revenue}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL OFFERS</p>
                        <span className="material-icons-outlined text-red">event_note</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.Offers}</span>
                </div>
            </div>

			<BookingDetailsTable maxHeight={320} BK_id={props.BK_id} />
        </main>
    )
}

MainSection.propTypes = {
    BK_id: PropType.string
}
export default MainSection


