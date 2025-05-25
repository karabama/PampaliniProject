import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [userType, setUserType] = useState('basic');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match', 'رمز عبور و تکرار آن یکسان نیستند'));
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phoneNumber, nationalCode, password, userType })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || t('signup_failed', 'ثبت‌نام ناموفق بود'));
        return;
      }
      setSuccess(t('signup_success', 'ثبت‌نام با موفقیت انجام شد!'));
    } catch (err) {
      setError(t('signup_failed', 'ثبت‌نام ناموفق بود'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{t('signup', 'ثبت‌نام')}</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder={t('full_name', 'نام و نام خانوادگی')}
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder={t('phone_number', 'شماره موبایل')}
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder={t('national_code', 'کد ملی')}
          value={nationalCode}
          onChange={e => setNationalCode(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder={t('password', 'رمز عبور')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder={t('confirm_password', 'تکرار رمز عبور')}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={userType}
          onChange={e => setUserType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="basic">{t('user', 'کاربر')}</option>
          <option value="agent">{t('agent', 'عامل')}</option>
        </select>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {t('signup', 'ثبت‌نام')}
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="/login" className="text-blue-600 hover:underline">
          {t('already_have_account', 'حساب کاربری دارید؟ وارد شوید')}
        </a>
      </div>
    </div>
  );
};

export default SignupPage;
