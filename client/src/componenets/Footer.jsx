import { Link } from "react-router-dom";
import footerImg from '/footer-image.jpg';

const Footer = () => {
  return (
    <div className="bg-red-950 text-white font-text1 font-medium w-full pt-10 lg:pt-20 px-5 lg:px-48 md:space-y-3">

      <div className="grid grid-cols-[1fr] md:grid-cols-[1fr_0.5fr_0.75fr_0.75fr] lg:gap-10 gap-y-8 text-center md:text-left pb-10 md:pb-14 border-b border-gray-500">
        
        <div className="md:px-5">
          <h1 className="text-lg lg:text-2xl font-title font-bold mb-2 md:mb-5">Asian Delight</h1>
          <p className="text-xs lg:text-md text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div className="font-bold text-gray-300 text-xs md:text-sm lg:text-md">
          <ul className="space-y-1 md:space-y-3">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <a href="#">BLOG</a>
            </li>
            <li>
              <Link to="/menu">MENU</Link>
            </li>
            <li>
              <a href="#contact">CONTACT</a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-xs md:text-sm lg:text-md">
          <h2 className="font-bold text-xs lg:text-sm text-gray-400 mb-1">RESTAURANT TIMINGS</h2>
          <div className="font-semibold">
            <p>Monday - Friday</p>
            <p>10:00am - 9:00pm</p>
          </div>
          <div className="font-semibold">
            <p>Saturday - Sunday</p>
            <p>10:00am - 11:00pm</p>
          </div>

        </div>

        <div className="">
          <img
            src={footerImg}
            alt="Picture of Thai green curry dish"
            className="h-32 md:h-28 lg:h-36 mx-auto md:ml-0"
          />
        </div>

      </div>

      <p className="text-xs text-gray-400 text-center pb-3">© 2021. Asian Delight. All rights reserved.</p>

    </div>
  );
};
export default Footer;