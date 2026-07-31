import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useData from "../hook/useData";
import {
  Star,
  Clock,
  MapPin,
  ArrowLeft,
  BadgePercent,
  Navigation,
  CircleCheck,
  CircleX,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const IMAGE_BASE = "https://media-assets.swiggy.com/swiggy/image/upload/";

function ratingBadgeClass(rating) {
  if (!rating) return "bg-gray-100 text-gray-600";
  if (rating >= 4.3) return "bg-emerald-600 text-white";
  if (rating >= 3.5) return "bg-amber-500 text-white";
  return "bg-red-500 text-white";
}

function StatCard({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-xl bg-gray-50 p-3.5">
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Icon size={13} />
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function parsePrice(costForTwo) {
  const match = costForTwo?.match(/[\d,]+/);
  return match ? Number(match[0].replace(/,/g, "")) : null;
}

export default function RestaurantDetails() {
  const { id } = useParams();
  const { data, loading } = useData();
  const restaurant = data?.find((d) => d?.info?.id == id);
  const info = restaurant?.info;

  const { addToCart, removeFromCart } = useCart();

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [qty, setQty] = useState(1);

  const unitPrice = parsePrice(info?.costForTwo) ?? 0;

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-gray-400">
        Loading…
      </main>
    );
  }

  if (!restaurant) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">Restaurant not found</h2>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-pink-600 underline">
          Back to home
        </Link>
      </main>
    );
  }

  const offer = info.aggregatedDiscountInfoV3;
  const googleRating = info.externalRatings?.aggregatedRating;
  const isOpen = info.availability?.opened ?? info.isOpen;

  const toggleCuisine = (name) =>
    setSelectedCuisines((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );

  const total = unitPrice * qty;

  const handleAddToCart = () => {
    addToCart({
      ...info,
      selectedCuisines,
      qty,
      total,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          maxHeight: "70vh",
          overflow: "hidden",
          background: "#f3f4f6",
        }}
      >
        <img
          src={`${IMAGE_BASE}${info.cloudinaryImageId}`}
          alt={info.name}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05) 60%, transparent)",
          }}
        />

        <Link
          to="/"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:bg-white"
          aria-label="Back to home"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </Link>

        {info.type === "F" && (
          <span className="absolute left-16 top-4 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            Promoted
          </span>
        )}
      </div>

      <div className="relative z-10 mx-auto -mt-[300px] max-w-3xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-gray-900">{info.name}</h1>
              <p className="mt-1.5 flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} className="shrink-0" />
                {info.areaName || info.locality}
              </p>
            </div>

            <span
              className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-sm font-bold ${ratingBadgeClass(
                info.avgRating
              )}`}
            >
              <Star size={13} className="fill-current" />
              {info.avgRatingString || info.avgRating || "New"}
            </span>
          </div>

          {offer?.header && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
              <BadgePercent size={16} className="shrink-0" />
              {offer.discountTag ? `${offer.discountTag} · ${offer.header}` : offer.header}
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <StatCard
              icon={Clock}
              label="Delivery time"
              value={info.sla?.slaString || (info.sla?.deliveryTime && `${info.sla.deliveryTime} mins`)}
            />
            <StatCard icon={Navigation} label="Distance" value={info.sla?.lastMileTravelString} />
            <StatCard icon={Star} label="Cost for two" value={info.costForTwo} />
            <StatCard
              icon={isOpen ? CircleCheck : CircleX}
              label="Status"
              value={isOpen ? "Open now" : "Closed"}
            />
          </div>

          {(googleRating || info.totalRatingsString) && (
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
              {info.totalRatingsString && <span>{info.totalRatingsString} ratings on Swiggy</span>}
              {googleRating && (
                <span>
                  · {googleRating.rating} on Google ({googleRating.ratingCount})
                </span>
              )}
            </div>
          )}
        </div>

       
        <div className="mt-5 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">Cuisines</h2>
          <p className="mt-0.5 text-sm text-gray-500">Pick what you're in the mood for</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {(info.cuisines || []).map((name) => {
              const isSelected = selectedCuisines.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleCuisine(name)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                    isSelected
                      ? "border-pink-600 bg-pink-600 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Order for two</p>
              <p className="text-xs text-gray-500">{info.costForTwo}</p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center text-sm font-semibold text-gray-900">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {unitPrice > 0 && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm text-gray-500">
                {selectedCuisines.length > 0
                  ? selectedCuisines.join(", ")
                  : "No cuisine selected"}
              </span>
              <span className="text-lg font-bold text-gray-900">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-100 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">{info.name}</p>
            {unitPrice > 0 && (
              <p className="text-xs text-gray-500">
                ₹{total.toLocaleString("en-IN")} · {qty} {qty === 1 ? "order" : "orders"}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isOpen}
            className="flex shrink-0 items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={16} />
            {isOpen ? "Add to cart" : "Closed"}
          </button>
        </div>
      </div>
    </main>
  );
}