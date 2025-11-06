// src/components/layout/Homepage.jsx
import Aos from "aos";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import heroSlidesData from "../../data/heroSlider.json";
import "./homepage.css";
import { Link } from "react-router";
import bannerImg from "../../assets/yoga.png";
import ava1 from "../../assets/1.png";
import ava2 from "../../assets/2.png";
import ava3 from "../../assets/3.png";
import ava4 from "../../assets/4.png";
import SkillListing from "../SkillListing";
import TopInstructorsSection from "../TopInstructorsSection";
import MembershipSection from "../MembershipSection";

const FALLBACK =
    "https://cdn.pixabay.com/photo/2014/04/03/11/07/teddy-bear-311519_1280.png";

function SlideBg({ url }) {
    const hostPath = url?.replace(/^https?:\/\//, "");
    const proxy = `https://images.weserv.nl/?url=${hostPath}&w=1600&h=900&fit=cover&output=jpg`;

    const tryOrder = [url, proxy, FALLBACK].filter(Boolean);
    const [idx, setIdx] = useState(0);
    const current = tryOrder[idx];

    useEffect(() => {
        const img = new Image();
        img.referrerPolicy = "no-referrer";
        img.crossOrigin = "anonymous";
        img.src = current;
        img.onerror = () => {
            if (idx < tryOrder.length - 1) setIdx(idx + 1);
        };

    }, [current]);

    return (
        <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('${current}')` }}
        />
    );
}

const Homepage = () => {

    useEffect(() => {
        Aos.init({ duration: 1000, once: true, offset: 100 });
    }, []);

    return (
        <>
            {/* --- Mobile / Tablet (< lg) --- */}
            <div className="lg:hidden relative bg-gray-50 text-gray-900 rounded-xl mx-4 mt-6 shadow-lg border border-gray-200 overflow-hidden">
                <div className="container mx-auto px-5 py-12 flex flex-col items-center">
                    {/* Headline */}
                    <h1 className="text-[34px] sm:text-5xl font-bold leading-tight text-center tracking-tight">
                        Empower Your Mind <br /> &amp; Body Potential
                    </h1>

                    {/* Hero image */}
                    <img
                        src={bannerImg}
                        alt="Yoga pose"
                        className="w-full max-w-[520px] mt-6 object-contain"
                        loading="lazy"
                    />

                    {/* CTA + copy */}
                    <p className="mt-6 text-center text-base text-gray-600 max-w-md">
                        Balance your mind and body to achieve your full potential.
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                        Book Class <span aria-hidden>↗</span>
                    </button>

                    {/* Social proof */}
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <div className="flex -space-x-3">
                            <img src={ava1} className="w-9 h-9 rounded-full ring-2 ring-white object-cover" />
                            <img src={ava2} className="w-9 h-9 rounded-full ring-2 ring-white object-cover" />
                            <img src={ava3} className="w-9 h-9 rounded-full ring-2 ring-white object-cover" />
                            <img src={ava4} className="w-9 h-9 rounded-full ring-2 ring-white object-cover" />
                        </div>
                        <p className="text-sm text-gray-600">
                            Over <b>120+</b> people have joined our yoga classes.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Desktop ( ≥ lg ) --- */}
            <div className="hidden lg:block">
                <section className="relative min-h-[86vh] overflow-hidden bg-gray-50">
                    <div className="relative container mx-auto px-10">
                        {/* Big headline */}
                        <h1 className="pt-20 text-[84px] leading-[0.95] font-bold text-gray-900 tracking-tight">
                            Empower Your Mind <br /> &amp; Body Potential
                        </h1>

                        {/* Center hero image */}
                        <div className="relative flex justify-center mt-6">
                            <img
                                src={bannerImg}
                                alt="Yoga pose"
                                className="max-w-[720px] w-full object-contain"
                            />
                        </div>

                        {/* Left copy + CTA (overlay panel) */}
                        <div className="absolute left-10 bottom-14 max-w-sm">
                            <p className="text-[15px] text-gray-600">
                                Balance your mind and body to achieve <br /> your full potential.
                            </p>
                            <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                                Book Class <span aria-hidden>↗</span>
                            </button>
                        </div>

                        {/* Right social proof (overlay panel) */}
                        <div className="absolute right-10 bottom-14 flex flex-col items-center gap-4">
                            <div className="flex -space-x-3">
                                <img src={ava1} className="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src={ava2} className="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src={ava3} className="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src={ava4} className="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                            </div>
                            <p className="text-[15px] text-gray-600 max-w-[220px]">
                                Over <b>120+</b> people have joined our yoga classes.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- Swiper Slider: JSON → background images (proxy + fallback) --- */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                        className="rounded-lg overflow-hidden shadow-lg"
                    >
                        {heroSlidesData.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="relative h-[400px] md:h-[500px]">

                                    <SlideBg url={slide.image} />

                                    {/* overlay + text */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="text-center text-white px-4">
                                            <h2 className="text-4xl md:text-6xl font-bold mb-4">
                                                {slide.title}
                                            </h2>
                                            <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section>
                <SkillListing></SkillListing>
            </section>
                    
            <section>
                <TopInstructorsSection></TopInstructorsSection>
            </section>

            <section>
                <MembershipSection></MembershipSection>
            </section>
        </>
    );
};

export default Homepage;