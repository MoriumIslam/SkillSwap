import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import React from "react";
import yogaLogo from "../../assets/yoga-logo.png";

const Footer = () => {
  return (
    <footer
      className="bg-white py-12 border-t border-gray-500"
      aria-labelledby="site-footer"
    >
      <div className="container mx-auto px-6" id="site-footer">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Brand + Intro */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={yogaLogo}
                alt="SkillSwap Yoga logo"
                className="w-14 h-14"
                loading="lazy"
              />
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                SkillSwap
              </h3>
            </div>
            <p className="text-gray-800 leading-relaxed">
              Learn, teach, and trade wellness skills in your neighborhood —
              from yoga flows to mindfulness and mobility. Breathe in, level up, give back.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">
              Contact
            </h4>
            <div className="space-y-3 text-gray-700">
              <a
                href="mailto:support@skillswap.yoga"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition"
                aria-label="Email support@skillswap.yoga"
              >
                <Mail size={20} className="text-blue-600" />
                <span className="font-medium">support@skillswap.yoga</span>
              </a>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition"
                aria-label="Call +880 1700 000 000"
              >
                <Phone size={20} className="text-blue-600" />
                <span className="font-medium">+880 1700 000 000</span>
              </a>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <MapPin size={20} className="text-blue-600" />
                <span className="font-medium">Banani, Dhaka — BD</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">
              Stay Connected
            </h4>
            <p className="text-gray-600 mb-5">
              New classes, community swaps, and mindful tips — follow along.
            </p>
            <div className="flex space-x-3 mb-6">
              <a
                href="#"
                aria-label="SkillSwap on Facebook"
                className="p-3 bg-white rounded-full border border-gray-200 hover:border-blue-500 transition hover:scale-105"
              >
                <Facebook size={22} className="text-gray-700" />
              </a>
              <a
                href="#"
                aria-label="SkillSwap on X (Twitter)"
                className="p-3 bg-white rounded-full border border-gray-200 hover:border-blue-500 transition hover:scale-105"
              >
                <Twitter size={22} className="text-gray-700" />
              </a>
              <a
                href="#"
                aria-label="SkillSwap on Instagram"
                className="p-3 bg-white rounded-full border border-gray-200 hover:border-blue-500 transition hover:scale-105"
              >
                <Instagram size={22} className="text-gray-700" />
              </a>
            </div>

            <div className="mt-4">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition border-b border-transparent hover:border-blue-600 pb-0.5"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} <strong className="text-gray-900">SkillSwap</strong>.
            All rights reserved. Crafted with <span className="text-red-500">♥</span> for mindful communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;