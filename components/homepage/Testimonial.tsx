"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageCircle, Leaf } from "lucide-react";

const feedbacks = [
  {
    name: "Ayesha Rahman",
    role: "Community Member",
    message:
      "I shared an idea about reducing plastic in local markets, and the admin feedback helped me refine it into a real initiative!",
  },
  {
    name: "Tanvir Hasan",
    role: "Eco Enthusiast",
    message:
      "This platform connects passionate people. I discovered amazing solar energy ideas and even collaborated with others.",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    message:
      "The feedback system is incredible. My idea got approved and now others are actually trying it in their communities.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeedbackSection() {
  return (
    <section className="w-full  px-4 bg-background">
      <div className="max-w-6xl mx-auto text-center space-y-12">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 flex items-center justify-center gap-2">
            <Leaf className="text-green-600" />
            What Our Community Says
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from people making a difference through shared ideas 🌱
          </p>
        </motion.div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbacks.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
                <CardContent className="p-6 flex flex-col gap-4 text-left">

                  {/* Icon */}
                  <MessageCircle className="w-6 h-6 text-green-600" />

                  {/* Message */}
                  <p className="text-sm text-muted-foreground">
                    “{item.message}”
                  </p>

                  {/* User */}
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.role}
                    </p>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}