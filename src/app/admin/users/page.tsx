
"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const sampleUsers = [
  { id: 1, name: 'علی رضایی', email: 'ali.rezaei@example.com', role: 'کاربر', status: 'فعال', joined: '2023-05-10' },
  { id: 2, name: 'زهرا احمدی', email: 'zahra.ahmadi@example.com', role: 'کاربر', status: 'فعال', joined: '2023-06-15' },
  { id: 3, name: 'محمد حسینی', email: 'mohammad.hosseini@example.com', role: 'کاربر', status: 'غیرفعال', joined: '2023-07-20' },
  { id: 4, name: 'فاطمه محمدی', email: 'fatemeh.mohammadi@example.com', role: 'ادمین', status: 'فعال', joined: '2023-02-01' },
  { id: 5, name: 'حسین کریمی', email: 'hossein.karimi@example.com', role: 'کاربر', status: 'فعال', joined: '2023-09-05' },
];

type User = typeof sampleUsers[0];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(sampleUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };
  
  const handleSave = () => {
    if (!editingUser) return;
    setUsers(prev => prev.map(user => user.id === editingUser.id ? editingUser : user));
    setEditingUser(null);
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="dark:text-primary">کاربران</CardTitle>
        <CardDescription>لیست تمام کاربران سیستم را مدیریت کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="جستجوی کاربر..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-border">
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>کاربر</TableHead>
                  <TableHead>نقش</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>تاریخ عضویت</TableHead>
                  <TableHead><span className="sr-only">عملیات</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border md:divide-none">
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="flex flex-wrap md:table-row mb-4 md:mb-0 border border-border md:border-none rounded-lg p-4 md:p-0">
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">کاربر:</span>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">
                              <div className="font-semibold">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                         <span className="md:hidden font-semibold">نقش:</span>
                         {user.role}
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                        <span className="md:hidden font-semibold">وضعیت:</span>
                        <Badge variant={user.status === 'فعال' ? 'default' : 'secondary'}>
                            {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="flex justify-between items-center w-full md:w-auto md:table-cell">
                         <span className="md:hidden font-semibold">تاریخ عضویت:</span>
                         {user.joined}
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
                           <DropdownMenuItem onSelect={() => handleEdit(user)}>
                            <Edit className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                            ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            onSelect={() => handleDelete(user.id)}
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
                نمایش <strong>{paginatedUsers.length}</strong> از <strong>{filteredUsers.length}</strong> کاربر
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

     <Dialog open={!!editingUser} onOpenChange={(open) => { if (!open) setEditingUser(null); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="dark:text-primary">ویرایش کاربر</DialogTitle>
           <DialogDescription>اطلاعات کاربر را ویرایش کنید.</DialogDescription>
        </DialogHeader>
        {editingUser && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editing-name" className="dark:text-primary">نام</Label>
              <Input
                id="editing-name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="editing-email" className="dark:text-primary">ایمیل</Label>
              <Input
                id="editing-email"
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role" className="dark:text-primary">نقش</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="نقش را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ادمین">ادمین</SelectItem>
                    <SelectItem value="کاربر">کاربر</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Switch 
                    id="status-switch" 
                    checked={editingUser.status === 'فعال'}
                    onCheckedChange={(checked) => setEditingUser({...editingUser, status: checked ? 'فعال' : 'غیرفعال'})}
                />
                <Label htmlFor="status-switch" className="dark:text-primary">وضعیت فعال</Label>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleSave}>
            ذخیره تغییرات
          </Button>
           <Button variant="outline" onClick={() => setEditingUser(null)}>
            لغو
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

    