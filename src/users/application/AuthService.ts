import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../domain/entities/User';
import { UserRequest, LoginRequest, GoogleLoginRequest } from '../domain/dto/UserRequest';
import { hashPassword, checkPassword } from '../../core/security/hash';
import { isValidEmail } from '../domain/utils/EmailValidator';
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(loginRequest: LoginRequest): Promise<User> {
    const email = loginRequest.email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      throw new Error('Email invalido');
    }

    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error('Credenciales invalidas');
    }

    if (!user.password) {
      throw new Error('Usuario registrado con OAuth - usa login social');
    }

    const isPasswordValid = await checkPassword(user.password, loginRequest.password);

    if (!isPasswordValid) {
      throw new Error('Credenciales invalidas');
    }

    if (loginRequest.firebase_token !== undefined) {
      const firebaseToken = this.normalizeOptionalString(loginRequest.firebase_token);
      await this.userRepository.updateFirebaseToken(user.id, firebaseToken);
      user.firebase_token = firebaseToken;
    }

    return user;
  }

  async register(userRequest: UserRequest): Promise<User> {
    const email = userRequest.email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      throw new Error('Email invalido');
    }

    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      throw new Error('El email ya esta registrado');
    }

    if (!userRequest.password || userRequest.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    const hashedPassword = await hashPassword(userRequest.password);

    const newUser: Omit<User, 'id' | 'created_at'> = {
      name: userRequest.name.trim(),
      secondname: this.normalizeOptionalString(userRequest.secondname),
      lastname: userRequest.lastname.trim(),
      secondlastname: this.normalizeOptionalString(userRequest.secondlastname),
      email: email,
      password: hashedPassword,
      phone: this.normalizeOptionalString(userRequest.phone),
      image_profile: this.normalizeOptionalString(userRequest.image_profile),
      role: userRequest.role || 'user',
      account_type: userRequest.account_type || 'person',
      firebase_token: this.normalizeOptionalString(userRequest.firebase_token),
    };

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async getUserByID(userId: number): Promise<User> {
    const user = await this.userRepository.getByID(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  async updateFirebaseToken(userId: number, firebaseToken: string | null | undefined): Promise<User> {
    const user = await this.getUserByID(userId);
    const normalizedToken = this.normalizeOptionalString(firebaseToken);

    await this.userRepository.updateFirebaseToken(userId, normalizedToken);

    return {
      ...user,
      firebase_token: normalizedToken,
    };
  }

  async googleLogin(googleRequest: GoogleLoginRequest): Promise<User> {
    if (!GOOGLE_CLIENT_ID) {
      throw new Error('Google Client ID no configurado');
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: googleRequest.idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('Token de Google inválido');
    }

    const email = payload.email.trim().toLowerCase();
    const name = payload.given_name || 'Usuario';
    const lastname = payload.family_name || '';
    const picture = payload.picture || null;

    let user = await this.userRepository.getByEmail(email);

    if (!user) {
      const accountType = googleRequest.accountType || 'person';
      const role = accountType === 'company' ? 'admin' : 'user';

      const newUser: Omit<User, 'id' | 'created_at'> = {
        name,
        secondname: null,
        lastname,
        secondlastname: null,
        email,
        password: 'GOOGLE_AUTH_EXTERNAL',
        phone: null,
        image_profile: picture,
        role,
        account_type: accountType,
        firebase_token: this.normalizeOptionalString(googleRequest.firebase_token),
      };

      user = await this.userRepository.save(newUser);
    } else {
      if (googleRequest.firebase_token !== undefined) {
        const firebaseToken = this.normalizeOptionalString(googleRequest.firebase_token);
        await this.userRepository.updateFirebaseToken(user.id, firebaseToken);
        user.firebase_token = firebaseToken;
      }
    }

    return user;
  }

  private normalizeOptionalString(value?: string | null): string | null {
    const normalized = value?.trim();
    return normalized ? normalized : null;
  }
}