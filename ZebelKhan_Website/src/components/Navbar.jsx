import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();

  // گرفتن نقش کاربر از localStorage یا context
  const role = localStorage.getItem("role"); // یا از auth context: useAuth().role

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-primary">
        <Link to="/">{t("navbar.home")}</Link>
      </div>
      <ul className="flex space-x-9"> {/* فاصله بین لینک‌ها افزایش یافت */}
        <li>
          <Link to="/">{t("navbar.home")}</Link>
        </li>
        <li>
          <Link to="/services">{t("navbar.services")}</Link>
        </li>
        <li>
          <Link to="/about">{t("navbar.about")}</Link>
        </li>
        <li>
          <Link to="/contact">{t("navbar.contact")}</Link>
        </li>
        <li>
          <Link to="/login">{t("navbar.login")}</Link>
        </li>
        {/* نمایش لینک داشبورد فقط برای ادمین */}
        {role === "admin" && (
          <li>
            <Link to="/admin/dashboard">{t("navbar.adminDashboard")}</Link>
          </li>
        )}
      </ul>
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;