import React, { useState } from 'react';

const AdminDashboard = () => {
  const [section, setSection] = useState('');
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setUsers(await res.json());
    setSection('users');
  };
  const fetchAgents = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/admin/agents', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setAgents(await res.json());
    setSection('agents');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">داشبورد مدیریت</h2>
      <button className="bg-red-600 text-white px-4 py-2 rounded mb-6" onClick={handleLogout}>خروج</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* مدیریت کاربران */}
        <section className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-bold mb-2">مدیریت کاربران</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={fetchUsers}>مشاهده کاربران</button>
          {section === 'users' && (
            <ul className="mt-4 max-h-60 overflow-y-auto">
              {users.map(u => (
                <li key={u.id} className="border-b py-1">{u.fullName} - {u.nationalCode} - {u.userType}</li>
              ))}
            </ul>
          )}
        </section>
        {/* مدیریت عوامل */}
        <section className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-bold mb-2">مدیریت عوامل</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={fetchAgents}>مدیریت عوامل</button>
          {section === 'agents' && (
            <ul className="mt-4 max-h-60 overflow-y-auto">
              {agents.map(a => (
                <li key={a.id} className="border-b py-1">{a.fullName} - {a.nationalCode}</li>
              ))}
            </ul>
          )}
        </section>
        {/* مدیریت درخواست‌ها */}
        <section className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-bold mb-2">مدیریت درخواست‌ها</h3>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={() => setSection('requests')}>مدیریت درخواست‌ها</button>
          {section === 'requests' && <div className="mt-4">درخواستی ثبت نشده است.</div>}
        </section>
        {/* مدیریت تراکنش‌ها و گزارشات */}
        <section className="bg-white rounded shadow p-6">
          <h3 className="text-xl font-bold mb-2">مدیریت تراکنش‌ها و گزارشات</h3>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={() => setSection('transactions')}>گزارشات و تراکنش‌ها</button>
          {section === 'transactions' && <div className="mt-4">تراکنشی ثبت نشده است.</div>}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;