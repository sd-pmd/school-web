export default function OrangtuaDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-orange-600">Pesantren Masyarakat Digital - Orang Tua</h1>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <div className="bg-orange-100 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">👨‍👩‍👧</div>
              <p className="font-semibold text-gray-800">Nama Orang Tua</p>
              <p className="text-sm text-gray-600">Anak: Budi Santoso</p>
            </div>
          </div>

          <nav className="p-6 space-y-3">
            <a href="#" className="block p-3 bg-orange-100 text-orange-700 rounded-lg font-semibold hover:bg-orange-200 transition">
              📊 Dashboard
            </a>
            <a href="/dashboard/orangtua/absensi" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ✏️ Absensi Anak
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📝 Nilai & Rapor
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📅 Jadwal Pelajaran
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              💬 Chat dengan Guru
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              🔔 Notifikasi
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📋 Info Sekolah
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ⚙️ Pengaturan
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl mb-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-2">Assalamu'alaikum, Orang Tua! 👋</h2>
              <p className="text-orange-100">Pantau perkembangan dan kehadiran anak Anda dengan mudah</p>
            </div>

            {/* Monitoring Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-600 font-semibold mb-2">Kehadiran Bulan Ini</h3>
                <p className="text-3xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-500">hari tercatat</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <h3 className="text-gray-600 font-semibold mb-2">Izin / Sakit</h3>
                <p className="text-3xl font-bold text-orange-600">0</p>
                <p className="text-sm text-gray-500">dengan keterangan</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                <h3 className="text-gray-600 font-semibold mb-2">Alfa</h3>
                <p className="text-3xl font-bold text-red-600">0</p>
                <p className="text-sm text-gray-500">tanpa keterangan</p>
              </div>
            </div>

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Absensi Detail */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-orange-500">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">Laporan Kehadiran</h3>

                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 mb-6 bg-gray-50 rounded-lg p-4 border border-dashed border-gray-200">
                  <span className="text-3xl mb-2">📋</span>
                  <p className="text-sm font-semibold">Belum ada riwayat ketidakhadiran</p>
                  <p className="text-xs text-gray-400 mt-1">Data kehadiran anak Anda akan diperbarui oleh guru kelas.</p>
                </div>

                <a href="/dashboard/orangtua/absensi" className="block text-center w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                  ✏️ Lapor Ketidakhadiran Anak
                </a>
              </div>

              {/* Nilai & Prestasi */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-blue-500">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">Nilai Akademik</h3>

                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 mb-6 bg-gray-50 rounded-lg p-4 border border-dashed border-gray-200">
                  <span className="text-3xl mb-2">📊</span>
                  <p className="text-sm font-semibold">Belum ada data nilai akademik</p>
                  <p className="text-xs text-gray-400 mt-1">Nilai akan muncul setelah guru memberikan penilaian.</p>
                </div>

                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                  Lihat Rapor Lengkap
                </button>
              </div>

              {/* Jadwal Pelajaran */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-green-500">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">Jadwal Pelajaran</h3>

                <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 mb-6 bg-gray-50 rounded-lg p-4 border border-dashed border-gray-200">
                  <span className="text-3xl mb-2">📅</span>
                  <p className="text-sm font-semibold">Belum ada jadwal pelajaran</p>
                  <p className="text-xs text-gray-400 mt-1">Hubungi admin atau guru kelas untuk jadwal terbaru.</p>
                </div>

                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                  Lihat Jadwal Lengkap
                </button>
              </div>

              {/* Komunikasi dengan Guru */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition border-t-4 border-purple-500">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">Chat dengan Guru</h3>

                <div className="space-y-3 mb-6 bg-purple-50 p-4 rounded-lg h-40 overflow-y-auto">
                  <div className="text-sm">
                    <p className="text-gray-600"><strong>Guru:</strong> Budi sangat aktif di kelas</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600"><strong>Anda:</strong> Terima kasih informasinya 😊</p>
                  </div>
                </div>

                <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition">
                  Buka Chat
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
