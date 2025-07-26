
"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { popularDestinations } from '@/lib/data';
import Image from 'next/image';
import { Upload, PlusCircle, MoreHorizontal, Trash2, Edit, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";

type ObjectFit = 'contain' | 'cover' | 'fill';

const AdminHomepagePage: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>("https://placehold.co/1280x720.png");
  const [heroImageFit, setHeroImageFit] = useState<ObjectFit>('cover');
  const [destinations, setDestinations] = useState(popularDestinations.map(d => ({...d, status: 'فعال'})));
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDestinationOpen, setIsAddDestinationOpen] = useState(false);
  const [newDestinationImage, setNewDestinationImage] = useState<string | null>(null);
  const [newDestinationImageFit, setNewDestinationImageFit] = useState<ObjectFit>('cover');
  const itemsPerPage = 5;

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHeroImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

   const handleNewDestinationImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewDestinationImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const totalPages = Math.ceil(destinations.length / itemsPerPage);
  const paginatedDestinations = destinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="dark:text-primary">مدیریت تصویر اصلی (Hero)</CardTitle>
          <CardDescription>تصویر اصلی که در بالای صفحه اول نمایش داده می‌شود را مدیریت کنید.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="dark:text-primary">پیش‌نمایش تصویر اصلی</Label>
            <div className="mt-2 rounded-lg border-2 border-dashed border-muted-foreground/50 p-4 h-64 relative overflow-hidden bg-muted/20">
              <Image
                src={heroImage}
                alt="Hero Image Preview"
                fill
                className="object-center"
                style={{ objectFit: heroImageFit }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hero-upload" className="dark:text-primary">آپلود تصویر جدید</Label>
              <div className="relative">
                <Button asChild variant="outline" className="w-full">
                  <label htmlFor="hero-upload" className="cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>انتخاب فایل</span>
                  </label>
                </Button>
                <Input id="hero-upload" type="file" className="sr-only" onChange={handleHeroImageUpload} accept="image/*" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-primary">نحوه نمایش تصویر</Label>
              <RadioGroup
                value={heroImageFit}
                onValueChange={(value: ObjectFit) => setHeroImageFit(value)}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 rtl:space-x-reverse"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="cover" id="cover" />
                  <Label htmlFor="cover" className="dark:text-primary">پر کردن کادر</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="contain" id="contain" />
                  <Label htmlFor="contain" className="dark:text-primary">اندازه طبیعی</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="fill" id="fill" />
                  <Label htmlFor="fill" className="dark:text-primary">کشیده</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>ذخیره تغییرات</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="dark:text-primary">مدیریت مقصدها</CardTitle>
                <CardDescription>تمام مقصدهای (شهرها) وبسایت را مدیریت کنید.</CardDescription>
            </div>
             <Dialog open={isAddDestinationOpen} onOpenChange={setIsAddDestinationOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                  افزودن مقصد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="dark:text-primary">افزودن مقصد جدید</DialogTitle>
                  <DialogDescription>
                    اطلاعات مقصد جدید را برای نمایش در سایت وارد کنید.
                  </DialogDescription>
                </DialogHeader>
                 <div className="grid gap-6 py-4 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="name" className="dark:text-primary">نام مقصد</Label>
                        <Input id="name" placeholder="مثلا: تهران" />
                    </div>
                     <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="description" className="dark:text-primary">توضیحات کوتاه (Hint)</Label>
                        <Textarea id="description" placeholder="توضیح کوتاه برای جستجوی عکس (مثلا: city skyline)" />
                    </div>

                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="picture-upload" className="dark:text-primary">تصویر مقصد</Label>
                        <Button asChild variant="outline">
                          <label htmlFor="picture-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full">
                            <Upload className="h-4 w-4" />
                            <span>انتخاب فایل</span>
                          </label>
                        </Button>
                        <Input id="picture-upload" type="file" className="sr-only" onChange={handleNewDestinationImageUpload} accept="image/*" />
                    </div>

                    {newDestinationImage && (
                        <div className="space-y-4 rounded-lg border p-4 col-span-1 md:col-span-2">
                             <Label className="dark:text-primary">پیش‌نمایش تصویر</Label>
                             <div className="relative h-48 w-full overflow-hidden rounded-md bg-muted/20">
                                <Image
                                    src={newDestinationImage}
                                    alt="پیش‌نمایش مقصد"
                                    fill
                                    className="object-center"
                                    style={{ objectFit: newDestinationImageFit }}
                                />
                             </div>
                             <div className="space-y-2">
                                <Label className="dark:text-primary">نحوه نمایش تصویر</Label>
                                <RadioGroup
                                    value={newDestinationImageFit}
                                    onValueChange={(value: ObjectFit) => setNewDestinationImageFit(value)}
                                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 rtl:space-x-reverse"
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

                    <div className="flex items-center space-x-2 rtl:space-x-reverse col-span-1 md:col-span-2">
                        <Switch id="status" />
                        <Label htmlFor="status" className="dark:text-primary">مقصد فعال باشد</Label>
                    </div>
                </div>

                <DialogFooter>
                  <Button type="submit">ذخیره مقصد</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                 <div className="relative flex-1 w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="جستجوی مقصد..." className="pl-10 w-full" />
                </div>
                 <div className="flex-shrink-0 w-full sm:w-auto">
                    <Button className="w-full sm:w-auto" onClick={() => setIsAddDestinationOpen(true)}>
                      <PlusCircle className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                      افزودن مقصد
                    </Button>
                 </div>
            </div>
            <div className="overflow-x-auto">
                <Table className="min-w-full divide-y divide-border">
                    <TableHeader className="hidden md:table-header-group">
                        <TableRow>
                            <TableHead>تصویر</TableHead>
                            <TableHead>نام مقصد</TableHead>
                            <TableHead>توضیحات کوتاه</TableHead>
                            <TableHead>وضعیت</TableHead>
                            <TableHead><span className="sr-only">عملیات</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border md:divide-none">
                        {paginatedDestinations.map((dest) => (
                            <TableRow key={dest.name} className="flex flex-wrap md:table-row mb-4 md:mb-0 border border-border md:border-none rounded-lg p-4 md:p-0">
                                <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                                    <span className="md:hidden font-semibold">تصویر:</span>
                                    <Avatar className="h-10 w-10 rounded-md">
                                        <AvatarImage src={dest.image} alt={dest.name} className="object-cover" />
                                        <AvatarFallback className="rounded-md">{dest.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                                    <span className="md:hidden font-semibold">نام مقصد:</span>
                                    <span className="font-medium">{dest.name}</span>
                                </TableCell>
                                <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell text-muted-foreground">
                                    <span className="md:hidden font-semibold">توضیحات کوتاه:</span>
                                    {dest.hint}
                                </TableCell>
                                <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                                    <span className="md:hidden font-semibold">وضعیت:</span>
                                    <Badge variant={dest.status === 'فعال' ? 'default' : 'secondary'}>
                                        {dest.status}
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
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t px-6 py-4 gap-4">
             <div className="text-xs text-muted-foreground">
                نمایش <strong>{paginatedDestinations.length}</strong> از <strong>{destinations.length}</strong> مقصد
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
    </div>
  );
}

export default AdminHomepagePage;

    