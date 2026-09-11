'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Redirect if not admin
    if (user && user.role !== 'admin') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-orange-600">Pesantren Masyarakat Digital - Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-72 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">👨‍💼</div>
              <p className="font-bold text-gray-800 text-lg">{user?.nama_lengkap || 'Administrator'}</p>
              <p className="text-sm text-purple-600 font-semibold">Admin Account</p>
            </div>
          </div>

          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 Overview
            </button>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Akses Guru</p>
              <button
                onClick={() => setActiveTab('guru-absensi')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'guru-absensi'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                ✏️ Kelola Absensi (Guru)
              </button>
              <button
                onClick={() => setActiveTab('guru-tantangan')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'guru-tantangan'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📝 Kelola Tantangan
              </button>
              <button
                onClick={() => setActiveTab('guru-project')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'guru-project'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🤝 Kelola Project
              </button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Akses Murid</p>
              <button
                onClick={() => setActiveTab('murid-tantangan')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'murid-tantangan'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📚 Lihat Tantangan (Murid)
              </button>
              <button
                onClick={() => setActiveTab('murid-project')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'murid-project'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                💼 Lihat Project (Murid)
              </button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Akses Orang Tua</p>
              <button
                onClick={() => setActiveTab('orangtua-absensi')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'orangtua-absensi'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📋 Monitor Absensi (Orang Tua)
              </button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Menu Hatam</p>
              <button
                onClick={() => setActiveTab('hatam-menu')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'hatam-menu'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📖 Kelola Menu Hatam
              </button>
              <button
                onClick={() => setActiveTab('guru-hatam')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'guru-hatam'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                👨‍🏫 Kelola Guru Hatam
              </button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Fitur Admin</p>
              <button
                onClick={() => setActiveTab('kode-unik')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'kode-unik'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                🔑 Kelola Kode Unik
              </button>
              <button
                onClick={() => setActiveTab('pending-registrasi')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'pending-registrasi'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📋 Persetujuan Pendaftaran
              </button>
              <button
                onClick={() => setActiveTab('communications')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'communications'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                💬 Komunikasi Global
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'settings'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                ⚙️ Pengaturan Sistem
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl">
              <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white p-8 rounded-2xl mb-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h2>
                <p className="text-blue-100">Anda memiliki akses penuh ke semua fitur sistem School Web</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Total Guru</h3>
                  <p className="text-3xl font-bold text-blue-600">0</p>
                  <p className="text-sm text-gray-500">aktif tahun ini</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Total Murid</h3>
                  <p className="text-3xl font-bold text-green-600">0</p>
                  <p className="text-sm text-gray-500">di 6 kelas</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Total Orang Tua</h3>
                  <p className="text-3xl font-bold text-orange-600">0</p>
                  <p className="text-sm text-gray-500">terdaftar</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Aktivitas Hari Ini</h3>
                  <p className="text-3xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-500">login active</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📊 Status Sistem</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Database</span>
                      <span className="text-green-600 font-bold">✓ Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">API Server</span>
                      <span className="text-green-600 font-bold">✓ Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Storage</span>
                      <span className="text-green-600 font-bold">✓ Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Email Service</span>
                      <span className="text-yellow-600 font-bold">⚠ Standby</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">🔐 Keamanan</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">SSL Certificate</span>
                      <span className="text-green-600 font-bold">✓ Valid</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Backup Status</span>
                      <span className="text-green-600 font-bold">✓ OK</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Two-Factor Auth</span>
                      <span className="text-blue-600 font-bold">🔒 Aktif</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Firewall Status</span>
                      <span className="text-green-600 font-bold">✓ Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guru Absensi Tab */}
          {activeTab === 'guru-absensi' && (
            <AbsensiForm />
          )}

          {/* Guru Tantangan Tab */}
          {activeTab === 'guru-tantangan' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-green-600 mb-6">📝 Kelola Tantangan</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Kelola semua tantangan/tugas yang diberikan guru kepada siswa:</p>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Membuat tantangan baru untuk berbagai kelas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Menetapkan deadline untuk setiap tantangan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Menilai dan memberikan feedback pada pengumpulan siswa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Memantau tingkat pengumpulan siswa</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleNavigate('/dashboard/guru/tantangan')}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Buka Kelola Tantangan →
                </button>
              </div>
            </div>
          )}

          {/* Guru Project Tab */}
          {activeTab === 'guru-project' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6">🤝 Kelola Project</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Kelola project kolaboratif antara siswa:</p>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Membuat project grup untuk siswa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Membentuk tim dan menugaskan role siswa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Memantau progress dan kontribusi setiap anggota</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Memberikan evaluasi final untuk project</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleNavigate('/dashboard/guru/project')}
                  className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
                >
                  Buka Kelola Project →
                </button>
              </div>
            </div>
          )}

          {/* Murid Tantangan Tab */}
          {activeTab === 'murid-tantangan' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-green-600 mb-6">📚 Lihat Tantangan (View Murid)</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Lihat daftar semua tantangan yang diberikan kepada siswa:</p>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Melihat semua tantangan yang aktif</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Mengecek detail tantangan dan deadline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Memantau status pengumpulan siswa</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleNavigate('/dashboard/murid/tantangan')}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Buka Tampilan Tantangan Murid →
                </button>
              </div>
            </div>
          )}

          {/* Murid Project Tab */}
          {activeTab === 'murid-project' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">💼 Lihat Project (View Murid)</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Lihat semua project yang diberikan kepada siswa:</p>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Melihat daftar project per kelas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Melihat anggota tim dan timeline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Mengecek deliverables yang telah dikumpulkan</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleNavigate('/dashboard/murid/project')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Buka Tampilan Project Murid →
                </button>
              </div>
            </div>
          )}

          {/* Orang Tua Absensi Tab */}
          {activeTab === 'orangtua-absensi' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">📋 Monitor Absensi (View Orang Tua)</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Monitor kehadiran anak dari perspektif orang tua:</p>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Melihat riwayat kehadiran anak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Mendapatkan notifikasi jika anak tidak hadir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Laporan bulanan dan tahunan kehadiran</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Menghubungi guru jika ada pertanyaan</span>
                  </li>
                </ul>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Buka Tampilan Absensi Orang Tua →
                </button>
              </div>
            </div>
          )}

          {/* Communications Tab */}
          {activeTab === 'communications' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6">💬 Komunikasi Global</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📢 Pengumuman Sekolah</h3>
                  <p className="text-gray-600 mb-6">Buat pengumuman untuk semua pengguna (guru, murid, orang tua)</p>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition w-full">
                    Buat Pengumuman Baru
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📧 Email Massal</h3>
                  <p className="text-gray-600 mb-6">Kirim email ke grup pengguna tertentu</p>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition w-full">
                    Kirim Email Massal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-indigo-600 mb-6">⚙️ Pengaturan Sistem</h2>
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">🏫 Informasi Sekolah</h3>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition">
                    Edit Informasi Sekolah
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">👥 Manajemen Pengguna</h3>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition">
                    Kelola Pengguna
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📅 Tahun Ajaran</h3>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition">
                    Atur Tahun Ajaran
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">🔒 Keamanan</h3>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition">
                    Pengaturan Keamanan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hatam Menu Tab */}
          {activeTab === 'hatam-menu' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-yellow-600 mb-6">📖 Kelola Menu Hatam</h2>
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📝 Tantangan Hatam</h3>
                  <p className="text-gray-600 mb-6">Kelola tantangan hafalan Al-Qur'an untuk siswa di semua kelas</p>
                  <div className="space-y-3 mb-6">
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                      <p className="font-semibold text-gray-800">Total Tantangan Aktif</p>
                      <p className="text-2xl font-bold text-yellow-600">8</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                      <p className="font-semibold text-gray-800">Rata-rata Completion Rate</p>
                      <p className="text-2xl font-bold text-yellow-600">78%</p>
                    </div>
                  </div>
                  <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition mr-3">
                    ➕ Buat Tantangan Hatam Baru
                  </button>
                  <button className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
                    📋 Lihat Semua Tantangan
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📊 Laporan Progres Hatam</h3>
                  <p className="text-gray-600 mb-6">Monitor kemajuan program Hatam per siswa dan per kelas</p>
                  <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                    📥 Unduh Laporan Lengkap (PDF)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Guru Hatam Tab */}
          {activeTab === 'guru-hatam' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-yellow-600 mb-6">👨‍🏫 Kelola Guru Hatam</h2>
              
              <div className="mb-6">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                  ➕ Tambah Guru Hatam Baru
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Daftar Guru Hatam</h3>
                {[
                  {
                    nama: 'Ibu Farida',
                    id: 'hatam1',
                    kelas: 'Kelas 1, 2, 3',
                    siswa: 96,
                    status: 'Aktif',
                  },
                  {
                    nama: 'Pak Budi',
                    id: 'hatam2',
                    kelas: 'Kelas 4, 5, 6',
                    siswa: 96,
                    status: 'Aktif',
                  },
                ].map((guru, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{guru.nama}</h3>
                        <p className="text-sm text-gray-600">ID: {guru.id}</p>
                      </div>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {guru.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Kelas yang Dikelola: <span className="font-semibold">{guru.kelas}</span></p>
                    <p className="text-sm text-gray-700 mb-4">Total Siswa: <span className="font-semibold">{guru.siswa}</span></p>
                    <div className="flex gap-3">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition text-sm">
                        Edit
                      </button>
                      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-sm">
                        Lihat Detail
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition text-sm">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kode Unik Tab */}
          {activeTab === 'kode-unik' && <KodeUnikManagement />}

          {/* Pending Registrasi Tab */}
          {activeTab === 'pending-registrasi' && <PendingRegistrationManagement />}
        </main>
      </div>
    </div>
  );
}

// Komponen Form Absensi
function AbsensiForm() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedKelas, setSelectedKelas] = useState('1');
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  // Mock data siswa - kosong, akan terisi saat siswa mendaftar
  const siswaList: Array<{ id: number; nama: string; kelas: string }> = [];

  const kelasList = ['1', '2', '3', '4', '5', '6'];
  const siswaKelas = siswaList.filter(s => s.kelas === selectedKelas);
  
  const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay();

  const handleAttendanceChange = (siswaId: number, day: number, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [`${siswaId}-${day}`]: status
    }));
  };

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    alert('Export ke PDF - Fitur akan diimplementasikan');
  };

  const handleExportExcel = () => {
    alert('Export ke Excel - Fitur akan diimplementasikan');
  };

  const handleSave = () => {
    alert('Data absensi berhasil disimpan!');
  };

  const monthName = selectedMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-7xl">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">✏️ Kelola Absensi Bulanan</h2>

      {/* Control Panel */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Kelas Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih Kelas</label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              {kelasList.map(kelas => (
                <option key={kelas} value={kelas}>Kelas {kelas}</option>
              ))}
            </select>
          </div>

          {/* Month Navigation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bulan & Tahun</label>
            <div className="flex gap-2 items-center">
              <button
                onClick={handlePrevMonth}
                className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                ◀
              </button>
              <span className="text-sm font-semibold text-gray-700 flex-1 text-center">{monthName}</span>
              <button
                onClick={handleNextMonth}
                className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Siswa</label>
            <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 font-semibold">
              {siswaKelas.length} Siswa
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            💾 Simpan
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            🖨️ Print
          </button>
          <button
            onClick={handleExportPDF}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            📄 Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            📊 Export Excel
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-orange-100 border-b">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">No</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama Siswa</th>
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                <th key={day} className="px-2 py-3 text-center font-semibold text-gray-700 bg-orange-50 text-xs">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {siswaKelas.map((siswa, index) => (
              <tr key={siswa.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{siswa.nama}</td>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                  <td key={day} className="px-2 py-2 text-center">
                    <select
                      value={attendance[`${siswa.id}-${day}`] || 'H'}
                      onChange={(e) => handleAttendanceChange(siswa.id, day, e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:border-orange-500 focus:outline-none"
                    >
                      <option value="H">H</option>
                      <option value="S">S</option>
                      <option value="I">I</option>
                      <option value="A">A</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-bold text-gray-800 mb-4">Keterangan Absensi:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold">H</span>
            <span className="text-gray-700">Hadir</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-bold">S</span>
            <span className="text-gray-700">Sakit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-bold">I</span>
            <span className="text-gray-700">Izin</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded font-bold">A</span>
            <span className="text-gray-700">Alfa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Kelola Kode Unik
function KodeUnikManagement() {
  const [kodeList, setKodeList] = useState([
    { id: '1', kode: 'PMD2024', deskripsi: 'Kode untuk tahun ajaran 2024', aktif: true, penggunaan: 12, maksimal: 50 },
    { id: '2', kode: 'MURID01', deskripsi: 'Kode khusus murid baru', aktif: true, penggunaan: 28, maksimal: 100 },
  ]);
  const [newKode, setNewKode] = useState('');
  const [newDeskripsi, setNewDeskripsi] = useState('');
  const [newMaksimal, setNewMaksimal] = useState('50');

  const handleAddKode = () => {
    if (newKode.trim()) {
      setKodeList([...kodeList, {
        id: Date.now().toString(),
        kode: newKode,
        deskripsi: newDeskripsi,
        aktif: true,
        penggunaan: 0,
        maksimal: parseInt(newMaksimal)
      }]);
      setNewKode('');
      setNewDeskripsi('');
      setNewMaksimal('50');
      alert('Kode unik berhasil ditambahkan!');
    }
  };

  const handleToggleAktif = (id: string) => {
    setKodeList(kodeList.map(k => k.id === id ? { ...k, aktif: !k.aktif } : k));
  };

  const handleDeleteKode = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kode ini?')) {
      setKodeList(kodeList.filter(k => k.id !== id));
    }
  };

  return (
    <div className="max-w-6xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🔑 Kelola Kode Unik Pendaftaran</h2>

      {/* Tambah Kode Baru */}
      <div className="bg-white p-8 rounded-xl shadow-md mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">➕ Tambah Kode Unik Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            value={newKode}
            onChange={(e) => setNewKode(e.target.value)}
            placeholder="Kode unik (contoh: PMD2024)"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            value={newDeskripsi}
            onChange={(e) => setNewDeskripsi(e.target.value)}
            placeholder="Deskripsi"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            value={newMaksimal}
            onChange={(e) => setNewMaksimal(e.target.value)}
            placeholder="Maksimal penggunaan"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={handleAddKode}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Tambahkan
          </button>
        </div>
      </div>

      {/* Daftar Kode */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-indigo-100 border-b">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Kode</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Deskripsi</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Penggunaan</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Maksimal</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kodeList.map(kode => (
              <tr key={kode.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-700">{kode.kode}</td>
                <td className="px-4 py-3 text-gray-600">{kode.deskripsi}</td>
                <td className="px-4 py-3 text-center font-semibold">{kode.penggunaan}/{kode.maksimal}</td>
                <td className="px-4 py-3 text-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${(kode.penggunaan / kode.maksimal) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleAktif(kode.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      kode.aktif 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {kode.aktif ? '✓ Aktif' : '✗ Nonaktif'}
                  </button>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteKode(kode.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Komponen Persetujuan Pending Registrasi
function PendingRegistrationManagement() {
  const [pendingList, setPendingList] = useState<any[]>([]);

  const handleApprove = (id: string) => {
    setPendingList(pendingList.map(p => p.id === id ? { ...p, status: 'approved' } : p));
    alert('Pendaftaran disetujui! User dapat login sekarang.');
  };

  const handleReject = (id: string) => {
    const reason = prompt('Alasan penolakan:');
    if (reason) {
      setPendingList(pendingList.filter(p => p.id !== id));
      alert('Pendaftaran ditolak!');
    }
  };

  const pendingCount = pendingList.filter(p => p.status === 'pending').length;

  return (
    <div className="max-w-6xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">📋 Persetujuan Pendaftaran Akun</h2>

      {/* Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Menunggu Persetujuan</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Disetujui</p>
          <p className="text-3xl font-bold text-green-600">{pendingList.filter(p => p.status === 'approved').length}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Total Pendaftaran</p>
          <p className="text-3xl font-bold text-red-600">{pendingList.length}</p>
        </div>
      </div>

      {/* Daftar Pendaftaran */}
      <div className="space-y-4">
        {pendingList.map(pending => (
          <div key={pending.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Informasi Dasar</p>
                <p className="text-lg font-bold text-gray-800">{pending.nama}</p>
                <p className="text-sm text-gray-600">@{pending.username}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Tipe:</span> {pending.role === 'murid' ? '👨‍🎓 Murid' : '👨‍🏫 Guru'}
                </p>
                {pending.kelas && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Kelas:</span> {pending.kelas}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Kontak</p>
                <p className="text-sm text-gray-700">📧 {pending.email}</p>
                {pending.nis && (
                  <p className="text-sm text-gray-700 mt-2">📋 {pending.nis}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">Terdaftar: {pending.createdAt}</p>
              </div>
            </div>

            {/* Aksi */}
            <div className="flex gap-3">
              {pending.status === 'pending' ? (
                <>
                  <button
                    onClick={() => handleApprove(pending.id)}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    ✓ Setujui
                  </button>
                  <button
                    onClick={() => handleReject(pending.id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    ✗ Tolak
                  </button>
                </>
              ) : (
                <span className="px-6 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                  ✓ Sudah Disetujui
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {pendingCount === 0 && (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <p className="text-gray-600 text-lg">✓ Semua pendaftaran telah diproses</p>
        </div>
      )}
    </div>
  );
}
