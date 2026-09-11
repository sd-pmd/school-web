'use client';

import React from 'react';

interface AbsensiItem {
  id: number;
  murid_nama: string;
  status: 'hadir' | 'alfa' | 'izin' | 'sakit';
  tanggal: string;
  keterangan: string;
  dari_orangtua: boolean;
  confirmed: boolean;
}

export default function GuruAbsensi() {
  const [absensiList, setAbsensiList] = React.useState<AbsensiItem[]>([]);

  const handleConfirm = (id: number) => {
    setAbsensiList(
      absensiList.map((item) =>
        item.id === id ? { ...item, confirmed: true } : item
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-100 text-green-700';
      case 'alfa':
        return 'bg-red-100 text-red-700';
      case 'izin':
        return 'bg-blue-100 text-blue-700';
      case 'sakit':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'hadir':
        return '✓ Hadir';
      case 'alfa':
        return '✗ Alfa';
      case 'izin':
        return '📋 Izin';
      case 'sakit':
        return '🏥 Sakit';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-blue-600">Pesantren Masyarakat Digital - Guru Absensi</h1>
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
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">👨‍🏫</div>
              <p className="font-semibold text-gray-800">Nama Guru</p>
              <p className="text-sm text-gray-600">Kelas: 1</p>
            </div>
          </div>

          <nav className="p-6 space-y-3">
            <a href="/dashboard/guru" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📊 Dashboard
            </a>
            <a href="/dashboard/guru/absensi" className="block p-3 bg-blue-100 text-blue-700 rounded-lg font-semibold">
              ✏️ Absensi
            </a>
            <a href="/dashboard/guru/tantangan" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📝 Tantangan
            </a>
            <a href="/dashboard/guru/project" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              🤝 Project
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              💬 Chat Kelas
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📊 Laporan
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl mb-8 shadow-lg">
              <h2 className="text-3xl font-bold">Kelola Absensi Kelas 1</h2>
              <p className="text-blue-100 mt-2">Konfirmasi laporan absensi dari orang tua</p>
            </div>

            {/* Filter & Actions */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <div className="flex gap-4 flex-wrap">
                <input
                  type="date"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                />
                <select className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500">
                  <option>Semua Status</option>
                  <option>Hadir</option>
                  <option>Alfa</option>
                  <option>Izin</option>
                  <option>Sakit</option>
                </select>
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                  📥 Export Excel
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Hadir</p>
                <p className="text-2xl font-bold text-green-600">
                  {absensiList.filter((item) => item.status === 'hadir').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <p className="text-gray-600 text-sm">Alfa</p>
                <p className="text-2xl font-bold text-red-600">
                  {absensiList.filter((item) => item.status === 'alfa').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Izin</p>
                <p className="text-2xl font-bold text-blue-600">
                  {absensiList.filter((item) => item.status === 'izin').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Sakit</p>
                <p className="text-2xl font-bold text-orange-600">
                  {absensiList.filter((item) => item.status === 'sakit').length}
                </p>
              </div>
            </div>

            {/* Absensi List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {absensiList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="text-lg font-semibold">Belum Ada Data Absensi</p>
                  <p className="text-sm text-gray-400 mt-1">Laporan absensi dari siswa atau orang tua akan muncul di sini.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">No</th>
                        <th className="px-6 py-4 text-left font-semibold">Nama Murid</th>
                        <th className="px-6 py-4 text-left font-semibold">Tanggal</th>
                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                        <th className="px-6 py-4 text-left font-semibold">Keterangan</th>
                        <th className="px-6 py-4 text-left font-semibold">Dari</th>
                        <th className="px-6 py-4 text-left font-semibold">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {absensiList.map((item, index) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                          <td className="px-6 py-4 font-semibold text-gray-800">{item.murid_nama}</td>
                          <td className="px-6 py-4 text-gray-600">{item.tanggal}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusColor(item.status)}`}>
                              {getStatusLabel(item.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{item.keterangan}</td>
                          <td className="px-6 py-4 text-center">
                            {item.dari_orangtua && <span className="text-orange-600 font-semibold">👨‍👩‍👧</span>}
                          </td>
                          <td className="px-6 py-4">
                            {!item.confirmed ? (
                              <button
                                onClick={() => handleConfirm(item.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                              >
                                ✓ Konfirmasi
                              </button>
                            ) : (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                                ✓ Terkonfirmasi
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-blue-900">
                💡 <strong>Tips:</strong> Konfirmasi semua laporan absensi dari orang tua agar data tercatat dengan akurat.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
