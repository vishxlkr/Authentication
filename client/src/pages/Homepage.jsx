import { Link } from "react-router-dom";

export default function HomePage() {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
         <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Home Page 🎉</h1>
            <Link to="/login" className="text-blue-600 hover:underline">
               Logout
            </Link>
         </div>
      </div>
   );
}
