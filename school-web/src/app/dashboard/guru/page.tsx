'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function GuruDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [totalTantangan, setTotalTantangan] = useState(0);
  const [totalProject, setTotalProject] = useState(0);

  useEffect(() => {
    try {
      const savedTantangan = localStorage.getItem('school_web_guru_tantangan');
      if (savedTantangan) {
        const parsed = JSON.parse(savedTantangan);
        setTotalTantangan(Array.isArray(parsed) ? parsed.length : 0);
      }
      const savedProjects = localStorage.getItem('school_web_projects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        setTotalProject(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const todayStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-blue-600">Pesantren Masyarakat Digital - Guru</h1>
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
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">👨‍🏫</div>
              <p className="font-semibold text-gray-800">{user?.nama_lengkap || 'Nama Guru'}</p>
              <p className="text-sm text-gray-600">Kelas: {user?.kelas || '1'}</p>
            </div>
          </div>

          <nav className="p-6 space-y-3">
            <a href="/dashboard/guru" className="block p-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition">
              📊 Dashboard
            </a>
            <a href="/dashboard/guru/absensi" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ✏️ Absensi
            </a>
            <a href="/dashboard/guru/tantangan" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📝 Tantangan
            </a>
            <a href="/dashboard/guru/project" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              🤝 Project
            </a>
            <a href="/dashboard/guru/chat" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              💬 Chat Kelas
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-2">Selamat Datang, {user?.nama_lengkap || 'Guru'}! 👋</h2>
              <p className="text-blue-100">Hari ini: {todayStr} | Kelas: {user?.kelas || '1'}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <h3 className="text-gray-600 font-semibold mb-2">Murid Terdaftar</h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-500">di kelas ini</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <h3 className="text-gray-600 font-semibold mb-2">Laporan Absen</h3>
                <p className="text-3xl font-bold text-orange-600">0</p>
                <p className="text-sm text-gray-500">perlu dikonfirmasi</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-600 font-semibold mb-2">Tantangan Aktif</h3>
                <p className="text-3xl font-bold text-green-600">{totalTantangan}</p>
                <p className="text-sm text-gray-500">tugas dibuat</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                <h3 className="text-gray-600 font-semibold mb-2">Project Folder</h3>
                <p className="text-3xl font-bold text-purple-600">{totalProject}</p>
                <p className="text-sm text-gray-500">project aktif</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => router.push('/dashboard/guru/absensi')}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border-t-4 border-blue-500"
              >
                <div className="text-4xl mb-4">✏️</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Kelola Absensi</h3>
                <p className="text-gray-600 text-sm">Lihat rekap dan konfirmasi kehadiran murid.</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                  Buka Absensi →
                </button>
              </div>

              <div
                onClick={() => router.push('/dashboard/guru/tantangan')}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border-t-4 border-green-500"
              >
                <div className="text-4xl mb-4">📝</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Buat Tantangan</h3>
                <p className="text-gray-600 text-sm">Tugaskan soal atau materi belajar kepada siswa.</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                  Kelola Tantangan →
                </button>
              </div>

              <div
                onClick={() => router.push('/dashboard/guru/project')}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border-t-4 border-purple-500"
              >
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Kelola Project</h3>
                <p className="text-gray-600 text-sm">Bentuk kelompok dan evaluasi tugas project murid.</p>
                <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition">
                  Kelola Project →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
