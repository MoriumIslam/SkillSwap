// src/components/MembershipSection.jsx
import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const featuresStandard = [
  "3 classes per month",
  "Monthly newsletter",
  "Free mat & towel rental",
  "10% off workshops",
];

const featuresPremium = [
  "6 classes per month",
  "Monthly newsletter",
  "Free mat & towel rental",
  "15% off workshops",
];

function PlanCard({ title, note, price, features, popular = false }) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg border transition-all duration-300 overflow-hidden
      ${popular ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-200"}`}
    >
      <div className="p-6 sm:p-8">
        {/* Badge row */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-blue-200 text-blue-700 bg-blue-50">
            {title}
          </span>
          {popular && <span className="text-sm font-medium text-gray-600">Most Popular</span>}
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <div className="text-4xl sm:text-5xl font-bold text-gray-900">
            {price}
          </div>
          <span className="text-gray-500 mb-2">/month</span>
        </div>

        {/* Note */}
        <p className="text-gray-600 mt-4">{note}</p>

        <hr className="my-6 border-gray-200" />

        {/* Features */}
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
                <Check className="w-3.5 h-3.5 text-blue-600" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          <Link
            to="/checkout"
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium
                     bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            Choose This Plan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MembershipSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr,1.2fr] items-start gap-10 lg:gap-14">
          {/* Left heading */}
          <div>
            <p className="text-blue-600 font-medium mb-3">Membership</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Join & Become
              <br /> Our Membership
            </h2>

            <p className="mt-8 text-gray-600 max-w-md">
              Join us daily, monthly, or yearly—flexible access to your wellness, your way.{" "}
              <Link
                to="/pricing"
                className="text-blue-600 font-medium underline-offset-4 hover:underline"
              >
                See More Pricing
              </Link>
            </p>
          </div>

          {/* Right plan cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <PlanCard
              title="Standard"
              note="Best for looking to grow and explore."
              price="$79.99"
              features={featuresStandard}
            />
            <PlanCard
              title="Premium"
              note="Best for looking to grow and explore."
              price="$109.99"
              features={featuresPremium}
              popular
            />
          </div>
        </div>
      </div>
    </section>
  );
}