/** biome-ignore-all lint/a11y/useValidAnchor: <itiss> */

import {
  ArrowLeft,
  Bed,
  Calendar,
  Check,
  Clock,
  Hotel,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"
import ThemeButton from "@/components/shared/theme-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="animate-in fade-in slide-in-from-top-5 min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Hotel className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                مهماندار
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                سامانه هوشمند مدیریت هتل
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <ThemeButton />
            <Link href="/login">
              <Button
                variant="default"
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                ورود/ثبت‌نام
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <Badge
          className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
          variant="secondary"
        >
          🏨 سامانه مدیریت هوشمند هتل
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          با{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            مهماندار
          </span>
          <br />
          میزبانی حرفه‌ای‌تر باشید
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          سامانه جامع مدیریت هتل که تجربه میزبانی را برای شما و مهمان‌هایتان
          <br />
          به یک تجربه لذت‌بخش و بدون دردسر تبدیل می‌کند
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/login">
            <Button
              size="lg"
              className="gap-2 text-lg px-8 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              شروع رایگان
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950/50 dark:text-emerald-400"
          >
            تماشای ویدیو معرفی
          </Button>
        </div>

        <div className="mt-16 relative">
          <div className="bg-linear-to-br from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-700 rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto aspect-video flex items-center justify-center border-8 border-white dark:border-slate-800">
            <div className="text-white text-center">
              <Hotel className="h-24 w-24 mx-auto mb-4 opacity-50" />
              <p className="text-2xl font-semibold opacity-75">
                نمای کلی داشبورد مهماندار
              </p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 hidden md:block dark:border dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold dark:text-white">
                ۱۲ رزرو جدید
              </span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 hidden md:block dark:border dark:border-slate-700">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold dark:text-white">
                ۸۵٪ اشغال
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge
            className="mb-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            variant="secondary"
          >
            ⚡ امکانات
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            همه‌چیز برای مدیریت بهتر
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            ابزارهایی که نیاز دارید، همه در یک جا
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Bed className="h-8 w-8" />}
            title="مدیریت اتاق‌ها"
            description="ثبت و پیگیری تمام اتاق‌ها با جزئیات کامل تخت‌ها، امکانات و وضعیت لحظه‌ای"
            gradient="from-emerald-500 to-teal-500"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="پروفایل مهمان‌ها"
            description="مدیریت اطلاعات مهمان‌ها، تاریخچه اقامت و ارتباط آسان با آن‌ها"
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title="تقویم رزرو"
            description="رزرو سریع و آسان با تقویم بصری، جلوگیری از رزرو مضاعف"
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="ورود و خروج"
            description="فرآیند چک‌این و چک‌اوت سریع با ثبت خودکار زمان‌ها"
            gradient="from-orange-500 to-amber-500"
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="گزارش‌های هوشمند"
            description="آمار لحظه‌ای از اشغال اتاق‌ها، درآمد و عملکرد هتل"
            gradient="from-indigo-500 to-purple-500"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="مدیریت دسترسی"
            description="سطوح مختلف دسترسی برای مالک، مدیر، پذیرش و کارکنان"
            gradient="from-rose-500 to-red-500"
          />
        </div>
      </section>

      <section className="bg-slate-900 dark:bg-slate-950 text-white py-20 dark:border-y dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 dark:bg-emerald-500/10 dark:border-emerald-500/20">
                💎 چرا مهماندار؟
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                میزبانی حرفه‌ای
                <br />
                با تکنولوژی روز
              </h2>
              <div className="space-y-4">
                <BenefitItem text="رابط کاربری ساده و کاملاً فارسی" />
                <BenefitItem text="بدون نیاز به آموزش، استفاده فوری" />
                <BenefitItem text="دسترسی از موبایل، تبلت و کامپیوتر" />
                <BenefitItem text="امنیت بالا با رمزنگاری پیشرفته" />
                <BenefitItem text="پشتیبانی تلفنی ۲۴ساعته" />
                <BenefitItem text="بروزرسانی‌های مداوم و رایگان" />
                <BenefitItem text="پشتیبان‌گیری خودکار روزانه" />
              </div>
            </div>
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700 dark:bg-slate-900 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    آماری از مهماندار
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StatCard number="۱۵۰+" label="هتل فعال" color="emerald" />
                  <StatCard number="۱۰,۰۰۰+" label="رزرو موفق" color="blue" />
                  <StatCard
                    number="۹۹.۹%"
                    label="زمان در دسترس بودن"
                    color="purple"
                  />
                  <StatCard
                    number="۴.۹/۵"
                    label="رضایت کاربران"
                    color="amber"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge
            className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            variant="secondary"
          >
            💬 نظرات کاربران
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            هتل‌ها درباره ما می‌گویند
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            text="مهماندار کار ما را خیلی ساده کرد. الان می‌تونیم همه‌چیز رو از یه جا کنترل کنیم."
            author="محمد رضایی"
            roles="مدیر هتل پارسیان"
          />
          <TestimonialCard
            text="رابط کاربری فوق‌العاده ساده‌ است. کارکنان ما خیلی سریع یاد گرفتند."
            author="سارا احمدی"
            roles="مالک هتل آرامش"
          />
          <TestimonialCard
            text="پشتیبانی عالی و سیستم بدون باگ. واقعاً حرفه‌ای است."
            author="علی کریمی"
            roles="پذیرش هتل سپهر"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-amber-300 dark:text-amber-200" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              آماده برای میزبانی بهتر؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              همین الان هتل خود را به مهماندار متصل کنید
              <br />و تفاوت را تجربه کنید
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-lg px-8"
                >
                  شروع رایگان ۳۰ روزه
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white/10"
              >
                درخواست دمو
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              ✅ بدون نیاز به کارت اعتباری
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white dark:bg-slate-950 py-12 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hotel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  مهماندار
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                سامانه هوشمند مدیریت هتل
                <br />
                برای میزبانی حرفه‌ای‌تر
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                محصول
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    امکانات
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    قیمت‌گذاری
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    دمو
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                پشتیبانی
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    مستندات
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    راهنما
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                تماس
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
                <li>📧 info@mehmandaar.ir</li>
                <li>🏢 تهران، ایران</li>
              </ul>
            </div>
          </div>
          <div className="border-t dark:border-slate-800 pt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
            <p>© ۱۴۰۴ مهماندار - تمامی حقوق محفوظ است</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:border-slate-800">
      <CardHeader>
        <div
          className={`w-16 h-16 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
        >
          {icon}
        </div>
        <CardTitle className="text-xl dark:text-white">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed dark:text-slate-400">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-6 w-6 rounded-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
        <Check className="h-4 w-4 text-white" />
      </div>
      <span className="text-lg">{text}</span>
    </div>
  )
}

function StatCard({
  number,
  label,
  color,
}: {
  number: string
  label: string
  color: string
}) {
  const colorClasses = {
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    amber: "text-amber-400",
  }

  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 dark:bg-slate-950/50 rounded-lg">
      <div>
        <div
          className={`text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]} mb-1`}
        >
          {number}
        </div>
        <div className="text-slate-400 dark:text-slate-500 text-sm">
          {label}
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({
  text,
  author,
  roles,
}: {
  text: string
  author: string
  roles: string
}) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow dark:bg-slate-900 dark:border-slate-800">
      <CardContent className="pt-6">
        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          "{text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-700 flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {author}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {roles}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
