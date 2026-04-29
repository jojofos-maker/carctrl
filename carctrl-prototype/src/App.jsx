
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Car, CheckCircle2, Plus, SlidersHorizontal, BatteryCharging, Gauge, Luggage, Zap, CalendarDays, Heart, X, BarChart3, ClipboardList, Sparkles } from "lucide-react";

const ACCENT = "#FFD23F";

const cars = [
  { id: 1, brand: "Tesla", model: "Model Y Long Range", year: 2025, type: "Elbil", price: 499900, range: 533, power: 514, boot: 854, seats: 5, awd: true, tow: 1600, status: "Prøvekjørt", score: 88, tags: ["rekkevidde", "plass", "awd"] },
  { id: 2, brand: "Volvo", model: "EX40 Twin Motor", year: 2025, type: "Elbil", price: 559000, range: 538, power: 408, boot: 410, seats: 5, awd: true, tow: 1800, status: "Favoritt", score: 84, tags: ["trygghet", "premium", "awd"] },
  { id: 3, brand: "Skoda", model: "Enyaq 85x", year: 2025, type: "Elbil", price: 529000, range: 540, power: 286, boot: 585, seats: 5, awd: true, tow: 1200, status: "Interessert", score: 86, tags: ["familie", "komfort", "praktisk"] },
  { id: 4, brand: "BMW", model: "iX1 xDrive30", year: 2025, type: "Elbil", price: 589000, range: 438, power: 313, boot: 490, seats: 5, awd: true, tow: 1200, status: "Skal sjekkes", score: 79, tags: ["premium", "kompakt", "kjøreglede"] }
];

const statuses = ["Alle", "Interessert", "Skal sjekkes", "Booket", "Prøvekjørt", "Favoritt", "Forkastet"];

function formatPrice(value) {
  return new Intl.NumberFormat("nb-NO").format(value) + " kr";
}

function Button({ children, className = "", ...props }) {
  return <button className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${className}`} {...props}>{children}</button>;
}

function ScoreRing({ score }) {
  const deg = Math.round((score / 100) * 360);
  return (
    <div className="relative grid h-16 w-16 place-items-center rounded-full" style={{ background: `conic-gradient(${ACCENT} ${deg}deg, #252538 ${deg}deg)` }}>
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#111118] text-sm font-bold text-[#F0F0FF]">{score}</div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#1C1C30] bg-[#0A0A0F]/60 p-3">
      <div className="mb-1 flex items-center gap-2 text-xs text-[#8888AA]"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <div className="text-sm font-semibold text-[#F0F0FF]">{value}</div>
    </div>
  );
}

function CarCard({ car, selected, onToggle }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="overflow-hidden rounded-3xl border border-[#1C1C30] bg-[#111118] text-[#F0F0FF] shadow-2xl shadow-black/20">
        <div className="relative h-36 bg-gradient-to-br from-[#1a1a24] via-[#101018] to-[#0A0A0F] p-5">
          <div className="absolute right-5 top-5 rounded-full border border-[#34344A] bg-black/20 px-3 py-1 text-xs">{car.status}</div>
          <div className="absolute bottom-4 left-5 right-5">
            <div className="mb-3 flex h-16 items-end justify-center rounded-2xl border border-[#2A2A3C] bg-[#0A0A0F]/70">
              <Car className="mb-3 h-10 w-10" style={{ color: ACCENT }} />
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#8888AA]">{car.brand}</p>
              <h3 className="mt-1 text-xl font-bold leading-tight">{car.model}</h3>
              <p className="mt-1 text-sm text-[#8888AA]">{car.year} · {car.type} · {formatPrice(car.price)}</p>
            </div>
            <ScoreRing score={car.score} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Metric icon={BatteryCharging} label="Rekkevidde" value={`${car.range} km`} />
            <Metric icon={Luggage} label="Bagasje" value={`${car.boot} liter`} />
            <Metric icon={Gauge} label="Effekt" value={`${car.power} hk`} />
            <Metric icon={Zap} label="Henger" value={`${car.tow} kg`} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {car.tags.map((tag) => <span key={tag} className="rounded-full border border-[#2A2A3C] px-3 py-1 text-xs text-[#DADAF0]">#{tag}</span>)}
          </div>

          <div className="mt-5 flex gap-2">
            <Button onClick={() => onToggle(car.id)} className="flex-1 bg-[#F0F0FF] text-[#0A0A0F] hover:bg-white">
              {selected ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <BarChart3 className="mr-2 h-4 w-4" />}
              {selected ? "Valgt" : "Sammenlign"}
            </Button>
            <Button className="border border-[#2A2A3C] bg-transparent text-[#F0F0FF] hover:bg-[#1A1A24]"><ClipboardList className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComparePanel({ selectedCars, onClear }) {
  if (selectedCars.length === 0) return null;
  return (
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-5 left-1/2 z-20 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-3xl border border-[#2A2A3C] bg-[#111118]/95 p-4 text-[#F0F0FF] shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><p className="text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Sammenligning</p><h3 className="text-lg font-bold">{selectedCars.length} biler valgt</h3></div>
        <div className="flex flex-1 gap-2 overflow-x-auto">
          {selectedCars.map((car) => <div key={car.id} className="min-w-44 rounded-2xl border border-[#252538] bg-[#0A0A0F] p-3"><p className="text-sm font-semibold">{car.brand} {car.model}</p><p className="text-xs text-[#8888AA]">Score {car.score} · {car.range} km</p></div>)}
        </div>
        <div className="flex gap-2"><Button className="text-[#0A0A0F]" style={{ backgroundColor: ACCENT }}>Åpne tabell</Button><Button onClick={onClear} className="border border-[#2A2A3C] bg-transparent text-[#F0F0FF]"><X className="h-4 w-4" /></Button></div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Alle");
  const [selected, setSelected] = useState([1, 3]);

  const filtered = useMemo(() => cars.filter((car) => {
    const text = `${car.brand} ${car.model} ${car.tags.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "Alle" || car.status === status);
  }), [query, status]);

  const selectedCars = cars.filter((car) => selected.includes(car.id));
  const toggleSelected = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 4 ? [...current, id] : current);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0FF]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,210,63,0.16),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_24%)]" />
      <main className="relative mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-3xl border border-[#39394A] bg-[#111118] shadow-xl" style={{ boxShadow: `0 0 48px ${ACCENT}22` }}><Car className="h-7 w-7" style={{ color: ACCENT }} /></div>
            <div><h1 className="font-mono text-3xl font-bold tracking-tight">carctrl</h1><p className="text-sm text-[#8888AA]">Finn riktig bil. Ikke bare neste bil.</p></div>
          </div>
          <div className="flex gap-2"><Button className="border border-[#2A2A3C] bg-[#111118] text-[#F0F0FF] hover:bg-[#1A1A24]"><CalendarDays className="mr-2 h-4 w-4" /> Prøvekjøringer</Button><Button className="text-[#0A0A0F]" style={{ backgroundColor: ACCENT }}><Plus className="mr-2 h-4 w-4" /> Legg til bil</Button></div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="rounded-3xl border border-[#1C1C30] bg-[#111118] p-5"><div className="mb-4 flex items-center gap-2 text-sm text-[#8888AA]"><Search className="h-4 w-4" /> Søk i bilmarkedet</div><div className="flex items-center gap-3 rounded-2xl border border-[#2A2A3C] bg-[#0A0A0F] px-4 py-3"><Search className="h-5 w-5 text-[#8888AA]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Søk merke, modell, familie, rekkevidde..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#55556F]" /><SlidersHorizontal className="h-5 w-5 text-[#8888AA]" /></div></div>
          <div className="rounded-3xl border border-[#1C1C30] bg-[#111118] p-5"><div className="mb-1 flex items-center gap-2 text-sm text-[#8888AA]"><Heart className="h-4 w-4" /> Shortlist</div><p className="text-3xl font-bold">{cars.length}</p><p className="text-sm text-[#8888AA]">biler vurderes nå</p></div>
          <div className="rounded-3xl border border-[#1C1C30] bg-[#111118] p-5"><div className="mb-1 flex items-center gap-2 text-sm text-[#8888AA]"><Sparkles className="h-4 w-4" /> Beste match</div><p className="text-lg font-bold">Tesla Model Y</p><p className="text-sm text-[#8888AA]">88/100 basert på dine behov</p></div>
        </section>

        <section className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {statuses.map((item) => <button key={item} onClick={() => setStatus(item)} className="whitespace-nowrap rounded-full border px-4 py-2 text-sm transition" style={{ borderColor: status === item ? ACCENT : "#2A2A3C", background: status === item ? `${ACCENT}18` : "#111118", color: status === item ? ACCENT : "#DADAF0" }}>{item}</button>)}
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((car) => <CarCard key={car.id} car={car} selected={selected.includes(car.id)} onToggle={toggleSelected} />)}
        </section>
      </main>
      <ComparePanel selectedCars={selectedCars} onClear={() => setSelected([])} />
    </div>
  );
}
