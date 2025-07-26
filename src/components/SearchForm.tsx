
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/hooks/use-app-context";
import { Label } from "./ui/label";

export function SearchForm() {
  const { t } = useAppContext();
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append("destination", destination);
    if (checkin) params.append("checkin", checkin);
    if (checkout) params.append("checkout", checkout);
    params.append("adults", guests.adults.toString());
    params.append("children", guests.children.toString());
    router.push(`/results?${params.toString()}`);
  };

  return (
    <Card className="shadow-xl rounded-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-10 gap-x-2 gap-y-4 items-center">
          <div className="relative lg:col-span-3">
            <Label htmlFor="destination" className="block text-sm font-medium mb-2">{t('search.destination')}</Label>
            <MapPin className="absolute rtl:left-3 right-3 top-10 h-5 w-5 text-muted-foreground" />
            <Input
              id="destination"
              type="text"
              placeholder={t('search.destination')}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 rtl:pr-10 rounded-xl"
            />
          </div>

          <div className="lg:col-span-2">
            <Label htmlFor="checkin" className="block text-sm font-medium mb-2">{t('search.checkin')}</Label>
            <Input
              id="checkin"
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="lg:col-span-2">
             <Label htmlFor="checkout" className="block text-sm font-medium mb-2">{t('search.checkout')}</Label>
            <Input
              id="checkout"
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
               className="rounded-xl"
            />
          </div>

          <div className="lg:col-span-2">
            <Label className="block text-sm font-medium mb-2">{t('search.guests')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal rounded-xl">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{guests.adults} {t('search.adults')}, {guests.children} {t('search.children')}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">{t('search.guests')}</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>{t('search.adults')}</Label>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setGuests(g => ({...g, adults: Math.max(1, g.adults - 1)}))}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{guests.adults}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setGuests(g => ({...g, adults: g.adults + 1}))}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                     <div className="grid grid-cols-3 items-center gap-4">
                      <Label>{t('search.children')}</Label>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setGuests(g => ({...g, children: Math.max(0, g.children - 1)}))}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{guests.children}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setGuests(g => ({...g, children: g.children + 1}))}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="lg:col-span-1 pt-7">
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
              <Search className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
