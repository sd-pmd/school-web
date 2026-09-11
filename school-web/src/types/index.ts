// User Types
export type UserRole = 'guru' | 'murid' | 'orangtua' | 'admin' | 'hatam';
export type GuruQualification = 'guru_kelas' | 'guru_hatam';

export interface User {
  id: string;
  username: string;
  nama_lengkap: string;
  email?: string;
  no_identitas: string; // NIP guru, NISN murid, NIK orang tua
  role: UserRole;
  kelas?: string; // untuk murid dan guru
  kelas_list?: string[]; // untuk guru hatam yang mengelola multiple kelas
  qualification?: GuruQualification; // untuk membedakan guru kelas dan guru hatam
  tahun_ajaran: string;
  createdAt: Date;
}

// Absensi Types
export interface Absensi {
  id: string;
  murid_id: string;
  tanggal: Date;
  status: 'hadir' | 'alfa' | 'izin' | 'sakit';
  keterangan?: string;
  diinput_oleh: string; // guru atau orang tua
  dikonfirmasi_guru: boolean;
  dikonfirmasi_oleh?: string;
  createdAt: Date;
}

// Chat Types
export interface ChatMessage {
  id: string;
  kelas_id: string;
  pengirim_id: string;
  pesan: string;
  attachment?: string;
  createdAt: Date;
}

// Tantangan (Tugas) Types
export type TantanganType = 'akademik' | 'hatam';
export type ContentType = 'text' | 'gambar' | 'video' | 'pdf';

export interface Tantangan {
  id: string;
  guru_id: string;
  kelas_id: string;
  judul: string;
  deskripsi: string;
  contentType: ContentType; // 'text', 'gambar', 'video', 'pdf'
  content: string; // URL atau text content
  deadline: Date;
  type: TantanganType; // 'akademik' dari guru kelas, 'hatam' dari guru hatam
  createdAt: Date;
}

export interface TantanganHatam {
  id: string;
  guru_hatam_id: string;
  kelas_list: string[]; // untuk multiple kelas
  judul: string;
  deskripsi: string;
  contentType: ContentType;
  content: string;
  deadline: Date;
  createdAt: Date;
}

export interface SubmisiTantangan {
  id: string;
  tantangan_id: string;
  murid_id: string;
  contentType: ContentType; // tipe file yang dikirim
  content: string; // URL atau text content jawaban
  status: 'draft' | 'submitted' | 'dinilai';
  nilai?: number;
  feedback?: string;
  createdAt: Date;
}

// Project Types
export interface Project {
  id: string;
  guru_id: string;
  kelas_id: string;
  judul: string;
  deskripsi: string;
  tipe: 'individu' | 'kelompok';
  deadline: Date;
  createdAt: Date;
}

export interface AnggotaProject {
  id: string;
  project_id: string;
  murid_id: string;
  role: 'ketua' | 'anggota';
}

export interface SubmisiProject {
  id: string;
  project_id: string;
  kelompok_id?: string; // untuk project kelompok
  file: string;
  status: 'draft' | 'submitted' | 'dinilai';
  nilai?: number;
  createdAt: Date;
}

// Kelas Types
export interface Kelas {
  id: string;
  nama: string;
  tingkat: string; // 1-6 untuk SD
  wali_kelas: string; // guru_id
  tahun_ajaran: string;
  createdAt: Date;
}

export interface JadwalPelajaran {
  id: string;
  kelas_id: string;
  guru_id: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  mata_pelajaran: string;
  ruangan?: string;
}

// Sekolah Info Types
export interface SekolahInfo {
  id: string;
  nama: string;
  alamat: string;
  email: string;
  telepon: string;
  nama_kepala_sekolah: string;
  logo?: string;
  tahun_berdiri: number;
}

// Notifikasi Types
export interface Notifikasi {
  id: string;
  user_id: string;
  tipe: 'absensi' | 'tantangan' | 'project' | 'chat' | 'info';
  judul: string;
  pesan: string;
  dibaca: boolean;
  createdAt: Date;
}

// Registration Types
export interface UniqueCode {
  id: string;
  kode: string;
  deskripsi?: string;
  aktif: boolean;
  maksimal_penggunaan?: number;
  penggunaan_saat_ini: number;
  dibuat_oleh: string; // admin_id
  createdAt: Date;
  updatedAt: Date;
}

export interface PendingRegistration {
  id: string;
  nama_lengkap: string;
  username: string;
  password: string;
  role: UserRole;
  kelas?: string;
  nis?: string;
  email?: string;
  foto?: string;
  status: 'pending' | 'approved' | 'rejected';
  disetujui_oleh?: string; // admin_id
  alasan_penolakan?: string;
  createdAt: Date;
  updatedAt: Date;
}
