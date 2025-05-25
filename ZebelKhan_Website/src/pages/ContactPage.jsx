import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">راه‌های ارتباطی</h1>
      <p>برای ارتباط با ما می‌توانید از روش‌های زیر استفاده کنید:</p>
      <ul className="list-disc pl-6">
        <li>ایمیل: info@zebelkhan.ir</li>
        <li>تلفن: 021-12345678</li>
        <li>آدرس: تهران، خیابان مثال، پلاک 123</li>
      </ul>
    </div>
  );
};

export default ContactPage;