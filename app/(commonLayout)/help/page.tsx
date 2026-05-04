"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Leaf } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            🌿 Green Community Portal
          </h1>
          <p className="text-muted-foreground">
            Share sustainable ideas, collaborate with others, and help build a greener future 🌱
          </p>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How do I submit a sustainable idea?
                </AccordionTrigger>
                <AccordionContent>
                  Go to the "Submit Idea" page, describe your idea (e.g., reducing plastic use or solar initiatives), 
                  and submit it for review. Admins will evaluate and publish it if approved.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What kind of ideas can I share?
                </AccordionTrigger>
                <AccordionContent>
                  You can share any eco-friendly idea such as waste reduction, renewable energy projects, 
                  recycling initiatives, or community awareness programs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How are ideas reviewed?
                </AccordionTrigger>
                <AccordionContent>
                  Admins monitor all submissions, provide feedback if needed, and ensure the best and most impactful 
                  ideas are published for all community members to explore.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I interact with other community members?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! You can view published ideas, share feedback, and collaborate with others to improve and 
                  implement sustainable solutions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I edit or update my idea?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can update your submitted ideas from your dashboard before or after admin feedback.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Need more help?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Reach out to our team for support or guidance on your sustainability ideas
            </p>
            <Button asChild>
              <Link href="/contact">Contact Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}