export interface UserRequest {
  name: string;
  secondname?: string;
  lastname: string;
  secondlastname?: string;
  email: string;
  password: string;
  phone?: string;
  image_profile?: string;
  role?: 'user' | 'technician' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  secondname?: string;
  lastname?: string;
  secondlastname?: string;
  email?: string;
  phone?: string;
  image_profile?: string;
}