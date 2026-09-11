'use client';

import React, { useEffect, useState } from 'react';

type FileType = 'pdf' | 'gambar' | 'video';

interface Attachment {
  name: string;
  type: FileType;
  data?: string;
}

interface Group {
  id: string;
  nama: string;
  ketua: string;
  anggota: string[];
  progress: number;
  status: 'pending' | 'submitted' | 'graded';
  file_submitted?: string;
  file_type?: FileType;
  file_data?: string;
  nilai?: number;
  feedback?: string;
  submittedAt?: string;
}

interface IndividualSubmission {
  studentName: string;
  studentId: string;
  progress: number;
  status: 'pending' | 'submitted' | 'graded';
  file_submitted?: string;
  file_type?: FileType;
  file_data?: string;
  nilai?: number;
  feedback?: string;
  submittedAt?: string;
}

interface ProjectItem {
  id: string;
  judul: string;
  tipe: 'individu' | 'kelompok';
  deskripsi: string;
  deadline: string;
  status: 'active' | 'closed';
  guru: string;
  attachment?: Attachment;
  groups?: Group[];
  submissions?: Record<string, IndividualSubmission>;
}

const STORAGE_KEY = 'school_web_projects';

const defaultProjects: ProjectItem[] = [];

export default function GuruProject() {
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tipe: 'individu' as 'individu' | 'kelompok',
    deadline: '',
    attachmentType: 'pdf' as FileType,
    attachmentName: '',
    attachmentData: '',
  });

  const [formGroups, setFormGroups] = useState<Array<{ id: string; nama: string; ketua: string; anggota: string }>>([
    { id: '1', nama: 'Kelompok 1', ketua: 'Budi Santoso', anggota: 'Ani Wijaya, Randi Pratama, Siti Nurhaliza' },
  ]);

  // Grading states
  const [gradingInfo, setGradingInfo] = useState<{
    projectId: string;
    targetId: string; // groupId or studentId
    type: 'individu' | 'kelompok';
    name: string;
  } | null>(null);
  const [nilai, setNilai] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProjectList(JSON.parse(saved));
        return;
      } catch {
        // use defaults
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    setProjectList(defaultProjects);
  }, []);

  const saveProjects = (list: ProjectItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setProjectList(list);
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
        attachmentData: event.target?.result as string,
        attachmentName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Group creation methods
  const addFormGroup = () => {
    const nextNum = formGroups.length + 1;
    setFormGroups((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        nama: `Kelompok ${nextNum}`,
        ketua: '',
        anggota: '',
      },
    ]);
  };

  const removeFormGroup = (id: string) => {
    setFormGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleGroupFieldChange = (id: string, field: 'nama' | 'ketua' | 'anggota', value: string) => {
    setFormGroups((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return { ...g, [field]: value };
        }
        return g;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.judul || !formData.deskripsi || !formData.deadline) {
      alert('Judul, deskripsi, dan deadline wajib diisi.');
      return;
    }

    const newProject: ProjectItem = {
      id: Date.now().toString(),
      judul: formData.judul,
      deskripsi: formData.deskripsi,
      tipe: formData.tipe,
      deadline: formData.deadline,
      status: 'active',
      guru: 'Guru Kelas',
    };

    if (formData.attachmentName) {
      newProject.attachment = {
        name: formData.attachmentName,
        type: formData.attachmentType,
        data: formData.attachmentData,
      };
    }

    if (formData.tipe === 'kelompok') {
      newProject.groups = formGroups.map((g) => ({
        id: g.id,
        nama: g.nama,
        ketua: g.ketua,
        anggota: g.anggota.split(',').map((name) => name.trim()).filter(Boolean),
        progress: 0,
        status: 'pending',
      }));
    } else {
      newProject.submissions = {
        'murid-1': {
          studentId: 'murid-1',
          studentName: 'Budi Santoso',
          progress: 0,
          status: 'pending',
        },
      };
    }

    const updatedList = [newProject, ...projectList];
    saveProjects(updatedList);

    // Reset form
    setFormData({
      judul: '',
      deskripsi: '',
      tipe: 'individu',
      deadline: '',
      attachmentType: 'pdf',
      attachmentName: '',
      attachmentData: '',
    });
    setFormGroups([
      { id: '1', nama: 'Kelompok 1', ketua: 'Budi Santoso', anggota: 'Ani Wijaya, Randi Pratama, Siti Nurhaliza' },
    ]);
    setShowForm(false);
    alert('Project Folder berhasil dibuat.');
  };

  const startGrading = (projectId: string, targetId: string, type: 'individu' | 'kelompok', name: string, currentNilai?: number, currentFeedback?: string) => {
    setGradingInfo({ projectId, targetId, type, name });
    setNilai(currentNilai || 85);
    setFeedback(currentFeedback || '');
  };

  const submitGrade = () => {
    if (!gradingInfo) return;

    const { projectId, targetId, type } = gradingInfo;
    const updated = projectList.map((project) => {
      if (project.id === projectId) {
        if (type === 'kelompok' && project.groups) {
          const updatedGroups = project.groups.map((group) => {
            if (group.id === targetId) {
              return {
                ...group,
                status: 'graded' as const,
                nilai,
                feedback,
              };
            }
            return group;
          });
          return { ...project, groups: updatedGroups };
        } else if (type === 'individu' && project.submissions) {
          const updatedSubs = { ...project.submissions };
          if (updatedSubs[targetId]) {
            updatedSubs[targetId] = {
              ...updatedSubs[targetId],
              status: 'graded' as const,
              nilai,
              feedback,
            };
          }
          return { ...project, submissions: updatedSubs };
        }
      }
      return project;
    });

    // Recalculate completed count
    const finalUpdated = updated.map((project) => {
      let selesai = 0;
      if (project.tipe === 'kelompok' && project.groups) {
        selesai = project.groups.filter((g) => g.status === 'graded' || g.status === 'submitted').length;
        return { ...project, selesai };
      } else if (project.tipe === 'individu' && project.submissions) {
        selesai = Object.values(project.submissions).filter((s) => s.status === 'graded' || s.status === 'submitted').length;
        return { ...project, selesai };
      }
      return project;
    });

    saveProjects(finalUpdated);
    setGradingInfo(null);
    alert('Penilaian berhasil disimpan.');
  };

  const getAttachmentIcon = (type?: FileType) => {
    switch (type) {
      case 'gambar':
        return '🖼️';
      case 'video':
        return '🎥';
      default:
        return '📄';
    }
  };

  const handleDownload = (data?: string, filename?: string) => {
    if (!data) {
      alert('File tidak ditemukan atau berupa mock.');
      return;
    }
    const link = document.createElement('a');
    link.href = data;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-indigo-600">Pesantren Masyarakat Digital - Kelola Project</h1>
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
            <div className="bg-indigo-100 p-4 rounded-lg text-center">
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
            <a href="/dashboard/guru/tantangan" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📝 Tantangan
            </a>
            <a href="/dashboard/guru/project" className="block p-3 bg-indigo-100 text-indigo-700 rounded-lg font-semibold">
              🤝 Project
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl mb-8 shadow-lg flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold font-serif">Kelola Project Folder</h2>
                <p className="text-indigo-100 mt-2">Buat wadah project individu/kelompok dan lampirkan petunjuk.</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
              >
                {showForm ? '✕ Batal' : '+ Buat Project Folder'}
              </button>
            </div>

            {/* Project Folder Form */}
            {showForm && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-indigo-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Buat Project Folder Baru</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Judul Project <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleInputChange}
                      placeholder="Contoh: Membuat Kipas Kerajinan Tangan"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Deskripsi Project & Tugas <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleInputChange}
                      placeholder="Jelaskan detail project yang harus dikerjakan..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none min-h-24"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Project</label>
                      <select
                        name="tipe"
                        value={formData.tipe}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="individu">👤 Individu</option>
                        <option value="kelompok">👥 Kelompok</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Petunjuk Guru</label>
                      <select
                        name="attachmentType"
                        value={formData.attachmentType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="pdf">📄 PDF Document</option>
                        <option value="gambar">🖼️ Foto / Gambar</option>
                        <option value="video">🎥 Video Petunjuk</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Deadline <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Petunjuk Guru</label>
                    <input
                      type="file"
                      accept={
                        formData.attachmentType === 'gambar'
                          ? 'image/*'
                          : formData.attachmentType === 'video'
                          ? 'video/*'
                          : '.pdf'
                      }
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                    {formData.attachmentName && (
                      <p className="text-sm text-green-600 mt-2 font-semibold">✓ {formData.attachmentName} siap dilampirkan</p>
                    )}
                  </div>

                  {/* Kelompok Creation Section */}
                  {formData.tipe === 'kelompok' && (
                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-indigo-900">Pembagian Kelompok Murid</h4>
                        <button
                          type="button"
                          onClick={addFormGroup}
                          className="bg-indigo-600 text-white px-3 py-1 text-sm rounded font-semibold hover:bg-indigo-700 transition"
                        >
                          + Tambah Kelompok
                        </button>
                      </div>

                      <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {formGroups.map((g, idx) => (
                          <div key={g.id} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row gap-3 items-end">
                            <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-600 mb-1">Nama Kelompok</label>
                              <input
                                type="text"
                                value={g.nama}
                                onChange={(e) => handleGroupFieldChange(g.id, 'nama', e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-indigo-500"
                                required
                              />
                            </div>
                            <div className="w-full md:w-1/4">
                              <label className="block text-xs font-bold text-gray-600 mb-1">Ketua Kelompok</label>
                              <input
                                type="text"
                                value={g.ketua}
                                onChange={(e) => handleGroupFieldChange(g.id, 'ketua', e.target.value)}
                                placeholder="Nama Ketua"
                                className="w-full px-3 py-2 border rounded focus:outline-indigo-500"
                                required
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-bold text-gray-600 mb-1">Anggota (pisahkan dengan koma)</label>
                              <input
                                type="text"
                                value={g.anggota}
                                onChange={(e) => handleGroupFieldChange(g.id, 'anggota', e.target.value)}
                                placeholder="Ani, Randi, Siti"
                                className="w-full px-3 py-2 border rounded focus:outline-indigo-500"
                                required
                              />
                            </div>
                            {formGroups.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFormGroup(g.id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                      ✓ Simpan Project Folder
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Active Grading Modal Overlay */}
            {gradingInfo && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Penilaian Project</h3>
                  <p className="text-sm text-gray-600 mb-6">Target: <strong className="text-indigo-600">{gradingInfo.name}</strong></p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nilai (0-100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={nilai}
                        onChange={(e) => setNilai(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-indigo-500 text-xl font-bold text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Guru</label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Berikan masukan konstruktif..."
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-indigo-500 min-h-24"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setGradingInfo(null)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      onClick={submitGrade}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                      Kirim Nilai
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Project List */}
            {projectList.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500 border border-indigo-100">
                <div className="text-4xl mb-3">📁</div>
                <p className="text-lg font-semibold">Belum Ada Project Folder</p>
                <p className="text-sm text-gray-400 mt-1">Klik tombol "+ Buat Project Folder" di atas untuk membuat project baru.</p>
              </div>
            ) : (
              <div className="space-y-6">
              {projectList.map((project) => {
                const totalItem = project.tipe === 'kelompok'
                  ? project.groups?.length || 0
                  : Object.keys(project.submissions || {}).length || 0;
                
                const completedCount = project.tipe === 'kelompok'
                  ? project.groups?.filter(g => g.status === 'graded' || g.status === 'submitted').length || 0
                  : Object.values(project.submissions || {}).filter(s => s.status === 'graded' || s.status === 'submitted').length || 0;

                const isExpanded = expandedProjectId === project.id;

                return (
                  <div key={project.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{project.judul}</h3>
                        <p className="text-gray-600 mt-2">{project.deskripsi}</p>
                        
                        <div className="flex flex-wrap gap-3 mt-3 text-sm">
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                            {project.tipe === 'kelompok' ? '👥 Kelompok' : '👤 Individu'}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                            📅 Deadline: {project.deadline}
                          </span>
                          {project.attachment && (
                            <button
                              onClick={() => handleDownload(project.attachment?.data, project.attachment?.name)}
                              className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold hover:bg-indigo-100 flex items-center gap-1"
                            >
                              {getAttachmentIcon(project.attachment?.type)} {project.attachment.name}
                            </button>
                          )}
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-xs">
                        🟢 Aktif
                      </span>
                    </div>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total {project.tipe === 'kelompok' ? 'Kelompok' : 'Siswa'}</p>
                        <p className="text-2xl font-bold text-blue-600">{totalItem}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Kumpul / Selesai</p>
                        <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Progress</p>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{
                              width: `${totalItem > 0 ? (completedCount / totalItem) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Detail Penyerahan Tugas */}
                    {isExpanded && (
                      <div className="border-t pt-4 mt-4 space-y-4">
                        <h4 className="font-bold text-gray-800">Detail Status Pengumpulan:</h4>
                        
                        {project.tipe === 'kelompok' && project.groups && (
                          <div className="space-y-3">
                            {project.groups.map((group) => (
                              <div key={group.id} className="bg-gray-50 p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                <div>
                                  <p className="font-bold text-gray-800">{group.nama}</p>
                                  <p className="text-xs text-gray-600">Ketua: {group.ketua} | Anggota: {group.anggota.join(', ')}</p>
                                  {group.file_submitted && (
                                    <div className="mt-2 flex items-center gap-2">
                                      <button
                                        onClick={() => handleDownload(group.file_data, group.file_submitted)}
                                        className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                                      >
                                        📥 {group.file_submitted}
                                      </button>
                                      {group.submittedAt && (
                                        <span className="text-xs text-gray-500">({new Date(group.submittedAt).toLocaleDateString()})</span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    group.status === 'graded'
                                      ? 'bg-green-100 text-green-700'
                                      : group.status === 'submitted'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {group.status === 'graded' ? `Dinilai: ${group.nilai}` : group.status === 'submitted' ? 'Submitted' : 'Pending'}
                                  </span>

                                  {group.status === 'submitted' && (
                                    <button
                                      onClick={() => startGrading(project.id, group.id, 'kelompok', group.nama)}
                                      className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700 transition"
                                    >
                                      Beri Nilai
                                    </button>
                                  )}

                                  {group.status === 'graded' && (
                                    <button
                                      onClick={() => startGrading(project.id, group.id, 'kelompok', group.nama, group.nilai, group.feedback)}
                                      className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-300 transition"
                                    >
                                      Ubah Nilai
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {project.tipe === 'individu' && project.submissions && (
                          <div className="space-y-3">
                            {Object.values(project.submissions).map((sub) => (
                              <div key={sub.studentId} className="bg-gray-50 p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                <div>
                                  <p className="font-bold text-gray-800">{sub.studentName}</p>
                                  {sub.file_submitted && (
                                    <div className="mt-2 flex items-center gap-2">
                                      <button
                                        onClick={() => handleDownload(sub.file_data, sub.file_submitted)}
                                        className="text-sm font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                                      >
                                        📥 {sub.file_submitted}
                                      </button>
                                      {sub.submittedAt && (
                                        <span className="text-xs text-gray-500">({new Date(sub.submittedAt).toLocaleDateString()})</span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    sub.status === 'graded'
                                      ? 'bg-green-100 text-green-700'
                                      : sub.status === 'submitted'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {sub.status === 'graded' ? `Dinilai: ${sub.nilai}` : sub.status === 'submitted' ? 'Submitted' : 'Pending'}
                                  </span>

                                  {sub.status === 'submitted' && (
                                    <button
                                      onClick={() => startGrading(project.id, sub.studentId, 'individu', sub.studentName)}
                                      className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700 transition"
                                    >
                                      Beri Nilai
                                    </button>
                                  )}

                                  {sub.status === 'graded' && (
                                    <button
                                      onClick={() => startGrading(project.id, sub.studentId, 'individu', sub.studentName, sub.nilai, sub.feedback)}
                                      className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-300 transition"
                                    >
                                      Ubah Nilai
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                      >
                        {isExpanded ? '▲ Sembunyikan Detail' : '📥 Lihat Pengumpulan'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

            {/* Instructions */}
            <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg shadow-sm">
              <p className="text-indigo-900">
                💡 <strong>Tips Guru:</strong> Gunakan tombol <strong>+ Buat Project Folder</strong> untuk membuat tugas baru. Siswa akan langsung melihat tugas project di dashboard mereka secara real-time. Anda dapat melampirkan berkas PDF, Foto, atau Video sebagai acuan pengerjaan.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
