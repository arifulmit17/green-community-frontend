"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "Green Earth Initiative",
    logo: "/green.webp",
  },
  {
    name: "Solar Future Lab",
    logo: "/solar.png",
  },
  {
    name: "EcoRecycle Bangladesh",
    logo: "/plastic.png",
  },
  {
    name: "Clean Energy Network",
    logo: "/renew.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, color: "#6b7280" }, // gray
  visible: {
    opacity: 1,
    y: 0,
    color: "#16a34a", // green 🌿
    transition: { duration: 0.5 },
  },
};

export function PartnersSection() {
  return (
    <section className="w-full px-4 bg-background">
     <div className="relative overflow-hidden">
  <motion.div
    className="flex gap-6"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    }}
  >
    {[...partners, ...partners].map((partner, index) => (
      <Card
        key={index}
        className="min-w-[220px] bg-transparent h-40 border-none shrink-0 hover:shadow-lg transition-all"
      >
        <CardContent className="flex h-full items-center justify-center p-6">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={120}
            height={60}
            className="object-contain  opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </CardContent>
      </Card>
    ))}
  </motion.div>
</div>
    </section>
  );
}