const Card = () => (
  <section className="relative shimmer flex flex-col justify-between gap-3 group bg-background rounded-md overflow-hidden text-xs px-5 py-3">
    <div className="flex justify-between items-center">
      <div className="h-7 w-7 rounded-full bg-gray-200" />
    </div>
    <div className="h-8 w-16 rounded-md bg-gray-200 text-sm font-medium" />
    <span className="min-h-20 pb-1 border-b text-fill-text-main line-clamp-3 bg-gray-200 rounded-md"></span>
    <div className="flex gap-2 items-center mt-auto">
      <div className="h-6 w-6 rounded-full bg-gray-200" />
      <div className="h-5 w-24 rounded-md bg-gray-200" />
    </div>
  </section>
);

export default Card;
