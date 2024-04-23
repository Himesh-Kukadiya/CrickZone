
import modalImage from '../../assets/images/homeBody3.jpg'
const Modal = () => {
    return (
        <>
            <div className="modal fade" id="reservationModal" tabIndex="-1" role="dialog" aria-labelledby="reservationModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-4 bg-image" style={{ backgroundImage: `url(${modalImage})` }}></div>
                                <div className="col-lg-8 p-5">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <small>CLOSE </small><span aria-hidden="true">&times;</span>
                                    </button>
                                    <h1 className="mb-4">Reserve A Table</h1>
                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="m_fname">First Name</label>
                                                <input type="text" className="form-control" id="m_fname" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="m_lname">Last Name</label>
                                                <input type="text" className="form-control" id="m_lname" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="m_email">Email</label>
                                                <input type="email" className="form-control" id="m_email" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="m_people">How Many People</label>
                                                <select name="" id="m_people" className="form-control">
                                                    <option value="1">1 People</option>
                                                    <option value="2">2 People</option>
                                                    <option value="3">3 People</option>
                                                    <option value="4+">4+ People</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="m_phone">Phone</label>
                                                <input type="text" className="form-control" id="m_phone" />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="m_date">Date</label>
                                                <input type="text" className="form-control" id="m_date" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="m_time">Time</label>
                                                <input type="text" className="form-control" id="m_time" />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label htmlFor="m_message">Message</label>
                                                <textarea className="form-control" id="m_message" cols="30" rows="7"></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <input type="submit" className="btn btn-primary btn-lg btn-block" value="Reserve Now" />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal