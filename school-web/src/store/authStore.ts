import { create } from 'zustand';
import { User, UserRole } from '@/types';

// Mock users untuk testing
const MOCK_USERS = {
  admin: {
    id: 'admin',
    username: 'admin',
    password: '00000000',
    nama_lengkap: 'Administrator',
    email: 'admin@school.com',
    no_identitas: 'ADMIN001',
    role: 'admin' as UserRole,
    tahun_ajaran: '2024/2025',
    createdAt: new Date(),
  },
  '123456789': {
    id: 'guru-1',
    username: '123456789',
    password: 'password123',
    nama_lengkap: 'Guru Kelas',
    email: 'guru@school.com',
    no_identitas: 'GURU001',
    role: 'guru' as UserRole,
    kelas: '1A',
    tahun_ajaran: '2024/2025',
    createdAt: new Date(),
  },
  '1234567890': {
    id: 'murid-1',
    username: '1234567890',
    password: 'password123',
    nama_lengkap: 'Murid Satu',
    email: 'murid@school.com',
    no_identitas: 'MURID001',
    role: 'murid' as UserRole,
    kelas: '1A',
    tahun_ajaran: '2024/2025',
    createdAt: new Date(),
  },
  '9876543210': {
    id: 'orangtua-1',
    username: '9876543210',
    password: 'password123',
    nama_lengkap: 'Orang Tua Murid',
    email: 'orangtua@school.com',
    no_identitas: 'ORTU001',
    role: 'orangtua' as UserRole,
    tahun_ajaran: '2024/2025',
    createdAt: new Date(),
  },
};

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    password: string;
    nama_lengkap: string;
    no_identitas: string;
    role: UserRole;
    kelas?: string;
    tahun_ajaran: string;
    email?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (username: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      let user: User;
      const useAppwrite = process.env.NEXT_PUBLIC_APPWRITE_URL && process.env.NEXT_PUBLIC_APPWRITE_URL !== '';
      
      if (useAppwrite) {
        // TODO: Implement dengan Appwrite
        // const session = await account.createEmailPasswordSession(email, password);
        // const userData = await databases.getDocument(DATABASE_ID, COLLECTIONS.users, userId);
        // Untuk saat ini fallback ke mock
        const mockUser = MOCK_USERS[username as keyof typeof MOCK_USERS];
        if (!mockUser) {
          throw new Error('Username tidak ditemukan');
        }
        if (mockUser.password !== password) {
          throw new Error('Password salah');
        }
        user = mockUser as User;
      } else {
        // Use mock authentication for development
        const mockUser = MOCK_USERS[username as keyof typeof MOCK_USERS];
        
        if (!mockUser) {
          throw new Error('Username tidak ditemukan. Pastikan username sesuai dan coba lagi.');
        }
        
        if (mockUser.password !== password) {
          throw new Error('Password salah. Periksa kembali password Anda.');
        }
        
        user = mockUser as User;
      }
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set user data
      set({ 
        user, 
        isAuthenticated: true,
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      
      // TODO: Implement register dengan Appwrite
      // Steps:
      // 1. Create account with email and password
      // 2. Create user document in database dengan role dan data lainnya
      // 3. Auto-login setelah register
      
      // const session = await account.createEmailPasswordSession(userData.email, userData.password);
      // const newUser = await databases.createDocument(
      //   DATABASE_ID,
      //   COLLECTIONS.users,
      //   ID.unique(),
      //   { ...userData }
      // );
      
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      // await account.deleteSession('current');
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      // Check if user is authenticated
      // const session = await account.getSession('current');
      // Fetch user data
      set({ isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  setUser: (user) => {
    set({ 
      user, 
      isAuthenticated: user !== null 
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
