import { useEffect } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const Register = () => {
  const navigate = useNavigate ();
  const { register,
          handleSubmit,
          formState: { errors } 
        } = useForm();

  const submitCall = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", data);
      if (response.status == 201){
        alert("Registration Successfull")
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-blue-200">

       <form action="" onSubmit={handleSubmit(submitCall)}>
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Account Sign Up</h2>
       <div className="space-y-4">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-blue-700 mb-1">First name</label>
            <input {...register("firstname", { required: "Name is required", minLength: { value: 3, message: "First name should be at least 3 characters long" }   })}
              type="fisrtname"
              className="w-full p-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-blue-700 mb-1">Last name</label>
            <input {...register("lastname", { required: "Name is required", minLength: { value: 3, message: "Last name should be at least 3 characters long" }   })}
              type="lastname"
              className="w-full p-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email</label>
            <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              type="email"
              className="w-full p-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">Password</label>
            <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password should be at least 6 characters long" } })}
              type="password"
              className="w-full p-3 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition duration-200">
            Sign Up
          </button>
        </div>

       </form>

        <div className="mt-6 text-center text-sm text-blue-700">Or</div>

        {/* Google Sign-In Button */}
        <div id="googleSignInDiv" className="mt-4"></div>

        <p className="text-center text-sm text-blue-700 mt-4">
          Already have an account? <span className="underline cursor-pointer hover:text-blue-900"> 
              <Link to="/login">Sign In</Link>
             </span>
        </p>
      </div>
    </div>
  );
};

export default Register;