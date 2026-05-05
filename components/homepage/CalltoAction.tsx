import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-10/12 p-4 bg-card rounded-2xl mx-auto">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          Share Ideas. Inspire Change. 🌱
        </h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our eco community to share sustainable ideas, collaborate with others,
          and help create solutions for a greener future. Every idea counts.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          
          {/* Primary CTA */}
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            <Link href="/ideas">Explore Ideas</Link>
          </Button>

          {/* Secondary CTA */}
          {/* <Button
            asChild
            variant="outline"
            size="lg"
            className="border-green-600 text-green-700 hover:bg-green-100 rounded-xl"
          >
            <Link href="/login">Submit Your Idea</Link>
          </Button> */}
        </div>

      </div>
    </section>
  );
}