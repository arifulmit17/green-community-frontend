import { CTASection } from "@/components/homepage/CalltoAction";
import Categories from "@/components/homepage/Categories";
import FaqSection from "@/components/homepage/FaqSection";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorksSection } from "@/components/homepage/HowitWorks";
import { NewsletterSection } from "@/components/homepage/Newsletter";
import { OfferSection } from "@/components/homepage/Offers";
import { PartnersSection } from "@/components/homepage/PartnersSection";
import PopularIdeas from "@/components/homepage/PopularIdeas";
import { StatsSection } from "@/components/homepage/Statistics";
import { FeedbackSection } from "@/components/homepage/Testimonial";



export default function Home() {
  return (
    <div>
      <section className="h-1000px w-full ">
          <Hero></Hero>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Popular Ideas</h1>
            </div>
            
           <PopularIdeas></PopularIdeas>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Statistics</h1>
            </div>
            
           <StatsSection></StatsSection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Popular Categories</h1>
            </div>
            
           <Categories></Categories>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >How It Works</h1>
            </div>
            
           <HowItWorksSection></HowItWorksSection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Call to Action</h1>
            </div>
            
           <CTASection></CTASection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Testimonial</h1>
            </div>
            
           <FeedbackSection></FeedbackSection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Offers</h1>
            </div>
            
           <OfferSection></OfferSection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Our Partners</h1>
            </div>
            
           <PartnersSection></PartnersSection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >F.A.Q</h1>
            </div>
            
          <FaqSection></FaqSection>
      </section>
      <section className="section">
            <div className="w-full text-5xl text-center"> 
               <h1 >Newsletter</h1>
            </div>
            
          <NewsletterSection></NewsletterSection>
      </section>
     
    </div>
    
  );
}
