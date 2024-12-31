import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
const Contact = () => {
  return (
    <>
      <div className="border-t font-text1 space-y-10 px-8 md:px-24 lg:px-40 py-20">
        <h1 className="text-4xl font-bold">We look forward to serving you.</h1>

        <div className="flex flex-wrap justify-between gap-y-5 h-fit">
          <div className="h-[250px] lg:h-[450px] w-full lg:w-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241550.06665853332!2d72.52833219453126!3d18.921663100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06fffffff%3A0xc0290485a4d73f57!2sThe%20Taj%20Mahal%20Palace%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1735553688109!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col w-full lg:w-2/5 lg:h-[420px] justify-between ">
            <div className="flex justify-between border-b-2 border-maroon py-5">
              <h2 className="text-lg font-semibold">Opening Timings</h2>
              <div className="text-right">
                <p>Lunch: 12PM - 2.30PM</p>
                <p>Dinner: 7PM - 1AM</p>
              </div>
            </div>
            <div className="flex justify-between border-b-2 border-maroon py-5">
              <h2 className="text-lg font-semibold">Address</h2>
              <div className="text-right">
                <p>Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India</p>
              </div>
            </div>
            <div className="flex justify-between border-b-2 border-maroon py-5">
              <h2 className="text-lg font-semibold">Email</h2>
              <div className="text-right">
                <p>asiandelight@gmail.com</p>
              </div>
            </div>
            <div className="flex justify-between border-b-2 border-maroon py-5">
              <h2 className="text-lg font-semibold">Contact Phone</h2>
              <div className="text-right">
                <p>+91 xxxxxxxxx</p>
              </div>
            </div>
            <div className="flex justify-between border-b-2 border-maroon py-5">
              <h2 className="text-lg font-semibold">Opening Timings</h2>
              <div className="flex gap-5">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaXTwitter />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </>
  );
};
export default Contact;