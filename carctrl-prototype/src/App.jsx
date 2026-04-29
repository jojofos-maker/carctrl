import React, { useState } from "react";
import {
  Car,
  Search,
  Sparkles,
  Gauge,
  BatteryCharging,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const ACCENT = "#FFB84D";

const cars = [
  {
    name: "Volvo EX30",
    type: "Elbil · SUV",
    score: 94,
    price: "fra 329 900 kr",
    range: "480 km",
    cost: "2,1 kr/km",
    tag: "beste totalvalg",
  },
  {
    name: "Tesla Model Y",
    type: "Elbil · Familie",
    score: 91,
    price: "fra 429 990 kr",
    range: "533 km",
    cost: "2,3 kr/km",
    tag: "mest plass",
  },
  {
    name: "Toyota Yaris Cross",
    type: "Hybrid · Kompakt",
    score: 86,
    price: "fra 339 000 kr",
    range: "hybrid",
    cost: "3,0 kr/km",
    tag: "trygt kjøp",
  },
];

function App() {
  const [active, setActive] = useState("smart");

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#F0F0FF] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FFB84D]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#4D9FFF]/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-md flex-col px-5 py-5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#2A2A3D] bg-[#111118] shadow-xl">
              <Car size={22} color={ACCENT} />
            </div>
            <div>
              <div className="font-mono text-lg tracking-tight">
                car<span className="text-[#FFB84D]">ctrl</span>
              </div>
              <p className="text-xs text-[#8888AA]">bilvalg under kontroll</p>
            </div>
          </div>

          <button className="rounded-full border border-[#1C1C30] bg-[#111118] px-3 py-2 text-xs text-[#8888AA]">
            beta
          </button>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-9"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2A2A3D] bg-[#111118]/80 px-3 py-1.5 text-xs text-[#8888AA]">
            <Sparkles size={14} color={ACCENT} />
            smart anbefaling basert på behov
          </p>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight">
            finn bilen som faktisk passer deg.
          </h1>

          <p className="mt-5 text-base leading-7 text-[#B7B7D6]">
            carctrl hjelper deg å sammenligne pris, rekkevidde, plass,
            trygghet og totale kostnader — uten bilsjargong.
          </p>
        </motion.div>

        <div className="mt-7 rounded-[2rem] border border-[#1C1C30] bg-[#111118]/90 p-3 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-4 py-4">
            <Search size={18} className="text-[#8888AA]" />
            <input
              placeholder="søk bil, budsjett eller behov"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#555577]"
            />
            <SlidersHorizontal size={18} color={ACCENT} />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["smart", "smart"],
              ["familie", "familie"],
              ["billigst", "lav kost"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`rounded-2xl px-3 py-3 text-xs transition ${
                  active === id
                    ? "bg-[#FFB84D] text-[#0A0A0F]"
                    : "bg-[#0A0A0F] text-[#8888AA]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6 space-y-3">
          {cars.map((car, index) => (
            <motion.article
              key={car.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-[#1C1C30] bg-[#111118] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#FFB84D]/10 px-2 py-1 text-[11px] text-[#FFB84D]">
                    <Star size={11} fill={ACCENT} />
                    {car.tag}
                  </div>
                  <h2 className="text-xl font-bold">{car.name}</h2>
                  <p className="text-sm text-[#8888AA]">{car.type}</p>
                </div>

                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0A0A0F]">
                  <span className="text-lg font-black text-[#FFB84D]">
                    {car.score}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <Metric icon={<Gauge size={15} />} label="pris" value={car.price} />
                <Metric icon={<BatteryCharging size={15} />} label="rekkevidde" value={car.range} />
                <Metric icon={<Zap size={15} />} label="kost" value={car.cost} />
              </div>

              <button className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#F0F0FF] px-4 py-3 text-sm font-bold text-[#0A0A0F]">
                se vurdering
                <ChevronRight size={18} />
              </button>
            </motion.article>
          ))}
        </section>

        <footer className="mt-auto pt-8 pb-2">
          <div className="rounded-[1.5rem] border border-[#1C1C30] bg-[#111118]/70 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} color={ACCENT} />
              <p className="text-sm text-[#B7B7D6]">
                uavhengige anbefalinger. ingen forhandlerstøy.
              </p>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-[#0A0A0F] p-3">
      <div className="mb-2 text-[#FFB84D]">{icon}</div>
      <p className="text-[10px] uppercase tracking-wide text-[#666688]">{label}</p>
      <p className="mt-1 text-xs font-semibold text-[#F0F0FF]">{value}</p>
    </div>
  );
}

export default App;
