import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Sparkles } from "lucide-react";

/* Small rating renderer */
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
            size={16}
            className={filled ? "text-yellow-400" : "text-gray-300"}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
      <span className="text-xs text-gray-600 ml-1 font-medium">({v.toFixed(1)})</span>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
  </div>
);

const TopInstructorsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/instructors.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load instructors");
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Top rated Providers
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Book trusted local mentors for yoga, breathwork, meditation, and wellness.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((it, index) => {
              const id = it.primarySkillId ?? it.skillId ?? it.id ?? index;
              const rating = Number(it.rating) || 0;
              const price = Number(it.price) || 0;

              return (
                <div
                  key={id}
                  className="group bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                  style={{ animation: "fadeInUp 0.6s ease-out forwards", animationDelay: `${index * 80}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={it.image}
                      alt={it.name || it.skillName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* top-left badge */}
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {it.category || it.skill}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {it.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-600">{it.skill || it.skillName}</span>
                      <RatingStars value={rating} />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={16} className="text-blue-600" />
                        {it.distanceKm ? `${it.distanceKm} km` : "Nearby"}
                      </span>
                      <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}/hr</span>
                    </div>

                    <Link
                      to={`/skills/${id}`}
                      state={{ item: it }}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                    >
                      Book Session
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* local keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TopInstructorsSection;