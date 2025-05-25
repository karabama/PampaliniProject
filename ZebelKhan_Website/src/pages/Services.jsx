import React from "react";
import { HeartHandshake, Banknote, BriefcaseBusiness, FileHeart, Stamp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "خدمات اداری",
    desc: "مراجعه حضوری به سازمان‌ها، پیگیری پرونده، نوبت‌گیری و گرفتن مجوزها از طرف شما",
    icon: <BriefcaseBusiness size={40} className="text-blue-600 mb-3" />,
  },
  {
    title: "امور بانکی",
    desc: "افتتاح حساب، دریافت کارت بانکی، دریافت رمز پویا، انتقال وجه، پیگیری وام‌ها و ...",
    icon: <Banknote size={40} className="text-green-600 mb-3" />,
  },
  {
    title: "خدمات بیمه‌ای",
    desc: "پیگیری بیمه تأمین اجتماعی، استعلام بیمه، تمدید دفترچه، پرونده خسارت و...",
    icon: <ShieldCheck size={40} className="text-emerald-600 mb-3" />,
  },
  {
    title: "درمان و سلامت",
    desc: "هماهنگی نوبت پزشک، نسخه‌نویسی الکترونیک، استعلام خدمات درمانی و مشاوره",
    icon: <FileHeart size={40} className="text-rose-600 mb-3" />,
  },
  {
    title: "خدمات قضایی و وکالت",
    desc: "پیگیری پرونده، دریافت ابلاغیه، هماهنگی وکیل و تهیه مستندات حقوقی لازم",
    icon: <Stamp size={40} className="text-indigo-600 mb-3" />,
  },
  {
    title: "خدمات سفارشی",
    desc: "درخواست‌های خاص شما که نیاز به عامل انسانی برای انجام امور دارند",
    icon: <HeartHandshake size={40} className="text-purple-600 mb-3" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white text-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">خدمات زبل‌خان</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          زبل‌خان با تیمی از عوامل آموزش‌دیده، آماده‌ست تا انواع خدمات شهری، اداری، بانکی، درمانی، و حقوقی شما رو در سریع‌ترین زمان و با بالاترین کیفیت انجام بده.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center shadow hover:shadow-lg transition">
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className=text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-medium mb-4">خدمتی مد نظرت نیست؟</h2>
          <p className="text-gray-600 mb-4">
            می‌تونی درخواست اختصاصی ثبت کنی و ما بررسیش می‌کنیم.
          </p>
          <Button className="text-lg px-6 py-2 rounded-xl">ثبت درخواست جدید</Button>
        </div>
      </div>
    </div>
  );
}
