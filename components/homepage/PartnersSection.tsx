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
      <div className="max-w-6xl mx-auto text-center space-y-12">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="space-y-3"
        >
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with organizations and innovators who are committed
            to building a sustainable future
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl h-50 border shadow-sm hover:shadow-md transition">
                <CardContent className="p-6 flex items-center justify-center">

                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain transition"
                  />

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}