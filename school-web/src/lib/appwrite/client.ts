import { Client, Account, Databases, Storage } from 'appwrite';

// Konfigurasi AppWrite
const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || 'http://localhost/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;

// Database Configuration Constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'school_db';

// Collection IDs
export const COLLECTIONS = {
  USERS: 'users',
  ABSENSI: 'absensi',
  CHAT: 'chat',
  TANTANGAN: 'tantangan',
  SUBMISI_TANTANGAN: 'submisi_tantangan',
  PROJECT: 'project',
  ANGGOTA_PROJECT: 'anggota_project',
  SUBMISI_PROJECT: 'submisi_project',
  KELAS: 'kelas',
  JADWAL_PELAJARAN: 'jadwal_pelajaran',
  SEKOLAH_INFO: 'sekolah_info',
  NOTIFIKASI: 'notifikasi',
};

// Bucket IDs
export const BUCKETS = {
  PROFILE: 'profile_pictures',
  FILES: 'files',
  SUBMISSIONS: 'submissions',
  SCHOOL_DOCS: 'school_documents',
};
