"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight">
           🌿 Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Your privacy matters to us. This policy explains how our Green Community Portal collects,
            uses, and protects your information while you share and explore sustainable ideas 🌱
          </p>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Card className="rounded-2xl">
            <CardContent className="p-8 space-y-8 text-sm leading-relaxed text-muted-foreground">

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
                <p>
                  We collect information when you create an account, submit sustainability ideas,
                  interact with other members, or contact administrators. This may include your name,
                  email address, and any content you choose to share on the platform.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
                <p>
                  Your data is used to manage your account, review and publish ideas, facilitate
                  community collaboration, and improve the overall platform experience. Admins may
                  also use your information to provide feedback on submitted ideas.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">3. Idea Sharing & Visibility</h2>
                <p>
                  Ideas approved by admins may be publicly visible to other community members.
                  Please avoid sharing sensitive personal information within your submissions.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">4. Data Sharing</h2>
                <p>
                  We do not sell your personal data. Information is only shared with administrators
                  for moderation and with the community when ideas are published.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">5. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your information from
                  unauthorized access, misuse, or disclosure.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">6. Cookies & Usage Data</h2>
                <p>
                  We may use cookies or similar technologies to enhance your experience,
                  understand usage patterns, and improve platform performance.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">7. Your Rights</h2>
                <p>
                  You can access, update, or delete your personal information and submitted ideas
                  from your account dashboard at any time.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">8. Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy as the platform evolves. Any changes will be
                  posted on this page with an updated revision date.
                </p>
              </section>

              <div className="pt-4 border-t text-xs">
                Last updated: {new Date().toLocaleDateString()}
              </div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}