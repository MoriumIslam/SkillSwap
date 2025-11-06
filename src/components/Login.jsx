import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const formEmail = e.target.email.value;
    const pass = e.target.password.value;

    setLoading(true);
    signInUser(formEmail, pass)
      .then((res) => {
        console.log(res.user);
        toast.success("Successfully Logged In!");
        e.target.reset();
        setEmail("");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/user-not-found") {
          toast.error("Email not found");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else {
          toast.error("Login failed. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        toast.success("Successfully Logged In!");
        console.log(res.user);
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/popup-closed-by-user") {
          toast.error("Google sign-in cancelled.");
        } else {
          toast.error("Google login failed. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleForgotPasswordClick = () => {
    // Pass email to forgot password page
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-600 mb-8">
          Login to continue your wellness journey.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              required
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-sm text-gray-600 hover:text-blue-600 transition"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:text-blue-700 transition">
            Sign Up
          </Link>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-medium py-3 rounded-lg transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </section>
  );
}