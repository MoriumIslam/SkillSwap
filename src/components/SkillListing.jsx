import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles, Eye } from "lucide-react";

/** ⭐ Rating Component */
const RatingStars = ({ value = 0 }) => {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const rounded = Math.round(v);
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < rounded;
        return (
          <Star
            key={i}
            size={18}
            className={filled ? "text-yellow-400" : "text-gray-300"}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
      <span className="text-sm text-gray-600 ml-1 font-medium">
        ({v.toFixed(2)})
      </span>
    </div>
  );
};

/** 💫 Skeleton Loader */
const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
    <div className="bg-gray-200 aspect-[4/3]" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-9 bg-gray-200 rounded w-28" />
      <div className="h-12 bg-gray-200 rounded-lg" />
    </div>
  </div>
);

/** 🌿 Main Component */
const SkillListing = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/skillListing.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load skills");
        return res.json();
      })
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={18} />
              Loading Popular Skills
              <Sparkles size={18} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Popular Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Popular Skills
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-3">
            Explore trending yoga and wellness sessions near you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((item, index) => {
            const id = item.skillId ?? index;
            const name = item.skillName ?? "Untitled Skill";
            const price = Number(item.price) || 0;
            const rating = Number(item.rating) || 0;

            return (
              <div
                key={id}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-500"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Image */}
                <div className="relative bg-gray-100 aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 p-4"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors duration-300">
                    {name}
                  </h3>

                  <div className="mb-3">
                    <RatingStars value={rating} />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 font-medium">Price</span>
                    <div className="text-2xl font-bold text-gray-900">
                      ${price.toFixed(2)}
                    </div>
                  </div>

                  {/* View Details */}
                  <Link
                    to={`/skills/${id}`}
                    state={{ item }}
                    className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group/btn"
                  >
                    View Details
                    <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default SkillListing;