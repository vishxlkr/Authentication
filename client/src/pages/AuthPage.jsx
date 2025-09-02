// src/pages/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function AuthPage() {
   const [step, setStep] = useState("login"); // login | signup | reset | otp | newPassword
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
   });
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [purpose, setPurpose] = useState("");
   const navigate = useNavigate();
   const { signup, verifyOtp, login, forgotPassword, resetPassword } =
      useAuth();

   const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await signup(formData.name, formData.email, formData.password);
         toast.success("OTP sent to email!");
         setPurpose("signup");
         setStep("otp");
      } catch (err) {
         toast.error(err?.response?.data?.message || "Signup failed");
      } finally {
         setLoading(false);
      }
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await login(formData.email, formData.password);
         toast.success("Login successful!");
         navigate("/home");
      } catch (err) {
         toast.error(err?.response?.data?.message || "Login failed");
      } finally {
         setLoading(false);
      }
   };

   const handleReset = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await forgotPassword(formData.email);
         toast.success("OTP sent to your email!");
         setPurpose("reset");
         setStep("otp");
      } catch (err) {
         toast.error(err?.response?.data?.message || "Failed to send OTP");
      } finally {
         setLoading(false);
      }
   };

   const handleOtp = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await verifyOtp(formData.email, formData.otp);
         if (purpose === "signup") {
            toast.success("Account verified!");
            navigate("/home");
         } else if (purpose === "reset") {
            toast.success("OTP verified! Set new password.");
            setStep("newPassword");
         }
      } catch (err) {
         toast.error(err?.response?.data?.message || "OTP verification failed");
      } finally {
         setLoading(false);
      }
   };

   const handleNewPassword = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
         toast.error("Passwords do not match");
         return;
      }
      setLoading(true);
      try {
         await resetPassword(formData.email, formData.otp, formData.password);
         toast.success("Password updated successfully!");
         navigate("/home");
      } catch (err) {
         toast.error(err?.response?.data?.message || "Password reset failed");
      } finally {
         setLoading(false);
      }
   };

   const renderInput = (name, type, placeholder) => (
      <input
         type={type}
         name={name}
         placeholder={placeholder}
         value={formData[name]}
         onChange={handleChange}
         className="w-full px-4 py-3 border border-zinc-700 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
         required
      />
   );

   const renderPasswordInput = (name, placeholder) => (
      <div className="relative">
         <input
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-zinc-700 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
         />
         <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
            onClick={() => setShowPassword(!showPassword)}
         >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
         </span>
      </div>
   );

   return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
         {/* Left side */}
         <div className="hidden lg:col-span-2 lg:flex flex-col items-center justify-center text-center text-white bg-gradient-to-l from-[#1e40af] via-[#1e3a8a] to-[#1e1b4b] p-12">
            {/* <img
               src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
               alt="LOGO"
               className="h-30"
            /> */}
            <h1 className="text-6xl font-bold mb-4">Brand Logo</h1>
            <h2 className="text-3xl font-semibold mb-2 customfont">
               Welcome Back!
            </h2>
            <p className="text-lg text-white/80 max-w-sm">
               Log in or sign up to continue exploring all the amazing features
               we have for you.
            </p>
         </div>

         {/* Right side (Auth card) */}
         <div className="col-span-1 lg:col-span-3 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#1e40af] via-[#1e3a8a] to-[#1e1b4b]">
            <div className="w-full max-w-md bg-zinc-950 p-8 sm:p-10 rounded-2xl shadow-2xl text-white relative">
               <h2 className="text-3xl font-bold text-center mb-6">
                  {step === "login"
                     ? "Login"
                     : step === "signup"
                     ? "Sign Up"
                     : step === "reset"
                     ? "Reset Password"
                     : step === "otp"
                     ? "Enter OTP"
                     : "Set New Password"}
               </h2>

               {/* Show loading overlay inside the card */}
               {loading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-10">
                     <Loading />
                  </div>
               )}

               {/* Forms */}
               <div
                  className={`${
                     loading ? "opacity-50 pointer-events-none" : ""
                  }`}
               >
                  {step === "login" && (
                     <form onSubmit={handleLogin} className="space-y-5">
                        {renderInput("email", "email", "Email")}
                        {renderPasswordInput("password", "Password")}
                        <button
                           type="submit"
                           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                           Login
                        </button>
                        <p className="text-sm text-center text-zinc-400">
                           Don’t have an account?{" "}
                           <span
                              onClick={() => setStep("signup")}
                              className="text-blue-400 cursor-pointer font-semibold"
                           >
                              Sign up
                           </span>
                        </p>
                        <p className="text-sm text-center text-zinc-400">
                           Forgot password?{" "}
                           <span
                              onClick={() => setStep("reset")}
                              className="text-blue-400 cursor-pointer font-semibold"
                           >
                              Reset
                           </span>
                        </p>
                     </form>
                  )}

                  {step === "signup" && (
                     <form onSubmit={handleSignup} className="space-y-5">
                        {renderInput("name", "text", "Full Name")}
                        {renderInput("email", "email", "Email")}
                        {renderPasswordInput("password", "Password")}
                        <button
                           type="submit"
                           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                           Sign Up
                        </button>
                        <p className="text-sm text-center text-zinc-400">
                           Already have an account?{" "}
                           <span
                              onClick={() => setStep("login")}
                              className="text-blue-400 cursor-pointer font-semibold"
                           >
                              Login
                           </span>
                        </p>
                     </form>
                  )}

                  {step === "reset" && (
                     <form onSubmit={handleReset} className="space-y-5">
                        {renderInput("email", "email", "Enter your email")}
                        <button
                           type="submit"
                           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                           Send OTP
                        </button>
                        <p className="text-sm text-center text-zinc-400">
                           Back to{" "}
                           <span
                              onClick={() => setStep("login")}
                              className="text-blue-400 cursor-pointer font-semibold"
                           >
                              Login
                           </span>
                        </p>
                     </form>
                  )}

                  {step === "otp" && (
                     <form onSubmit={handleOtp} className="space-y-5">
                        {renderInput("otp", "text", "Enter OTP")}
                        <button
                           type="submit"
                           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                           Verify OTP
                        </button>
                     </form>
                  )}

                  {step === "newPassword" && (
                     <form onSubmit={handleNewPassword} className="space-y-5">
                        {renderPasswordInput("password", "New Password")}
                        {renderPasswordInput(
                           "confirmPassword",
                           "Confirm New Password"
                        )}
                        <button
                           type="submit"
                           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                           Save Password
                        </button>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
