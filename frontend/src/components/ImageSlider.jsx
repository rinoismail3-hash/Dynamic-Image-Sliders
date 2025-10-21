import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ refresh, showToast }) => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/images");
      setImages(res.data);
    } catch (err) {
      showToast("error", "Failed to load images!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/images/${id}`);
      showToast("success", res.data.message);
      fetchImages();
    } catch (err) {
      showToast("error", "Delete failed!");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refresh]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    // responsive behavior for react-slick
    responsive: [
      {
        breakpoint: 1200, // large laptops
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 900, // tablets
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-section">
      <h2>Image Gallery</h2>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((img) => (
            <div key={img._id} className="image-container">
              <button className="delete-btn" onClick={() => handleDelete(img._id)}>✖</button>
              <img src={`http://localhost:5000/uploads/${img.filename}`} alt="Uploaded" />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default ImageSlider;
