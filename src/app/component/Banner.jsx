"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "@heroui/react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Banner() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
      tagline: "Your Local Library, Delivered",
      title: "Democratizing Access to Knowledge",
      description: "Skip the physical trip. Connect with local libraries and independent book owners to get your next read safely delivered right to your doorstep.",
      cta: "Browse Books",
      link: "/browse"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop",
      tagline: "Share the Joy of Reading",
      title: "Become a Book Provider Today",
      description: "List your personal book collection, manage delivery requests through a secured system, and earn smoothly while helping students and readers alike.",
      cta: "Join as Librarian",
      link: "/register"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1600&auto=format&fit=crop",
      tagline: "Secure & Trusted Borrowing",
      title: "Verified Reviews & Smart Tracking",
      description: "Enjoy verified reviews from authentic readers, transparent Stripe payment integration, and real-time delivery status updates from Pending to Delivered.",
      cta: "Explore Collections",
      link: "/browse"
    }
  ];

  return (
    <div className="w-full h-[70vh] min-h-[480px] md:h-[80vh] relative bg-background">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full flex items-center justify-center">
           
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className=" absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:bg-black/50 z-10" />

            {/* Slider Content Content */}
            <div className="relative z-20 max-w-7xl mx-auto w-full h-full px-15 flex flex-col justify-center items-start text-white gap-4">
              <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30">
                {slide.tagline}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black max-w-3xl leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg max-w-2xl text-default-300 leading-relaxed font-light">
                {slide.description}
                </p>
              <div className="mt-4">
                <Button 
                  as={Link} 
                  href={slide.link} 
                  color="primary" 
                  size="lg" 
                  radius="md" 
                  className="font-bold text-sm tracking-wide shadow-lg shadow-primary/30 px-8 transition-transform active:scale-95"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #7c3aed !important; /* Violet-600 */
          width: 24px !important;
          border-radius: 4px !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #ffffff !important;
          opacity: 0.5;
          transform: scale(0.7);
          transition: opacity 0.2s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .swiper-button-next, .swiper-button-prev {
            display: none !important; 
          }
        }
      `}</style>
    </div>
  );
}