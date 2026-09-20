const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const { headers, ...rest } = options;
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || 'Something went wrong');
  return data;
};

export const useAuth = () => {
  const token = localStorage.getItem('product_token');

  const authenticate = async (mode, payload) => {
    const data = await request(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(payload) });
    localStorage.setItem('product_token', data.token);
    localStorage.setItem('product_user', JSON.stringify(data.user));
    return data;
  };

  return {
    token,
    user: JSON.parse(localStorage.getItem('product_user') || 'null'),
    login: (payload) => authenticate('login', payload),
    signup: (payload) => authenticate('signup', payload),
    logout: () => { localStorage.removeItem('product_token'); localStorage.removeItem('product_user'); },
  };
};

const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('product_token') || ''}` });
const call = (path, options = {}) => request(path, { ...options, headers: { ...getHeaders(), ...options.headers } });

const productApi = {
  list: () => call('/products'),
  create: (product) => call('/products', { method: 'POST', body: JSON.stringify(product) }),
  update: (id, product) => call(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  remove: (id) => call(`/products/${id}`, { method: 'DELETE' }),
};

export const useProducts = () => productApi;