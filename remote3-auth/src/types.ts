export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
} 