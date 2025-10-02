import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import img from "../assets/signup/image.png";
import imgBlur from "../assets/signup/image-blur.webp";
import AuthContext from "../context/Auth/AuthContext";
import { toast } from "react-toastify";

const SignupPage = () => {
  const { signUp, login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();

  const handleSignupChange = () => {
    setSignup(prevState => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(formData);
      toast.success("Sign up success!");
      return navigate("/");
    } catch (error) {
      toast.error("Error Signing Up!");
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData);
      toast.success("Login success!");
      return navigate("/");
    } catch (error) {
      toast.error("Error Logging In!");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="font-text1 flex flex-wrap justify-center items-center gap-20 lg:gap-28 my-20">

      <div className="space-y-5">
        <h1 className='text-xl md:text-4xl mb-5 font-bold text-center lg:text-left'>{signup ? 'Signup' : 'Signin'}</h1>

        <div className='w-fit space-y-2 md:space-y-3 mx-auto'>

          <form onSubmit={signup ? handleEmailSignup : handleEmailLogin}>
            <div className='flex flex-col gap-3 text-xs md:text-lg'>
              {signup && <input type="text" name="name" id="name" className='bg-white py-1 px-3 rounded border' placeholder='Name' value={formData.name} onChange={handleChange} />}

              <input type="email" name="email" id="email" className='bg-white py-1 px-3 rounded border' placeholder='email@email.com' value={formData.email} onChange={handleChange} />

              <div className="flex border rounded">
                <input type={showPassword ? "text" : "password"} name="password" id="password" className="bg-white py-1 px-3 w-full" placeholder='password' value={formData.password} onChange={handleChange} />
                <button type="button" className='mx-2' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <button
                type="submit"
                className="p-2 rounded hover:bg-green-700 bg-green-500 text-white font-bold"
              >
                {loading ? 'Please wait...' : signup ? 'Sign up with Email' : 'Login'}
              </button>
            </div>
          </form>

        </div>

        <div className='flex mt-5 text-gray-500 gap-2 text-xs md:text-sm justify-center lg:justify-normal'>
          <p>{signup ? "Already have an account?" : "Don't have an account?"} </p>
          <button type="button" className='underline' onClick={handleSignupChange}>
            {signup ? 'Sign in' : 'Signup'}
          </button>
        </div>

      </div>

      <div className="relative h-[500px] w-[350px] sm:w-[400px] md:w-[500px] overflow-hidden">
        {/* Blur placeholder */}
        <img
          src={imgBlur}
          alt="blur placeholder"
          className={`w-full h-full object-cover transition-opacity duration-500 blur-xl scale-110 ${imageLoaded ? "opacity-0" : "opacity-100"
            }`}
        />

        {/* Actual image */}
        <img
          src={img}
          alt="A bowl with a dish."
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>

    </section>
  );
};

export default SignupPage;