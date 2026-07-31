import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import useData from "../hook/useData";
import {
  Search,
  MapPin,
  UtensilsCrossed,
  Star,
  Clock,
  Store,
  ServerCrash,
} from "lucide-react";
import Sekeleton from "../components/Skeleton";
import useDebounce from "../hook/useDebounce";
import { FilterData } from "../components/FilterData";

const categories = [
  "All",
  "Pizzas",
  "Biryani",
  "North Indian",
  "Chinese",
  "Desserts",
  "Healthy",
];

export default function Home() {
  const { data, loading, err } = useData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const debounce = useDebounce(query);
  const filterData = FilterData(data, debounce, category);
  console.log("data : ", data);

  if (err) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <ServerCrash size={22} />
        </span>
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          Couldn't load restaurants
        </h2>
        <p className="mt-1 text-sm text-gray-400">{err}</p>
      </main>
    );
  }

  return (
    <main>
     <section className="relative mb-14 overflow-hidden">
  {/* Background image */}
  <img
    src="/banner-img.jfif"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full object-center"
  />

  {/* Dark + brand gradient overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-br from-pink-700/20 via-pink-600/45 to-black/60" />

  {/* Decorative glow blobs, still on top of the overlay */}
  <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />

  <svg
    className="absolute inset-0 h-full w-full opacity-[0.07]"
    aria-hidden="true"
  >
    <pattern id="hero-dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="white" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#hero-dots)" />
  </svg>

  <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
    <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
      <MapPin size={13} />
      Delivering to Delhi/NCR
    </p>

    <h1 className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl">
      Cravings? <br /> We've got you covered.
    </h1>

    <p className="mt-3 max-w-md text-gray-100 drop-shadow-sm">
      Discover top-rated restaurants near you and get your favourite
      dishes delivered fresh and fast.
    </p>

    <div className="mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl sm:flex-row sm:items-center sm:gap-0 sm:rounded-full">
      <div className="flex items-center gap-2 px-3 py-2.5 sm:w-[38%] sm:border-r sm:border-gray-100">
        <MapPin size={16} className="shrink-0 text-brand-500" />
        <input
          type="text"
          readOnly
          placeholder="Delivery location"
          defaultValue="Delhi/NCR"
          className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>
      <div className="flex flex-1 items-center gap-2 px-3 py-2.5">
        <UtensilsCrossed size={16} className="shrink-0 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants or dishes"
          className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>
      <button
        type="button"
        className="flex items-center justify-center gap-1.5 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700 active:scale-95"
      >
        <Search size={15} />
        Search
      </button>
    </div>
  </div>
</section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="-mt-8 flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-lg shadow-brand-100 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:justify-start sm:gap-3">
            <h2 className="font-display text-xl font-bold text-gray-900">
              Restaurants near you
            </h2>
            <span className="text-sm text-gray-400">
              {loading ? "Loading…" : `${filterData?.length ?? 0} results`}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  category === cat
                    ? "bg-pink-600 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-pink-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <Sekeleton key={i} />)
            : filterData?.map((d) => (
                <RestaurantCard key={d.info.id} restaurant={d} />
              ))}
        </div>

        {!loading && filterData?.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="font-semibold text-gray-900">
              No restaurants match that search
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Try a different dish, cuisine, or category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
