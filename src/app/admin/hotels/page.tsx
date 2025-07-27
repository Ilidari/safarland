
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sampleHotels } from '@/lib/data';
import { PlusCircle, MoreHorizontal, Edit, Trash2, Upload, Wifi, Car, UtensilsCrossed, Dumbbell, Waves, Sparkles, Search } from 'lucide-react';
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
import type { Hotel } from '@/lib/data';


type ObjectFit = 'contain' | 'cover' | 'fill';
type HotelWithStatus = Hotel & { status: string };

const amenityOptions = [
  { id: 'wifi', label: 'وای‌فای', icon: Wifi },
  { id: 'parking', label: 'پارکینگ', icon: Car },
  { id: 'restaurant', label: 'رستوران', icon: UtensilsCrossed },
  { id: 'gym', label: 'باشگاه', icon: Dumbbell },
  { id: 'pool', label: 'استخر', icon: Waves },
  { id: 'spa', label: 'اسپا', icon: Sparkles },
];


export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<HotelWithStatus[]>(sampleHotels.map(h => ({...h, status: 'فعال'})));
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<HotelWithStatus | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  
  // State for new hotel form
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelLocation, setNewHotelLocation] = useState('');
  const [newHotelDescription, setNewHotelDescription] = useState('');
  const [newHotelPrice, setNewHotelPrice] = useState('');
  const [newHotelRating, setNewHotelRating] = useState('');
  const [newHotelAmenities, setNewHotelAmenities] = useState<string[]>([]);
  const [newHotelImage, setNewHotelImage] = useState<string | null>(null);
  const [newHotelImageFit, setNewHotelImageFit] = useState<ObjectFit>('cover');
  const [newHotelStatus, setNewHotelStatus] = useState(true);

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

  const handleAmenityChange = (amenityId: string) => {
    setNewHotelAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const resetNewHotelForm = () => {
    setNewHotelName('');
    setNewHotelLocation('');
    setNewHotelDescription('');
    setNewHotelPrice('');
    setNewHotelRating('');
    setNewHotelAmenities([]);
    setNewHotelImage(null);
    setNewHotelImageFit('cover');
    setNewHotelStatus(true);
  };

  const handleAddHotel = () => {
    const newHotel: HotelWithStatus = {
      id: Math.max(...hotels.map(h => h.id), 0) + 1,
      name: newHotelName,
      location: newHotelLocation,
      price: Number(newHotelPrice),
      rating: Number(newHotelRating),
      reviews: 0,
      description: newHotelDescription,
      amenities: newHotelAmenities,
      image: newHotelImage || 'https://placehold.co/800x600.png',
      images: [],
      status: newHotelStatus ? 'فعال' : 'غیرفعال',
    };
    setHotels(prev => [newHotel, ...prev]);
    setIsAddHotelOpen(false);
    resetNewHotelForm();
  };

  const handleDelete = (id: number) => {
    setHotels(prev => prev.filter(hotel => hotel.id !== id));
  };
  
  const handleEdit = (hotel: HotelWithStatus) => {
    setEditingHotel(hotel);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="space-y-6">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="dark:text-primary">هتل‌ها</CardTitle>
            <CardDescription>هتل‌های خود را مدیریت کرده و جزئیات آن‌ها را مشاهده کنید.</CardDescription>
        </div>
         <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsAddHotelOpen(true)}>
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
                            <Input id="name" placeholder="مثلا: هتل بزرگ تهران" value={newHotelName} onChange={e => setNewHotelName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="dark:text-primary">مکان</Label>
                            <Input id="location" placeholder="مثلا: تهران، ایران" value={newHotelLocation} onChange={e => setNewHotelLocation(e.target.value)} />
                        </div>
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="description" className="dark:text-primary">توضیحات</Label>
                        <Textarea id="description" placeholder="توضیحاتی در مورد هتل بنویسید..." value={newHotelDescription} onChange={e => setNewHotelDescription(e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price" className="dark:text-primary">قیمت (به دلار)</Label>
                            <Input id="price" type="number" placeholder="مثلا: 180" value={newHotelPrice} onChange={e => setNewHotelPrice(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating" className="dark:text-primary">امتیاز (از ۵)</Label>
                            <Input id="rating" type="number" step="0.1" min="0" max="5" placeholder="مثلا: 4.8" value={newHotelRating} onChange={e => setNewHotelRating(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="dark:text-primary">امکانات</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {amenityOptions.map((amenity) => (
                          <div key={amenity.id} className="flex items-center gap-2">
                            <Checkbox 
                              id={`amenity-${amenity.id}`} 
                              checked={newHotelAmenities.includes(amenity.id)}
                              onCheckedChange={() => handleAmenityChange(amenity.id)}
                            />
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
                        <Switch id="status" checked={newHotelStatus} onCheckedChange={setNewHotelStatus} />
                        <Label htmlFor="status" className="dark:text-primary">هتل فعال باشد</Label>
                    </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleAddHotel}>ذخیره هتل</Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </CardHeader>
      <CardContent>
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="جستجوی هتل..." 
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-border">
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
                {paginatedHotels.map((hotel) => (
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
                           <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleEdit(hotel); }}>
                            <Edit className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                            ویرایش
                           </DropdownMenuItem>
                           <DropdownMenuItem 
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              onSelect={(e) => { e.preventDefault(); handleDelete(hotel.id); }}
                            >
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
       <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t px-6 py-4 gap-4">
             <div className="text-xs text-muted-foreground">
                نمایش <strong>{paginatedHotels.length}</strong> از <strong>{filteredHotels.length}</strong> هتل
             </div>
             <div className="flex items-center gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                    disabled={currentPage === 1}>
                        قبلی
                </Button>
                 <span className="text-sm text-muted-foreground">
                    صفحه {currentPage} از {totalPages}
                </span>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                    disabled={currentPage === totalPages}>
                        بعدی
                </Button>
             </div>
        </CardFooter>
    </Card>

    <Dialog open={!!editingHotel} onOpenChange={(open) => { if (!open) setEditingHotel(null); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-primary">ویرایش هتل</DialogTitle>
        </DialogHeader>
        {editingHotel && (
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="editing-name" className="dark:text-primary">نام هتل</Label>
              <Input
                id="editing-name"
                value={editingHotel.name}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="editing-location" className="dark:text-primary">مکان</Label>
              <Input
                id="editing-location"
                value={editingHotel.location}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, location: e.target.value })
                }
              />
            </div>
             <div>
              <Label htmlFor="editing-price" className="dark:text-primary">قیمت</Label>
              <Input
                id="editing-price"
                type="number"
                value={editingHotel.price}
                onChange={(e) =>
                  setEditingHotel({ ...editingHotel, price: Number(e.target.value) })
                }
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={() => {
              if (!editingHotel) return;
              setHotels((prev) =>
                prev.map((h) => (h.id === editingHotel.id ? editingHotel : h))
              );
              setEditingHotel(null);
            }}
          >
            ذخیره تغییرات
          </Button>
           <Button variant="outline" onClick={() => setEditingHotel(null)}>
            لغو
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </div>
  );
}

    