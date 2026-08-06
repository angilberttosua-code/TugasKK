"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCertificates, Certificate } from "@/data/mockData";
import SkeletonCard from "@/components/SkeletonCard";

export default function CertificatePage() {
  const [certificatesList, setCertificatesList] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        setLoading(true);
        const data = await getCertificates();
        setCertificatesList(data);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Certificates
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sertifikasi keahlian dan pencapaian akademik yang saya raih
            selama menempuh pendidikan di bidang Informatika.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} variant="certificate" />
              ))
            : certificatesList.map((cert) => (
                <div
                  key={cert.id}
                  className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors duration-300">
                      <span className="text-2xl">🏅</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300 leading-snug">
                      {cert.title}
                    </h3>
                  </div>

                  <p className="text-indigo-300 text-sm font-semibold mb-4">
                    {cert.issuer}
                  </p>

                  <div className="space-y-1.5 text-xs text-gray-500">
                    <div>
                      <span className="font-medium text-gray-400">Diterbitkan:</span>{" "}
                      {cert.date}
                    </div>
                    <div>
                      <span className="font-medium text-gray-400">ID Kredensial:</span>{" "}
                      {cert.credentialId}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-800/50">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer"
                    >
                      Lihat Kredensial <span className="text-xs">↗</span>
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal Popup Sertifikat */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-800/80 text-white flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 z-10"
              aria-label="Tutup"
            >
              ✕
            </button>

            {selectedCert.image ? (
              <div className="relative w-full aspect-[4/3] bg-gray-950">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-950 flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  Gambar sertifikat belum tersedia.
                </p>
              </div>
            )}

            <div className="p-6 border-t border-gray-800">
              <h3 className="text-lg font-bold text-white mb-1">
                {selectedCert.title}
              </h3>
              <p className="text-indigo-300 text-sm font-semibold mb-3">
                {selectedCert.issuer}
              </p>
              <p className="text-gray-500 text-xs">
                Diterbitkan: {selectedCert.date} · ID: {selectedCert.credentialId}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}