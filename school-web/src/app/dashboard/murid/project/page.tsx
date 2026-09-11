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
const STUDENT_NAME = 'Budi Santoso';
const STUDENT_ID = 'murid-1';

const defaultProjects: ProjectItem[] = [];

export default function MuridProject() {
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Submission Form States
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [docDescription, setDocDescription] = useState('');
  const [docFileType, setDocFileType] = useState<FileType>('pdf');
  const [docFileName, setDocFileName] = useState('');
  const [docFileData, setDocFileData] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProjectList(JSON.parse(saved));
        return;
      } catch {
        // ignore
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    setProjectList(defaultProjects);
  }, []);

  const saveProjects = (list: ProjectItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setProjectList(list);
  };

  const getStudentGroupForProject = (project: ProjectItem) => {
    if (project.tipe !== 'kelompok' || !project.groups) return null;
    return project.groups.find(
      (g) => g.ketua === STUDENT_NAME || g.anggota.includes(STUDENT_NAME)
    ) || null;
  };

  const getStudentSubmissionForProject = (project: ProjectItem) => {
    if (project.tipe === 'kelompok') {
      const g = getStudentGroupForProject(project);
      if (!g) return null;
      return {
        status: g.status,
        progress: g.progress,
        file_submitted: g.file_submitted,
        file_type: g.file_type,
        file_data: g.file_data,
        nilai: g.nilai,
        feedback: g.feedback,
        submittedAt: g.submittedAt,
      };
    } else {
      const sub = project.submissions?.[STUDENT_ID];
      if (!sub) {
        return {
          status: 'pending' as const,
          progress: 0,
        };
      }
      return sub;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'graded':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'submitted':
        return '✓ Sudah Dikumpulkan';
      case 'graded':
        return '✓ Sudah Dinilai';
      default:
        return '⏳ Sedang Dikerjakan';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setDocFileData(event.target?.result as string);
      setDocFileName(file.name);
    };
    reader.readAsDataURL(file);
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

  const openSubmit = (project: ProjectItem) => {
    setSelectedProject(project);
    setDocDescription('');
    setDocFileName('');
    setDocFileData('');
    setDocFileType('pdf');
    setShowSubmitModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    if (!docFileName) {
      alert('Silakan pilih file dokumentasi terlebih dahulu.');
      return;
    }

    const updated = projectList.map((project) => {
      if (project.id === selectedProject.id) {
        if (project.tipe === 'kelompok' && project.groups) {
          const updatedGroups = project.groups.map((group) => {
            if (group.ketua === STUDENT_NAME || group.anggota.includes(STUDENT_NAME)) {
              return {
                ...group,
                status: 'submitted' as const,
                progress: 100,
                file_submitted: docFileName,
                file_type: docFileType,
                file_data: docFileData,
                submittedAt: new Date().toISOString(),
              };
            }
            return group;
          });
          return { ...project, groups: updatedGroups };
        } else {
          // Tipe Individu
          const updatedSubs = { ...(project.submissions || {}) };
          updatedSubs[STUDENT_ID] = {
            studentId: STUDENT_ID,
            studentName: STUDENT_NAME,
            status: 'submitted' as const,
            progress: 100,
            file_submitted: docFileName,
            file_type: docFileType,
            file_data: docFileData,
            submittedAt: new Date().toISOString(),
          };
          return { ...project, submissions: updatedSubs };
        }
      }
      return project;
    });

    saveProjects(updated);
    setShowSubmitModal(false);
    setSelectedProject(null);
    alert('Dokumentasi project berhasil dikumpulkan!');
  };

  // Stats calculation
  const ongoingCount = projectList.filter((p) => {
    const sub = getStudentSubmissionForProject(p);
    return sub && sub.status === 'pending';
  }).length;

  const submittedCount = projectList.filter((p) => {
    const sub = getStudentSubmissionForProject(p);
    return sub && sub.status === 'submitted';
  }).length;

  const gradedCount = projectList.filter((p) => {
    const sub = getStudentSubmissionForProject(p);
    return sub && sub.status === 'graded';
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-green-600">Pesantren Masyarakat Digital - Project Murid</h1>
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
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">👨‍🎓</div>
              <p className="font-semibold text-gray-800">{STUDENT_NAME}</p>
              <p className="text-sm text-gray-600">Kelas: 1</p>
            </div>
          </div>

          <nav className="p-6 space-y-3">
            <a href="/dashboard/murid" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📊 Dashboard
            </a>
            <a href="/dashboard/murid/tantangan" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📝 Tantangan
            </a>
            <a href="/dashboard/murid/project" className="block p-3 bg-green-100 text-green-700 rounded-lg font-semibold">
              🤝 Project
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-xl mb-8 shadow-lg">
              <h2 className="text-3xl font-bold font-serif">Project-Ku</h2>
              <p className="text-green-100 mt-2">Daftar project individu & kelompok serta penyerahan tugas dokumentasi.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Sedang Dikerjakan</p>
                <p className="text-2xl font-bold text-orange-600">{ongoingCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Sudah Dikumpulkan</p>
                <p className="text-2xl font-bold text-blue-600">{submittedCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Sudah Dinilai</p>
                <p className="text-2xl font-bold text-green-600">{gradedCount}</p>
              </div>
            </div>

            {/* Submisi Dokumentasi Modal */}
            {showSubmitModal && selectedProject && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Kumpulkan Dokumentasi Project</h3>
                  <p className="text-sm text-gray-600 mb-6">Project: <strong className="text-green-600">{selectedProject.judul}</strong></p>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Keterangan / Deskripsi Hasil Kerja</label>
                      <textarea
                        value={docDescription}
                        onChange={(e) => setDocDescription(e.target.value)}
                        placeholder="Deskripsikan proses pembuatan kerajinan tangan atau pengerjaan project Anda..."
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-green-500 min-h-24"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Lampiran Dokumen</label>
                        <select
                          value={docFileType}
                          onChange={(e) => setDocFileType(e.target.value as FileType)}
                          className="w-full px-4 py-2 border rounded focus:outline-green-500"
                        >
                          <option value="pdf">📄 PDF Document</option>
                          <option value="gambar">🖼️ Foto / Gambar</option>
                          <option value="video">🎥 Rekaman Video</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih File Lampiran</label>
                        <input
                          type="file"
                          accept={
                            docFileType === 'gambar'
                              ? 'image/*'
                              : docFileType === 'video'
                              ? 'video/*'
                              : '.pdf'
                          }
                          onChange={handleFileChange}
                          className="w-full px-2 py-1 border rounded focus:outline-green-500 text-xs"
                          required
                        />
                      </div>
                    </div>

                    {docFileName && (
                      <p className="text-sm text-green-600 font-semibold">✓ {docFileName} siap diunggah</p>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setShowSubmitModal(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                      >
                        Kumpulkan Tugas
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Project List */}
            {projectList.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500 border border-green-100">
                <div className="text-4xl mb-3">🤝</div>
                <p className="text-lg font-semibold">Belum Ada Project yang Ditugaskan</p>
                <p className="text-sm text-gray-400 mt-1">Project individu atau kelompok dari guru akan muncul di sini.</p>
              </div>
            ) : (
              <div className="space-y-6">
              {projectList.map((project) => {
                const sub = getStudentSubmissionForProject(project);
                const isGroup = project.tipe === 'kelompok';
                const myGroup = isGroup ? getStudentGroupForProject(project) : null;

                // If kelompok but student is not in any group
                if (isGroup && !myGroup) {
                  return (
                    <div key={project.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-bold text-gray-800">{project.judul}</h3>
                      <p className="text-sm text-gray-500 mt-1">👨‍🏫 {project.guru} | 👥 Kelompok</p>
                      <p className="text-gray-700 mt-3">{project.deskripsi}</p>
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        ⚠️ Anda belum dimasukkan ke kelompok mana pun oleh Guru untuk project ini. Hubungi guru kelas Anda.
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={project.id} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition border-l-4 border-green-500">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">{project.judul}</h3>
                        <p className="text-sm text-gray-600 mt-1">👨‍🏫 {project.guru}</p>
                        <p className="text-gray-700 mt-3">{project.deskripsi}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ml-4 ${getStatusColor(sub?.status)}`}>
                        {getStatusLabel(sub?.status)}
                      </span>
                    </div>

                    {/* Project Meta Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Deadline</p>
                        <p className="font-bold text-gray-800">📅 {project.deadline}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Tipe Project</p>
                        <p className="font-bold text-gray-800">
                          {isGroup ? '👥 Kelompok' : '👤 Individu'}
                        </p>
                      </div>
                    </div>

                    {/* Guru Instructions/Attachment Link */}
                    {project.attachment && (
                      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg mb-6 flex justify-between items-center">
                        <div>
                          <p className="text-xs text-indigo-700 font-bold uppercase">Petunjuk Pengerjaan dari Guru:</p>
                          <p className="text-sm text-gray-800 font-semibold mt-1">{project.attachment.name}</p>
                        </div>
                        <button
                          onClick={() => handleDownload(project.attachment?.data, project.attachment?.name)}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
                        >
                          📥 Download Petunjuk
                        </button>
                      </div>
                    )}

                    {/* Kelompok Details (only for kelompok) */}
                    {isGroup && myGroup && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                        <p className="font-bold text-blue-900 text-lg mb-2">{myGroup.nama}</p>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Ketua:</strong> {myGroup.ketua} {myGroup.ketua === STUDENT_NAME ? '(Anda)' : ''}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Anggota:</strong> {myGroup.anggota.join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-gray-800">Progress Pengerjaan</p>
                        <p className="text-sm font-bold text-green-600">{sub?.progress ?? 0}%</p>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${sub?.progress ?? 0}%` }}></div>
                      </div>
                    </div>

                    {/* Nilai & Feedback */}
                    {sub?.status === 'graded' && (
                      <div className="space-y-4 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">Nilai Project</p>
                              <p className="text-4xl font-bold text-green-600">{sub.nilai}</p>
                            </div>
                            <div className="text-4xl">🏆</div>
                          </div>
                        </div>
                        {sub.feedback && (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <p className="font-semibold text-gray-800 mb-1">Feedback Guru:</p>
                            <p className="text-gray-700 italic">"{sub.feedback}"</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submitted File Info */}
                    {sub?.status === 'submitted' && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500 flex justify-between items-center">
                        <div>
                          <p className="text-xs text-blue-700 font-bold uppercase">Dokumentasi Terkirim:</p>
                          <p className="text-sm font-semibold text-gray-800 mt-1">{sub.file_submitted}</p>
                          {sub.submittedAt && (
                            <p className="text-xs text-gray-500 mt-1">Dikirim pada: {new Date(sub.submittedAt).toLocaleString()}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDownload(sub.file_data, sub.file_submitted)}
                          className="text-xs font-bold text-blue-700 border border-blue-300 px-3 py-1 rounded hover:bg-blue-100 transition"
                        >
                          👁️ Lihat File
                        </button>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                      {sub?.status === 'pending' && (
                        <button
                          onClick={() => openSubmit(project)}
                          className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition shadow-md flex items-center justify-center gap-2"
                        >
                          📤 Kumpulkan Dokumentasi (PDF/Foto/Video)
                        </button>
                      )}

                      {sub?.status === 'submitted' && (
                        <button
                          onClick={() => openSubmit(project)}
                          className="flex-1 bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-200 transition flex items-center justify-center gap-2"
                        >
                          🔄 Kirim Ulang Dokumentasi
                        </button>
                      )}

                      {sub?.status === 'graded' && (
                        <button
                          className="flex-1 bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-bold cursor-not-allowed flex items-center justify-center gap-2"
                          disabled
                        >
                          ✓ Project Selesai & Dinilai
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

            {/* Tips */}
            <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-sm">
              <p className="text-green-900">
                💡 <strong>Tips Murid:</strong> Setelah menyelesaikan project (seperti membuat kerajinan tangan), dokumentasikan hasilnya dalam bentuk file PDF laporan, Foto hasil karya, atau rekaman Video, lalu unggah menggunakan tombol <strong>Kumpulkan Dokumentasi</strong>.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
