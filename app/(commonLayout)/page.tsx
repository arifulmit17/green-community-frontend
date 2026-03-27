import { Hero } from "@/components/homepage/Hero";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div>
      <section className="h-1000px w-full ">
          <Hero></Hero>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-0 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Featured Tutors</h1>
            </div>
            
           {/* <FeaturedTutor></FeaturedTutor> */}
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Popular Sessions</h1>
            </div>
            
           {/* <PopularSessions></PopularSessions> */}
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Popular Categories</h1>
            </div>
            
           {/* <Categories></Categories> */}
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >Student Reviews</h1>
            </div>
            
           {/* <ReviewSection></ReviewSection> */}
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-10 mt-5 lg:mt-10">
            <div className="w-full text-5xl text-center"> 
               <h1 >F.A.Q</h1>
            </div>
            
          {/* <FaqSection></FaqSection> */}
      </section>
     
    </div>
    
  );
}
