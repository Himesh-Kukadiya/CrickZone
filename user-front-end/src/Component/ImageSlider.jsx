// import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import '../Css/CustomCss.Module.css'
import { useState, useEffect } from "react";
import PropsType from 'prop-types'
import axios from "axios";

const ImageSlider = (props) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [images, setImages] = useState()

    useEffect(() => {
        
        async function getImages() {
            const {data: imageUrl} = await axios.post("http://localhost:2020/getGalary", {B_id: props.B_id})
            if(imageUrl) {
                setImages(imageUrl)
            }
        }
        getImages()
        const calculateSliderWidth = () => {
            const availableWidth = window.innerWidth - window.innerWidth / 6;
            
            return { width: availableWidth };
        };

        const handleResize = () => {
            const { width } = calculateSliderWidth();
            setSliderWidth(width);
        };

        // Initial setup
        handleResize();

        // Event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const img = [
        { url: "http://localhost:2020/Images/Boxes/3.jpg" },
        { url: "http://localhost:2020/Images/Boxes/4.jpg" },
        { url: "http://localhost:2020/Images/Boxes/5.webp" },
        { url: "http://localhost:2020/Images/Boxes/7.jpeg" },
        { url: "http://localhost:2020/Images/Boxes/8.jpg" },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <div style={{ marginTop: -20, display: "flex", float: "left" }}>
                        <SimpleImageSlider 
                            style={{ objectFit: "scale-down"}}
                            width={sliderWidth}
                            height={300}
                            images={images ? images : img}
                            showBullets={true}
                            showNavs={true}
                        />
                        {console.log(images)}
                    </div>
                </div>
            </div>
        </div>
    );
};


ImageSlider.propTypes = {
    B_id: PropsType.array.isRequired,
}
export default ImageSlider;
