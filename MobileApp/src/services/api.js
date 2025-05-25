const API_URL = 'http://172.19.46.69:5000/api';

export async function login({ nationalCode, password, userType }) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nationalCode, password, userType })
    });
    return await res.json();
  } catch (e) {
    return { message: 'خطا در ارتباط با سرور' };
  }
}

export async function signup({ fullName, phoneNumber, nationalCode, password, userType }) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phoneNumber, nationalCode, password, userType })
    });
    return await res.json();
  } catch (e) {
    return { message: 'خطا در ارتباط با سرور' };
  }
}

export async function getAllUsers(token) {
  try {
    const res = await fetch(`${API_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getAllAgents(token) {
  try {
    const res = await fetch(`${API_URL}/admin/agents`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getAllRequests(token) {
  try {
    const res = await fetch(`${API_URL}/admin/requests`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getAllTransactions(token) {
  try {
    const res = await fetch(`${API_URL}/admin/transactions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getProfile(token) {
  try {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function getMyRequests(token) {
  try {
    const res = await fetch(`${API_URL}/admin/my-requests`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getMyNotifications(token) {
  try {
    const res = await fetch(`${API_URL}/admin/my-notifications`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getAllMissions(token) {
  try {
    const res = await fetch(`${API_URL}/admin/missions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function getMyMissions(token) {
  try {
    const res = await fetch(`${API_URL}/admin/my-missions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export async function submitMissionOrRequest({
  token,
  isMission,
  title,
  description,
  city,
  date,
  files,
  price,
  allowAgentPrice,
  location
}) {
  try {
    const res = await fetch(`${API_URL}/admin/${isMission ? 'missions' : 'requests'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        city,
        date,
        files,
        price,
        allowAgentPrice,
        location
      })
    });
    return await res.json();
  } catch (e) {
    return { error: 'خطا در ارسال اطلاعات' };
  }
}