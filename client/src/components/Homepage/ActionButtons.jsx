import { Link } from "react-router-dom";
import img from "../../assets/actionButton/image21.png";

const ActionButtons = () => {
  return (
    <div className="py-40">
      <div className="relative font-text1">
        
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${img})`,
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="relative bg-black bg-opacity-50 text-white flex flex-wrap justify-center md:justify-between text-center md:text-left px-6 lg:px-56 py-16">
          <p className="text-2xl lg:text-3xl font-bold md:w-1/2">
            Experience the finest cuisine and ambiance.
          </p>
          <Link
            to="/menu"
            className="bg-[#7ee13c] text-black h-fit font-bold px-6 py-3 hover:scale-105 transition-transform mt-5"
          >
            Explore Our Menu
          </Link>
        </div>

      </div>
    </div>

  );
};

export default ActionButtons;