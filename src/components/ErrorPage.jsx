import React from "react";
import { useNavigate } from "react-router";
import { Home, ArrowLeft, ToyBrick } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-md w-full">
        <div className="text-[5rem] mb-3">🧘🏻‍♂️</div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Looks like this page rolled too far away!  
          Don't worry — we'll help you find your way back.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
          >
            <Home size={20} />
            Go Home
          </button>
        </div>
      </div>

      <p className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} SkillSwap | Keep exploring ✨
      </p>
    </section>
  );
};

export default ErrorPage;