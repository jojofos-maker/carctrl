import React, { useState } from "react";
import {
  Home,
  Search,
  Heart,
  User,
  Car,
  Zap,
  Users,
  Coins,
  MapPin,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

const cars = [
  {
    name: "Volvo EX30",
    type: "kompakt el-suv",
    match: 94,
    price: "329 900 kr",
    range: "480 km",
    tag: "beste match",
  },
  {
    name: "Tesla Model Y",
    type: "familie · elbil",
    match: 91,
    price: "429 990 kr",
    range: "533 km",
    tag: "mest plass",
  },
  {
    name: "Toyota Yaris Cross",
    type: "hybrid · trygg",
    match: 86,
    price: "339 000 kr",
    range: "hybrid",
    tag: "lav risiko",
  },
];

const needs = [
  { label: "elbil", icon: Zap },
  { label: "familie", icon: Users },
  { label: "billigst", icon: Coins },
  { label: "bybil", icon: MapPin },
];

export default function App() {
  const [activeNeed, setActiveNeed] = useState("elbil");

  return (
    <div className="min-h-screen bg-[#050509] text-[#F0F0FF]">
      <div className="mx-auto min-h-screen max-w-[430px] bg-[#0A0A0F] relative overflow-hidden border-x border-[#1C1C30]">
        <div className="absolute -top-32 left-16 h-64 w-64 rounded-full bg-[#FFB84D]/20 blur-3xl" />

        <header className="sticky top-0 z-20 bg-[#0A0A0F]/90 backdrop-blur-xl px-5 pt-5 pb-4 border-b border-[#1C1C30]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xl">
                car<span className="text-[#FFB84D]">ctrl</span>
              </p>
              <p className="text-xs text-[#8888AA]">finn riktig bil</p>
            </div>

            <button className="grid h-11 w-11 place-items-center rounded-2xl bg-[#111118] border border-[#1C1C30]">
              <User size={19} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#111118] border border-[#1C1C30] px-4 py-3">
            <Search size={18} className="text-[#8888AA]" />
            <input
              className="w-full bg-transparent outline-none text-sm placeholder:text-[#666688]"
              placeholder="søk etter bil eller behov"
            />
            <SlidersHorizontal size={18} className="text-[#FFB84D]" />
          </div>
        </header>

        <main className="px-5 pt-5 pb-28">
          <section>
            <h1 className="text-3xl font-black leading-tight tracking-tight">
              hva slags bil trenger du?
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#8888AA]">
              Velg behov først. Så finner carctrl bilene som faktisk passer.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {needs.map(({ label, icon: Icon }) => {
                const active = activeNeed === label;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveNeed(label)}
                    className={`rounded-[1.5rem] p-4 text-left border transition ${
                      active
                        ? "bg-[#FFB84D] text-[#0A0A0F] border-[#FFB84D]"
                        : "bg-[#111118] border-[#1C1C30] text-[#F0F0FF]"
                    }`}
                  >
                    <Icon size={22} />
                    <p className="mt-5 text-lg font-bold">{label}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-7">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold">anbefalt for deg</h2>
                <p className="text-xs text-[#8888AA]">basert på {activeNeed}</p>
              </div>

              <button className="text-sm text-[#FFB84D]">se alle</button>
            </div>

            <div className="mt-4 space-y-3">
              {cars.map((car) => (
                <article
                  key={car.name}
                  className="rounded-[1.75rem] bg-[#111118] border border-[#1C1C30] p-4"
                >
                  <div className="flex gap-4">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-[#0A0A0F] border border-[#1C1C30]">
                      <Car size={34} className="text-[#FFB84D]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] text-[#FFB84D] mb-1">
                            {car.tag}
                          </p>
                          <h3 className="font-bold leading-tight">{car.name}</h3>
                          <p className="text-xs text-[#8888AA]">{car.type}</p>
                        </div>

                        <div className="rounded-2xl bg-[#FFB84D]/10 px-2 py-1 text-sm font-black text-[#FFB84D]">
                          {car.match}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-xl bg-[#0A0A0F] p-2">
                          <p className="text-[#666688]">pris</p>
                          <p className="font-semibold">{car.price}</p>
                        </div>
                        <div className="rounded-xl bg-[#0A0A0F] p-2">
                          <p className="text-[#666688]">rekkevidde</p>
                          <p className="font-semibold">{car.range}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#F0F0FF] px-4 py-3 text-sm font-bold text-[#0A0A0F]">
                    åpne vurdering
                    <ChevronRight size={18} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[1.75rem] bg-[#111118] border border-[#1C1C30] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFB84D]/10">
                <ShieldCheck size={21} className="text-[#FFB84D]" />
              </div>
              <div>
                <h3 className="font-bold">uavhengig bilhjelp</h3>
                <p className="text-xs text-[#8888AA]">
                  uten forhandlerstøy og skjulte avtaler
                </p>
              </div>
            </div>
          </section>
        </main>

        <button className="fixed bottom-24 left-1/2 z-30 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-[#FFB84D] text-[#0A0A0F] shadow-2xl">
          <Plus size={26} />
        </button>

        <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-[#1C1C30] bg-[#0A0A0F]/95 px-6 pb-5 pt-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <NavItem icon={Home} label="hjem" active />
            <NavItem icon={Search} label="søk" />
            <div className="w-10" />
            <NavItem icon={Heart} label="lagret" />
            <NavItem icon={User} label="profil" />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }) {
  return (
    <button
      className={`flex flex-col items-center gap-1 text-[11px] ${
        active ? "text-[#FFB84D]" : "text-[#666688]"
      }`}
    >
      <Icon size={21} />
      {label}
    </button>
  );
}
