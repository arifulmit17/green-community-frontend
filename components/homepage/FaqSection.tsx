import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqSection() {
  return (
   <section className="w-full py-20 bg-muted/40">
  <div className="container max-w-4xl mx-auto px-6">
    
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">
        🌿 Frequently Asked Questions
      </h2>
      <p className="text-muted-foreground mt-3">
        Everything you need to know about our green community
      </p>
    </div>

    {/* FAQ */}
    <Accordion type="single" collapsible className="space-y-4">
      
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What is this platform about?
        </AccordionTrigger>
        <AccordionContent>
          This is a community-driven platform where people share sustainable
          ideas, eco-friendly practices, and innovative solutions to help
          protect the environment.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          How can I share my idea?
        </AccordionTrigger>
        <AccordionContent>
          Simply create an account and submit your idea with details like the
          problem, solution, and category. Your idea will be reviewed before
          being published.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          Is it free to use?
        </AccordionTrigger>
        <AccordionContent>
          Yes, browsing and sharing ideas is free. Some premium ideas may
          require a small payment to access detailed insights.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          How does the approval process work?
        </AccordionTrigger>
        <AccordionContent>
          All submitted ideas go through an admin review process. They may be
          approved, rejected with feedback, or marked under review to ensure
          quality and feasibility.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>
          Can I interact with other members?
        </AccordionTrigger>
        <AccordionContent>
          Yes! You can upvote ideas, leave comments, and engage in discussions
          to support and improve sustainable solutions.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          What kind of ideas can I share?
        </AccordionTrigger>
        <AccordionContent>
          You can share ideas related to sustainability such as renewable
          energy, waste reduction, eco-friendly products, green transportation,
          and more.
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  </div>
</section>
  )
}
