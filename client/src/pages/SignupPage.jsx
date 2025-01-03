import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEyeSlash, FaEye } from "react-icons/fa";
import img from "../assets/signup/image.png";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signup, setSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignupChange = () => {
    setSignup(prevState => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSignup = async (e) => {
    pass;
  };

  const handleEmailLogin = async (e) => {
    pass;
  };

  return (
    <section className="font-text1 flex flex-wrap justify-center items-center gap-20 lg:gap-28 my-20">

      <div className="space-y-5">
        <h1 className='text-xl md:text-4xl mb-5 font-bold text-center lg:text-left'>{signup ? 'Signup' : 'Signin'}</h1>

        <div className='w-fit space-y-2 md:space-y-3 mx-auto'>

          <div className='text-xs md:text-lg font-medium flex flex-col gap-5'>
            <button className='border p-2 rounded hover:bg-gray-200'>
              <FcGoogle className='h-3 md:h-5 inline mb-1' />
              <span className='ml-1'>Continue with Google</span>
            </button>
            <button className='border p-2 rounded hover:bg-gray-200'>
              <FaApple className='h-3 md:h-5 inline mb-1' />
              <span className='ml-1'>Continue with Apple</span>
            </button>
          </div>

          <hr />

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
                {signup ? 'Sign up with Email' : 'Login'}
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

      <img src={img} alt="A bowl with a dish." className="h-[500px]"/>

    </section>
  );
};

export default SignupPage;