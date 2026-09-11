'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HatamDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedKelas, setSelectedKelas] = useState<string>(
    user?.kelas_list?.[0] || 'Semua Kelas'
  );

  useEffect(() => {
    // Redirect if not hatam
    if (user && user.role !== 'hatam') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-orange-600">Pesantren Masyarakat Digital - Guru Hatam</h1>
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
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">👨‍🏫</div>
              <p className="font-bold text-gray-800 text-lg">{user?.nama_lengkap || 'Guru Hatam'}</p>
              <p className="text-sm text-orange-600 font-semibold">Guru Hatam</p>
            </div>

            {/* Kelas Selection */}
            <div className="mt-4 p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-xs font-bold text-orange-600 uppercase mb-2">Kelas yang Dikelola</p>
              <div className="space-y-2">
                {user?.kelas_list?.map((kelas) => (
                  <button
                    key={kelas}
                    onClick={() => setSelectedKelas(kelas)}
                    className={`w-full text-left p-2 rounded-lg text-sm font-semibold transition ${
                      selectedKelas === kelas
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-orange-700 border border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {kelas}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 Overview
            </button>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Menu Hatam</p>
              <button
                onClick={() => setActiveTab('tantangan-hatam')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'tantangan-hatam'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📝 Tantangan Hatam
              </button>
              <button
                onClick={() => setActiveTab('laporan-hatam')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'laporan-hatam'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📊 Laporan Hatam
              </button>
              <button
                onClick={() => setActiveTab('evaluasi-hatam')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'evaluasi-hatam'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                ⭐ Evaluasi Hatam
              </button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Lainnya</p>
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'chat'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'settings'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                ⚙️ Pengaturan
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl">
              <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white p-8 rounded-2xl mb-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-2">Selamat Datang, Guru Hatam! 👋</h2>
                <p className="text-orange-100">Kelola program Hatam untuk kelas {user?.kelas_list?.join(', ')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Kelas yang Dikelola</h3>
                  <p className="text-3xl font-bold text-orange-600">{user?.kelas_list?.length || 0}</p>
                  <p className="text-sm text-gray-500">kelompok siswa</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Tantangan Aktif</h3>
                  <p className="text-3xl font-bold text-yellow-600">8</p>
                  <p className="text-sm text-gray-500">dalam proses</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                  <h3 className="text-gray-600 font-semibold mb-2">Total Siswa</h3>
                  <p className="text-3xl font-bold text-red-600">96</p>
                  <p className="text-sm text-gray-500">di semua kelas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📋 Kelas yang Anda Kelola</h3>
                  <div className="space-y-3">
                    {user?.kelas_list?.map((kelas) => (
                      <div
                        key={kelas}
                        className="flex justify-between items-center p-3 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <span className="font-semibold text-gray-800">{kelas}</span>
                        <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full">
                          32 siswa
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">⚡ Akses Cepat</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                      ➕ Buat Tantangan Hatam Baru
                    </button>
                    <button className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                      📊 Lihat Laporan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tantangan Hatam Tab */}
          {activeTab === 'tantangan-hatam' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">📝 Tantangan Hatam</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md border-t-2 border-orange-500">
                  <p className="text-gray-600 font-semibold mb-2">Total Tantangan</p>
                  <p className="text-3xl font-bold text-orange-600">8</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-t-2 border-yellow-500">
                  <p className="text-gray-600 font-semibold mb-2">Sedang Berjalan</p>
                  <p className="text-3xl font-bold text-yellow-600">5</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-t-2 border-green-500">
                  <p className="text-gray-600 font-semibold mb-2">Selesai</p>
                  <p className="text-3xl font-bold text-green-600">3</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-t-2 border-blue-500">
                  <p className="text-gray-600 font-semibold mb-2">Dipelajari Ulang</p>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                </div>
              </div>

              <div className="mb-6">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                  ➕ Tambah Tantangan Hatam Baru
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-md border border-dashed border-orange-200">
                  <div className="text-4xl mb-3">📖</div>
                  <p className="text-lg font-semibold text-gray-700">Belum Ada Tantangan Hatam</p>
                  <p className="text-sm text-gray-400 mt-1">Klik tombol "+ Tambah Tantangan Hatam Baru" di atas untuk membuat target hafalan.</p>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Laporan Hatam Tab */}
          {activeTab === 'laporan-hatam' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">📊 Laporan Hatam</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📈 Statistik Hafalan</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Kelas 1</span>
                        <span className="font-bold text-orange-600">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-orange-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Kelas 2</span>
                        <span className="font-bold text-orange-600">72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-orange-500 h-3 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">Kelas 3</span>
                        <span className="font-bold text-orange-600">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-orange-500 h-3 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">📋 Laporan per Siswa</h3>
                  <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition mb-4">
                    📥 Download Laporan Lengkap (PDF)
                  </button>
                  <button className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                    📊 Lihat Detail per Siswa
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Evaluasi Hatam Tab */}
          {activeTab === 'evaluasi-hatam' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">⭐ Evaluasi Hatam</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Evaluasi perkembangan siswa dalam program Hatam</p>
                <div className="space-y-4 mb-8">
                  <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                    ➕ Tambah Evaluasi Baru
                  </button>
                  <button className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
                    📋 Lihat Riwayat Evaluasi
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Evaluasi Terbaru</h3>
                  <div className="p-8 text-center text-gray-400 bg-orange-50/50 rounded-lg border border-dashed border-orange-200">
                    <p className="text-sm">Belum ada evaluasi santri yang dicatat.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">💬 Chat</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-6">Chat dengan siswa dan sesama guru Hatam</p>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Mulai Chat →
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-6xl">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">⚙️ Pengaturan</h2>
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">👤 Profil</h3>
                  <p className="text-gray-600 mb-6">Nama: {user?.nama_lengkap}</p>
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Edit Profil
                  </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">🔐 Keamanan</h3>
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
