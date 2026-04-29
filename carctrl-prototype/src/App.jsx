import React, { useMemo, useState } from "react";
import {
  Car,
  Search,
  Heart,
  BarChart3,
  ClipboardList,
  Home,
  BatteryCharging,
  Luggage,
  Gauge,
  CalendarDays,
  Star,
  Plus,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

const ACCENT = "#FFD23F";

const cars = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model Y Long Range",
    price: 499900,
    range: 533,
    boot: 854,
    power: 514,
    status: "prøvekjørt",
    score: 88,
    note: "Best på plass og totalverdi.",
  },
  {
    id: 2,
    brand: "Volvo",
    model: "EX40 Twin Motor",
    price: 559000,
    range: 538,
    boot: 410,
    power: 408,
    status: "favoritt",
    score: 84,
    note: "Trygg, premium og kompakt.",
  },
  {
    id: 3,
    brand: "Skoda",
    model: "Enyaq 85x",
    price: 529000,
    range: 540,
    boot: 585,
    power: 286,
    status: "interessert",
    score: 86,
    note: "Veldig praktisk familiebil.",
  },
];

function price(value) {
  return new Intl.NumberFormat("nb-NO").format(value) + " kr";
}

function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-[410px] rounded-[3rem] border border-[#2B2B3D] bg-[#050509] p-3 shadow-2xl shadow-black/50">
      <div className="relative h-[820px] overflow-hidden rounded-[2.35rem] border border-[#1F1F2E] bg-[#0A0A0F]">
        <div className="absolute left-1/2 top-2 z-30 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-12">
      <div>
        <p className="text-xs text-[#8888AA]">din biloversikt</p>
        <h1 className="font-mono text-2xl font-bold text-[#F0F0FF]">
          carctrl
        </h1>
      </div>
      <div
        className="grid h-11 w-11 place-items-center rounded-2xl border border-[#3A3A4E] bg-[#111118]"
        style={{ boxShadow: `0 0 36px ${ACCENT}22` }}
      >
        <Car className="h-6 w-6" style={{ color: ACCENT }} />
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#242438] bg-[#111118] p-3">
      <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
      <p className="text-[11px] text-[#8888AA]">{label}</p>
      <p className="text-sm font-semibold text-[#F0F0FF]">{value}</p>
    </div>
  );
}

function CarMiniCard({ car }) {
  return (
    <div className="rounded-[1.7rem] border border-[#242438] bg-[#111118] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0A0A0F]">
          <Car className="h-8 w-8" style={{ color: ACCENT }} />
        </div>
        <div className="rounded-full bg-[#FFD23F18] px-3 py-1 text-xs font-semibold text-[#FFD23F]">
          {car.score}/100
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.22em] text-[#8888AA]">
        {car.brand}
      </p>
      <h3 className="mt-1 text-lg font-bold leading-tight text-[#F0F0FF]">
        {car.model}
      </h3>
      <p className="mt-1 text-sm text-[#8888AA]">{price(car.price)}</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-[#0A0A0F] p-2">
          <p className="text-[10px] text-[#8888AA]">rekkevidde</p>
          <p className="text-xs font-bold text-[#F0F0FF]">{car.range} km</p>
        </div>
        <div className="rounded-xl bg-[#0A0A0F] p-2">
          <p className="text-[10px] text-[#8888AA]">bagasje</p>
          <p className="text-xs font-bold text-[#F0F0FF]">{car.boot} l</p>
        </div>
        <div className="rounded-xl bg-[#0A0A0F] p-2">
          <p className="text-[10px] text-[#8888AA]">effekt</p>
          <p className="text-xs font-bold text-[#F0F0FF]">{car.power} hk</p>
        </div>
      </div>
    </div>
  );
}

function HomeScreen() {
  const best = cars[0];

  return (
    <div className="h-full overflow-y-auto pb-28">
      <TopBar />

      <section className="px-5 pt-6">
        <div className="rounded-[2rem] border border-[#2D2D42] bg-gradient-to-br from-[#1A1A24] to-[#0D0D14] p-5">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#FFD23F]">
                beste match
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-[#F0F0FF]">
                {best.brand}
                <br />
                {best.model}
              </h2>
              <p className="mt-2 text-sm text-[#8888AA]">{best.note}</p>
            </div>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#FFD23F] text-lg font-black text-[#0A0A0F]">
              {best.score}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Metric icon={BatteryCharging} label="range" value={`${best.range} km`} />
            <Metric icon={Luggage} label="bagasje" value={`${best.boot} l`} />
            <Metric icon={Gauge} label="effekt" value={`${best.power} hk`} />
          </div>
        </div>
      </section>

      <section className="px-5 pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#F0F0FF]">du vurderer</h2>
          <p className="text-sm text-[#8888AA]">{cars.length} biler</p>
        </div>

        <div className="space-y-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-3 rounded-3xl border border-[#242438] bg-[#111118] p-3"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0A0A0F]">
                <Car className="h-7 w-7" style={{ color: ACCENT }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#F0F0FF]">
                  {car.brand} {car.model}
                </p>
                <p className="text-xs text-[#8888AA]">
                  {car.status} · {car.range} km · {price(car.price)}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#55556F]" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <div className="rounded-[1.8rem] border border-[#242438] bg-[#111118] p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0A0A0F]">
              <CalendarDays className="h-6 w-6" style={{ color: ACCENT }} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#F0F0FF]">
                neste prøvekjøring
              </p>
              <p className="text-xs text-[#8888AA]">
                Volvo EX40 · fredag 14:00
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchScreen() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return cars.filter((car) =>
      `${car.brand} ${car.model}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="h-full overflow-y-auto pb-28">
      <TopBar />

      <section className="px-5 pt-6">
        <h2 className="mb-4 text-2xl font-bold text-[#F0F0FF]">
          finn bilen som passer deg
        </h2>

        <div className="flex items-center gap-3 rounded-3xl border border-[#2A2A3C] bg-[#111118] px-4 py-4">
          <Search className="h-5 w-5 text-[#8888AA]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="søk merke eller modell"
            className="w-full bg-transparent text-sm text-[#F0F0FF] outline-none placeholder:text-[#55556F]"
          />
          <SlidersHorizontal className="h-5 w-5 text-[#8888AA]" />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto">
          {["elbil", "familie", "awd", "rekkevidde", "premium"].map((tag) => (
            <button
              key={tag}
              className="whitespace-nowrap rounded-full border border-[#2A2A3C] bg-[#111118] px-4 py-2 text-sm text-[#DADAF0]"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4 px-5 pt-6">
        {filtered.map((car) => (
          <CarMiniCard key={car.id} car={car} />
        ))}
      </section>
    </div>
  );
}

function ShortlistScreen() {
  return (
    <div className="h-full overflow-y-auto pb-28">
      <TopBar />

      <section className="px-5 pt-6">
        <h2 className="mb-4 text-2xl font-bold text-[#F0F0FF]">
          shortlist
        </h2>

        <div className="space-y-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="rounded-[1.7rem] border border-[#242438] bg-[#111118] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#8888AA]">
                    {car.status}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#F0F0FF]">
                    {car.brand} {car.model}
                  </h3>
                </div>
                <Heart className="h-6 w-6 text-[#FFD23F]" />
              </div>

              <p className="mb-4 text-sm text-[#8888AA]">{car.note}</p>

              <div className="h-2 overflow-hidden rounded-full bg-[#242438]">
                <div
                  className="h-full rounded-full bg-[#FFD23F]"
                  style={{ width: `${car.score}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[#8888AA]">
                personlig matchscore: {car.score}/100
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CompareScreen() {
  const left = cars[0];
  const right = cars[2];

  const rows = [
    ["pris", price(left.price), price(right.price)],
    ["rekkevidde", `${left.range} km`, `${right.range} km`],
    ["bagasje", `${left.boot} liter`, `${right.boot} liter`],
    ["effekt", `${left.power} hk`, `${right.power} hk`],
    ["score", `${left.score}/100`, `${right.score}/100`],
  ];

  return (
    <div className="h-full overflow-y-auto pb-28">
      <TopBar />

      <section className="px-5 pt-6">
        <h2 className="mb-4 text-2xl font-bold text-[#F0F0FF]">
          sammenlign
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {[left, right].map((car) => (
            <div
              key={car.id}
              className="rounded-[1.6rem] border border-[#242438] bg-[#111118] p-4"
            >
              <Car className="mb-4 h-8 w-8" style={{ color: ACCENT }} />
              <p className="text-xs text-[#8888AA]">{car.brand}</p>
              <h3 className="text-base font-bold leading-tight text-[#F0F0FF]">
                {car.model}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-[#242438] bg-[#111118]">
          {rows.map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-3 border-b border-[#242438] px-4 py-4 last:border-b-0"
            >
              <p className="text-xs text-[#8888AA]">{row[0]}</p>
              <p className="text-right text-sm font-semibold text-[#F0F0FF]">
                {row[1]}
              </p>
              <p className="text-right text-sm font-semibold text-[#F0F0FF]">
                {row[2]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TestDriveScreen() {
  return (
    <div className="h-full overflow-y-auto pb-28">
      <TopBar />

      <section className="px-5 pt-6">
        <h2 className="mb-4 text-2xl font-bold text-[#F0F0FF]">
          prøvekjøring
        </h2>

        <div className="rounded-[1.8rem] border border-[#242438] bg-[#111118] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#FFD23F]">
            aktiv vurdering
          </p>
          <h3 className="mt-2 text-xl font-bold text-[#F0F0FF]">
            Volvo EX40 Twin Motor
          </h3>
          <p className="mt-2 text-sm text-[#8888AA]">
            Registrer inntrykkene dine rett etter prøvekjøring.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {["komfort", "plass", "støy", "kjørefølelse", "infotainment"].map(
            (label, index) => (
              <div
                key={label}
                className="rounded-[1.4rem] border border-[#242438] bg-[#111118] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#F0F0FF]">
                    {label}
                  </p>
                  <p className="text-sm text-[#FFD23F]">{8 - index}/10</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#242438]">
                  <div
                    className="h-full rounded-full bg-[#FFD23F]"
                    style={{ width: `${(8 - index) * 10}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-3xl bg-[#FFD23F] px-5 py-4 font-bold text-[#0A0A0F]">
          <Plus className="h-5 w-5" />
          lagre vurdering
        </button>
      </section>
    </div>
  );
}

function BottomNav({ active, setActive }) {
  const items = [
    ["home", Home, "hjem"],
    ["search", Search, "søk"],
    ["shortlist", Heart, "liste"],
    ["compare", BarChart3, "match"],
    ["test", ClipboardList, "test"],
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#242438] bg-[#0A0A0F]/95 px-3 pb-5 pt-3 backdrop-blur-xl">
      <div className="grid grid-cols-5 gap-1">
        {items.map(([key, Icon, label]) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px]"
              style={{
                color: isActive ? ACCENT : "#777791",
                background: isActive ? "#FFD23F14" : "transparent",
              }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("home");

  const screens = {
    home: <HomeScreen />,
    search: <SearchScreen />,
    shortlist: <ShortlistScreen />,
    compare: <CompareScreen />,
    test: <TestDriveScreen />,
  };

  return (
    <div className="min-h-screen bg-[#050509] px-4 py-8 text-[#F0F0FF]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,210,63,0.18),transparent_34%)]" />

      <div className="relative mx-auto mb-6 max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#FFD23F]">
          mobil prototype
        </p>
        <h1 className="mt-2 font-mono text-4xl font-bold">carctrl</h1>
        <p className="mt-2 text-sm text-[#8888AA]">
          finn, vurder, prøvekjør og sammenlign biler.
        </p>
      </div>

      <PhoneFrame>
        {screens[active]}
        <BottomNav active={active} setActive={setActive} />
      </PhoneFrame>
    </div>
  );
}
