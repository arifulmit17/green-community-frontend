"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Leaf, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center gap-2">
            
            Contact the Green Community
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a sustainability idea, feedback, or need help with your submission?
            Our team is here to support you in making a positive environmental impact 🌱
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* CONTACT FORM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold">
                  Share Your Message
                </h2>

                <form className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Textarea
                    placeholder="Tell us about your idea, feedback, or question..."
                    rows={5}
                  />

                  <Button className="w-full rounded-xl">
                    Submit Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    support@greencommunity.org
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Admin Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Get guidance on your submitted ideas and improve them with expert feedback.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Community Base</h3>
                  <p className="text-sm text-muted-foreground">
                    Dhaka, Bangladesh (Serving a global eco-community)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* EXTRA NOTE */}
            <div className="text-sm text-muted-foreground">
              🌿 Our team typically responds within 24 hours.
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-semibold">
            Explore Ideas & Get Inspired
          </h2>
          <p className="text-muted-foreground">
            Discover sustainable ideas shared by the community or learn how to contribute your own.
          </p>

          <Button size="lg" variant="outline" className="rounded-xl" asChild>
            <Link href="/help">Visit Help Center</Link>
          </Button>
        </motion.div>

      </div>
    </div>
  );
}