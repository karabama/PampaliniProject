import React from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Phone, UserPlus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-20 text-center">
        <div className="max-w-4xl mx-auto">
                    <p className="text-lg md:text-xl text-gray-600 mb-6">
            دستیار هوشمند برای انجام تمام امور اداری، بانکی، بیمه‌ای و درمانی شما
          </p>
          <Button className="text-lg px-6 py-2 rounded-xl">
            همین حالا ثبت درخواست کن
          </Button>
        </div>
      </section>

      {/* Why ZebelKhan Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">چرا زبل‌خان؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <div className="p-4 bg-white rounded-2xl shadow">
              <BadgeCheck size={40} className="mx-auto mb-2 text-green-500" />
              <h4 className="text-xl font-medium mb-2">مطمئن و امن</h4>
              <p>تمام اطلاعات شما به‌صورت محرمانه و رمزنگاری شده نگهداری می‌شن.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <UserPlus size={40} className="mx-auto mb-2 text-blue-500" />
              <h4 className="text-xl font-medium mb-2">کاربری ساده</h4>
              <p>با چند کلیک ساده، خدمت مورد نیازت رو ثبت کن و پیگیری کن.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <Phone size={40} className="mx-auto mb-2 text-orange-500" />
              <h4 className="text-xl font-medium mb-2">پشتیبانی انسانی</h4>
              <p>در صورت نیاز، همکاران ما همیشه برای راهنمایی کنار شما هستن.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            خدمات زبل‌خان
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "امور اداری",
                desc: "نوبت‌گیری، پیگیری پرونده و مراجعه حضوری از طرف شما",
                img: "/images/services/admin.png",
              },
              {
                title: "امور بانکی",
                desc: "انجام عملیات بانکی مثل افتتاح حساب، دریافت کارت و...",
                img: "/images/services/bank.png",
              },
              {
                title: "بیمه‌ای و درمانی",
                desc: "پیگیری بیمه، پرونده تأمین اجتماعی، درمان و نسخه الکترونیک",
                img: "/images/services/insurance.png",
              },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 shadow text-center">
                <img src={s.img} alt={s.title} className="h-32 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-yellow-200 to-yellow-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">آماده‌ای کاراتو بسپری به زبل‌خان؟</h2>
        <p className="text-gray-700 mb-6">
          فقط ۳ قدم تا انجام سریع و بی‌دردسر خدمات فاصله داری!
        </p>
        <Button className="text-lg px-6 py-2 rounded-xl">شروع کن</Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="mb-2">© 2025 ZebelKhan - همه حقوق محفوظ است</p>
        <p className="text-sm">تماس با ما: support@zebelkhan.ir</p>
      </footer>
    </div>
  );
}
