import { Bell, Database, Globe, Lock, Mail, Palette, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">تنظیمات</h2>
        <p className="text-muted-foreground">
          مدیریت تنظیمات سیستم و حساب کاربری
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 ml-2" />
            پروفایل
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 ml-2" />
            اعلان‌ها
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 ml-2" />
            امنیت
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 ml-2" />
            ظاهر
          </TabsTrigger>
          <TabsTrigger value="system">
            <Database className="h-4 w-4 ml-2" />
            سیستم
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات شخصی</CardTitle>
              <CardDescription>ویرایش اطلاعات حساب کاربری</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <Input id="firstName" defaultValue="علی" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <Input id="lastName" defaultValue="احمدی" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="ali.ahmadi@hotel.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">شماره تماس</Label>
                <Input id="phone" defaultValue="۰۹۱۲۱۲۳۴۵۶۷" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">سمت</Label>
                <Input id="position" defaultValue="مدیر هتل" />
              </div>

              <div className="flex gap-2">
                <Button>ذخیره تغییرات</Button>
                <Button variant="outline">لغو</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات اعلان</CardTitle>
              <CardDescription>مدیریت نحوه دریافت اعلان‌ها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>رزرو جدید</Label>
                  <p className="text-sm text-muted-foreground">
                    دریافت اعلان برای رزروهای جدید
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>چک‌این/چک‌اوت</Label>
                  <p className="text-sm text-muted-foreground">
                    اعلان برای ورود و خروج مهمانان
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>پیام‌های جدید</Label>
                  <p className="text-sm text-muted-foreground">
                    اعلان برای پیام‌های جدید
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>گزارشات روزانه</Label>
                  <p className="text-sm text-muted-foreground">
                    دریافت خلاصه روزانه عملکرد
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>هشدارهای مالی</Label>
                  <p className="text-sm text-muted-foreground">
                    اعلان برای تراکنش‌های مهم
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-4">روش دریافت اعلان</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label>ایمیل</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label>اعلان داخل سیستم</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>ذخیره تنظیمات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>امنیت حساب</CardTitle>
              <CardDescription>
                مدیریت رمز عبور و تنظیمات امنیتی
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">تغییر رمز عبور</h4>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">رمز عبور جدید</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>تغییر رمز عبور</Button>
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-semibold">احراز هویت دو مرحله‌ای</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>فعال‌سازی ۲FA</Label>
                    <p className="text-sm text-muted-foreground">
                      افزایش امنیت با احراز هویت دو مرحله‌ای
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-semibold">جلسات فعال</h4>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">مرورگر Chrome - ویندوز</p>
                        <p className="text-sm text-muted-foreground">
                          تهران، ایران • فعال الان
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        خروج
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات ظاهری</CardTitle>
              <CardDescription>سفارشی‌سازی رابط کاربری</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">تم رنگی</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-2 border-primary cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-20 bg-white border rounded mb-2"></div>
                      <p className="font-medium">روشن</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-20 bg-gray-900 border rounded mb-2"></div>
                      <p className="font-medium">تیره</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="w-full h-20 bg-linear-to-br from-white to-gray-900 border rounded mb-2"></div>
                      <p className="font-medium">اتوماتیک</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-semibold">رنگ اصلی</h4>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "bg-blue-500",
                    "bg-green-500",
                    "bg-purple-500",
                    "bg-orange-500",
                    "bg-red-500",
                    "bg-pink-500",
                  ].map(color => (
                    <div
                      key={color}
                      className={`h-12 w-12 rounded-full cursor-pointer ${color} hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>فونت بزرگتر</Label>
                    <p className="text-sm text-muted-foreground">
                      افزایش اندازه فونت برای خوانایی بهتر
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>انیمیشن‌ها</Label>
                    <p className="text-sm text-muted-foreground">
                      نمایش انیمیشن‌های انتقال
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button>ذخیره تنظیمات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات سیستم</CardTitle>
              <CardDescription>مدیریت تنظیمات عمومی سیستم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  زبان و منطقه
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">زبان سیستم</Label>
                    <Input id="language" defaultValue="فارسی" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">منطقه زمانی</Label>
                    <Input
                      id="timezone"
                      defaultValue="تهران (UTC+3:30)"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-semibold">تنظیمات پشتیبان‌گیری</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>پشتیبان‌گیری خودکار</Label>
                    <p className="text-sm text-muted-foreground">
                      پشتیبان‌گیری روزانه از اطلاعات
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">آخرین پشتیبان‌گیری</p>
                        <p className="text-sm text-muted-foreground">
                          ۱۴۰۴/۰۹/۱۰ - ساعت ۰۲:۰۰
                        </p>
                      </div>
                      <Button variant="outline">بازیابی</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="font-semibold">مدیریت داده‌ها</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    دانلود همه داده‌ها
                  </Button>
                  <Button variant="destructive" className="w-full">
                    پاک کردن کش
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="space-y-2">
                  <h4 className="font-semibold text-destructive">
                    منطقه خطرناک
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    اقداماتی که قابل بازگشت نیستند
                  </p>
                  <Button variant="destructive" className="w-full mt-4">
                    حذف حساب کاربری
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>اطلاعات سیستم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نسخه سیستم:</span>
                <span className="font-medium">v2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخرین به‌روزرسانی:</span>
                <span className="font-medium">۱۴۰۴/۰۹/۰۱</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">دیتابیس:</span>
                <span className="font-medium">PostgreSQL 15.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">فضای استفاده شده:</span>
                <span className="font-medium">
                  ۱۲.۳ گیگابایت / ۱۰۰ گیگابایت
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
