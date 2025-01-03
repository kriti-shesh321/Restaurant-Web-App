import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import img1 from "../../assets/aboutSection/image.png";
import img2 from "../../assets/aboutSection/image23.png";

const AboutUs = () => {
  return (
    <div className="bg-red-900 text-white flex flex-wrap justify-end lg:justify-between gap-y-10 font-text1 text-center lg:text-left px-10 lg:px-36 py-10">

        <div className="flex flex-col justify-between items-center lg:items-start lg:w-1/2 py-5 lg:py-16">

          <div>
            <h1 className="text-2xl lg:text-5xl font-text1 font-bold mb-5">Excellence in both quality and service</h1>
            <p className="text-sm lg:text-md">Donec condimentum dui ante, sit amet tincidunt ante pellentesque at. Donec sed dui vitae mauris rhoncus porttitor. Praesent metus justo, elementum ut tincidunt ut, sodales in ex. Nam sit amet commodo dolor, vel consequat elit.</p>
          </div>

          <div className="flex w-full justify-around lg:justify-between">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-3">20<span className="text-7xl lg:text-8xl text-green-500 italic">+</span></h1>
              <span>Years of Culinary Excellence</span>
            </div>
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-3">2k<span className="text-7xl lg:text-8xl text-green-500 italic">+</span></h1>
              <span>Thousands of satisfied guests each month.</span>
            </div>
          </div>

          <Link
            to="/menu"
            className="bg-green-500 flex items-center w-fit text-black font-bold transition-transform transform hover:scale-110 hover:bg-green-300 px-5 py-2 lg:p-2 mt-10 lg:mt-5"
          >
            CHECKOUT FULL MENU
            <FaAngleRight className="hidden lg:inline lg:text-2xl" />
          </Link>

        </div>

        <div className="relative h-[350px] md:h-[550px] md:mx-20 lg:mx-0">
          <img
            src={img1}
            alt="A sample dish image"
            className="h-full object-cover opa"
          />
          <img
            src={img2}
            alt="Picture of a person holding a bowl of noodles"
            className="absolute right-[190px] md:right-[300px] top-[20%] md:top-[30%] lg:top-[40%] h-[200px] md:h-[300px]"
          />
        </div>

      </div>
  );
};
export default AboutUs;