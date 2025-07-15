import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBasketShopping } from 'react-icons/fa6';
import BlurImage from "./BlurImage";
import slide1 from '../../assets/heroSlides/slide1.jpg';
import slide2 from '../../assets/heroSlides/slide2.jpg';
import slide3 from '../../assets/heroSlides/slide3.jpg';
import blur1 from "../../assets/heroSlides/slide1-blur.webp";
import blur2 from "../../assets/heroSlides/slide2-blur.webp";
import blur3 from "../../assets/heroSlides/slide3-blur.webp";

const Hero = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % 3) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <div className="relative w-full h-screen font-text1 bg-gradient-to-br from-yellow-400 to-yellow-100">

      <div className="carousel w-full h-full">

        <div id="slide1" className={`carousel-item absolute w-full h-full ${currentSlide === 1 ? "opacity-100" : "opacity-0"}`}>
          <BlurImage src={slide1} blurSrc={blur1} alt="Slide 1" />
        </div>

        <div id="slide2" className={`carousel-item absolute w-full h-full ${currentSlide === 2 ? "opacity-100" : "opacity-0"}`}>
          <BlurImage src={slide2} blurSrc={blur2} alt="Slide 2" />
        </div>

        <div id="slide3" className={`carousel-item absolute w-full h-full ${currentSlide === 3 ? "opacity-100" : "opacity-0"}`}>
          <BlurImage src={slide3} blurSrc={blur3} alt="Slide 3" />
        </div>
      </div>

      <button
        onClick={() =>
          handleSlideChange(currentSlide === 1 ? 3 : currentSlide - 1)
        }
        className="absolute left-0 md:left-4 top-1/2 btn btn-circle z-10"
      >
        ❮
      </button>
      <button
        onClick={() =>
          handleSlideChange(currentSlide === 3 ? 1 : currentSlide + 1)
        }
        className="absolute right-0 md:right-4 top-1/2 btn btn-circle z-10"
      >
        ❯
      </button>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-5 bg-black bg-opacity-70">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-lg">
          Welcome to Asian Delight
        </h1>
        <p className="text-md md:text-xl text-gray-100 font-extrabold mb-10 rounded px-3 py-1 shadow">
          Experience the taste of authentic Asian cuisine.
        </p>
        <div className="flex flex-col md:flex-row gap-7 md:text-xl font-bold min-w-48">
          <Link
            to="/menu"
            className="flex justify-center items-center gap-3 bg-maroon hover:bg-red-600 hover:scale-110 text-white md:w-56 py-2"
          >
            <span>Order Online</span>
            <span><FaBasketShopping /></span>
          </Link>
          {!user &&
            <Link
              to="/signup"
              className="bg-gray-200 border-maroon border-2 text-maroon hover:bg-white hover:text-maroon hover:scale-110 md:w-56 py-2"
            >
              Create Account
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Hero;