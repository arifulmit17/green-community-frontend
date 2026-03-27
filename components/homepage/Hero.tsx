import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "@/components/ui/button"


import tutorimg1 from "../../public/Garden-hero.jpg"
import tutorimg2 from "../../public/family.jpg"
import tutorimg3 from "../../public/garden.jpg"
import { Card, CardContent } from "../ui/card"

export function Hero() {
  const slides = [
    {
      image: tutorimg1,
      title: "Grow Ideas for a Greener Future",
      subtitle: "Share and discover sustainable solutions that make a real impact",
    },
    {
      image: tutorimg2,
      title: "Community Driven Change",
      subtitle: "Collaborate with people who care about the environment",
    },
    {
      image: tutorimg3,
      title: "Act Local, Think Global",
      subtitle: "Turn small eco-friendly ideas into meaningful global change",
    },
  ];

  return (
    <div className="w-full h-[70vh]">
      <Carousel className="relative w-full h-1/2">
        
        <CarouselContent className="h-1/2">
          {slides?.map((slide, index) => (
            <CarouselItem
              key={index}
              className="h-1/2 flex items-stretch"
            >
              <Card className="h-1/2 w-full">
                <CardContent className="relative h-[500px] p-0">
                  
                  {/* Image */}
                  <Image
                    src={slide?.image}
                    alt={slide?.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                      {slide?.title}
                    </h1>
                    <p className="text-white/90 text-lg mb-6 max-w-xl">
                      {slide?.subtitle}
                    </p>

                    <Link href="/ideas">
                      <Button size="lg" className="bg-green-500 hover:bg-green-600">
                        🌱 Explore Ideas
                      </Button>
                    </Link>
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}