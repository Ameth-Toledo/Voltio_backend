export interface UserResponse {
  id: number;
  name: string;
  secondname: string | null;
  lastname: string;
  secondlastname: string | null;
  email: string;
  phone: string | null;
  image_profile: string | null;
  role: 'user' | 'technician' | 'admin';
  created_at: string;
}

export interface LoginResponse {
  message: string;
  user: UserResponse;
}