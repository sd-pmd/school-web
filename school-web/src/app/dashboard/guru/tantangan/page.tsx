'use client';

import React, { useEffect, useState } from 'react';

type ContentType = 'text' | 'gambar' | 'video' | 'pdf';

interface Attachment {
  name: string;
  type: ContentType;
  data?: string;
}

interface TantanganItem {
  id: string;
  guru: string;
  judul: string;
  deskripsi: string;
  deadline: string;
  status: 'active' | 'closed';
  contentType: ContentType;
  content?: string;
  attachment?: Attachment;
  submitted: number;
  total_murid: number;
}

const STORAGE_KEY = 'school_web_guru_tantangan';

const defaultTantangan: TantanganItem[] = [];

export default function GuruTantangan() {
  const [showForm, setShowForm] = useState(false);
  const [tantanganList, setTantanganList] = useState<TantanganItem[]>([]);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    contentType: 'pdf' as ContentType,
    content: '',
    deadline: '',
    attachmentName: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTantanganList(JSON.parse(saved));
        return;
      } catch {
        // Ignore malformed JSON and use defaults.
      }
    }
    setTantanganList(defaultTantangan);
  }, []);

  const saveTantangan = (list: TantanganItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setTantanganList(list);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        content: event.target?.result as string,
        attachmentName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.judul || !formData.deskripsi || !formData.deadline) {
      alert('Semua field harus diisi.');
      return;
    }

    if (formData.contentType !== 'text' && !formData.content) {
      alert('Silakan pilih file tugas terlebih dahulu.');
      return;
    }

    const nextTantangan: TantanganItem = {
      id: Date.now().toString(),
      guru: 'Guru Kelas',
      judul: formData.judul,
      deskripsi: formData.deskripsi,
      deadline: formData.deadline,
      status: 'active',
      contentType: formData.contentType,
      content: formData.content,
      submitted: 0,
      total_murid: 32,
      attachment:
        formData.contentType === 'text'
          ? undefined
          : {
              name: formData.attachmentName || `tugas-${formData.contentType}`,
              type: formData.contentType,
              data: formData.content,
            },
    };

    saveTantangan([nextTantangan, ...tantanganList]);
    setFormData({
      judul: '',
      deskripsi: '',
      contentType: 'pdf',
      content: '',
      deadline: '',
      attachmentName: '',
    });
    setShowForm(false);
    alert('Tantangan berhasil dibuat.');
  };

  const getContentTypeLabel = (type: ContentType) => {
    const labels: Record<ContentType, string> = {
      text: '📝 Text',
      gambar: '🖼️ Foto',
      video: '🎥 Video',
      pdf: '📄 PDF',
    };
    return labels[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-blue-600">Pesantren Masyarakat Digital - Kelola Tantangan</h1>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
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

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
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
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipe Lampiran <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="contentType"
                      value={formData.contentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="pdf">📄 PDF</option>
                      <option value="gambar">🖼️ Foto / Gambar</option>
                      <option value="video">🎥 Video</option>
                      <option value="text">📝 Tanpa File</option>
                    </select>
                  </div>

                  {formData.contentType === 'text' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Instruksi Tambahan
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Keterangan tambahan untuk murid..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-32"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload File Tugas <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        accept={
                          formData.contentType === 'gambar'
                            ? 'image/*'
                            : formData.contentType === 'video'
                            ? 'video/*'
                            : '.pdf'
                        }
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        required
                      />
                      {formData.attachmentName && (
                        <p className="text-sm text-green-600 mt-2">✓ {formData.attachmentName} siap diunggah</p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
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
                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
                      >
                        ✓ Buat Tantangan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Total Tantangan</p>
                <p className="text-2xl font-bold text-blue-600">{tantanganList.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Aktif</p>
                <p className="text-2xl font-bold text-green-600">{tantanganList.filter((item) => item.status === 'active').length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Rata-Rata Pengumpulan</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    tantanganList.reduce((acc, item) => acc + (item.submitted / item.total_murid) * 100, 0) /
                      Math.max(tantanganList.length, 1)
                  )}%
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {tantanganList.map((tantangan) => (
                <div key={tantangan.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{tantangan.judul}</h3>
                      <p className="text-gray-600 mt-2">👨‍🏫 {tantangan.guru}</p>
                      <p className="text-gray-700 mt-3">{tantangan.deskripsi}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-semibold text-sm ${tantangan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {tantangan.status === 'active' ? '🟢 Aktif' : '⚫ Ditutup'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-bold text-gray-800">📅 {tantangan.deadline}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Sudah Dikumpulkan</p>
                      <p className="font-bold text-green-600">
                        {tantangan.submitted}/{tantangan.total_murid}
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Progress</p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(tantangan.submitted / tantangan.total_murid) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <div className="rounded-lg border border-dashed border-gray-300 p-4 flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Tipe Lampiran</p>
                      <p className="text-gray-800">{getContentTypeLabel(tantangan.contentType)}</p>
                    </div>
                    <div className="rounded-lg border border-dashed border-gray-300 p-4 flex-1">
                      <p className="text-sm font-semibold text-gray-700 mb-2">File dari Guru</p>
                      <p className="text-gray-800">{tantangan.attachment?.name ?? 'Tidak ada file'}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                      📥 Lihat Pengumpulan
                    </button>
                    <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                      ✏️ Periksa & Nilai
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition">
                      ⚙️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
