const ContactSection = () => {
    return (
        <>
            <section className="ftco-section bg-light" id="section-contact" style={{marginBottom: -500}}>
                <div className="container">
                    <div className="row">

                        <div className="col-md-12 text-center mb-5 ftco-animate">
                            <h2 className="display-4">Contact Us</h2>
                            <div className="row justify-content-center">
                                <div className="col-md-7">
                                    <p className="lead">Step into the cricketing realm, where every box holds the promise of exhilarating matches. Join us in the heart of the action today!</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md mb-5 ftco-animate">
                            <form action="" method="post">
                                <div className="form-group">
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="text" className="form-control" id="email" placeholder="Enter your email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea name="message" id="message" cols="30" rows="10" className="form-control" placeholder="Write your message"></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary btn-lg" value="Send Message" />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
            <div id="map"></div>
        </>
    )
}

export default ContactSection