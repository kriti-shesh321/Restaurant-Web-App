import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa6";

const Reviews = ({ data }) => {
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
    activeSlide === slide ? "text-cream text-xs md:text-md" : "text-gray-500 text-xs md:text-md";

  if (!data || data.length === 0) { return null; }

  return (
    <div className="bg-red-950 text-white font-text1 py-20 text-center space-y-10">
      <h2 className="text-4xl font-bold text-center">What Our Customers Say</h2>
      <div className="bg-cream text-black carousel w-[90%] md:w-[80%] lg:w-1/2 border rounded-lg py-5">

        {data && data.length > 0 &&
          data.map((review, index) => (
            <div
              key={review.id}
              className={`carousel-item w-full flex flex-col items-center text-center lg:space-y-8 ${activeSlide === index + 1 ? "block" : "hidden"
                }`}
            >
              <p className="text-xl italic">
                {review.comment || "-"}
              </p>
              <p className="text-2xl italic mb-5">
                {"★".repeat(review.rating)}
              </p>
              <img
                src={review.user?.profileImage || "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="}
                alt={review.user.name || "Customer"}
                loading="lazy"
                className="size-16 md:size-20 rounded-full"
              />
              <h3 className="text-xl font-medium">{review.user.name}</h3>
            </div>
          )
          )}

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