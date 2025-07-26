"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sampleHotels } from '@/lib/data';
import { PlusCircle, MoreHorizontal, Edit, Trash2, Upload, Wifi, Car, UtensilsCrossed, Dumbbell, Waves, Sparkles } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from "@/lib/utils";


type ObjectFit = 'contain' | 'cover' | 'fill';

const amenityOptions = [
  { id: 'wifi', label: 'وای‌فای', icon: Wifi },
  { id: 'parking', label: 'پارکینگ', icon: Car },
  { id: 'restaurant', label: 'رستوران', icon: UtensilsCrossed },
  { id: 'gym', label: 'باشگاه', icon: Dumbbell },
  { id: 'pool', label: 'استخر', icon: Waves },
  { id: 'spa', label: 'اسپا', icon: Sparkles },
];


export default function AdminHotelsPage() {
  const hotels = sampleHotels.map(h => ({...h, status: 'فعال'}));
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [newHotelImage, setNewHotelImage] = useState<string | null>(null);
  const [newHotelImageFit, setNewHotelImageFit] = useState<ObjectFit>('cover');

  const handleNewHotelImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewHotelImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="dark:text-primary">هتل‌ها</CardTitle>
            <CardDescription>هتل‌های خود را مدیریت کرده و جزئیات آن‌ها را مشاهده کنید.</CardDescription>
        </div>
         <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                    افزودن هتل
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="dark:text-primary">افزودن هتل جدید</DialogTitle>
                    <DialogDescription>
                        اطلاعات هتل جدید را برای نمایش در سایت وارد کنید.
                    </DialogDescription>
                </DialogHeader>
                 <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="dark:text-primary">نام هتل</Label>
                            <Input id="name" placeholder="مثلا: هتل بزرگ تهران" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="dark:text-primary">مکان</Label>
                            <Input id="location" placeholder="مثلا: تهران، ایران" />
                        </div>
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="description" className="dark:text-primary">توضیحات</Label>
                        <Textarea id="description" placeholder="توضیحاتی در مورد هتل بنویسید..." />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="dark:text-primary">قیمت (به دلار)</Label>
                            <Input id="price" type="number" placeholder="مثلا: 180" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating" className="dark:text-primary">امتیاز (از ۵)</Label>
                            <Input id="rating" type="number" step="0.1" min="0" max="5" placeholder="مثلا: 4.8" />
                        </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="dark:text-primary">امکانات</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {amenityOptions.map((amenity) => (
                          <div key={amenity.id} className="flex items-center gap-2">
                            <Checkbox id={`amenity-${amenity.id}`} />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={`amenity-${amenity.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-primary"
                              >
                                {amenity.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="picture-upload" className="dark:text-primary">تصویر اصلی هتل</Label>
                        <Button asChild variant="outline">
                          <label htmlFor="picture-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full">
                            <Upload className="h-4 w-4" />
                            <span>انتخاب فایل</span>
                          </label>
                        </Button>
                        <Input id="picture-upload" type="file" className="sr-only" onChange={handleNewHotelImageUpload} accept="image/*" />
                    </div>

                    {newHotelImage && (
                        <div className="space-y-4 rounded-lg border p-4">
                             <Label className="dark:text-primary">پیش‌نمایش تصویر</Label>
                             <div className="relative h-48 w-full overflow-hidden rounded-md bg-muted/20">
                                <Image
                                    src={newHotelImage}
                                    alt="پیش‌نمایش هتل"
                                    fill
                                    className="object-center"
                                    style={{ objectFit: newHotelImageFit }}
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="dark:text-primary">نحوه نمایش تصویر</Label>
                                <RadioGroup
                                    value={newHotelImageFit}
                                    onValueChange={(value: ObjectFit) => setNewHotelImageFit(value)}
                                    className="flex items-center space-x-4 rtl:space-x-reverse"
                                >
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <RadioGroupItem value="cover" id="dest-cover" />
                                        <Label htmlFor="dest-cover" className="dark:text-primary">پر کردن کادر</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <RadioGroupItem value="contain" id="dest-contain" />
                                        <Label htmlFor="dest-contain" className="dark:text-primary">اندازه طبیعی</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <RadioGroupItem value="fill" id="dest-fill" />
                                        <Label htmlFor="dest-fill" className="dark:text-primary">کشیده</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Switch id="status" />
                        <Label htmlFor="status" className="dark:text-primary">هتل فعال باشد</Label>
                    </div>
                </div>

                <DialogFooter>
                  <Button type="submit">ذخیره هتل</Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </CardHeader>
      <CardContent>
         {/* Add overflow-x-auto for responsiveness */}
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-border">
              {/* Hide header on small screens */}
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>مکان</TableHead>
                  <TableHead>امتیاز</TableHead>
                  <TableHead>قیمت</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead><span className="sr-only">عملیات</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border md:divide-none">
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id} className="flex flex-wrap md:table-row mb-4 md:mb-0 border border-border md:border-none rounded-lg p-4 md:p-0">
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">نام:</span>
                        <span className="font-medium">{hotel.name}</span>
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">مکان:</span>
                        {hotel.location}
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">امتیاز:</span>
                         {hotel.rating}
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">قیمت:</span>
                         ${hotel.price}
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">وضعیت:</span>
                        <Badge variant={hotel.status === 'فعال' ? 'default' : 'secondary'}>
                            {hotel.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="flex justify-end items-center w-full md:w-auto md:table-cell text-left">
                        <span className="md:hidden font-semibold">عملیات:</span>
                       <DropdownMenu dir="rtl">
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem>
                            <Edit className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                            ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                            حذف
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
