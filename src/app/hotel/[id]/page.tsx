"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sampleHotels } from "@/lib/data";
import { useAppContext } from "@/hooks/use-app-context";
import { MapPin, Star, Wifi, Car, UtensilsCrossed, Dumbbell, Waves, Sparkles, Calendar, Users, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const amenityIcons: { [key: string]: React.ReactNode } = {
  wifi: <Wifi className="w-5 h-5 text-primary" />,
  parking: <Car className="w-5 h-5 text-primary" />,
  restaurant: <UtensilsCrossed className="w-5 h-5 text-primary" />,
  gym: <Dumbbell className="w-5 h-5 text-primary" />,
  pool: <Waves className="w-5 h-5 text-primary" />,
  spa: <Sparkles className="w-5 h-5 text-primary" />,
  courtyard: <Sparkles className="w-5 h-5 text-primary" />,
};

export default function HotelDetailsPage({ params }: { params: { id: string } }) {
  const { t, isRTL } = useAppContext();
  const hotel = sampleHotels.find((h) => h.id.toString() === params.id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!hotel) {
    notFound();
  }
  
  const fontClass = isRTL ? 'font-vazir' : 'font-body';

  return (
    <div className={`container mx-auto px-4 py-8 ${fontClass}`}>
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/results">
                <ChevronLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                {t('results.title')}
            </Link>
        </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">{hotel.name}</CardTitle>
              <CardDescription className="flex items-center pt-2">
                <MapPin className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                {hotel.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ltr:ml-2 rtl:mr-2 font-medium">{hotel.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({hotel.reviews} {t('hotel.reviews')})</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('hotel.gallery')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden relative shadow-inner">
                  <Image src={hotel.images[selectedImage]} alt={hotel.name} layout="fill" objectFit="cover" data-ai-hint="hotel room" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {hotel.images.map((img, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-video rounded-lg overflow-hidden border-2 transition ${selectedImage === index ? "border-primary" : "border-transparent"}`}>
                      <Image src={img} alt={`${hotel.name} ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="hotel interior" />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('hotel.amenities')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-3">
                  {amenityIcons[amenity]}
                  <span className="capitalize text-sm">{amenity}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold font-headline">${hotel.price}</span>
                  <span className="ltr:ml-2 rtl:mr-2 text-muted-foreground">{t('results.per_night')}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="checkin"><Calendar className="inline-block w-4 h-4 ltr:mr-1 rtl:ml-1" />{t('search.checkin')}</Label>
                  <Input id="checkin" type="date" />
                </div>
                <div>
                  <Label htmlFor="checkout"><Calendar className="inline-block w-4 h-4 ltr:mr-1 rtl:ml-1" />{t('search.checkout')}</Label>
                  <Input id="checkout" type="date" />
                </div>
                <div>
                  <Label htmlFor="guests"><Users className="inline-block w-4 h-4 ltr:mr-1 rtl:ml-1" />{t('search.guests')}</Label>
                  <Input id="guests" type="number" defaultValue={2} />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                  {t('results.book_now')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
