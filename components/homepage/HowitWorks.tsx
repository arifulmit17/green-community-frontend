"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ShieldCheck, Users } from "lucide-react";

const steps = [
  {
    title: "Share Your Idea",
    description:
      "Submit your sustainability idea—whether it's reducing plastic waste, launching a solar project, or any eco-friendly initiative.",
    icon: Lightbulb,
  },
  {
    title: "Admin Review & Feedback",
    description:
      "Our admins review submissions, provide feedback, and ensure quality ideas are refined and ready for the community.",
    icon: ShieldCheck,
  },
  {
    title: "Inspire the Community",
    description:
      "Approved ideas are published for everyone to explore, discuss, and implement for a greener future.",
    icon: Users,
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full px-4 py-16 bg-muted/40">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        
        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            How It Works 🌱
          </h2>
          <p className="text-muted-foreground mt-2">
            Turn your ideas into real environmental impact in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  
                  {/* Step Number */}
                  <div className="text-sm font-semibold text-primary">
                    Step {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="p-4 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {step.description}
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