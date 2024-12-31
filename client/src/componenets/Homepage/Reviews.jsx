import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa6";

const Reviews = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 3 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleManualNavigation = (slide) => {
    setActiveSlide(slide);
  };

  const isActiveButton = (slide) =>
    activeSlide === slide ? "text-gray-200 text-xs md:text-md" : "text-gray-800 text-xs md:text-md";

  return (
    <div className="bg-red-900 text-white font-text1 py-20 text-center space-y-10">
      <h2 className="text-4xl font-bold text-center">What Our Customers Say</h2>
      <div className="carousel w-full max-w-lg mx-auto px-2 md:px-0">
        
        <div
          className={`carousel-item w-full flex flex-col items-center text-center space-y-8 ${
            activeSlide === 1 ? "block" : "hidden"
          }`}
        >
          <p className="text-lg italic">
            "The food here is absolutely amazing! I can't wait to come back."
          </p>
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="Customer 1"
            className="size-16 md:size-20 rounded-full"
          />
          <h3 className="text-xl font-medium">John Doe</h3>
        </div>

        <div
          className={`carousel-item w-full flex flex-col items-center text-center space-y-8 ${
            activeSlide === 2 ? "block" : "hidden"
          }`}
        >
          <p className="text-lg italic">
            "Exceptional service and delicious dishes. Highly recommend!"
          </p>
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="Customer 2"
            className="size-16 md:size-20 rounded-full"
          />
          <h3 className="text-xl font-medium">Jane Smith</h3>
        </div>

        <div
          className={`carousel-item w-full flex flex-col items-center text-center space-y-8 ${
            activeSlide === 3 ? "block" : "hidden"
          }`}
        >
          <p className="text-lg italic">
            "A wonderful dining experience. The flavors are out of this world."
          </p>
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="Customer 3"
            className="size-16 md:size-20 rounded-full"
          />
          <h3 className="text-xl font-medium">Emily Brown</h3>
        </div>

      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleManualNavigation(1)}
          className={isActiveButton(1)}
        >
          <FaCircle />
        </button>
        <button
          onClick={() => handleManualNavigation(2)}
          className={isActiveButton(2)}
        >
          <FaCircle />
        </button>
        <button
          onClick={() => handleManualNavigation(3)}
          className={isActiveButton(3)}
        >
          <FaCircle />
        </button>
      </div>

    </div>
  );
};

export default Reviews;