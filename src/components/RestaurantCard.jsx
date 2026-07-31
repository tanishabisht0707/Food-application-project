import { Star, Clock, MapPin, Leaf, BadgePercent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ratingColor = (rating) => {
  if (!rating) return "bg-gray-100 text-gray-600";
  if (rating >= 4.3) return "bg-emerald-600 text-white";
  if (rating >= 3.5) return "bg-amber-500 text-white";
  return "bg-red-500 text-white";
};

const RestaurantCard = ({ restaurant }) => {
  const { info } = restaurant;
  const navigate = useNavigate();

  const offerText = info.aggregatedDiscountInfoV3?.header || info.aggregatedDiscountInfo?.header;
  const isPromoted = info.type === "F" || info.badges?.imageBadges?.length > 0;

  return (
    <div
       onClick={() => navigate(`/restaurant/${info.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`}
          alt={info.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {isPromoted && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            Promoted
          </span>
        )}

        {offerText && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-orange-700 shadow-sm">
            <BadgePercent size={13} className="shrink-0" />
            {offerText}
          </div>
        )}

        <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
          <Clock size={12} />
          {info.sla?.slaString || `${info.sla?.deliveryTime} mins`}
        </span>
      </div>

      <div className="space-y-1.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="truncate text-[16px] font-bold leading-tight text-gray-900">
            {info.name}
          </h2>
          <span
            className={`flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${ratingColor(
              info.avgRating
            )}`}
          >
            <Star size={11} className="fill-current" />
            {info.avgRating || "New"}
          </span>
        </div>

        {info.totalRatingsString && (
          <p className="text-[12px] text-gray-400">{info.totalRatingsString} ratings</p>
        )}

        <p className="truncate text-[13px] text-gray-500">
          {info.cuisines?.join(" · ")}
        </p>

        <div className="flex items-center justify-between pt-1 text-[13px]">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            {info.veg && <Leaf size={12} className="text-emerald-600" />}
            {info.costForTwo}
          </span>
          <span className="flex items-center gap-1 truncate text-gray-400">
            <MapPin size={12} />
            <span className="max-w-[110px] truncate">{info.areaName}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
