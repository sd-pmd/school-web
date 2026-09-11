'use client';

import React from 'react';

export default function OrangtauAbsensi() {
  const [formData, setFormData] = React.useState({
    tanggal: new Date().toISOString().split('T')[0],
    status: 'izin',
    keterangan: '',
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        status: 'izin',
        keterangan: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-orange-600">Pesantren Masyarakat Digital - Lapor Absensi Anak</h1>
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
            <a href="/dashboard/orangtua" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📊 Dashboard
            </a>
            <a href="/dashboard/orangtua/absensi" className="block p-3 bg-orange-100 text-orange-700 rounded-lg font-semibold">
              ✏️ Lapor Absensi
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-xl mb-8 shadow-lg">
              <h2 className="text-3xl font-bold">Lapor Absensi Anak</h2>
              <p className="text-orange-100 mt-2">Informasikan jika anak Anda tidak bisa hadir ke sekolah</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg text-green-700 flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">Laporan Berhasil Dikirim!</p>
                    <p className="text-sm">Laporan Anda akan dikonfirmasi oleh guru.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Info Anak */}
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm text-gray-600">Anak yang Dilaporkan</p>
                  <p className="text-xl font-bold text-gray-800">Budi Santoso - Kelas 1</p>
                </div>

                {/* Tanggal */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Tidak Hadir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-700"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Status Ketidakhadiran <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'izin', label: '📋 Izin', description: 'Ada keperluan' },
                      { value: 'sakit', label: '🏥 Sakit', description: 'Sakit / Demam' },
                      { value: 'alfa', label: '✗ Alfa', description: 'Tanpa keterangan' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: option.value })}
                        className={`p-4 rounded-lg border-2 transition text-center ${
                          formData.status === option.value
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="text-lg font-bold">{option.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keterangan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Keterangan / Alasan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.keterangan}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                    placeholder="Jelaskan alasan anak tidak hadir..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-gray-700 min-h-32"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-2">Minimal 10 karakter</p>
                </div>

                {/* Upload Bukti (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Bukti (Opsional - untuk sakit gunakan surat dokter)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition cursor-pointer">
                    <div className="text-3xl mb-2">📎</div>
                    <p className="text-gray-700 font-semibold">Klik atau drag file di sini</p>
                    <p className="text-xs text-gray-500 mt-2">Maksimal 5 MB (PDF, JPG, PNG)</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-200"
                  >
                    📤 Kirim Laporan
                  </button>
                  <button
                    type="reset"
                    className="px-6 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
                  >
                    Bersihkan
                  </button>
                </div>
              </form>
            </div>

            {/* Riwayat Laporan */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Laporan Anda</h3>

              <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 bg-gray-50 rounded-lg p-4 border border-dashed border-gray-200">
                <span className="text-3xl mb-2">📋</span>
                <p className="text-sm font-semibold">Belum Ada Riwayat Laporan</p>
                <p className="text-xs text-gray-400 mt-1">Laporan ketidakhadiran yang Anda kirimkan akan tercatat di sini.</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
              <p className="text-orange-900">
                💡 <strong>Informasi Penting:</strong> Lapor absensi segera hari itu jika anak Anda tidak bisa hadir. Laporan akan dikonfirmasi oleh guru. Untuk sakit, diharapkan melampirkan surat keterangan dokter.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
