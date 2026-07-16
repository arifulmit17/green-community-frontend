import Image from "next/image";
import tutorimg1 from "../../public/Garden-hero.jpg"; // Adjust the path as necessary
export function Hero() {
  const hero = {
    image: tutorimg1,
    title: "Grow Ideas for a Greener Future",
    subtitle:
      "Share and discover sustainable solutions that make a real impact",
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={hero.image}
        alt={hero.title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl text-white">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {hero.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-xl">
            {hero.subtitle}
          </p>

          <button
  className="
    group
    rounded-xl
    bg-gradient-to-r
    from-green-500
    to-emerald-600
    px-8
    py-4
    text-lg
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-105
    hover:shadow-[0_15px_35px_rgba(34,197,94,0.35)]
    active:scale-95
  "
>
  <span className="flex items-center gap-2">
    Explore Ideas
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>
</button>
        </div>
      </div>
    </section>
  );
}