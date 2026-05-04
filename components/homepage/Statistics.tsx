"use client";

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Lightbulb, CheckCircle } from "lucide-react";

const stats = [
  {
    title: "Ideas Shared",
    value: 120,
    icon: Lightbulb,
  },
  {
    title: "Ideas Approved",
    value: 85,
    icon: CheckCircle,
  },
  {
    title: "Community Members",
    value: 540,
    icon: Users,
  },
  {
    title: "Eco Impact Actions",
    value: 230,
    icon: Leaf,
  },
];

export function StatsSection() {
  return (
    <section className="w-full px-4 bg-background">
      <div className="max-w-6xl mx-auto text-center space-y-12">

        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Community Impact 🌍
          </h2>
          <p className="text-muted-foreground mt-2">
            Together, we are creating real change through sustainable ideas
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-6 flex flex-col items-center gap-4">

                  {/* Icon */}
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Number */}
                  <h3 className="text-2xl md:text-3xl font-bold text-primary">
                    <CountUp end={stat.value} duration={2} />+
                  </h3>

                  {/* Label */}
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}