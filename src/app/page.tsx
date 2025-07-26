"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/hooks/use-app-context";
import { popularDestinations } from "@/lib/data";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t, isRTL } = useAppContext();
  const fontClass = isRTL ? 'font-vazir' : 'font-body';

  const destinations = popularDestinations;

  return (
    <div className={fontClass}>
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Beautiful resort"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="resort pool"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 drop-shadow-lg">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">
            {t('home.subtitle')}
          </p>
        </div>
      </section>

      <section className="relative z-30 container mx-auto px-4 -mt-16">
        <SearchForm />
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">
          {t('home.popular')}
        </h2>
        <div className="grid grid-cols-4 grid-rows-4 sm:grid-rows-2 gap-4 h-[600px]">
          {destinations[0] && (
            <div className="col-span-4 sm:col-span-2 row-span-2 sm:row-span-1">
              <Link href={`/results?destination=${destinations[0].name}`} className="block h-full w-full">
                <Card className="h-full overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-full">
                    <Image
                      src={destinations[0].image}
                      alt={destinations[0].name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300 rounded-lg"
                      data-ai-hint={destinations[0].hint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white rounded-full">
                        <Heart className="w-5 h-5"/>
                    </Button>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white text-xl font-bold font-headline">
                        {destinations[0].name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {destinations[1] && (
             <div className="col-span-4 sm:col-span-2 row-span-2 sm:row-span-1">
                <Link href={`/results?destination=${destinations[1].name}`} className="block h-full w-full">
                    <Card className="h-full overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-full">
                        <Image
                        src={destinations[1].image}
                        alt={destinations[1].name}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        data-ai-hint={destinations[1].hint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white rounded-full">
                            <Heart className="w-5 h-5"/>
                        </Button>
                        <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white text-xl font-bold font-headline">
                            {destinations[1].name}
                        </h3>
                        </div>
                    </div>
                    </Card>
                </Link>
            </div>
          )}
          
          <div className="col-span-4 sm:col-span-2 row-span-2 sm:row-span-1 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4">
            {destinations.slice(2, 5).map((dest, index) => (
                <div key={dest.name} className={index === 2 ? 'col-span-full' : ''}>
                     <Link href={`/results?destination=${dest.name}`} className="block h-full w-full">
                        <Card className="h-full overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-full">
                            <Image
                            src={dest.image}
                            alt={dest.name}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-300 rounded-lg"
                            data-ai-hint={dest.hint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white rounded-full">
                                <Heart className="w-5 h-5"/>
                            </Button>
                            <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-white text-lg font-bold font-headline">
                                {dest.name}
                            </h3>
                            </div>
                        </div>
                        </Card>
                    </Link>
                </div>
            ))}
          </div>

          {destinations[5] && (
            <div className="col-span-4 sm:col-span-2 row-span-2 sm:row-span-1">
                 <Link href={`/results?destination=${destinations[5].name}`} className="block h-full w-full">
                    <Card className="h-full overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-full">
                        <Image
                        src={destinations[5].image}
                        alt={destinations[5].name}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        data-ai-hint={destinations[5].hint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white rounded-full">
                            <Heart className="w-5 h-5"/>
                        </Button>
                        <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white text-xl font-bold font-headline">
                            {destinations[5].name}
                        </h3>
                        </div>
                    </div>
                    </Card>
                </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
