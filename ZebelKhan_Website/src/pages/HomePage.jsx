import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaBalanceScale, FaClinicMedical, FaUniversity, FaShieldAlt, FaTools } from "react-icons/fa";

const HomePage = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaUniversity size={40} className="text-blue-600" />,
      title: t("banking"),
      description: t("banking_desc"),
    },
    {
      icon: <FaShieldAlt size={40} className="text-green-600" />,
      title: t("insurance"),
      description: t("insurance_desc"),
    },
    {
      icon: <FaClinicMedical size={40} className="text-red-600" />,
      title: t("healthcare"),
      description: t("healthcare_desc"),
    },
    {
      icon: <FaBalanceScale size={40} className="text-yellow-600" />,
      title: t("legal"),
      description: t("legal_desc"),
    },
    {
      icon: <FaTools size={40} className="text-purple-600" />,
      title: t("other"),
      description: t("other_desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("welcome_to_zebel_khan")}</h1>
      <p className="text-lg text-gray-600 mb-10">{t("services_full_description")}</p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
        >
          {t("login")}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
