"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Leaf } from "lucide-react";
import Link from "next/link";

const offers = [
  {
    title: "Share Your Idea",
    description:
      "Got a sustainable idea? Submit it and get feedback from our admins to make it even better.",
    icon: Lightbulb,
    cta: "Submit Idea",
    href: "/login",
  },
  {
    title: "Collaborate with Community",
    description:
      "Connect with like-minded people, discuss ideas, and work together on real eco solutions.",
    icon: Users,
    cta: "Explore Ideas",
    href: "/ideas",
  },
  {
    title: "Make Real Impact",
    description:
      "Turn approved ideas into action and contribute to building a greener, more sustainable future.",
    icon: Leaf,
    cta: "Get Started",
    href: "/signup",
  },
];

export function OfferSection() {
  return (
    <section className="w-full px-4 bg-background/40">
      <div className="max-w-6xl mx-auto text-center space-y-12">

        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            What You Can Do 🌿
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Join our community and take action towards a sustainable future
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl border shadow-sm hover:shadow-lg transition"
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">

                  {/* Icon */}
                  <div className="p-4 rounded-full bg-green-100">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {offer.description}
                  </p>

                  {/* CTA */}
                  <Button
                    asChild
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                  >
                    <Link href={offer.href}>{offer.cta}</Link>
                  </Button>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}