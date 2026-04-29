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
  Plus,
  BatteryCharging,
  Gauge,
  Luggage,
  Users,
  ChevronRight,
  Star,
} from "lucide-react";

const A = "#FFB84D";

const cars = [
  {
    id: 1,
    brand: "Volvo",
    model: "EX30",
    segment: "compact suv",
    drivetrain: "electric",
    price: "329 900",
    range: "480",
    luggage: "318",
    seats: "5",
    score: 92,
    status: "shortlist",
  },
  {
    id: 2,
    brand: "Tesla",
    model: "Model Y",
    segment: "family suv",
    drivetrain: "electric",
    price: "429 990",
    range: "533",
    luggage: "854",
    seats: "5",
    score: 89,
    status: "test driven",
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Yaris Cross",
    segment: "compact crossover",
    drivetrain: "hybrid",
    price: "339 000",
    range: "hybrid",
    luggage: "397",
    seats: "5",
    score: 84,
    status: "considering",
  },
];

const filters = ["all", "electric", "hybrid", "suv", "family", "under 400k"];

export default function App() {
  const [tab, setTab] = useState("market");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState([1, 2]);

  return (
    <div className="min-h-screen bg-black text-[#F4F4FF]">
      <div className="mx-auto min-h-screen max-w-[430px] bg-[#08080D] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,184,77,0.22),transparent_34%)]" />

        <header className="sticky top-0 z-30 bg-[#08080D]/88 backdrop-blur-2xl border-b border-white/[0.06]">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[22px] tracking-tight">
                  car<span className="text-[#FFB84D]">ctrl</span>
                </div>
                <p className="text-[12px] text-white/38">market overview</p>
              </div>

              <button className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.08] grid place-items-center">
                <User size={17} className="text-white/70" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-[22px] bg-white/[0.06] border border-white/[0.08] px-4 py-3.5">
              <Search size={18} className="text-white/35" />
              <input
                className="w-full bg-transparent outline-none text-[15px] placeholder:text-white/28"
                placeholder="search brand or model"
              />
              <SlidersHorizontal size={18} className="text-[#FFB84D]" />
            </div>
          </div>
        </header>

        <main className="relative z-10 px-5 pt-5 pb-28">
          {tab === "market" && (
            <>
              <section className="rounded-[32px] border border-white/[0.07] bg-white/[0.045] p-5 shadow-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[#FFB84D]">
                      overview
                    </p>
                    <h1 className="mt-3 text-[34px] leading-[0.95] font-black tracking-[-0.04em]">
                      find the right car.
                    </h1>
                  </div>

                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFB84D]/12">
                    <Car size={25} className="text-[#FFB84D]" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <MiniStat label="cars" value="1 284" />
                  <MiniStat label="saved" value="7" />
                  <MiniStat label="tests" value="2" />
                </div>
              </section>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
                {filters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] transition ${
                      filter === item
                        ? "bg-[#FFB84D] text-[#08080D] font-bold"
                        : "bg-white/[0.055] text-white/48 border border-white/[0.06]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <Title title="market" action="sort" />

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

          {tab === "garage" && <Garage />}
          {tab === "compare" && <Compare selected={selected} />}
          {tab === "cost" && <Cost />}
        </main>

        <button className="fixed bottom-[86px] left-1/2 z-40 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-[#FFB84D] text-[#08080D] shadow-[0_20px_60px_rgba(255,184,77,0.35)]">
          <Plus size={27} />
        </button>

        <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-white/[0.07] bg-[#08080D]/92 px-5 pb-5 pt-3 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <NavItem icon={Car} label="market" active={tab === "market"} onClick={() => setTab("market")} />
            <NavItem icon={ClipboardList} label="garage" active={tab === "garage"} onClick={() => setTab("garage")} />
            <div className="w-10" />
            <NavItem icon={BarChart3} label="compare" active={tab === "compare"} onClick={() => setTab("compare")} />
            <NavItem icon={Wallet} label="cost" active={tab === "cost"} onClick={() => setTab("cost")} />
          </div>
        </nav>
      </div>
    </div>
  );
}

function CarCard({ car, selected, onSelect }) {
  return (
    <article className="rounded-[30px] border border-white/[0.07] bg-white/[0.045] p-4">
      <div className="flex items-start gap-4">
        <div className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-[24px] bg-black/24 border border-white/[0.06]">
          <Car size={34} className="text-[#FFB84D]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-[12px] text-white/38">{car.brand}</p>
              <h3 className="text-[21px] font-black leading-none tracking-[-0.03em]">
                {car.model}
              </h3>
              <p className="mt-1 text-[12px] text-white/38">
                {car.segment} · {car.drivetrain}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FFB84D]/12 px-2.5 py-1.5 text-[15px] font-black text-[#FFB84D]">
              {car.score}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-1.5">
            <Spec icon={Gauge} value={car.price} suffix="kr" />
            <Spec icon={BatteryCharging} value={car.range} suffix="km" />
            <Spec icon={Luggage} value={car.luggage} suffix="l" />
            <Spec icon={Users} value={car.seats} suffix="seter" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onSelect}
          className={`h-12 flex-1 rounded-2xl text-[14px] font-bold transition ${
            selected
              ? "bg-[#FFB84D] text-[#08080D]"
              : "bg-white/[0.065] text-white/72"
          }`}
        >
          {selected ? "selected" : "compare"}
        </button>

        <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.065] text-[#FFB84D]">
          <Heart size={19} />
        </button>

        <button className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.065] text-white/50">
          <ChevronRight size={19} />
        </button>
      </div>
    </article>
  );
}

function Garage() {
  return (
    <>
      <Title title="garage" action="add car" />

      <div className="space-y-3">
        <GarageCard title="shortlist" count="4" text="cars you are seriously considering" />
        <GarageCard title="test driven" count="2" text="your notes, scores and impressions" />
        <GarageCard title="offers" count="1" text="dealer offers and financing options" />
        <GarageCard title="rejected" count="5" text="cars you have ruled out and why" />
      </div>

      <section className="mt-5 rounded-[30px] border border-white/[0.07] bg-white/[0.045] p-5">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#FFB84D]">
          next step
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
          log a test drive
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/45">
          Score comfort, space, noise, software, visibility and overall feel.
        </p>
        <button className="mt-5 h-12 w-full rounded-2xl bg-white text-[#08080D] text-sm font-black">
          start review
        </button>
      </section>
    </>
  );
}

function Compare({ selected }) {
  const chosen = cars.filter((car) => selected.includes(car.id));

  return (
    <>
      <Title title="compare" action={`${chosen.length} selected`} />

      <div className="grid grid-cols-2 gap-3">
        {chosen.map((car) => (
          <div
            key={car.id}
            className="rounded-[26px] border border-white/[0.07] bg-white/[0.045] p-4"
          >
            <p className="text-xs text-white/38">{car.brand}</p>
            <h3 className="text-xl font-black tracking-[-0.03em]">{car.model}</h3>

            <div className="mt-5 space-y-3 text-xs">
              <CompareRow label="price" value={`${car.price} kr`} />
              <CompareRow label="range" value={`${car.range} km`} />
              <CompareRow label="luggage" value={`${car.luggage} l`} />
              <CompareRow label="score" value={car.score} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[30px] border border-[#FFB84D]/25 bg-[#FFB84D]/10 p-5">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#FFB84D]">
          conclusion
        </p>
        <p className="mt-3 text-[15px] leading-6 text-white/72">
          EX30 looks like the best total choice. Model Y wins on space.
        </p>
      </div>
    </>
  );
}

function Cost() {
  return (
    <>
      <Title title="cost" action="edit" />

      <section className="rounded-[32px] border border-white/[0.07] bg-white/[0.045] p-5">
        <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
          estimated monthly cost
        </p>
        <h2 className="mt-3 text-[42px] font-black tracking-[-0.06em]">
          6 850 kr
        </h2>

        <div className="mt-6 space-y-2">
          <CostRow label="loan / leasing" value="4 200 kr" />
          <CostRow label="insurance" value="950 kr" />
          <CostRow label="energy" value="700 kr" />
          <CostRow label="tolls / service" value="1 000 kr" />
        </div>
      </section>
    </>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-black/24 border border-white/[0.055] p-3">
      <p className="text-[18px] font-black tracking-[-0.04em]">{value}</p>
      <p className="mt-1 text-[11px] text-white/35">{label}</p>
    </div>
  );
}

function Spec({ icon: Icon, value, suffix }) {
  return (
    <div className="rounded-2xl bg-black/24 border border-white/[0.055] p-2">
      <Icon size={13} className="mb-1 text-[#FFB84D]" />
      <p className="text-[11px] font-bold leading-tight">{value}</p>
      <p className="text-[9px] text-white/30">{suffix}</p>
    </div>
  );
}

function GarageCard({ title, count, text }) {
  return (
    <div className="flex items-center justify-between rounded-[26px] border border-white/[0.07] bg-white/[0.045] p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#FFB84D]/12">
          <Star size={18} className="text-[#FFB84D]" />
        </div>
        <div>
          <h3 className="font-black tracking-[-0.02em]">{title}</h3>
          <p className="text-xs text-white/38">{text}</p>
        </div>
      </div>
      <div className="text-xl font-black text-[#FFB84D]">{count}</div>
    </div>
  );
}

function Title({ title, action }) {
  return (
    <div className="mb-4 mt-7 flex items-end justify-between">
      <h2 className="text-[24px] font-black tracking-[-0.04em]">{title}</h2>
      <button className="text-[13px] font-bold text-[#FFB84D]">{action}</button>
    </div>
  );
}

function CompareRow({ label, value }) {
  return (
    <div className="flex justify-between gap-2 border-b border-white/[0.07] pb-2">
      <span className="text-white/35">{label}</span>
      <span className="font-bold text-white/78">{value}</span>
    </div>
  );
}

function CostRow({ label, value }) {
  return (
    <div className="flex justify-between rounded-2xl bg-black/24 border border-white/[0.055] px-4 py-3 text-sm">
      <span className="text-white/38">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 text-[11px] transition ${
        active ? "text-[#FFB84D]" : "text-white/30"
      }`}
    >
      <Icon size={21} />
      <span>{label}</span>
    </button>
  );
}
