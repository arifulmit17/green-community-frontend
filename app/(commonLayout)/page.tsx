import Categories from "@/components/homepage/Categories";
import FaqSection from "@/components/homepage/FaqSection";
import { Hero } from "@/components/homepage/Hero";
import { NewsletterSection } from "@/components/homepage/Newsletter";
import PopularIdeas from "@/components/homepage/PopularIdeas";



export default function Home() {
  return (
    <div>
      <section className="h-1000px w-full ">
          <Hero></Hero>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-80">
            <div className="w-full text-5xl text-center"> 
               <h1 >Popular Ideas</h1>
            </div>
            
           <PopularIdeas></PopularIdeas>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Popular Categories</h1>
            </div>
            
           <Categories></Categories>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Member Reviews</h1>
            </div>
            
           {/* <ReviewSection></ReviewSection> */}
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >F.A.Q</h1>
            </div>
            
          <FaqSection></FaqSection>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Newsletter</h1>
            </div>
            
          <NewsletterSection></NewsletterSection>
      </section>
     
    </div>
    
  );
}
