import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Car,
  Heart,
  BarChart3,
  ClipboardList,
  Wallet,
  User,
  Star,
  Plus,
  CheckCircle2,
  XCircle,
  CalendarDays,
  ChevronRight,
  BatteryCharging,
  Gauge,
  Luggage,
  Users,
} from "lucide-react";

const cars = [
  {
    id: 1,
    brand: "Volvo",
    model: "EX30",
    type: "elbil · kompakt suv",
    price: "329 900 kr",
    range: "480 km",
    luggage: "318 l",
    seats: "5",
    score: 92,
    status: "vurderes",
  },
  {
    id: 2,
    brand: "Tesla",
    model: "Model Y",
    type: "elbil · familie",
    price: "429 990 kr",
    range: "533 km",
    luggage: "854 l",
    seats: "5",
    score: 89,
    status: "prøvekjørt",
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Yaris Cross",
    type: "hybrid · kompakt",
    price: "339 000 kr",
    range: "hybrid",
    luggage: "397 l",
    seats: "5",
    score: 84,
    status: "forkastet",
  },
];

const filters = ["alle", "elbil", "hybrid", "suv", "familie", "under 400k"];

export default function App() {
  const [tab, setTab] = useState("marked");
  const [filter, setFilter] = useState("alle");
  const [selected, setSelected] = useState([1, 2]);

  return (
    <div className="min-h-screen bg-[#050509] text-[#F0F0FF]">
      <div className="relative mx-auto min-h-screen max-w-[430px] overflow-hidden border-x border-[#1C1C30] bg-[#0A0A0F]">
        <div className="absolute -top-28 left-20 h-64 w-64 rounded-full bg-[#FFB84D]/20 blur-3xl" />

        <header className="sticky top-0 z-20 border-b border-[#1C1C30] bg-[#0A0A0F]/95 px-5 pb-4 pt-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xl">
                car<span className="text-[#FFB84D]">ctrl</span>
              </p>
              <p className="text-xs text-[#8888AA]">
                bilmarkedet under kontroll
              </p>
            </div>

            <button className="grid h-11 w-11 place-items-center rounded-2xl border border-[#1C1C30] bg-[#111118]">
              <User size={19} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#1C1C30] bg-[#111118] px-4 py-3">
            <Search size={18} className="text-[#8888AA]" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#666688]"
              placeholder="søk merke, modell eller behov"
            />
            <SlidersHorizontal size={18} className="text-[#FFB84D]" />
          </div>
        </header>

        <main className="px-5 pb-28 pt-5">
          {tab === "marked" && (
            <>
              <Hero />

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {filters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                      filter === item
                        ? "bg-[#FFB84D] text-[#0A0A0F]"
                        : "border border-[#1C1C30] bg-[#111118] text-[#8888AA]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <SectionTitle title="alle biler" action="sorter" />

              <div className="space-y-3">
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    selected={selected.includes(car.id)}
                    onSelect={() =>
                      setSelected((prev) =>
                        prev.includes(car.id)
                          ? prev.filter((id) => id !== car.id)
                          : [...prev, car.id]
                      )
                    }
                  />
                ))}
              </div>
            </>
          )}

          {tab === "mine" && <MyCars />}
          {tab === "compare" && <Compare selected={selected} />}
          {tab === "budget" && <Budget />}
        </main>

        <button className="fixed bottom-24 left-1/2 z-30 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-[#FFB84D] text-[#0A0A0F] shadow-2xl">
          <Plus size={27} />
        </button>

        <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-[#1C1C30] bg-[#0A0A0F]/95 px-5 pb-5 pt-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <NavItem icon={Car} label="marked" active={tab === "marked"} onClick={() => setTab("marked")} />
            <NavItem icon={ClipboardList} label="mine" active={tab === "mine"} onClick={() => setTab("mine")} />
            <div className="w-10" />
            <NavItem icon={BarChart3} label="sammenlign" active={tab === "compare"} onClick={() => setTab("compare")} />
            <NavItem icon={Wallet} label="økonomi" active={tab === "budget"} onClick={() => setTab("budget")} />
          </div>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="rounded-[2rem] border border-[#1C1C30] bg-[#111118] p-5">
      <p className="text-xs text-[#FFB84D]">marked · vurdering · prøvekjøring</p>
      <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight">
        få oversikt over alle biler du vurderer.
      </h1>
      <p className="mt-3 text-sm leading-6 text-[#8888AA]">
        Søk i markedet, lagre aktuelle biler, legg inn egne vurderinger og
        sammenlign før du bestemmer deg.
      </p>
    </section>
  );
}

function CarCard({ car, selected, onSelect }) {
  return (
    <article className="rounded-[1.75rem] border border-[#1C1C30] bg-[#111118] p-4">
      <div className="flex gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-[#1C1C30] bg-[#0A0A0F]">
          <Car size={34} className="text-[#FFB84D]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-xs text-[#8888AA]">{car.brand}</p>
              <h3 className="text-lg font-black leading-tight">{car.model}</h3>
              <p className="text-xs text-[#8888AA]">{car.type}</p>
            </div>

            <div className="rounded-2xl bg-[#FFB84D]/10 px-2 py-1 text-sm font-black text-[#FFB84D]">
              {car.score}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <Data icon={Gauge} label="pris" value={car.price} />
            <Data icon={BatteryCharging} label="rekkevidde" value={car.range} />
            <Data icon={Luggage} label="bagasje" value={car.luggage} />
            <Data icon={Users} label="seter" value={car.seats} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onSelect}
          className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold ${
            selected
              ? "bg-[#FFB84D] text-[#0A0A0F]"
              : "bg-[#0A0A0F] text-[#F0F0FF]"
          }`}
        >
          {selected ? "valgt til sammenligning" : "sammenlign"}
        </button>

        <button className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0A0A0F] text-[#FFB84D]">
          <Heart size={19} />
        </button>
      </div>
    </article>
  );
}

function MyCars() {
  return (
    <section>
      <SectionTitle title="mine biler" action="ny vurdering" />

      <div className="grid gap-3">
        <StatusCard
          icon={Star}
          title="vurderes"
          count="4 biler"
          text="Biler du følger og vurderer aktivt."
        />
        <StatusCard
          icon={CalendarDays}
          title="prøvekjørt"
          count="2 biler"
          text="Legg inn komfort, kjørefølelse og totalinntrykk."
        />
        <StatusCard
          icon={CheckCircle2}
          title="aktuelle"
          count="2 biler"
          text="Kortlisten din før endelig valg."
        />
        <StatusCard
          icon={XCircle}
          title="forkastet"
          count="3 biler"
          text="Lagre hvorfor bilen ikke passet."
        />
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-[#1C1C30] bg-[#111118] p-4">
        <h3 className="font-bold">prøvekjøringsskjema</h3>
        <p className="mt-2 text-sm leading-6 text-[#8888AA]">
          Gi score på komfort, plass, støy, software, parkering, barnesete og
          totalinntrykk.
        </p>
        <button className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#F0F0FF] px-4 py-3 text-sm font-bold text-[#0A0A0F]">
          start vurdering
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function Compare({ selected }) {
  const chosen = cars.filter((car) => selected.includes(car.id));

  return (
    <section>
      <SectionTitle title="sammenlign" action={`${chosen.length} valgt`} />

      <div className="grid grid-cols-2 gap-3">
        {chosen.map((car) => (
          <div
            key={car.id}
            className="rounded-[1.5rem] border border-[#1C1C30] bg-[#111118] p-4"
          >
            <p className="text-xs text-[#8888AA]">{car.brand}</p>
            <h3 className="font-black">{car.model}</h3>
            <div className="mt-4 space-y-3 text-xs">
              <CompareRow label="pris" value={car.price} />
              <CompareRow label="rekkevidde" value={car.range} />
              <CompareRow label="bagasje" value={car.luggage} />
              <CompareRow label="score" value={car.score} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.75rem] border border-[#FFB84D]/30 bg-[#FFB84D]/10 p-4">
        <p className="text-sm font-bold text-[#FFB84D]">foreløpig konklusjon</p>
        <p className="mt-2 text-sm leading-6 text-[#D8D8EE]">
          Volvo EX30 ser ut som beste totalvalg. Tesla Model Y vinner på plass.
        </p>
      </div>
    </section>
  );
}

function Budget() {
  return (
    <section>
      <SectionTitle title="økonomi" action="endre" />

      <div className="rounded-[2rem] border border-[#1C1C30] bg-[#111118] p-5">
        <p className="text-sm text-[#8888AA]">estimert månedskostnad</p>
        <h2 className="mt-2 text-4xl font-black">6 850 kr</h2>

        <div className="mt-5 space-y-3">
          <BudgetRow label="lån/leasing" value="4 200 kr" />
          <BudgetRow label="forsikring" value="950 kr" />
          <BudgetRow label="strøm/drivstoff" value="700 kr" />
          <BudgetRow label="bom/service" value="1 000 kr" />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, action }) {
  return (
    <div className="mb-4 mt-7 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      <button className="text-sm text-[#FFB84D]">{action}</button>
    </div>
  );
}

function Data({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#0A0A0F] p-2">
      <Icon size={14} className="mb-1 text-[#FFB84D]" />
      <p className="text-[#666688]">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function StatusCard({ icon: Icon, title, count, text }) {
  return (
    <div className="rounded-[1.5rem] border border-[#1C1C30] bg-[#111118] p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFB84D]/10">
          <Icon size={20} className="text-[#FFB84D]" />
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs text-[#FFB84D]">{count}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-[#8888AA]">{text}</p>
    </div>
  );
}

function CompareRow({ label, value }) {
  return (
    <div className="flex justify-between gap-2 border-b border-[#1C1C30] pb-2">
      <span className="text-[#8888AA]">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function BudgetRow({ label, value }) {
  return (
    <div className="flex justify-between rounded-2xl bg-[#0A0A0F] px-4 py-3 text-sm">
      <span className="text-[#8888AA]">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 text-[11px] ${
        active ? "text-[#FFB84D]" : "text-[#666688]"
      }`}
    >
      <Icon size={21} />
      {label}
    </button>
  );
}
