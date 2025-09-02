// {/* left side */}

// {/* <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-8 bg-black">
//    <div>
//       <img
//          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
//          alt="Logo"
//          className="h-24 w-auto mb-6"
//       />
//       <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
//       <p className="text-white/80 mt-2 text-center max-w-sm">
//          Log in or sign up to continue exploring.
//       </p>
//    </div>
// </div> */}
import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

export default function LoginPage() {
   const [isSignup, setIsSignup] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [showForgotPassword, setShowForgotPassword] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [resetEmail, setResetEmail] = useState("");

   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignup) {
         console.log("Sign up data:", formData);
         alert("Account created successfully!");
      } else {
         console.log("Login data:", {
            email: formData.email,
            password: formData.password,
         });
         alert("Login successful!");
      }
   };

   const handleForgotPassword = (e) => {
      e.preventDefault();
      console.log("Reset password email:", resetEmail);
      alert(`Password reset link sent to ${resetEmail}`);
      setShowForgotPassword(false);
      setResetEmail("");
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-800 via-gray-500 to-blue-700 px-4">
         {/* right side */}
         <div className="w-full max-w-md bg-white p-10 border-none rounded-2xl relative">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
               {isSignup ? "Create an account" : "Log in"}
            </h2>
            <p className="mt-2 text-center text-gray-600 text-sm">
               {isSignup ? (
                  <>
                     Already have an account?{" "}
                     <button
                        onClick={() => setIsSignup(false)}
                        className="text-black font-medium hover:underline"
                     >
                        Log in
                     </button>
                  </>
               ) : (
                  <>
                     Don’t have an account?{" "}
                     <button
                        onClick={() => setIsSignup(true)}
                        className="text-black font-medium hover:underline"
                     >
                        Sign up
                     </button>
                  </>
               )}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
               {isSignup && (
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        What should we call you?
                     </label>
                     <input
                        type="text"
                        name="name"
                        placeholder="Enter your profile name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-gray-200"
                        required
                     />
                  </div>
               )}

               <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                     What’s your email?
                  </label>
                  <input
                     type="email"
                     name="email"
                     placeholder="Enter your email address"
                     value={formData.email}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-gray-200"
                     required
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                     {isSignup ? "Create a password" : "Password"}
                  </label>
                  <div className="relative">
                     <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-gray-200"
                        required
                     />
                     <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? (
                           <EyeOff size={18} />
                        ) : (
                           <Eye size={18} />
                        )}
                     </button>
                  </div>

                  {isSignup ? (
                     <p className="text-xs text-gray-500 mt-1">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols
                     </p>
                  ) : (
                     <div className="mt-1 text-right">
                        <button
                           type="button"
                           onClick={() => setShowForgotPassword(true)}
                           className="text-sm text-blue-600 hover:underline"
                        >
                           Forgot password?
                        </button>
                     </div>
                  )}
               </div>

               {isSignup && (
                  <p className="text-xs text-gray-600">
                     By creating an account, you agree to the{" "}
                     <a href="#" className="underline font-medium">
                        Terms of use
                     </a>{" "}
                     and{" "}
                     <a href="#" className="underline font-medium">
                        Privacy Policy
                     </a>
                     .
                  </p>
               )}

               <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-indigo-800 transition"
               >
                  {isSignup ? "Create an account" : "Log in"}
               </button>
            </form>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
                     <button
                        onClick={() => setShowForgotPassword(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black"
                     >
                        <X size={18} />
                     </button>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Reset Password
                     </h3>
                     <p className="text-sm text-gray-600 mb-3">
                        Enter your email and we’ll send you a reset link.
                     </p>
                     <form
                        onSubmit={handleForgotPassword}
                        className="space-y-3"
                     >
                        <input
                           type="email"
                           placeholder="Enter your email"
                           value={resetEmail}
                           onChange={(e) => setResetEmail(e.target.value)}
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100"
                           required
                        />
                        <button
                           type="submit"
                           className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-indigo-700 transition"
                        >
                           Send Reset Link
                        </button>
                     </form>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
