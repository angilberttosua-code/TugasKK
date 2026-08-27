"use client";

import { useState, useEffect } from "react";
import { fetchTestimonials } from "@/data/api";
import { Testimonial } from "@/data/mockData";
import SkeletonCard from "@/components/SkeletonCard";

export default function TestimonialPage() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true);
        const data = await fetchTestimonials();
        setTestimonialsList(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Testimonials
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Apa pendapat para guru dan rekan sejawat mengenai dedikasi,
            keterampilan, dan etos kerja saya selama berkolaborasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} variant="testimonial" />
              ))
            : testimonialsList.map((test) => (
                <div
                  key={test.id}
                  className="p-6 sm:p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: test.stars }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">
                          ★
                        </span>
                      ))}
                    </div>

                    <blockquote className="text-gray-300 italic leading-relaxed text-sm sm:text-base mb-8">
                      &quot;{test.quote}&quot;
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800/50">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-2xl shrink-0 border border-gray-800/50">
                      {test.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">
                        {test.name}
                      </h4>
                      <p className="text-xs text-indigo-400 mt-1.5 leading-none">
                        {test.role}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 leading-none">
                        {test.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}