import { StarIcon } from "./Icons";

export function Stars({ rating = 5, count = 5 }: { rating?: number; count?: number }) {
  return (
    <div className="t-stars" role="img" aria-label={`${rating} out of ${count} stars`}>
      {Array.from({ length: count }, (_, i) => (
        <StarIcon key={i} className={i < Math.round(rating) ? undefined : "off"} />
      ))}
    </div>
  );
}
