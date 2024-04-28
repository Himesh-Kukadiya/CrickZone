import { useEffect, useState } from 'react'
import '../../assets/css/MainSection.css'
import axios from 'axios'
import BookingDetailsTable from '../BookingDetails/BookingDetailsTable'

const MainSection = () => {
    const [counter, setCounter] = useState({"User": 0, "BoxKeeper": 0, "Boxes": 0, "Booking":0})
    
    useEffect(() => {
        axios.get("http://localhost:2020/getCounter")
            .then(response => {
                const totals = response.data;
                setCounter(totals)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold" style={{display: 'inline-block'}}>DASHBOARD</p>
            </div>

            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL&ensp;USERS</p>
                        <span className="material-icons-outlined text-blue">people_outline</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.User}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL BOX KEEPERS</p>
                        <span className="material-icons-outlined text-orange">person</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.BoxKeeper}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL BOXES</p>
                        <span className="material-icons-outlined text-green">check_box_outline_blank</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.Boxes}</span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL BOOKINGS</p>
                        <span className="material-icons-outlined text-red">event_note</span>
                    </div>
                    <span className="text-primary font-weight-bold">{counter.Booking}</span>
                </div>
            </div>

			<BookingDetailsTable maxHeight={320} />
        </main>
    )
}

export default MainSection


