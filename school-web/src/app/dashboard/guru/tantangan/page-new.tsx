'use client';

import React, { useEffect } from 'react';
import type { Tantangan, ContentType } from '@/types';

export default function GuruTantangan() {
  const [showForm, setShowForm] = React.useState(false);
  const [tantanganList, setTantanganList] = React.useState<Tantangan[]>([]);
  
  const [formData, setFormData] = React.useState({
    judul: '',
    deskripsi: '',
    contentType: 'text' as ContentType,
    content: '',
    deadline: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tantangan_guru');
    if (saved) {
      setTantanganList(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveTantangan = (list: Tantangan[]) => {
    localStorage.setItem('tantangan_guru', JSON.stringify(list));
    setTantanganList(list);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulasi upload file - dalam production gunakan actual upload
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          content: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.deskripsi || !formData.content || !formData.deadline) {
      alert('Semua field harus diisi!');
      return;
    }

    const newTantangan: Tantangan = {
      id: Date.now().toString(),
      guru_id: 'guru1', // Dari auth store nanti
      kelas_id: '1', // Dari auth store nanti
      judul: formData.judul,
      deskripsi: formData.deskripsi,
      contentType: formData.contentType,
      content: formData.content,
      deadline: new Date(formData.deadline),
      type: 'akademik',
      createdAt: new Date(),
    };

    saveTantangan([...tantanganList, newTantangan]);
    
    setFormData({
      judul: '',
      deskripsi: '',
      contentType: 'text',
      content: '',
      deadline: '',
    });
    setShowForm(false);
    alert('Tantangan berhasil dibuat!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus tantangan ini?')) {
      saveTantangan(tantanganList.filter(t => t.id !== id));
    }
  };

  const getContentTypeLabel = (type: ContentType) => {
    const labels: Record<ContentType, string> = {
      text: '📝 Text',
      gambar: '🖼️ Gambar',
      video: '🎥 Video',
      pdf: '📄 PDF'
    };
    return labels[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🏫 School Web - Kelola Tantangan</h1>
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
            <a href="/dashboard/guru/absensi" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ✏️ Absensi
            </a>
            <a href="/dashboard/guru/tantangan" className="block p-3 bg-blue-100 text-blue-700 rounded-lg font-semibold">
              📝 Tantangan
            </a>
            <a href="/dashboard/guru/project" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              🤝 Project
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl mb-8 shadow-lg flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">Kelola Tantangan (Tugas)</h2>
                <p className="text-blue-100 mt-2">Buat dan pantau pengumpulan tugas murid</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
              >
                {showForm ? '✕ Batal' : '+ Buat Tantangan'}
              </button>
            </div>

            {/* Form Buat Tantangan */}
            {showForm && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Buat Tantangan Baru</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Judul Tantangan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleInputChange}
                      placeholder="Contoh: Soal Matematika Bab 6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deskripsi / Detail Tugas <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleInputChange}
                      placeholder="Jelaskan tugas yang harus dikerjakan murid..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-32"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipe Konten <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="contentType"
                      value={formData.contentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="text">📝 Text / Deskripsi</option>
                      <option value="gambar">🖼️ Gambar</option>
                      <option value="video">🎥 Video (URL)</option>
                      <option value="pdf">📄 File PDF</option>
                    </select>
                  </div>

                  {formData.contentType === 'text' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Konten <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Masukkan isi tantangan / soal..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-40"
                        required
                      ></textarea>
                    </div>
                  ) : formData.contentType === 'video' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        URL Video <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Contoh: https://youtu.be/... atau https://drive.google.com/..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload File ({formData.contentType === 'gambar' ? 'JPG, PNG' : 'PDF'}) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept={formData.contentType === 'gambar' ? 'image/*' : '.pdf'}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        required
                      />
                      {formData.content && (
                        <p className="text-sm text-green-600 mt-2">✓ File sudah dipilih</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deadline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      ✓ Buat Tantangan
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Total Tantangan</p>
                <p className="text-2xl font-bold text-blue-600">{tantanganList.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Aktif</p>
                <p className="text-2xl font-bold text-green-600">{tantanganList.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Pengumpulan</p>
                <p className="text-2xl font-bold text-orange-600">0</p>
              </div>
            </div>

            {/* Tantangan List */}
            {tantanganList.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg mb-4">📭 Belum ada tantangan</p>
                <p className="text-gray-400">Mulai dengan membuat tantangan baru!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {tantanganList.map((tantangan) => (
                  <div key={tantangan.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">{tantangan.judul}</h3>
                        <p className="text-gray-600 mt-2">{tantangan.deskripsi}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(tantangan.id)}
                        className="ml-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                      >
                        🗑️ Hapus
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">JENIS KONTEN</p>
                        <p className="text-lg font-bold text-blue-600">{getContentTypeLabel(tantangan.contentType)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">DEADLINE</p>
                        <p className="text-lg font-bold text-orange-600">{new Date(tantangan.deadline).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">PENGUMPULAN</p>
                        <p className="text-lg font-bold text-green-600">0 / 32 murid</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
