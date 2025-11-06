import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Sparkles, Heart, Share2 } from "lucide-react";

const SkillListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  // ✅ new: local form state
  const [booking, setBooking] = useState({ name: "", email: "" });

  // 🧘‍♀️ Fetch skill data
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch("/skillListing.json");
        if (!response.ok) throw new Error("Failed to fetch skill data");

        const data = await response.json();
        const foundSkill = data.find((s) => String(s.skillId) === String(id));

        if (foundSkill) setSkill(foundSkill);
        else throw new Error("Skill not found");
      } catch (err) {
        console.error("Error:", err);
        setToast("Failed to load skill details");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  // ❤️ Like / Favorite Toggle
  const toggleLike = () => {
    setIsLiked((v) => !v);
    setToast(!isLiked ? "💖 Added to favorites" : "💔 Removed from favorites");
    setTimeout(() => setToast(""), 3000);
  };

  // ✅ Handle booking form submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!booking.name.trim() || !booking.email.trim()) {
      setToast("Please enter your name and email.");
      setTimeout(() => setToast(""), 2500);
      return;
    }
    setToast("✅ Booking request sent! We'll reach out soon.");
    setBooking({ name: "", email: "" }); // clear form
    setTimeout(() => setToast(""), 3500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">Loading skill details...</p>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Skill not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      {toast && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles size={18} />
            {toast}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 bg-white text-gray-700 hover:text-blue-600 font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-500"
          >
            <ArrowLeft size={20} />
            Back to Listings
          </button>

          <div className="flex gap-3">
            <button
              onClick={toggleLike}
              className={`p-3 rounded-lg shadow-sm transition-all duration-300 ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:text-red-500 border border-gray-200"
              }`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="p-3 bg-white rounded-lg shadow-sm text-gray-700 hover:text-blue-600 transition-all duration-300 border border-gray-200">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Image */}
          <div className="relative w-full h-72 sm:h-96 bg-gray-100 flex items-center justify-center p-8">
            <img
              src={skill.image}
              alt={skill.skillName}
              className="w-full h-full object-contain rounded-lg transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 font-medium">
              <Star size={18} fill="currentColor" />
              {skill.rating.toFixed(1)}
            </div>
            <div className="absolute top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-sm font-medium">
              {skill.slotsAvailable > 0 ? `${skill.slotsAvailable} Slots Open` : "Fully Booked"}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {skill.skillName}
                </h1>
                <p className="text-lg text-gray-700 font-medium">
                  Instructor:{" "}
                  <span className="font-bold text-blue-600">{skill.providerName}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Email: {skill.providerEmail}</p>
              </div>

              <div className="text-right">
                <p className="text-4xl font-bold text-blue-600 mb-3">
                  ${skill.price.toFixed(2)}
                </p>
                <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                  <Star size={20} className="text-yellow-400" fill="currentColor" />
                  <span className="text-gray-900 font-medium text-lg">
                    {skill.rating.toFixed(1)} Rating
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={22} className="text-blue-600" />
                About This Session
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-6 rounded-lg border border-gray-200">
                {skill.description}
              </p>
            </div>

            {/* ✅ Book Session Form */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Book Session
              </h3>
              <form onSubmit={handleBookingSubmit} className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={booking.name}
                    onChange={(e) => setBooking((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={booking.email}
                    onChange={(e) => setBooking((s) => ({ ...s, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* End Book Session Form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillListingDetails;