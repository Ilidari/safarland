
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Wifi, Car, UtensilsCrossed, Dumbbell, Waves, Sparkles } from "lucide-react";
import type { Hotel } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/hooks/use-app-context";

interface HotelCardProps {
  hotel: Hotel;
}

const amenityIcons: { [key: string]: React.ReactNode } = {
  wifi: <Wifi className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
  restaurant: <UtensilsCrossed className="w-4 h-4" />,
  gym: <Dumbbell className="w-4 h-4" />,
  pool: <Waves className="w-4 h-4" />,
  spa: <Sparkles className="w-4 h-4" />,
  courtyard: <Sparkles className="w-4 h-4" />,
};

export function HotelCard({ hotel }: HotelCardProps) {
  const { t } = useAppContext();

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 md:flex">
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          data-ai-hint="hotel exterior"
        />
      </div>
      <div className="md:w-2/3 flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">{hotel.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground pt-1">
            <MapPin className="rtl:ml-1 ltr:mr-1 w-4 h-4" />
            <span>{hotel.location}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center mb-3">
            <Badge variant="default" className="bg-accent text-accent-foreground">{hotel.rating.toFixed(1)}</Badge>
            <div className="flex items-center rtl:mr-2 ltr:ml-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({hotel.reviews} {t('hotel.reviews')})</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground mb-4">
            {hotel.amenities.map(amenity => (
              <div key={amenity} title={amenity}>
                {amenityIcons[amenity]}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {hotel.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-foreground">${hotel.price}</span>
            <span className="text-muted-foreground text-sm ltr:ml-1 rtl:mr-1">{t('results.per_night')}</span>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href={`/hotel/${hotel.id}`}>{t('results.view_details')}</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
