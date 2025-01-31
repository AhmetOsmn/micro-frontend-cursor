import axios from 'axios';
import { LoginFormData, RegisterFormData, User } from '../types';

const API_URL = 'http://localhost:3004';

export const login = async (data: LoginFormData): Promise<User> => {
  const response = await axios.get(`${API_URL}/users?email=${data.email}`);
  const users = response.data;

  if (users.length === 0) {
    throw new Error('Kullanıcı bulunamadı');
  }

  const user = users[0];
  if (user.password !== data.password) {
    throw new Error('Hatalı şifre');
  }

  const { password, ...userWithoutPassword } = user;
  localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  return userWithoutPassword;
};

export const register = async (data: RegisterFormData): Promise<User> => {
  const existingUsers = await axios.get(`${API_URL}/users?email=${data.email}`);
  
  if (existingUsers.data.length > 0) {
    throw new Error('Bu e-posta adresi zaten kayıtlı');
  }

  const { passwordConfirm, ...userData } = data;
  const response = await axios.post(`${API_URL}/users`, userData);
  const { password, ...userWithoutPassword } = response.data;
  
  localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  return userWithoutPassword;
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}; 