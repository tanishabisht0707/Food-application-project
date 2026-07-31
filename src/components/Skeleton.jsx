export default function Sekeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <div className="h-44 w-full bg-pink-100" />
      <div className="space-y-2 p-3.5">
        <div className="h-4 w-3/4 rounded bg-pink-100" />
        <div className="h-3 w-1/2 rounded bg-pink-100" />
        <div className="h-3 w-2/3 rounded bg-pink-100" />
      </div>
    </div>
  );
}