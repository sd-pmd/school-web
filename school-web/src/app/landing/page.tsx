import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold">Pesantren Masyarakat Digital</h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:shadow-lg transition"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="mb-6 animate-bounce flex justify-center">
            <img src="/pmd.png" alt="Logo" className="h-24 w-24 object-contain" />
          </div>
          <h2 className="text-5xl font-bold text-orange-900 mb-4">
            Pesantren Masyarakat Digital
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Menghubungkan Guru, Murid, dan Orang Tua dalam satu platform yang mudah, aman, dan menyenangkan
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/login"
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition"
            >
              🚀 Masuk Sekarang
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition"
            >
              ✍️ Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Feature 1: Guru */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition border-t-4 border-orange-500">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-orange-600 mb-3">Untuk Guru</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✅ Kelola kelas dengan mudah</li>
              <li>✅ Buat tugas dan project</li>
              <li>✅ Pantau kehadiran murid</li>
              <li>✅ Berkomunikasi dengan orang tua</li>
              <li>✅ Evaluasi progres murid</li>
            </ul>
          </div>

          {/* Feature 2: Murid */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition border-t-4 border-green-500">
            <div className="text-4xl mb-4">👨‍🎓</div>
            <h3 className="text-2xl font-bold text-green-600 mb-3">Untuk Murid</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✅ Lihat jadwal pelajaran</li>
              <li>✅ Kerjakan tugas & project</li>
              <li>✅ Chat dengan teman sekelasnya</li>
              <li>✅ Lihat nilai dan feedback</li>
              <li>✅ Akses informasi sekolah</li>
            </ul>
          </div>

          {/* Feature 3: Orang Tua */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition border-t-4 border-orange-500">
            <div className="text-4xl mb-4">👨‍👩‍👧</div>
            <h3 className="text-2xl font-bold text-orange-600 mb-3">Untuk Orang Tua</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✅ Pantau kehadiran anak</li>
              <li>✅ Lihat tugas dan nilai</li>
              <li>✅ Dapatkan notifikasi penting</li>
              <li>✅ Berkomunikasi dengan guru</li>
              <li>✅ Monitor progres belajar</li>
            </ul>
          </div>
        </div>

        {/* Menu Highlight Section */}
        <div className="mb-20 bg-gradient-to-r from-blue-50 to-green-50 p-12 rounded-2xl border-2 border-blue-200">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Fitur Unggulan Platform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-bold text-gray-800">Chat Kelas</h4>
              <p className="text-sm text-gray-600 mt-2">Komunikasi antar murid per kelas</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-bold text-gray-800">Tantangan</h4>
              <p className="text-sm text-gray-600 mt-2">Tugas dan PR dari guru</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-bold text-gray-800">Project</h4>
              <p className="text-sm text-gray-600 mt-2">Project individu & kelompok</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">✏️</div>
              <h4 className="font-bold text-gray-800">Absensi</h4>
              <p className="text-sm text-gray-600 mt-2">Pantau kehadiran siswa</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">📅</div>
              <h4 className="font-bold text-gray-800">Jadwal</h4>
              <p className="text-sm text-gray-600 mt-2">Lihat jadwal pelajaran</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🏫</div>
              <h4 className="font-bold text-gray-800">Info Sekolah</h4>
              <p className="text-sm text-gray-600 mt-2">Informasi penting sekolah</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-gray-800">Laporan</h4>
              <p className="text-sm text-gray-600 mt-2">Laporan bulanan & Excel</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🔔</div>
              <h4 className="font-bold text-gray-800">Notifikasi</h4>
              <p className="text-sm text-gray-600 mt-2">Pengingat penting real-time</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-2xl text-center shadow-xl">
          <h3 className="text-3xl font-bold mb-4">� Administrator Area</h3>
          <p className="text-lg mb-8 opacity-90">
            Platform School Web - Masuk dengan akun yang telah disediakan oleh administrator
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition"
            >
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
