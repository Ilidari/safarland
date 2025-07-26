"use client";

import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { sampleHotels } from "@/lib/data";
import { HotelCard } from "@/components/HotelCard";
import { useAppContext } from "@/hooks/use-app-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";

function ResultsComponent() {
  const { t, isRTL } = useAppContext();
  const searchParams = useSearchParams();

  const destination = searchParams.get('destination') || 'anywhere';
  const hotels = sampleHotels;

  const fontClass = isRTL ? 'font-vazir' : 'font-body';

  return (
    <div className={`container mx-auto px-4 py-8 ${fontClass}`}>
      <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold font-headline">
          {t('results.title')}: {destination}
        </h1>
        <p className="text-muted-foreground">{hotels.length} {t('results.found')}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
          <span>{t('results.filter')}</span>
        </Button>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <SortAsc className="w-5 h-5 text-muted-foreground" />
          <Select defaultValue="price">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('results.sort_by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">{t('results.price')}</SelectItem>
              <SelectItem value="rating">{t('results.rating')}</SelectItem>
              <SelectItem value="distance">{t('results.distance')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}


export default function ResultsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultsComponent />
        </Suspense>
    )
}
