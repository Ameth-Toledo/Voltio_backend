export interface User {
  id: number;
  name: string;
  secondname: string | null;
  lastname: string;
  secondlastname: string | null;
  email: string;
  password: string;
  phone: string | null;         
  image_profile: string | null;
  role: 'user' | 'technician' | 'admin';
  created_at: Date;
}