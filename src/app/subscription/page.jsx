"use client";
import React, { useState } from "react";

export default function SubscriptionPage() {
  const [userRole, setUserRole] = useState("user");
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  // চেকাউট হ্যান্ডলার ফাংশন
  const handleCheckout = async (planId) => {
    setLoadingPlanId(planId);
    try {
      const formData = new FormData();
      formData.append("planId", planId);

      const response = await fetch('/api/subscription-pricing', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // স্ট্রাইপ পেমেন্ট পেজে রিডাইরেক্ট
        window.location.href = data.url; 
      } else {
        alert(data.error || "কোথাও একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করুন।");
    } finally {
      setLoadingPlanId(null);
    }
  };

  const userPlans = [
    {
      id: "user_free",
      name: "Free Reader",
      desc: "Perfect for casual readers to start exploring books.",
      price: "$0",
      period: "/month",
      features: [
        "Borrow up to 2 books at a time",
        "List up to 3 books for exchange",
        "Standard 14-day return period",
        "Community support",
      ],
      buttonText: "Current Plan",
      isPopular: false,
      isFree: true,
    },
    {
      id: "user_pro",
      name: "Bookworm Pro",
      desc: "For active readers who love sharing and learning more.",
      price: "$9",
      period: "/month",
      features: [
        "Borrow up to 10 books at a time",
        "Unlimited book listings",
        "Extended 30-day return period",
        "Priority book request approval",
        "Ad-free dashboard experience",
      ],
      buttonText: "Upgrade to Pro",
      isPopular: true,
      isFree: false,
    },
    {
      id: "user_elite",
      name: "Library Elite",
      desc: "Best for power readers and small community book clubs.",
      price: "$19",
      period: "/month",
      features: [
        "Unlimited book borrowing",
        "Unlimited book listings",
        "Flexible return dates",
        "Elite member badge on profile",
        "24/7 dedicated support",
        "Access to exclusive book clubs",
      ],
      buttonText: "Go Elite",
      isPopular: false,
      isFree: false,
    },
  ];

  const librarianPlans = [
    {
      id: "librarian_basic",
      name: "Basic Institute",
      desc: "Ideal for small personal libraries or school clubs.",
      price: "$29",
      period: "/month",
      features: [
        "Manage up to 500 books catalog",
        "Track up to 100 active members",
        "Basic fine & overdue automation",
        "Email invoice & reports",
      ],
      buttonText: "Get Started",
      isPopular: false,
      isFree: false,
    },
    {
      id: "librarian_premium",
      name: "Librarian Premium",
      desc: "Best for public and mid-sized institution libraries.",
      price: "$79",
      period: "/month",
      features: [
        "Manage up to 5,000 books catalog",
        "Unlimited active members tracking",
        "Advanced barcode & RFID scanning",
        "Automated SMS/Email notifications",
        "Custom library landing page",
        "Priority live-chat support",
      ],
      buttonText: "Upgrade to Premium",
      isPopular: true,
      isFree: false,
    },
    {
      id: "librarian_enterprise",
      name: "Enterprise Library",
      desc: "For university systems and large multi-branch networks.",
      price: "$149",
      period: "/month",
      features: [
        "Unlimited books & media catalog",
        "Multi-branch network integration",
        "Dedicated cloud database storage",
        "API access for institute portals",
        "24/7 dedicated account manager",
        "Custom development on-demand",
      ],
      buttonText: "Contact Sales",
      isPopular: false,
      isFree: false,
    },
  ];

  const activePlans = userRole === "librarian" ? librarianPlans : userPlans;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-32 pb-24 text-zinc-900 dark:text-zinc-100 overflow-visible">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-purple-700 font-extrabold tracking-tight">
          {userRole === "librarian" ? "Librarian Management Plans" : "Choose Your Reading Journey"}
        </h2>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
          {userRole === "librarian" 
            ? "Scale your library operations with powerful cataloging, automated tracking, and institutional-grade features."
            : "Unlock premium library features, borrow more books, and become a core part of our global reading community."}
        </p>

        {/* Toggle Controls */}
        <div className="mt-8 inline-flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
          <button
            onClick={() => setUserRole("user")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              userRole === "user"
                ? "bg-white dark:bg-zinc-700 text-purple-700 shadow-md scale-100"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            User Plans
          </button>
          <button
            onClick={() => setUserRole("librarian")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              userRole === "librarian"
                ? "bg-white dark:bg-zinc-700 text-purple-700 shadow-md scale-100"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            Librarian Plans
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        {activePlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border transition-all duration-300 h-full min-h-137 ${
              plan.isPopular
                ? "border-purple-600 dark:border-purple-500 shadow-xl scale-100 md:scale-105 z-10"
                : "border-zinc-200 dark:border-zinc-800 opacity-95 hover:opacity-100 shadow-sm"
            }`}
          >
            {/* Most Popular Badge */}
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md tracking-wide whitespace-nowrap z-20">
                Most Popular
              </span>
            )}

            {/* Content Container */}
            <div className="flex flex-col grow">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed min-h-10">
                {plan.desc}
              </p>

              {/* Price display */}
              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                  {plan.price}
                </span>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {plan.period}
                </span>
              </div>

              {/* Features list */}
              <ul className="space-y-3.5 mb-8 grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                    <svg
                      className="w-4 h-4 text-purple-600 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div className="w-full pt-2">
              <button
                type="button"
                disabled={plan.isFree || loadingPlanId === plan.id}
                onClick={() => handleCheckout(plan.id)}
                style={{
                  backgroundColor: plan.isFree 
                    ? "#e4e4e7" 
                    : plan.isPopular 
                    ? "#006FEE" 
                    : "#f4f4f5", 
                  color: plan.isFree 
                    ? "#a1a1aa" 
                    : plan.isPopular 
                    ? "#ffffff" 
                    : "#18181b",
                }}
                className="w-full py-3 px-4 font-bold text-sm rounded-xl transition-all active:scale-95 cursor-pointer text-center block shadow-sm disabled:opacity-70"
              >
                {loadingPlanId === plan.id ? "Processing..." : plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}