import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(location.state?.email || '');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Redirect to Gmail
      window.open('https://mail.google.com', '_blank');
      
      toast.success('Opening Gmail. Check your email for password reset link.');
      
      setLoading(false);
      
      // Redirect back to login after a moment
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 800);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Reset Password
          </h2>
          <p className="text-gray-600 font-medium">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 bg-gray-50 text-gray-700 hover:text-blue-600 font-medium px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 mb-6 w-full justify-center border border-gray-200"
        >
          <ArrowLeft size={18} />
          <span>Back to Login</span>
        </button>

        <form onSubmit={handleResetPassword} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-3 text-lg">
              Email Address
            </label>
            <div className="relative">
              <Mail 
                size={20} 
                className="absolute left-4 top-4 text-gray-400" 
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-12 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              <>
                <Mail size={20} />
                Send Reset Link
              </>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm leading-relaxed">
            A password reset link will be sent to your email. 
            Check your inbox and spam folder for the reset instructions.
          </p>
        </div>

        {/* Login Link */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 font-medium">
            Remember your password?{" "}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-300"
            >
              Login to SkillSwap
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;